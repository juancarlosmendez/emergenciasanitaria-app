import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native';


export default class Header extends Component{
    render(){
        return(


            <View style={styles.header}>
            <View style={styles.headerAction}>
                {this.props.leftRender()}
            </View>
            <View style={styles.heaaderTitle}>
              <Text style={{color:'#EEEEEE',fontSize:20,fontWeight:'bold'}}>
                {this.props.title}</Text>
            </View>
            <View style={styles.headerAction}>
                {this.props.rightRender()}
            </View>
          </View>


        )
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
});