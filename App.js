import React from 'react';
import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {LogBox} from 'react-native';


LogBox.ignoreLogs(['Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).'])
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito'; 
import NavigationService from './src/navigationRef';

   

import homeScreen from "./src/screens/home";
import ordersScreen from "./src/screens/orders";
import accountScreen from "./src/screens/account";
import scan from "./src/screens/scan";
import login from './src/screens/login';
import otp from "./src/screens/otp";
import signUp from "./src/screens/signUp";
import uploadProfile from "./src/screens/uploadPic";
import  profileDetail from "./src/screens/profileDetail";
import Banking from "./src/screens/Banking";
import Skills from "./src/screens/Skill";
import Subcategory from "./src/screens/subCategory";
import Wallet from "./src/screens/Wallet";
import myEarnings from "./src/screens/myEarning";
import sos from "./src/screens/sos";
import shop from "./src/screens/shop";
import TravelCharge from "./src/screens/travelCharge";
import Off from './src/screens/Off'; 
import Support from './src/screens/Support';
import Checkout from "./src/screens/Checkout";
import ProductDetail from "./src/screens/productDetails";
import Notifications from './src/screens/notifications';
import NotificationDetail from "./src/screens/notificationDetail";
import Contact from "./src/screens/contacts";
import Chat from "./src/screens/Chat";

import Sidebar from "./src/components/sidebar";
 
import {LocationProvider} from "./src/context/locationContext";
import {AuthProvider} from "./src/context/authContext";
import {ServiceProvider} from "./src/servicesProvider";
import {CartProvider} from './src/context/Cart';
import {StoreProvider} from './src/storeProvider';

import ResolveAuth from "./src/screens/resolveAuth";
import LoadWallets from './src/screens/loadWallets';
import PrivacyPolicy from './src/screens/privacyPolicy';
import deposit from './src/screens/deposit';
import shopOrders from './src/screens/shopOrders';
import Portfolio from './src/screens/portfolio';
import BookingInfo from './src/screens/bookingInfo';
 
const switchNavigator = createSwitchNavigator({
   resolve:ResolveAuth, 
   loginFlow:createStackNavigator({  
      login:login,
      otp:otp, 
      signUp:signUp,
      uploadProfile:uploadProfile
   }),
   mainFlow:createDrawerNavigator({
     mainFlowInner:createMaterialBottomTabNavigator({
       Home:homeScreen,
       myOrders:ordersScreen,
       Orders:shopOrders,
       shop:shop,
       account:accountScreen
     },{
      initialRouteName: 'Home',
      activeColor: '#fff',
      inactiveColor: '#d7d3ba',
      barStyle: { backgroundColor: '#68823b' },
      backBehavior:'order',
     }),
     SidebarFlow:createStackNavigator({
      TravelCharge:TravelCharge,
      off:Off,
      support:Support, 
      productDetail:ProductDetail,
      Checkout:Checkout,
      LoadWallets:LoadWallets,
      Notifications:Notifications,
      NotificationDetail:NotificationDetail
    }),
    chatFlow:createStackNavigator({
      contacts:Contact,
      chat:Chat
    })
   },{   
     contentComponent:props=><Sidebar {...props} />
   }),
   detailsFlow:createStackNavigator({
      profileDetail:profileDetail,
      banking:Banking,
      skills:Skills,
      SubCategory:Subcategory,
      wallet:Wallet,
      deposit:deposit,
      myEarnings:myEarnings,
      sos:sos,
      privacy:PrivacyPolicy,
      portfolio:Portfolio
   }),
   bookinginfoFlow:createStackNavigator({
     bookingInfo:BookingInfo
   })
});
const App = createAppContainer(switchNavigator);
  

export default ()=>{
  return (
    <StoreProvider>
      <CartProvider>
        <ServiceProvider>
          <AuthProvider>
            <LocationProvider>
                <App ref={navigatorRef=>{NavigationService.setTopLevelNavigator(navigatorRef)}} /> 
              </LocationProvider>
          </AuthProvider> 
        </ServiceProvider>
        </CartProvider>
    </StoreProvider>
  )
}
