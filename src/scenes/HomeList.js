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
import SearchBar from 'react-native-search-bar';
import Header from '../components/Header';

import GLOBALS from '../config/Globals.js';



import { fetchDataAppApi } from '../functions/Networking';
import { getFromStorage,saveToStorage } from '../functions/Storage';

export default class HomeList extends Component {
    
  constructor(props) { 
    super(props);    
    this.state = {
      _isLoading:false,
      loading: false,
      isListEnd: false,
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      offset:-1,
      _tipoRegistro:[],
    }    
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);    
  }

  componentDidMount () {
    console.disableYellowBox = true;
    //this.loadCategories();
    this.loadMoreData();
  }

  loadMoreData = () => {

    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        fetchDataAppApi(
            GLOBALS.EMERGENCIES_API_LIST,
            {
              filter:"",
              offset:this.state.offset+1,
              order:'DESC'
            },
            (response) =>{
              try{
                var responseJson = JSON.parse(response);
                //if (responseJson.results.length > 0) {
                  //Successful response from the API Call
                  //this.offset = this.offset + 1;
                  //After the response increasing the offset for the next API call.
                  this.setState({
                    offset : this.state.offset+1,
                    serverData: [...this.state.serverData, ...responseJson],
                    //adding the new data with old one available
                    fetching_from_server: false,
                    //updating the loading state to false
                  });
                /*} else {
                  this.setState({
                    fetching_from_server: false,
                    isListEnd: true,
                  });
                }*/
                
              }
              catch(ex){
                console.log("ERR: "+ex);
                //this.setState({ _isLoading:false });
              }
            },
            (error) =>{}
          );
      });
    }


    
/*
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + this.state.offset)
          //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.results.length > 0) {
              //Successful response from the API Call
              //this.offset = this.offset + 1;
              //After the response increasing the offset for the next API call.
              this.setState({
                offset : this.state.offset+1,
                serverData: [...this.state.serverData, ...responseJson.results],
                //adding the new data with old one available
                fetching_from_server: false,
                //updating the loading state to false
              });
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    }*/
  }


  

  foo = () => {

  }


  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }



  render() {

    const searchBar = React.createRef();
    const { navigate } = this.props.navigation;
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>   


        <Header
            title={"EMERGENCIA SANITARIA"}
            leftRender = {()=>{}}
            rightRender = {()=>(
              <Icon2 name="ios-cog" size={28} color="#CCCCCC" style={{marginBottom:5,marginTop:0,marginRight:12,marginLeft:12}}
                onPress={() => Alert.alert('settings')}
                />  
          )}>
            >
          </Header>

         
            <View style={{flex:6,backgroundColor:'#FFFFFF',width: win.width}}>
              <SearchBar
                      ref="searchBar"
                      placeholder="Buscar dirección, ubicación o nombre"
                      onChangeText={this.foo()}
                      onSearchButtonPress={this.foo()}

                      onCancelButtonPress={this.foo()}
                      containerStyle={Platform.OS==="android"? {flex:1, justifyContent:'center', height:58}: {flex:1, justifyContent:'center', height:49} }
                      inputStyle={{height:37}}
                      />              
              <View style={styles.container}>
                {this.state.loading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <FlatList
                    style={{ width: '100%' }}
                    keyExtractor={(item, index) => index}
                    data={this.state.serverData}
                    onEndReached={() => this.loadMoreData()}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => (

                      <TouchableOpacity onPress={() => this.props.navigation.navigate('ModalViewEmergency', { 
                        //passedEventID:1,
                      })}>                        
                        <View style={{padding:10,flexDirection:'column'}}>                          
                          <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                              <View style={{borderRadius:70,marginTop:4,width:10,height:10,backgroundColor:item.color}}></View>
                            </View>
                            <Text style={{color:item.color,flex:19}}>{item.cat.toUpperCase()}</Text>
                          </View>
                          <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}></View>
                            <View style={{flex:19}}>
                              <Text style={{marginTop:4,marginBottom:0}}>
                                {item.comm}                        
                              </Text>
                              <View style={{flex:1,flexDirection:'row',marginBottom:5,marginTop:5}}>                      
                                <Icon name="map-marker" size={13} color="#333333" style={{marginTop:3,flex:1}}/>                          
                                <Text style={{color:'#333333,',flex:19}}>{item.addr} </Text>
                              </View>
                              <View style={{flex:1,flexDirection:'row'}}>                      
                                <Icon name="calendar" size={13} color="#333333" style={{marginTop:2,flex:1}}/>                         
                                <Text style={{color:'#333333,',flex:19}}>{item.fecha}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      

                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    //Adding Load More button as footer component
                  />
                )}
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
    backgroundColor:'#EEE',
    
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
        paddingBottom:5
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
  },




  item: {
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

