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


import Header from '../components/Header';





// These Fields will create a login form with three fields
const fields = [
  {
    type: 'text',
    name: 'txt_nombre',
    required: true,
    label: 'Device Name',
  }
  ,
  {
    type: 'text',
    name: 'txt_url',
    required: true,
    label: 'IP Number',
  }
  ,
  {
    type: 'text',
    name: 'txt_puerto',
    required: true,
    label: 'Port',
  }
  ,
  {
    type: 'text',
    name: 'txt_username',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'txt_password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
];


export default class Modal extends Component {

  
  
  


    constructor(props) {
 
      super(props);
    
      this.state = {
        lan:0,
        isLoading: true,
        permittedEvents:'', //2,4
        pentaxcongress_id:0,
        displayedOlderCongresses:false,
        dataSourceCurrent:[],
        dataSourceOlder:[],

        switchEnable:false,
        deviceName:'',
        ip:'',
        port:'',
        username:'',
        password:'',


        location_placeDescription:'',
        location_latitude:0,
        location_longitude:0,
        tipoRegistro:[{ value: 0, label: 'POSIBLE INFECTADO COVID-19'},{ value: 1, label: 'FALLECIDO ABANDONADO'},{ value: 1, label: 'SE NECESITA RESPIRADOR'}],
        tipoRegistroSelectedValue:0
      }
    
      YellowBox.ignoreWarnings([
       'Warning: componentWillMount is deprecated',
       'Warning: componentWillReceiveProps is deprecated',
     ]);
    
    }

    

    guardar() {

      
      
      if(this.state.deviceName!="" && this.state.ip!="" && this.state.port!="" && this.state.username!="" && this.state.password!=""){
        console.log('-----',this.state.deviceName);
  
        AsyncStorage.getItem('DATAX', (err, result) => {  
  
  
  
          if(result==null){
            result='[NEW_DEVICE]';
          }

            var protocol="http";
            if(this.state.switchEnable){
              protocol="https";
            }
            //console.log("JJJJJ");
            //console.log(Math.random().toString(16).slice(-4));
            let uniqueid = Math.random().toString(16).slice(-4);
            //let res = result.replace("[NEW_DEVICE]",""+this.state.deviceName+"__"+uniqueid+"_^_setTimeout(function(){window.location='"+protocol+":\/\/lynx-server.com/controlapp/controller.php?ip="+this.state.ip+"_"+this.state.port+"';},1000);_|_setTimeout(function(){document.getElementsByTagName('input')[0].value='"+this.state.username+"';document.getElementsByTagName('input')[1].value='"+this.state.password+"';document.getElementById('formSubmitButton').click();},1000);_||_[NEW_DEVICE]");
            let res = result.replace("[NEW_DEVICE]",""+this.state.deviceName+"__"+uniqueid+"_^_setTimeout(function(){window.location='"+protocol+":\/\/"+this.state.ip+":"+this.state.port+"\/login.html';},1000);_|_setTimeout(function(){document.getElementsByTagName('input')[0].value='"+this.state.username+"';document.getElementsByTagName('input')[1].value='"+this.state.password+"';document.getElementById('formSubmitButton').click();},1000);_||_[NEW_DEVICE]");
            
            try {
              //AsyncStorage.setItem('@DATAX', "AAAAAAA");
              AsyncStorage.setItem('DATAX', res, () => {
                Alert.alert("New device added.");
                this.props.navigation.goBack();
              });
            } catch (error) {
              // Error saving data
              Alert.alert("1:"+error);
            }
             
           
        });
      }
      else{
        Alert.alert('You must fill all the required fields.');
      }

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

    toggleSwitch = () => {
      this.setState({switchEnable: !this.state.switchEnable})
    }

    setInputTextValue = (_control,_value) =>{
      this.setState({[_control]: _value})
    }


      componentDidMount () {
        console.disableYellowBox = true;
        
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
          tipoRegistroSelectedValue:_valor,
        },function(){});
        /*
        if(_valor==0){            
          //Alert.alert("English");
          AsyncStorage.setItem('LAN', '0', () => {});   
        }
        else{
          //Alert.alert("Spanish");
          AsyncStorage.setItem('LAN', '1', () => {});   
        }
        */
    }

      



  render() {

    const { navigate } = this.props.navigation;   
    
    return (  
    <View style={{flex: 1}}>  




      <Header
            title={"EMERGENCIA SANITARIA"}
            leftRender = {()=>(
              <Icon2 name="ios-arrow-back" size={30} color="#EEEEEE" style={{marginTop:4,marginRight:12,marginLeft:12,paddingBottom:8}}
                      onPress={() => this.props.navigation.goBack()}
                      />  
            )}
            rightRender = {()=>{}}
            >
          </Header>



      <View style={{width:win.witdh,padding:0}}>
        <View style={{width:win.witdh}}>          
          <ScrollView contentContainerStyle={{flexGrow: 1,paddingLeft:0,paddingRight:0}}>
              <View style={{flex:1,backgroundColor:'#DEDEDE',alignItems:'center',textAlign:'center',justifyContent:'center'}}>
                <Text style={{flex:1,textAlign:'left',color:'#575757',alignSelf:'center',paddingLeft:15,paddingRight:15,paddingTop:12,paddingBottom:10,width:win.width,fontSize:15}}>Para guardar esta emergencia como atendida, presionar el botón ATENDER EMERGENCIA</Text>
              </View>
              
              <View style={{flex:1,paddingBottom:100}}>     
                
                <View style={styles.formulario}>
                  
                  
                <Text style={styles.formulario_label}>Tipo de emergencia:</Text>
                  <Text style={styles.formulario_view_text}>
                     NECESITO AYUDA
                  </Text>
                 

                  <TouchableOpacity onPress={ () => { 
                    this.props.navigation.navigate("ModalLocation", {
                      name: "from parent",
                      updateData_fromCHild: this.updateData_fromCHild
                    })
                     }}>
                  <View style={styles.formulario_input3_view}>
                      <Text style={styles.formulario_label3}>Ubicación:</Text>
                    <Text style={styles.formulario_location_span_view}>{"Boulvd 9 de octubre [-79.377878,2.0009988]"}</Text>

                  </View>
                  </TouchableOpacity>
                  

                  <Text style={styles.formulario_label}>Dirección:</Text>
                  <Text style={styles.formulario_view_text}>
                     Av. 9 de Octubre y pichincha 745
                  </Text>

                  <Text style={styles.formulario_label}>Contactos:</Text>
                  <Text style={styles.formulario_view_text}>
                     +593 987747873
                  </Text>

                  <Text style={styles.formulario_label}>Comentarios:</Text>
                  <Text style={styles.formulario_view_text}>
                     Descripción detallada de la ayuda que necesita la persona en cuestión
                  </Text>

                  
                  <TouchableOpacity>
                    <View style={{
                      marginTop:50,
                      backgroundColor:'#027802',
                      padding:15,
                      flex:1,
                      height:60
                    }}>
                      <Text style={{
                        color:'#FFFFFF',
                        textAlign:'center',
                        fontSize:26,
                        fontWeight:'bold'
                      }}>
                        ATENDER EMERGENCIA
                      </Text>
                    </View>
                  </TouchableOpacity>
                 






                </View>
              


              </View>
          </ScrollView>          
        </View>        
      </View>

    </View>        
       ); 
    
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

  formulario_view_text:{
    height: 40,
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    borderBottomColor:'#DDD',
    borderBottomWidth:1, 
    color:'#555555'
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
  formulario_location_span_view:{    
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:8,
    paddingBottom:8,
    color:'#555555'
  },
  formulario_input3_view:{
    paddingLeft:0,
    paddingRight:20,
    //borderBottomColor:'#DDD',
    //borderBottomWidth:1,
  },


});
