import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
//import AuthNavigator from './auth-navigator';

import HomeMap from '../scenes/HomeMap';
import HomeList from '../scenes/HomeList';
import Pantalla from '../scenes/Pantalla';
import Modal from '../scenes/Modal';
import ModalViewEmergency from '../scenes/ModalViewEmergency';
import ModalLocation from '../scenes/ModalLocation';


import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

const TabNavigator = createBottomTabNavigator({
  Modal: {
      screen: Modal, 
      navigationOptions: {
          tabBarLabel: 'Nueva Emergencia', 
          tabBarIcon: ({ tintColor }) => (
              <Icon name="plus-square" color={tintColor} size={25} />
          )
      }
  }, 
  HomeMap: {
      screen: HomeMap, 
      navigationOptions: {
          tabBarLabel: 'Ubicación actual', 
          tabBarIcon: ({ tintColor }) => (
              <Icon name="location-arrow" color={tintColor} size={25} />
          )
      }
  }, 
  HomeList: {
      screen: HomeList, 
      navigationOptions: {
          tabBarLabel: 'Emergencias', 
          tabBarIcon: ({ tintColor }) => (
              <Icon name="list" color={tintColor} size={20} />
          )
      }
  }
});

/*
const TabNavigatorConfig = {
  initialRouteName: 'HomeMap',
  header: null,
  headerMode: 'none',
};



const RouteConfigs = {
  Modal: {
    screen: Modal,
    navigationOptions: {
        tabBarLabel: 'Home', 
        tabBarIcon: ({ tintColor }) => (
            <Icon2 name="ios-home" color={tintColor} size={25} />
        )
    }
  },
    
  HomeMap: {
    screen: HomeMap,
    title:'fff'
  },
  HomeList: {
    screen: HomeList,
  },
};


const bottomTabNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
*/




const RootNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: TabNavigator,
    },
    Modal: {
      screen: Modal
    },
    ModalViewEmergency:{
      screen:ModalViewEmergency
    },
    ModalLocation: {
      screen: ModalLocation
    },
    Pantalla: {
      screen: Pantalla
    },
  }, {
    // In modal mode screen slides up from the bottom
    mode: 'modal',
    // No headers for modals. Otherwise we'd have two headers on the screen, one for stack, one for modal.
    headerMode: 'none',
  });

export default createAppContainer(RootNavigator);


//export default createAppContainer(RootNavigator);