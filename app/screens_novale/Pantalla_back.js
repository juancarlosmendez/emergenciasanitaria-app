import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text, Dimensions, Image,
    View, YellowBox, AsyncStorage, ActivityIndicator, Alert, ScrollView,BackHandler,
    Platform,TextInput,Modal
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class Pantalla extends Component {


    //const { navigate, state: { params } } = this.props.navigation;


    webView = {
        canGoBack: true,
        ref: null,
      }

/*
    constructor(props) {

        super(props);

        this.state = {

            isLoading: false,
            info: ""

        }

        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

    }

*/
/*
    onAndroidBackPress = () => {
        if (this.webView.canGoBack && this.webView.ref) {
          this.webView.ref.goBack();
          return true;
        }
        return false;
      }
    */
 
/*
    componentDidMount () {

        //alert(this.props.navigation.state.params.user);  //PARAMETRO DEL DEEP LIKNK
      }


      componentWillMount() {
        if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
        }
      }
    
      componentWillUnmount() {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress');
        }
      }
*/
/*
constructor(props, ctx) {
  super(props, ctx);
  this.state = { visible: false };
}*/

//let jsCode = "setTimeout(function(){document.querySelector('#txt_username').value = 'juank';},5000);";
jsCodeLogin = "document.getElementsByTagName('input')[0].value='admin';document.getElementsByTagName('input')[1].value='Admin123';document.getElementById('formSubmitButton').click();";





constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();

    this.state = {
      visible: false,
      actual_url:"",
      temp_url:"",
      home_url:"https://157.100.21.142:8080/login.html",
      js_at_loaded:'',
      list_commands:null,
      list_commands_cursor:-1
  }
}

componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({
      actual_url:this.state.home_url
    },null);


    setTimeout(() => {
      //this.setState({timePassed: true})
      this.goHome("LG_BUILDING_FFFF");
    }, 1000)

    


}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton = ()=>{
    Alert.alert(0);
   this.WEBVIEW_REF.current.goBack();
   return true;
}

/*
====================================================
este evento onNavigationStateChange hace que no se pueda ir al inicio porque no deja setear el state de actual_url


*/


onNavigationStateChange(navState) {

  /*
  if(this.state.temp_url!="" && this.state.temp_url!=navState.url){

  }*/
  this.setState({
    canGoBack: navState.canGoBack,
    actual_url:navState.url
  });
}


configHandler = ()=>{
  
  
}





deleteHandler = ()=>{
  
  
}


goHome = (_projectToLoad) =>{

if(_projectToLoad!=null){

  this.setState({
    list_commands:["setTimeout(function(){document.getElementsByTagName('input')[0].value='admin';document.getElementsByTagName('input')[1].value='Admin123';document.getElementById('formSubmitButton').click();},1000);","setTimeout(function(){ "+'window.location = "' + "https://157.100.21.142:8080/eclypse/envysion/viewer.html?proj="+_projectToLoad+"#mode=edit" + '"'+" },1000);"],
    list_commands_cursor:0
  },function(){
    this.WEBVIEW_REF.current.injectJavaScript('window.location = "' + this.state.home_url + '"');
  });
}
else{
  this.setState({
    list_commands:["setTimeout(function(){document.getElementsByTagName('input')[0].value='admin';document.getElementsByTagName('input')[1].value='Admin123';document.getElementById('formSubmitButton').click();},1000);"],
    list_commands_cursor:0
  },function(){
    this.WEBVIEW_REF.current.injectJavaScript('window.location = "' + this.state.home_url + '"');
  });
}



  
  
  


  //this.state.list_commands[this.state.list_commands_cursor]



/*

 this.setState({
  js_at_loaded: "setTimeout(function(){document.getElementsByTagName('input')[0].value='admin';document.getElementsByTagName('input')[1].value='Admin123';document.getElementById('formSubmitButton').click();},1000);"
});
*/
 
  
  //this.WEBVIEW_REF.current.injectJavaScript("document.addEventListener('DOMContentLoaded', function(){alert('ready')}, false);");

  //this.WEBVIEW_REF.current.injectJavaScript("window.addEventListener('load', function(){alert('ready')}, false );");
  //this.WEBVIEW_REF.current.injectJavaScript("alert('ready');");
  
  
  //setTimeout(() => {
    //this.setState({timePassed: true})
    //this.WEBVIEW_REF.current.injectJavaScript(this.jsCodeLogin);
    //
  //}, 3000);

  //if(_projectToLoad!=null){
    //https://157.100.21.142:8080/eclypse/envysion/viewer.html?proj=LG_BUILDING_FFFF#mode=edit
   // setTimeout(() => {
      //this.setState({timePassed: true})
      //this.WEBVIEW_REF.current.injectJavaScript('window.location = "' + "https://157.100.21.142:8080/eclypse/envysion/viewer.html?proj="+_projectToLoad+"#mode=edit" + '"');
   // }, 4500);
  //}




}




    render() {
      

      
    const { navigate } = this.props.navigation;   

      
            return (

              <MenuProvider style={{flexDirection: 'column', padding: 0}}>
              <View style={{flex:1}} >
                  <View style={{height:60,backgroundColor:'#EEEEEE',flexDirection: 'row'}}>
                    <Icon name="chevron-left" size={28} color="#575757" style={{marginTop:16,marginRight:12,marginLeft:12}}
                    /*
                    onIconClicked={this.props.navigation.goBack()}
                    */
                    />
                    <TextInput
                      style={{ flex:1,height: 37, borderColor: '#AAAAAA', borderWidth: 1,marginTop:11,backgroundColor:'#FFFFFF' }}
                      //onChangeText={text => onChangeText(text)}
                      value={this.state.actual_url}
                    />                    
                    

                    <Menu onSelect={(value) => {
                      if(value==1){

                        /*
                        this.setState({
                          actual_url:this.state.home_url
                        },null);

                        const redirectTo = 'window.location = "' + this.state.actual_url + '"';
                        this.WEBVIEW_REF.current.injectJavaScript(redirectTo);
                        */
                       this.goHome(null);
                        
                      }else if(value==2){
                        alert(`Selected number: ${value}`); 
                      }

                      //this.webref.injectJavaScript(run);  inject javascript

                      
                      
                      }}>
                      <MenuTrigger><Icon name="ellipsis-v" size={28} color="#575757" style={{marginTop:15,marginRight:18,marginLeft:18}}/></MenuTrigger>                      
                      <MenuOptions>
                        <MenuOption value={1} text="IR A INICIO">
                        </MenuOption>
                        <MenuOption value={2} text="OPCIONES">
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                                    

                  </View>

                  <WebView
                    //source={{uri: this.state.actual_url}}
                    originWhitelist={["*"]}
                    ignoreSslError={true} 
                    //style={{flex:1,marginTop: 0,padding:6,width:300,height:300}} 
                    domStorageEnabled={true}
                    //style={{flex:1,width: Dimensions.get('window').width-60,height:300,marginTop: 60,padding:0}}
                    style={{flex:1,margin: 0,padding:0}}
                    renderLoading={this.ActivityIndicatorLoadingView} 
                    startInLoadingState={true} 
                    scrollEnabled={true}
                    //injectedJavaScript={jsCode}
                    javaScriptEnabledAndroid={true}
                    //injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                    //scalesPageToFit={false}
                    onError={()=>{
                      //goBack();
                      Alert.alert("Digitickets","Sin conexión a internet");
                    }}
                    //renderError={() => { return <View><Text>Sin conexión a internet</Text></View> }}
                    onMessage={(event)=>{
                      //navigate('PaymentProxy', { id: 4 })
                    }}
                    ref={this.WEBVIEW_REF}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}

                    onLoadEnd={syntheticEvent => {
                      // update component to be aware of loading status
                      //const { nativeEvent } = syntheticEvent;
                      //this.isLoading = nativeEvent.loading;
                      //Alert.alert('readeyxxxx');
                      //this.WEBVIEW_REF.current.injectJavaScript("alert('readyx');");

                      if(this.state.list_commands!=null){
                        if(this.state.list_commands[this.state.list_commands_cursor]!=null && this.state.list_commands[this.state.list_commands_cursor]!=undefined){
                          //Alert.alert(this.state.list_commands[this.state.list_commands_cursor]);
                          let tmp=this.state.list_commands[this.state.list_commands_cursor];
                          this.WEBVIEW_REF.current.injectJavaScript(tmp);
                          this.setState({
                            list_commands_cursor: this.state.list_commands_cursor+1
                          });
                        }                        
                      }

                      //this.WEBVIEW_REF.current.injectJavaScript(this.state.js_at_loaded);
                      
                    }}
                  />
              </View>
                
      </MenuProvider>

            );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        marginVertical: 20,
    },
});
