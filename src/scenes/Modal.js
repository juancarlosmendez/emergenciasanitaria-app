import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
   FlatList, Alert,WebView,Image, YellowBox,ActivityIndicator
} from 'react-native';
import { AsyncStorage,TextInput,Switch } from "react-native";
import { NavigationEvents } from 'react-navigation';

import { View, Text, Button } from 'native-base';



import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';


import SelectInput from 'react-native-select-input-ios'



import { showMessage, hideMessage } from "react-native-flash-message";

import FlashMessage from "react-native-flash-message";

import DeviceInfo from 'react-native-device-info';

import GLOBALS from '../config/Globals.js';

import { fetchDataAppApi } from '../functions/Networking';
import { getFromStorage,saveToStorage } from '../functions/Storage';

import Header from '../components/Header';





export default class Modal extends Component {

  
  
  


    constructor(props) {
 
      super(props);
    
      this.state = {
        _isLoading: true,
        



        _device_uid:'', //send
        _device_name:'', //send
        _nombres:'',
        _nombres_validation:'',
        _direccion:'', //send
        _direccion_validation:'',
        _contactos:'', //send
        _contactos_validation:'',
        _comentarios:'', //send
        _comentarios_validation:'',
        location_placeDescription:'',  //send
        _location_placeDescription_validation:'',
        location_latitude:0,  //send
        location_longitude:0,  //send
        //tipoRegistro:[{ value: 0, label: 'POSIBLE INFECTADO COVID-19'},{ value: 1, label: 'FALLECIDO ABANDONADO'},{ value: 1, label: 'SE NECESITA RESPIRADOR'}],
        _tipoRegistro:[],
        _tipoRegistroSelectedValue:0  //send
      }
    
      YellowBox.ignoreWarnings([
       'Warning: componentWillMount is deprecated',
       'Warning: componentWillReceiveProps is deprecated',
     ]);
    
    }


    processDataCategories = (textResponse) =>{
      try{
        var jsonObj = JSON.parse(textResponse);
        var i=0;
        var data = jsonObj.map(function(item) {           
          return {
            value: item.ID,
            label: item.Name
          };
        });
        var selectedFirstValue=0
        if(data.length>0){selectedFirstValue=data[0].value}
          else{selectedFirstValue=0;}
        this.setState({
          _isLoading:false,
          _tipoRegistro:data,
          _tipoRegistroSelectedValue:selectedFirstValue //default selected value
        });
        saveToStorage(GLOBALS.ASYNCSTORAGE_CATEGORIES, textResponse);
      }
      catch(ex){
        console.log("ERR: "+ex);
        this.setState({ _isLoading:false });
      }
    }

    

    loadCategories = () => {
      fetchDataAppApi(
        GLOBALS.EMERGENCIES_API_GETCATEGORIES,
        {},
        this.processDataCategories,
        (error) => {
          const savedData = getFromStorage(GLOBALS.ASYNCSTORAGE_CATEGORIES);
          if(savedData!==null){
            this.processDataCategories(savedData);
          }
        }
      );      
    };

    validateForm = () =>{
      var validated=true;
      if(this.state._direccion==""){
        validated=false;
        this.setState({
          _direccion_validation:GLOBALS.FIELD_REQUIRED_MESSAGE
        });
      }
      if(this.state._contactos==""){
        validated=false;
        this.setState({
          _contactos_validation:GLOBALS.FIELD_REQUIRED_MESSAGE
        });
      }
      if(this.state._comentarios==""){
        validated=false;
        this.setState({
          _comentarios_validation:GLOBALS.FIELD_REQUIRED_MESSAGE
        });
      }
      if(this.state.location_placeDescription==""){
        validated=false;
        this.setState({
          _location_placeDescription_validation:GLOBALS.FIELD_REQUIRED_MESSAGE
        });
      }

      if(!validated){
        showMessage({
          message: "Validación de datos",
          description: "Debe llenar los datos requeridos para poder crear una emergencia.",
          duration:4000,
          type: "default",
          backgroundColor: "#FF0000", // background color
          color: "#FFFFFF", // text color
        });
      }

      return validated;

    }

    cleanForm = () =>{
      this.setState({
        //device_uid:'', //send
        //device_name:'', //send
        _nombres:'',
        _direccion:'', //send
        _comentarios:'', //send
        location_placeDescription:'',  //send
        location_latitude:0,  //send
        location_longitude:0,  //send
        //tipoRegistro:[{ value: 0, label: 'POSIBLE INFECTADO COVID-19'},{ value: 1, label: 'FALLECIDO ABANDONADO'},{ value: 1, label: 'SE NECESITA RESPIRADOR'}],
        //_tipoRegistro:[],
        //_tipoRegistroSelectedValue:0  //send
      });
    }

    sentDataActions = () =>{
      this.setState({_isLoading:false});
      showMessage({
        message: "Emergencia Creada",
        description: "Se ha creado su emergencia con éxito, en unos momentos aparecerá en la plataforma. Gracias.",
        duration:6000,
        type: "default",
        backgroundColor: "#027802", // background color
        color: "#FFFFFF", // text color
      });

      this.cleanForm();
    }

    guardar = () => {
      if(this.validateForm()){        
        this.setState({_isLoading:true});
        fetchDataAppApi(GLOBALS.EMERGENCIES_API_CREATE,
        {
          CategoryID:this.state._tipoRegistroSelectedValue,
          LocationLatitude:this.state.location_latitude,
          LocationLongitude:this.state.location_longitude,
          LocationName:this.state.location_placeDescription,
          Address:this.state._direccion,
          Comment:this.state._comentarios,
          Names:this.state._nombres,
          Contacts:this.state._contactos,
          Uid:this.state._device_uid,
          DeviceName:this.state._device_name,
          DeviceModel:''
        },
        (response) => {
          this.sentDataActions();
        },
        (error) => {
          this.sentDataActions();
        }          
        );        
      }


      

      //this.cleanForm();
      /*
      showMessage({
        message: "Simple message",
        type: "info",
      });
      */

/*
      showMessage({
        message: "My message title",
        description: "My message description",
        type: "default",
        backgroundColor: "purple", // background color
        color: "#606060", // text color
      });
*/

      //console.log(this.state._tipoRegistroSelectedValue);
      /*
      if(this.state.deviceName!="" && this.state.ip!="" && this.state.port!="" && this.state.username!="" && this.state.password!=""){
        console.log('-----',this.state.deviceName);
  
      }
      else{
        Alert.alert('You must fill all the required fields.');
      }
      */

    }

    updateData_fromCHild = data => {
      console.log(data);
      this.setState({
        location_placeDescription:data.selected_placeDescription,
        location_latitude:data.selected_region.latitude,
        location_longitude:data.selected_region.longitude,
      });
      //alert("come back status: " + data);
      // some other stuff
    };

    

    setInputTextValue = (control,value,isRequired) =>{
      this.setState({[control]: value})
      if(isRequired){
        if(value.length>0){
          this.setState({[control+"_validation"]:''});
        }
        else{
          this.setState({[control+"_validation"]:GLOBALS.FIELD_REQUIRED_MESSAGE});
        }
      }      
    }


    componentDidMount () {
      console.disableYellowBox = true;

      //console.log(fetchData("---"));
      this.getDeviceInfo();
      this.loadCategories();
      
    }

    getUbicacionText = () => {
      if(this.state.location_latitude!=0){
        return this.state.location_placeDescription+" "+"[GPS: "+this.state.location_latitude+","+this.state.location_longitude+"]";
      }
      else{
        return "Seleccionar ubicación";
      }
    }


    cambiarValorSelect=(_valor)=>{
      
      this.setState({
          _tipoRegistroSelectedValue:_valor,
        },function(){});
    }

    getDeviceInfo = () =>{
      let uniqueId = DeviceInfo.getUniqueId();
      this.setState({
        _device_uid:uniqueId
      });
      //Alert.alert(uniqueId);
      console.log("uniqueID: "+uniqueId);
      DeviceInfo.getDeviceName().then(deviceName => {
        // iOS: "Becca's iPhone 6"
        // Android: ?
        // Windows: ?
        this.setState({
          _device_name:deviceName
        });
        console.log(deviceName);
      });
    }

    foo = () => {
      Alert.alert("foo");
    }
    

  render() {

    const { navigate } = this.props.navigation;   
    
    if(this.state._isLoading){
      return (

        <View style={{flex: 1}}>  
    
    
        <Header
            title={"EMERGENCIA SANITARIA"}
            leftRender = {()=>{}}
            rightRender = {()=>{}}
            >
          </Header>
    
    
          <View style={{width:win.witdh,padding:0}}>
          <ActivityIndicator size="large" color="#777777" style={{marginTop:100}} />
           </View>
    
          
          <FlashMessage ref="myLocalFlashMessage" position="top"/>
    
        </View>        
           ); 
    }
    else{
      return (

        <View style={{flex: 1}}>  
    
    
          <Header
            title={"EMERGENCIA SANITARIA"}
            leftRender = {()=>{}}
            rightRender = {()=>(
                <Icon2 name="ios-checkmark" size={45} color="#53BA6A" style={{marginTop:4,marginRight:12,marginLeft:12}}
                  onPress={() => this.guardar()}
                  />  
            )}>
          </Header>

    
    
          <View style={{width:win.witdh,padding:0}}>
            <View style={{width:win.witdh}}>          
              <ScrollView contentContainerStyle={{flexGrow: 1,paddingLeft:0,paddingRight:0}}>
                
                  <View style={{flex:1,backgroundColor:'#DEDEDE',alignItems:'center',textAlign:'center',justifyContent:'center'}}>
                    <Text style={{flex:1,textAlign:'left',color:'#575757',alignSelf:'center',fontSize:13,paddingLeft:15,paddingRight:15,paddingTop:12,paddingBottom:10,width:win.width,fontSize:15}}>Por favor, pedimos seriedad al momento de subir una emergencia, otras personas dependen de esta plataforma. Gracias.</Text>
                  </View>
                  
                  <View style={{flex:1,paddingBottom:100}}>     
                    
                    <View style={styles.formulario}>
                      <Text style={styles.formulario_label}>Tipo de emergencia:</Text>
                      <SelectInput
                        options={this.state._tipoRegistro}
                        value={this.state._tipoRegistroSelectedValue}
                        onValueChange={ (valor) => { this.cambiarValorSelect(valor) }}
                        onSubmitEditing={ (valor) => { this.cambiarValorSelect(valor) }}
                        style={{
                          width: Dimensions.get('window').width,
                          backgroundColor:'#FFFFFF',
                          borderBottomColor:'#DDDDDD',
                          borderBottomWidth:1,
                          borderBottomStyle:'solid',
                          textAlign:'left',
                          padding:10,
                          paddingLeft:20,
                          paddingRight:15,}}   
                          labelStyle={{textAlign:'left',fontSize:16}} />
                     
    
                     <Text style={styles.formulario_label}>Nombres:</Text>
                      <TextInput
                        style={styles.formulario_input}
                        placeholder="Persona que necesita la ayuda"
                        
                        onChangeText={text => this.setInputTextValue('_nombres',text,false)}
                        value = {this.state._nombres}
                      />


                      <TouchableOpacity onPress={ () => { 
                        this.props.navigation.navigate("ModalLocation", {
                          name: "from parent",
                          updateData_fromCHild: this.updateData_fromCHild
                        })
                         }}>
                        
                      <View style={styles.formulario_input3}>
                          <Text style={styles.formulario_label3}>Ubicación (*):</Text>
                          {!!this.state._location_placeDescription_validation && (
                            <Text style={styles.formulario_input_error}>{this.state._location_placeDescription_validation}</Text>
                          )}
                        <Text style={styles.formulario_location_span}>{this.getUbicacionText()}</Text>
    
                      </View>
                      </TouchableOpacity>
                      
    
                      <Text style={styles.formulario_label}>Dirección (*):</Text>
                      {!!this.state._direccion_validation && (
                        <Text style={styles.formulario_input_error}>{this.state._direccion_validation}</Text>
                      )}
                      <TextInput
                        style={styles.formulario_inputMulti}
                        placeholder="Explicar la dirección con indicaciones"
                        multiline={true}
                        onChangeText={text => this.setInputTextValue('_direccion',text,true)}
                        value = {this.state._direccion}
                      />



                      <Text style={styles.formulario_label}>Contactos (*):</Text>
                      {!!this.state._contactos_validation && (
                        <Text style={styles.formulario_input_error}>{this.state._contactos_validation}</Text>
                      )}
                      <TextInput
                        style={styles.formulario_input}
                        placeholder="Número de teléfono(s)"
                        onChangeText={text => this.setInputTextValue('_contactos',text,true)}
                        value = {this.state._contactos}
                      />



                      <Text style={styles.formulario_label}>Comentarios (*):</Text>
                      {!!this.state._comentarios_validation && (
                        <Text style={styles.formulario_input_error}>{this.state._comentarios_validation}</Text>
                      )}
                      <TextInput
                        style={styles.formulario_inputMulti2}
                        placeholder="Describa la situación al detalle"
                        multiline={true}
                        onChangeText={text => this.setInputTextValue('_comentarios',text,true)}
                        value = {this.state._comentarios}
                      />
    
    
                    </View>
                  
    
    
                  </View>
              </ScrollView>          
            </View>        
          </View>
    
          
          <FlashMessage ref="myLocalFlashMessage" position="top"/>
    
        </View>        
           ); 
    }

    
    
  }

}


const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*backgroundColor: GLOBALS.COLOR.PRIMARY_COLOR,*/
    /*alignItems: 'center',
    justifyContent: 'center',*/
    backgroundColor:'#EEE'
  },
  header: {
    width:win.witdh,
    justifyContent: 'center',     
    flexDirection:'row',
    backgroundColor:'#293A4E',
    ...Platform.select({
      ios: {
        height: 90,
        alignItems: 'flex-end',
      },
      android: {
        height: 61,
        alignItems: 'center',
      },
    }),
  },
  headerAction:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    ...Platform.select({
      ios: {
        height: 90,
        alignItems: 'flex-end',
      },
      android: {
        height: 61,
        alignItems: 'center',
      },
    }),
  },
  heaaderTitle:{
    flex:6,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    ...Platform.select({
      ios: {
        height: 90,
        alignItems: 'flex-end',
        paddingBottom:10,
      },
      android: {
        height: 61,
        alignItems: 'center',
        paddingBottom:0,
      },
    }),
  },
  flatlist:{
    backgroundColor: '#EEE',
  },
  separator:{
    //backgroundColor:'#cf1036',
    padding:14,
    //fontWeight:'bold',
    paddingTop:20,
    paddingBottom:15,
    flexDirection:'row'
  },
  separatorText:{ 
    //backgroundColor:'#cf1036',
    fontSize:19,
    marginTop:-2,
    fontWeight:'bold',
    backgroundColor:'#EEE',
    textAlign:'center',
    paddingLeft:10,
  },

  vermasTopLine:{
    flex:1,
    backgroundColor:'#CDCDCD',
    marginLeft:17,
    marginRight:19,
    height:1,
    marginTop:15,
    marginBottom:15
  },
  vermas:{
    padding:25,
    paddingTop:0,
    color:'#9A9A9A',
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
    paddingBottom:4,
    textTransform: 'uppercase',
  },
  iconModal: {    
    textAlign: 'center',
    paddingTop:0,
    marginTop:0,
    marginBottom:25
  },  


  cardWrapper:{
    backgroundColor:'#EEE',
  },
  card:{
    backgroundColor:'#FFFFFF',
    marginTop:0,
    marginBottom:15,
    borderTopColor:'#DFDFDF',
    borderTopWidth:1,
    borderBottomColor:'#DFDFDF',
    borderBottomWidth:1
  },
 
  cardTitleWrapper:{
    flex:1,
    padding:17,
    paddingLeft:17,
    paddingRight:17,
    paddingTop:20
  },
  cardTitle:{
    fontSize:16,
    //textAlign:'justify',
    color:'#343434'
  },
  cardSubTitleWrapper:{
    flex:1,
    padding:17,
    paddingBottom:17,
    flexDirection:'row',    
    /*borderBottomColor: '#DDD',
    borderBottomWidth: 1,*/
  },
  cardSubTitle:{
    fontSize:16,
    color:'#343434',
    paddingLeft:10
  },
  cardButtonsWrapper:{
    padding:17,
  },
  cardBottomSeparator:{
    flex:1,
    height:1,
    marginLeft:17,
    marginRight:17,
    backgroundColor:'#DDD'
  },
  cardButton:{
    fontWeight:'bold',
    fontSize:15,
    color:'#242424'
  },


  formulario:{
    flex:1,
    padding:0,
    paddingTop:5,
  },

  formulario_label:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:10,
    paddingLeft:15
  },
  formulario_input:{
    height: 40,
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    borderBottomColor:'#DDD',
    borderBottomWidth:1,    
  },
  formulario_inputMulti:{
    height: 70,
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    borderBottomColor:'#DDD',
    borderBottomWidth:1,    
  },
  formulario_inputMulti2:{
    height: 100,
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    borderBottomColor:'#DDD',
    borderBottomWidth:1,    
  },
  formulario_input2:{
    height: 45,
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    borderBottomColor:'#DDD',
    borderBottomWidth:1,   
    paddingBottom:5 
  },
  formulario_input3:{
    paddingLeft:0,
    paddingRight:20,
    borderBottomColor:'#DDD',
    borderBottomWidth:1,
  },
  formulario_label3:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:10,
    paddingLeft:15,
  },
  formulario_location_span:{    
    fontSize:16,
    paddingLeft:20,
    paddingTop:8,
    paddingBottom:8,
    color:'#BBBBBB'
  },

  formulario_input_error:{
    color:'#FF0000',
    fontSize:12,
    paddingLeft:15,
  }

});
