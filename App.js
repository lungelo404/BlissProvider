import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).'])
  
import NavigationService from './src/navigationRef';

   

import homeScreen from "./src/screens/home";
import ordersScreen from "./src/screens/orders";
import accountScreen from "./src/screens/account";
import scan from "./src/screens/scan";
import login from './src/screens/login';
import otp from "./src/screens/otp";
import signUp from "./src/screens/signUp";

import Sidebar from "./src/components/sidebar";

import {LocationProvider} from "./src/context/locationContext";
import {AuthProvider} from "./src/context/authContext";

 import ResolveAuth from "./src/screens/resolveAuth";
 
const switchNavigator = createSwitchNavigator({
   resolve:ResolveAuth, 
   loginFlow:createStackNavigator({  
      login:login,
      otp:otp,
      signUp:signUp 
   }),
   mainFlow:createDrawerNavigator({
     mainFlowInner:createMaterialBottomTabNavigator({
       Home:homeScreen,
       myOrders:ordersScreen,
       qr:scan
     },{
      initialRouteName: 'Home',
      activeColor: '#fff',
      inactiveColor: '#d7d3ba',
      barStyle: { backgroundColor: '#68823b' },
      backBehavior:'order',
     })
   },{   
     contentComponent:props=><Sidebar {...props} />
   }) 
}); 

const App = createAppContainer(switchNavigator);
  

export default ()=>{
  return (
    <AuthProvider>
       <LocationProvider>
          <App ref={navigatorRef=>{NavigationService.setTopLevelNavigator(navigatorRef)}} /> 
        </LocationProvider>
    </AuthProvider> 
  )
}
