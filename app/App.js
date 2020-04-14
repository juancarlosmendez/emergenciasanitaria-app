import Home from './screens/Home';
import Pantalla from './screens/Pantalla';
import Modal from './screens/Modal';

import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: null,               // Hide the header    
      /*header:       
      (        
        <Header     
          displayBack = {false}  
          onPressBack={ () => { navigation.goBack(null) }} 
          onPressRight={ () => { navigation.navigate('Login') }} />  
      )*/
    }),  
    
  },
  Pantalla: {
    screen: Pantalla,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: null,               // Hide the header    
      /*header:       
      (        
        <Header     
          displayBack = {false}  
          onPressBack={ () => { navigation.goBack(null) }} 
          onPressRight={ () => { navigation.navigate('Login') }} />  
      )*/
    }),  
    
  },
});




const RootNavigator = createStackNavigator(
  {
    AppNavigator: {
      screen: AppNavigator,
    },
    Modal: {
      screen: Modal
    },
  }, {
    // In modal mode screen slides up from the bottom
    mode: 'modal',
    // No headers for modals. Otherwise we'd have two headers on the screen, one for stack, one for modal.
    headerMode: 'none',
  });

export default createAppContainer(RootNavigator);