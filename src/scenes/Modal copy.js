import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
   FlatList, Alert,WebView,Image, YellowBox,ActivityIndicator
} from 'react-native';
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';



import { View, Text, Button } from 'native-base';

//import GenerateForm from 'react-native-form-builder';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';




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
      }
    
      YellowBox.ignoreWarnings([
       'Warning: componentWillMount is deprecated',
       'Warning: componentWillReceiveProps is deprecated',
     ]);
    
    }


    guardar() {

      const formValues = this.formGenerator.getValues();
      

      
      if(formValues.txt_nombre!="" && formValues.txt_url!="" && formValues.txt_puerto!="" && formValues.txt_username!="" && formValues.txt_password!=""){
        console.log('FORM VALUES', formValues);
        console.log('-----',formValues.txt_nombre);
  
        AsyncStorage.getItem('DATAX', (err, result) => {  
  
  
  
          if(result==null){
            result='[NEW_DEVICE]';
          }
  
            //console.log("JJJJJ");
            //console.log(Math.random().toString(16).slice(-4));
            let uniqueid = Math.random().toString(16).slice(-4);
            let res = result.replace("[NEW_DEVICE]",""+formValues.txt_nombre+"__"+uniqueid+"_^_setTimeout(function(){window.location='https:\/\/"+formValues.txt_url+":"+formValues.txt_puerto+"\/login.html';},1000);_|_setTimeout(function(){document.getElementsByTagName('input')[0].value='"+formValues.txt_username+"';document.getElementsByTagName('input')[1].value='"+formValues.txt_password+"';document.getElementById('formSubmitButton').click();},1000);_||_[NEW_DEVICE]");
            
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





      componentDidMount () {
        console.disableYellowBox = true;
        
      }


      Capitalize(str){
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
      }
      





  render() {

    const { navigate } = this.props.navigation;   
    
    return (  
        <View style={{flex: 1}}>  
     


            <View style={{height:61,width:win.witdh,justifyContent: 'center', alignItems: 'center',flexDirection:'row',backgroundColor:'#293A4E'}}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                      <Icon2 name="ios-arrow-back" size={30} color="#EEEEEE" style={{marginTop:4,marginRight:12,marginLeft:12}}
                      onPress={() => this.props.navigation.goBack()}
                      //  onIconClicked={this.props.navigation.goBack()}
                      //onIconClicked={this.props.navigator.pop}

                      
                      />   
                  </View>
                  <View style={{flex:6,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                   <Text style={{color:'#EEEEEE',fontSize:20,fontWeight:'bold'}}>NEW DEVIDE</Text>
                  </View>

                  <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Icon2 name="ios-checkmark" size={45} color="#53BA6A" style={{marginTop:4,marginRight:12,marginLeft:12}}
                      onPress={() => this.guardar()}
                      //  onIconClicked={this.props.navigation.goBack()}
                      //onIconClicked={this.props.navigator.pop}

                      
                      />  
                  </View>
                  

              </View>





           
           

     <View style={{width:win.witdh,padding:0}}>



        <View style={{width:win.witdh}}>
          
        <ScrollView contentContainerStyle={{flexGrow: 1,paddingLeft:0,paddingRight:0}}>
        <View style={{flex:1,height:50,backgroundColor:'#DEDEDE',textAlign:'center'}}>
            <Text style={{flex:1,textAlign:'left',color:'#575757',paddingLeft:25,paddingRight:25,paddingTop:8,paddingBottom:8}}>Enter the connection information for the new ECLYPSE device in your network</Text>
          </View>
          <View style={{flex:1,paddingBottom:100}}>
            
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
    fontSize: 20,
    marginVertical: 20,
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
