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

export default class Home extends Component {

   
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
        //this.webcall();
        this.getData();
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

    if(this.state.isLoading)
    {
      return(
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>


        <View style={styles.header}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

              </View>
              <View style={{flex:6,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <Image
                    style={{
                      resizeMode: 'contain',
                      alignSelf: 'stretch',
                      //width: win.width,                      
                      marginTop:10,
                      height:30}}
                    source={require('../assets/logocontrol.png')}
                  />
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                  <Icon2 name="ios-add" size={35} color="#EEEEEE"
                      onPress={() => {
                          //Alert.alert('0');
                          this.props.navigation.navigate('Modal');
                        }
                    }
                      
                       />
              </View>
              

          </View>
          <View style={{flex:6,backgroundColor:'#FFFFFF',width: win.width}}>
            <ActivityIndicator size="large" color="#787878" style={{marginTop:200}}/>
          </View>
        </View>
      );
      
    }
    else{


      if(this.state.dataIsEmpty){
        return(
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}> 
              <NavigationEvents
                      onWillFocus={payload => this.getData()}                    
                      //onWillBlur={payload => console.log('will blur',payload)}
                      //onDidBlur={payload => console.log('did blur',payload)}
                    />
              <View style={{height:61,width:win.witdh,justifyContent: 'center', alignItems: 'center',flexDirection:'row',backgroundColor:'#293A4E',
         
              
              }}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
  
                </View>
                <View style={{flex:6,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                  <Image
                      style={{
                        resizeMode: 'contain',
                        alignSelf: 'stretch',
                        marginTop:10,
                        //width: win.width,
                        height:30}}
                      source={require('../assets/logocontrol.png')}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Icon2 name="ios-add" size={35} color="#EEEEEE"
                        onPress={() => {
                            //Alert.alert('1');
                            this.props.navigation.navigate('Modal');
                          }
                      }
                        
                         />
                </View>
                
  
            </View>


            <View style={{flex:1,backgroundColor:'#E2E2E2',width: win.width,justifyContent:'center',alignItems:'center'}}>
         

            <TouchableOpacity 
                        onPress={() => {
                          //Alert.alert('1');
                          this.props.navigation.navigate('Modal');
                        }}    
                        
                        style={{flex:1,justifyContent:'center',alignItems:'center'}}
                        >

                  <Image
                      style={{
                        width: 170,
                        height: 170
                      }}
                      resizeMode={"contain"}
                      resizeMethod={"scale"}
                      source={require('../assets/network.png')}
                    />
                <Text style={{fontSize:26,color:'#608EA8',width:190,fontWeight:'bold',textAlign:'center',marginTop:9}}>ADD DEVICE  </Text>
                <Text style={{fontSize:14,color:'#608EA8',width:170,textAlign:'center',marginTop:4}}>Add ECLYPSE devices to your personal network.</Text>

          </TouchableOpacity>
           
              

             
            </View>

          </View>
        );
      }
      else{
        return (
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>  
              <NavigationEvents
                      onWillFocus={payload => this.getData()}                    
                      //onWillBlur={payload => console.log('will blur',payload)}
                      //onDidBlur={payload => console.log('did blur',payload)}
                    />
  
            <View style={{height:61,width:win.witdh,justifyContent: 'center', alignItems: 'center',flexDirection:'row',backgroundColor:'#293A4E',
         
          
          }}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
  
                </View>
                <View style={{flex:6,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                  <Image
                      style={{
                        resizeMode: 'contain',
                        alignSelf: 'stretch',
                        marginTop:10,
                        //width: win.width,
                        height:30}}
                      source={require('../assets/logocontrol.png')}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Icon2 name="ios-add" size={35} color="#EEEEEE"
                        onPress={() => {
                            //Alert.alert('1');
                            this.props.navigation.navigate('Modal');
                          }
                      }
                        
                         />
                </View>
                
  
            </View>
  
              <View style={{flex:1,backgroundColor:'#E2E2E2',width: win.width}}>
              <FlatList
                      /*
                      data={[  
                          {key: 'Inicio'},{key: 'LG Building'}, {key: 'Demo'}
                      ]}
                      */
                     data={this.state.data}
                      renderItem={({item}) =>  
  
  
                      <TouchableOpacity 
                        onLongPress={()=>this.handlerLongClick(item.id,item.key)}
                        onPress={this.getListViewItem.bind(this, item)}
                        
                        >
                          <View 
                          
                          style={{flex:1,justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row',height:80,padding:15,paddingTop:6}}>
                            <Image
                                style={{
                                  flex:1,
                                  marginTop:8,
                                  alignSelf: 'stretch',
                                  resizeMode: "contain",
                                  width: 50,
                                  height:50}}
                                source={require('../assets/node.png')}
                              /> 
                              <View style={{flex:4,justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                                <View style={{flex:3}}>
                                  <Text style={{paddingLeft: 10,paddingTop:10,paddingBottom:0, fontSize: 22, color:'#000000'}}  
                                  >{item.key}</Text>
                                  <Text style={{paddingLeft:10,paddingTop:0, fontSize:13, color:'#777777'}}>Device</Text>
                                </View>
                                <View style={{flex:1,justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                    <Icon name="chevron-right" size={20} color="#AAA" style={{marginTop:16,marginRight:12,marginLeft:12}} />
                                </View>
                                                           
                              </View>                            
                          </View>   
                          </TouchableOpacity>                     
                      }  
  
                      ItemSeparatorComponent = { this.renderSeparator }
                  />  
                
              </View>
          
           </View>        
         ); 
      }




      
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
