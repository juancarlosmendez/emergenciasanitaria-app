import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,TouchableOpacity,
  View, FlatList, Alert,WebView,Image, YellowBox,ActivityIndicator,Dimensions,TouchableHighlight
} from 'react-native';
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

import Swipeout from 'react-native-swipeout';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';


import Header from '../components/Header';

const _DEFAULT_LATITUDE=-2.187602;
const _DEFAULT_LONGITUDE=-79.928822;
const _DEFAULT_LATITUDE_DELTA=0.0922;
const _DEFAULT_LONGITUDE_DELTA=0.0421;
   


export default class HomeMap extends Component {


    
    constructor(props) {
 
      super(props);
    
      this.state = {
        data:null,
        dataIsEmpty:0,
        lan:0,
        isLoading: true,
        permittedEvents:'', //2,4
        pentaxcongress_id:0,
        displayedOlderCongresses:false,
        dataSourceCurrent:[],
        dataSourceOlder:[],



        region: {
          latitude: _DEFAULT_LATITUDE,
          longitude: _DEFAULT_LONGITUDE,
          latitudeDelta: _DEFAULT_LATITUDE_DELTA,
          longitudeDelta: _DEFAULT_LONGITUDE_DELTA,
        },

        dataList:[{
          lat: _DEFAULT_LATITUDE,
          lon: _DEFAULT_LONGITUDE,
          title:'POSIBLE COVID-19',
          color:'#008080',
          desc:'05-MARZO-2020 13:00'
        },{
          lat: _DEFAULT_LATITUDE-0.02,
          lon: _DEFAULT_LONGITUDE,
          title: 'CADAVER',
          color:'#ff0000',
          desc:'03-MARZO-2020 15:00'
        },{
          lat: _DEFAULT_LATITUDE-0.04,
          lon: _DEFAULT_LONGITUDE,
          title: 'NECESITA AYUDA',
          color:'#0000ff',
          desc:'08-MARZO-2020 16:00'
        },]

      }
    
      YellowBox.ignoreWarnings([
       'Warning: componentWillMount is deprecated',
       'Warning: componentWillReceiveProps is deprecated',
     ]);
    
    }

      webcall = ()=> {
          fetch('https://lynx-server.com/webcontainer-app/services/app.php')
            .then((response) => response.json())
            .then((responseJson) => {
              this.processData(responseJson.a);

              try {
                AsyncStorage.setItem('DATA', responseJson.a);
              } catch (error) {
                // Error saving data
              }
              /*
              this.setState({
                isLoading: false,
                data: responseJson.a,
              }, function(){

              });
              */
            })
            .catch((error) =>{
              console.error(error);
              this.setState({
                isLoading: false,
              }, function(){

              });


              try {
                const value = AsyncStorage.getItem('DATA');
                if (value !== null) {
                  // We have data!!
                  //console.log(value);
                  this.setState({
                    isLoading: false,
                    data: value,
                  }, function(){
                    this.processData(value);
                  });
                }
              } catch (error) {
                // Error retrieving data
              }


            });
      }


      onRegionChange = (_region)  =>{

        this.setState({
          region: _region,
        }, function(){

        });

        //console.log(_region);
      }




      getData = ()=> {
//---------------------INIT DATA



/*
        try {
          //AsyncStorage.setItem('@DATAX', "AAAAAAA");
          AsyncStorage.setItem('DATAX', "INICIO__266372_^_setTimeout(function(){window.location='https:\/\/157.100.21.142:8080\/login.html';},1000);_|_setTimeout(function(){document.getElementsByTagName('input')[0].value='admin';document.getElementsByTagName('input')[1].value='Admin123';document.getElementById('formSubmitButton').click();},1000);_||_[NEW_DEVICE]", () => {


          });
        } catch (error) {
          // Error saving data
          Alert.alert("1:"+error);
        }
*/


        
        AsyncStorage.getItem('DATAX', (err, result) => {  
          if(result!=null){
            //_lan=parseInt(result);
            
            this.setState({
              isLoading: false,
              data: result,
            }, function(){
              //Alert.alert(value);
              this.processData(result);
            });


            //console.log(result);
            //console.log('ZZZZZ');
          }
          else{
            //_lan=0;
            this.setState({
              isLoading: false,
              data: '[NEW_DEVICE]',
            }, function(){
              //Alert.alert(value);
              this.processData('[NEW_DEVICE]');
            });
            
          }  
          /*  
          this.setState({
            lan: _lan,
          }, _callback);
          */
        });



        
      }

      processData = (_data) => {
        //Alert.alert(_data);
        if(_data!='[NEW_DEVICE]'){
          this.setState({
            dataIsEmpty: false,
          }, function(){});
          //PROCESAMIENTO DE LOS DATOS
          // _^_ separador de nombre de pantalla y comandos
          //_|_ separador de comandos
          //_||_ separador de items
          let datos=[];
          //let cadena="inicio_^_COMANDO1_|_comando2_|_comando3_||_LG Buildingxx_^_COMANDO1_|_comando2_|_comando3_||_DEMO_^_comando2_|_comando3";
          let cadena = _data;
          //let cadena="inicio_^_window.location='https://157.100.21.142:8080/login.html';_|_setTimeout(function(){document.getElementsByTagName('input')[0].value='admin';document.getElementsByTagName('input')[1].value='Admin123';document.getElementById('formSubmitButton').click();},1000);_|_setTimeout(function(){},1000);_|_setTimeout(function(){window.location='https://157.100.21.142:8080/eclypse/envysion/viewer.html?proj=LG_BUILDING_FFFF';},1000);_||_LG Buildingxx_^_COMANDO1_|_comando2_|_comando3_||_DEMO_^_comando2_|_comando3";
          //window.location='https://157.100.21.142:8080/eclypse/envysion/viewer.html?proj=LG_BUILDING_FFFF';
          let tmp1=cadena.split('_||_');

          tmp1.forEach(function(item,index){

            if(item!='[NEW_DEVICE]'){
              var tmp2=item.split('_^_');

              var tmp4 = [];
  
              var tmp3=tmp2[1].split('_|_');
  
              tmp3.forEach(function(item,index){
                tmp4.push(item);
              });

              var tmp5 = tmp2[0].split('__');
  
              datos.push({key: tmp5[0],id: tmp5[1],comandos: tmp4});
            }
            
          });
          /*
          let datos=[  
            {key: 'Inicio'},{key: 'LG Building'}, {key: 'Demo'}
          ];
          */
          //datos.push({key: 'Last'});
          this.setState({
              isLoading: false,
              data: datos,
            }, function(){

            });
        }
        else{
          this.setState({
            dataIsEmpty: true,
            isLoading: false,
            data: []
          }, function(){});
        }

          
      }



      componentDidMount () {
        console.disableYellowBox = true;

        //Geolocation.getCurrentPosition(info => console.log(info));

        try{
          Geolocation.getCurrentPosition((info)=>{
            console.log("geo:");
            console.log(info);
            this.onRegionChange({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: _DEFAULT_LATITUDE_DELTA,
              longitudeDelta: _DEFAULT_LONGITUDE_DELTA,
            });
            //saves on local
            try {
              AsyncStorage.setItem('CURRENT_LOCATION', info.coords.latitude.toString()+","+info.coords.longitude.toString(), () => {});
             } catch (error) {  }
          },(error)=>{  //DON'T ALLOW PERMISSION
            //Alert.alert("error 0");
              console.log("default");
              this.onRegionChange({
                latitude: _DEFAULT_LATITUDE,
                longitude: _DEFAULT_LONGITUDE,
                latitudeDelta: _DEFAULT_LATITUDE_DELTA,
                longitudeDelta: _DEFAULT_LONGITUDE_DELTA,
              });
          });
        }
        catch(error){
          
          //Alert.alert("err1");
          try {
            const value = AsyncStorage.getItem('CURRENT_LOCATION');
            if (value !== null) {
              //aqui carga de local
              var latlonArray = value.split(',');
              this.onRegionChange({
                latitude: parseFloat(latlonArray[0]),
                longitude: parseFloat(latlonArray[1]),
                latitudeDelta: _DEFAULT_LATITUDE_DELTA,
                longitudeDelta: _DEFAULT_LONGITUDE_DELTA,
              });
            }
            else{
              this.onRegionChange({
                latitude: _DEFAULT_LATITUDE,
                longitude: _DEFAULT_LONGITUDE,
                latitudeDelta: _DEFAULT_LATITUDE_DELTA,
                longitudeDelta: _DEFAULT_LONGITUDE_DELTA,
              });
            }
          } catch (error) {
            //Alert.alert("err2");
            // Error retrieving data
          }


        }
        

       
      }


      Capitalize(str){
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
      }
      

      renderSeparator = () => {  
          return (  
              <View  
                  style={{  
                      height: 1,  
                      width: "100%",  
                      backgroundColor: "#CCC",  
                  }}  
              />  
          );  
      };  
      //handling onPress action  
      getListViewItem = (item) => {  
          //Alert.alert(item.key);  
          this.props.navigation.navigate('Pantalla',{_comandos:item.comandos,_nombre:item.key})
      }  

      handlerLongClick = (_id,_name) => {
        //handler for Long Click
        //Alert.alert(' Button Long Pressed '+_id);


        // Works on both Android and iOS
        Alert.alert(
          'Remove device',
          'Are you sure to remove '+_name+' from the list?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Remove', onPress: () => this.eliminarRegistro(_id)},
          ],
          {cancelable: false},
        );


      };


      eliminarRegistro = (_id) => {




        AsyncStorage.getItem('DATAX', (err, result) => {  
          if(result!=null){
            
            let lista = result;
            var newData = "";
    
            var tmp1=lista.split('_||_');
            tmp1.forEach(function(item,index){
              
              var tmp2=item.split('_^_');
              var tmp3=tmp2[0].split('__');
              if(_id!=tmp3[1]){
                newData=newData+item+"_||_";
              }
    
            });
    
            newData=newData.substring(0,newData.length-4);

            //AQUI GUARDAR DE NUEVO EL ESTADO
            try {
              AsyncStorage.setItem('DATAX', newData, () => {
                  this.getData();
              });
            } catch (error) {
              // Error saving data
              //Alert.alert("1:"+error);
            }
            
            //Alert.alert(newData);
            //console.log(newData);
            //Alert.alert(_id);
          }
        });




        
      }
  

      

  render() {

    const { navigate } = this.props.navigation;

  
      return(
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>


           

            <Header
            title={"EMERGENCIA SANITARIA"}
            leftRender = {()=>{}}
            rightRender = {()=>{}}>
          </Header>

          <View style={{flex:6,backgroundColor:'#FFFFFF',width: win.width}}>



          




          <MapView style={{flex:1}}
            region={this.state.region}
            onRegionChange={this.onRegionChange}>

              
              {this.state.dataList.map((host, i) => {
                if (host.lat && host.lon) {
                  console.log("TEST", host.lat);
                return(<Marker
                    key={i}
                    coordinate={{
                      latitude: host.lat,
                      longitude: host.lon
                    }}
                    title={host.title}
                    description={host.desc}
                    pinColor={host.color}
                    //onPress={() => Alert.alert('0')} 
                  />)
                }
              })}


          </MapView>

          <View style={{flex:1,height:70,width:win.width,position: 'absolute',left:0,top:0,backgroundColor:'#FFFFFF',padding:15,flexDirection:'column'}}>

              <View style={{flexDirection:'row'}}>
                  <View style={{borderRadius:70,marginTop:4,width:10,height:10,marginLeft:10,backgroundColor:'#FF0000'}}></View>
                  <Text style={{color:'#FF0000',marginLeft:5}}>{("Emergencia COVID-19").toUpperCase()}</Text>


                  <View style={{borderRadius:70,marginTop:4,width:10,height:10,marginLeft:10,backgroundColor:'#0000FF'}}></View>
                  <Text style={{color:'#0000FF',marginLeft:5}}>{("Necesita ayuda").toUpperCase()}</Text>
              </View>



              <View style={{flexDirection:'row',marginTop:6}}>
                <View style={{borderRadius:70,marginTop:4,width:10,height:10,marginLeft:10,backgroundColor:'#008080'}}></View>
                <Text style={{color:'#008080',marginLeft:5}}>{("Necesita respirador").toUpperCase()}</Text>
              </View>

          


          

          
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
  item: {  
      
   /* height: 44,  */
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

  headerLogo:{
    resizeMode: 'contain',
    alignSelf: 'stretch',
    //width: win.width,    

    marginTop:10,
    height:30,
    ...Platform.select({
      ios: {
        marginBottom: 0,
        alignItems:'flex-end'
      },
      android: {
        marginBottom:0,
      },
    }),
  },

  headerLogoIcon:{
    resizeMode: 'contain',
    marginTop:10,
    //width: win.width,
    height:30},

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
  }

});


