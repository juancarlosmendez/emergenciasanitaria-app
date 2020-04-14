/*
  NOT USED 
*/
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../scenes/Home';
//import AboutScreen from '_scenes/about';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
  },
  /*About: {
    screen: AboutScreen,
  },*/
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;