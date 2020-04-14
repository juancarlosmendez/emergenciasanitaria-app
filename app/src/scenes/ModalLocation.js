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
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlacesInput from 'react-native-places-input';


import Header from '../components/Header';

const _DEFAULT_LATITUDE=-2.187602;
const _DEFAULT_LONGITUDE=-79.928822;
const _DEFAULT_LATITUDE_DELTA=0.0922;
const _DEFAULT_LONGITUDE_DELTA=0.0421;



export default class Modal extends Component {

  
  constructor(props) { 
    super(props);    
    this.state = {
      isLoading: true,
      placeDescription:'',
      region: {
        latitude: _DEFAULT_LATITUDE,
        longitude: _DEFAULT_LONGITUDE,
        latitudeDelta: _DEFAULT_LATITUDE_DELTA,
        longitudeDelta: _DEFAULT_LONGITUDE_DELTA,
      },


    }    
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);    
  }

  //not used
  notifyChangeInputPlaces = (loc) =>{
    this.onRegionChange({
      latitude:loc.lat,
      longitude:loc.lng,
    });
  }


  onRegionChange = (_region)  =>{
    this.setState({
      region: _region,
    }, function(){
    });
  }

  selectLocation = () => {

  }

  render() {    
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;   
    return (  
      <View style={{flex: 1}}>
       

        <Header
            title={"UBICACION"}
            leftRender = {()=>(
              <Icon2 name="ios-arrow-back" size={30} color="#EEEEEE" style={{marginTop:4,marginRight:12,marginLeft:12,paddingBottom:8}}
              onPress={() => this.props.navigation.goBack()} />  
            )}
            rightRender = {()=>{}}
            >
          </Header>
    


        <View style={{flex:1,width:win.witdh,padding:0,backgroundColor:'#00ff00'}} >

            <PlacesInput
                googleApiKey={'AIzaSyDtZYBoUMHc8qdIflZ2_Fr-fq4oofmJt5k'}
                placeHolder={"Buscar direccion o lugar"}
                language={"es-EC"}
                onSelect={place => {
                    //this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng'))
                    console.log(place);

                    this.setState({
                      placeDescription: place.result.formatted_address,
                    }, function(){
                    });
                    
                    this.onRegionChange({
                      latitude:place.result.geometry.location.lat,
                      longitude:place.result.geometry.location.lng
                    });              
                }}
                //iconResult={<Ionicons name="md-pin" size={25} style={styles.placeIcon}/>}
            />
            <MapView style={{flex:1}}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}>
              <Marker coordinate={this.state.region}></Marker>
              <MapView.Circle
                key = { "" }
                center = { this.state.region }
                radius = { 500 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
                />
            </MapView>            
            <TouchableOpacity style={styles.buttonAddLocation} onPress={() => { 
                this.selectLocation();
                //goBack();
                  this.props.navigation.state.params.updateData_fromCHild({selected_region:this.state.region,selected_placeDescription:this.state.placeDescription});
                  this.props.navigation.goBack();
                }}>
                <Text style={styles.buttonAddLocationText}>ESCOGER ESTA UBICACION</Text>
            </TouchableOpacity>
                
        </View>
      </View>        
    );    
  }
}


const windowSize = Dimensions.get('window');
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;

        


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
  formulario_input2:{
    height: 45,
    fontSize:16,
    paddingLeft:20,
    paddingRight:20,
    borderBottomColor:'#DDD',
    borderBottomWidth:1,   
    paddingBottom:5 
  },

  buttonAddLocation:{
    width:win.width-win.width/4,
    //height:80,
    marginLeft:win.width/8,
    padding:20,
    backgroundColor:'#FFFFFF',
    position:'absolute',
    bottom:50,
    backgroundColor:'#293A4E',
    borderRadius: 100,
  },
  buttonAddLocationText:{
    textAlign:'center',
    fontSize:15,
    color:'#FFFFFF',
    fontWeight:'bold'
  }


});
