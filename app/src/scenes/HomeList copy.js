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

import CompleteFlatList from 'react-native-complete-flatlist';
import GLOBALS from '../config/Globals.js';

//PARA ESTE PAQUETE ES NECESARIO TENER INSTALADO EN NPM EL SIGUIENTE PAQUETE:
//@react-native-community/viewpager
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";


export default class HomeList extends Component {


    
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

        
      datSourceTabs:null,
      dataSourceLista:null,

      dataSourceTickets:null,
      bookmarks:'',
      dataSourceFechasTabs:null,



      }
    
      YellowBox.ignoreWarnings([
       'Warning: componentWillMount is deprecated',
       'Warning: componentWillReceiveProps is deprecated',
     ]);
    
    }




    webApiCallFechasTabs=(_callBack)=>{

      return fetch('https://lynx-server.com/emergencia/tabs.json')
      //return fetch('https://www.pentaxcongress.com/services/getCronogramasFechas.php?lan=0&eventoid=6')
             .then((response) => response.json())
             .then((responseJson) => {
               this.setState({
                 isLoading: false,
                 datSourceTabs: responseJson.data,
               },_callBack);
               AsyncStorage.setItem('CRONOGRAMA_LIST_FECHAS_', JSON.stringify(responseJson), () => {});   
               
               //here
               responseJson.data.map(this.requestList);

             })
             .catch((error) => {
               AsyncStorage.getItem('CRONOGRAMA_LIST_FECHAS_', (err, result) => {                
                  this.setState({
                    isLoading: false,
                    datSourceTabs:JSON.parse(result),
                  }, _callBack);
                });
              return error;
             }); 
     }

  requestList = () => {
    /*
      const response = await fetch('https://api.com/values/1');
      const json = await response.json();
      console.log(json);

*/
      fetch('https://lynx-server.com/emergencia/lista1.json')
           //return fetch('https://www.pentaxcongress.com/services/getCronogramasFechas.php?lan=0&eventoid=6')
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({
                      //isLoading: false,
                      dataSourceLista: responseJson.data,
                    },null);
                    AsyncStorage.setItem('CRONOGRAMA_LIST_FECHAS_lista1', JSON.stringify(responseJson), () => {});           
                  })
                  .catch((error) => {
                    AsyncStorage.getItem('CRONOGRAMA_LIST_FECHAS_lista1', (err, result) => {                
                       this.setState({
                        // isLoading: false,
                         dataSourceLista:JSON.parse(result),
                       }, null);
                     });
                  }); 
  }

     getData=()=>{
      //this.callAfterInitsLanguage(function(){
        // this.callAfterInitsBookmark(function(){
           this.webApiCallFechasTabs(function(){
             //this.getData2();
           });
           //this.requestList();

           
     
       //  });
      //});        
    }  




     cell = (data, index) => {  
      return (
          <View style={styles.listItem}>   
            <TouchableOpacity style={styles.listItemTouchable} onPress={() => this.props.navigation.navigate('ScheduleItem', { 
              passedEventID:1,
              passedID:data.id,
              passedFecha: data.fecha,
              passedNombre: data.nombre,
              passedModulo: data.modulo,
              passedModuloID: data.id_modulo,
              passedContenido: data.contenido,
              passedHoraInicio: data.hora_inicio,
              passedHoraFin: data.hora_fin})}>              
                  <View style={styles.listItemDate}>
                    <Text style={styles.listItemDateYear}>{data.fecha_ano}</Text>
                    <Text style={styles.listItemDateDay} includeFontPadding={false}>{data.fecha_dia}</Text>
                    <Text style={styles.listItemDateMonth}>{data.fecha_mes}</Text>
                  </View>
                  <View style={styles.listItemDetails}>                
                    <Text style={styles.listItemDetailsTitle}>{data.nombre}</Text>
                    <Text style={styles.listItemDetailsDescription}>{GLOBALS.STRING_RESOURCES.MODULO[this.state.lan]}: {data.modulo}</Text>
                    <Text style={styles.listItemDetailsDescription}>{GLOBALS.STRING_RESOURCES.SALON[this.state.lan]}: {data.salon}</Text>
                    <Text style={styles.listItemDetailsDescription}>{data.hora_inicio}{" - "}{data.hora_fin}</Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemTouchableArrow} 
                onPress={() => 
                    /*this.toggleBookMark('BOOKMARK_SCHEDULE_'+1,data.id,function(){
                        this.webApiCallFechasTabs(this.props.navigation.state.params.eventID,this.state.lan);
                    })
                    */
                   Alert.alert("tap")
                }>        
                <Icon
                  //name={this.getIconBookmark(this.state.bookmarks,data.id)}
                  size={22}
                  style={styles.listIitemStar}
                />
            </TouchableOpacity>         
          </View>             
        );
    }
  
    createList = () =>{

      //this.requestList();
     

      if(this.state.dataSourceLista==null){
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >               
                <ActivityIndicator size="small" />
            </View>
  
        );
      }
      else{
        return(
          <CompleteFlatList
                placeholder={GLOBALS.STRING_RESOURCES.BUSQUEDA[this.state.lan]+'...'}
                searchKey={['nombre', 'salon', 'modulo']}
                highlightColor="yellow"

                pullToRefreshCallback={()=>{
                  //this.getData2(); 
                  //this.getData();
                  //Alert.alert("refrescar");
                }}

                data={this.state.dataSourceLista}
                ref={c => this.completeFlatList = c}
                renderSeparator={null}
                renderItem={this.cell}
                //onEndReached={() => console.log("reach end")}
                onEndReachedThreshold={0}
                  //Message to show for the Empty list
              />
        );
      }
    }
  
   
  
    createImage = (image) => {  
      if(this.state.datSourceTabs==null){
        return(
          
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}  tabLabel={{label: image.fecha, badge: 3}} label={image.fecha}>
               
                <ActivityIndicator size="small" />
            </View>
  
          
        );
      }
      else{
        if(this.state.datSourceTabs.length>0){
          return (


            <View style={styles.container}  tabLabel={{label: image.fecha, badge: 2}} label={image.fecha}>
              <NavigationEvents
                onDidFocus={payload => this.getData() }
              />
              
              {this.createList()}
              


              
            </View>
          );
        }
        else{  //vacio
          return(
              <View style={styles.container}  tabLabel={{label: image.fecha, badge: 3}} label={image.fecha}>
             
              <Text style={{ textAlign: 'center',color:'#575757',fontSize:14,marginTop:15 }}>{GLOBALS.STRING_RESOURCES.NODATAAVAILABLE[this.state.lan]}</Text>
            </View>
          );
        }
      }
    }
  
    createImages = (images) => {
      return images.map(this.createImage);
    }
  
   
  
   




      componentDidMount () {
        console.disableYellowBox = true;

        

       
      }





      

  render() {


    const { navigate } = this.props.navigation;




    if(this.state.datSourceTabs==null){
      return(



        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

<NavigationEvents
                onDidFocus={payload => this.getData() }
              />

            <View style={styles.header}>
                  <View style={styles.headerAction}>  
                  </View>
                  <View style={styles.heaaderTitle}>
                    <Image
                        style={styles.headerLogoIcon}
                        source={require('../../assets/logocontrol.png')}
                      />
                  </View>
                  <View style={styles.headerAction}>
                      <Icon2 name="ios-add" size={35} color="#EEEEEE"
                          onPress={() => {
                              //Alert.alert('1');
                              this.props.navigation.navigate('Modal');
                            }
                        }/>
                  </View>
              </View>
            <View style={{flex:6,backgroundColor:'#FFFFFF',width: win.width}}>


          
            <ActivityIndicator size="small" />
            </View>
        </View>

      
    );
    }
    else{
    return (
        <View style={[styles.container, {paddingTop: 5}]}>

            <View style={styles.header}>
                  <View style={styles.headerAction}>  
                  </View>
                  <View style={styles.heaaderTitle}>
                    <Image
                        style={styles.headerLogoIcon}
                        source={require('../../assets/logocontrol.png')}
                      />
                  </View>
                  <View style={styles.headerAction}>
                      <Icon2 name="ios-add" size={35} color="#EEEEEE"
                          onPress={() => {
                              //Alert.alert('1');
                              this.props.navigation.navigate('Modal');
                            }
                        }/>
                  </View>
              </View>
            <View style={{flex:6,backgroundColor:'#FFFFFF',width: win.width}}>


              <NavigationEvents
                  // onDidFocus={payload => this.getData() }
                  />
              <ScrollableTabView
                  tabBarActiveTextColor={GLOBALS.COLOR.PRIMARY_COLOR}
                  renderTabBar={() => <TabBar tabBarTextStyle={{fontSize:16,paddingBottom:5,paddingLeft:8,paddingRight:8}} underlineColor={GLOBALS.COLOR.PRIMARY_COLOR} />}>

                  
                    {this.createImages(this.state.datSourceTabs)}


              </ScrollableTabView>

              </View>

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

