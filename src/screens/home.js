import React, {useContext, useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';

import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';

import Header from "../components/headers"; 
import Product from "../components/product";
import LocationContext from "../context/locationContext";    
import AuthContext from "../context/authContext";
import BookingDetails from "../components/bookingDetails";
import StoreContext from "../storeProvider";

import {NavigationEvents} from 'react-navigation';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import blissApi from '../api/blissApi';




Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });




const homeScreen = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation, setCoords, setAddress} = useContext(LocationContext);
    const {stateStore, getProducts} = useContext(StoreContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const {stateAuth, getUser} = useContext(AuthContext);
    const notificationListener = useRef();
    const responseListener = useRef();  


const registerForNotificationToken = async ()=>{
        let currentNotificationToken = stateAuth.userDetails.notificationToken;
        if(Constants.isDevice){
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if(existingStatus !== 'granted'){
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status
            }
            if(finalStatus !== 'granted'){
                alert("Please allow push notification inorder for you to recieve booking information on this device");
                return
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            if(token !== currentNotificationToken){
               const response =  await blissApi.get(`/set-token-for-provider/${stateAuth.userDetails._id}/this-token/${token}`);
            }else{
                console.log(currentNotificationToken);
            }
        }else{
            alert("Must use a physical device for Push notifications")
        }
        if(Platform.OS === 'android'){
            Notifications.setNotificationChannelAsync('default', {
                name:'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern:[0,250,250,250],
                lightColor:'#FF231F7C',
            })
        }
}




    useEffect(()=>{
        getProducts();
        setTimeout(function(){
            setLoader(true)
        },5000)
        if(addressObject.name === '...waiting'){
            (async ()=>{
                let {status} = await Location.requestPermissionsAsync();
                if(status !== 'granted'){
                    console.log('Permission to access locations was denied');
                    return
                }
                let geoCode = await Location.getCurrentPositionAsync({});
                setCoords(geoCode)
                const reverseGeoCodeParameters = {latitude:geoCode.coords.latitude, longitude:geoCode.coords.longitude}
                let reversedCode =  await Location.reverseGeocodeAsync(reverseGeoCodeParameters);
                updateLocation(geoCode.coords.latitude,geoCode.coords.longitude)
                setAddress(reversedCode);
            })(); 
        }
        registerForNotificationToken();
        notificationListener.current = Notifications.addNotificationReceivedListener(notification=>{
            getUser(stateAuth.userDetails._id);
            console.log('notification response comes here');
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response=>{
           getUser(stateAuth.userDetails._id);
           let type = response.notification.request.content.data.type;
           if(type === 'message'){
               navigation.navigate('Notifications');
           }
        });
        return ()=>{
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        }
    },[])



    const updateLocation = async (latitude, longitude)=>{
        try {
            await blissApi.post(`/update-location-provider-coords/${stateAuth.userDetails._id}/`,{latitude,longitude});
            console.log('done');
        } catch (err) {
            console.log(err);
        }
    }  
    if(fontsLoaded){
        return( 
            <View style={{flex:1}}>
                <StatusBar animated={true}  backgroundColor="grey" />   
                <Header navigation={navigation} title="Live tasks" /> 
                {stateAuth.userDetails.isAproved  && !stateAuth.userDetails.isSuspended?
                <View style={{flex:1,justifyContent:'center'}}>
                    <SkeletonPlaceholder>
                        <View style={{ alignItems: "center" }}>
                            <View style={{  }}> 
                               <View style={{ width: 340, height: 150, borderRadius: 4 }} />
                            </View>
                        </View>
                    </SkeletonPlaceholder>  
                       
                        <View style={{alignItems:'center',marginTop:15}}> 
                            <Text style={styles.waiting}>Waiting for bookings</Text>
                        </View>

                        <FontAwesome style={{position:'absolute', top:195, left:0, right:0, textAlign:'center'}} name="hourglass-1" size={55} color="grey" />
                 </View>

                :
                !stateAuth.userDetails.isSuspended?
                <View style={{marginHorizontal:15, marginTop:100}}>
                    <AntDesign style={{textAlign:'center'}} name="warning" size={80} color="grey" />
                    <Text style={styles.attentionHeader}>Not authourized!</Text>
                    <Text style={styles.please}>Please note that for you to start recieving bookings, you have to be approved. This is done by the admin after all verification processes have been completed</Text>
                    <View>
                        <View style={{flexDirection: 'row', marginHorizontal:30, marginTop:15}}>
                            <Text style={styles.key}>Application status: </Text>
                            <Text style={styles.value}>In review</Text>
                        </View>
  
                    </View>
                </View>
                :
                <View style={{marginHorizontal:15, marginTop:100}}>
                    <AntDesign style={{textAlign:'center'}} name="warning" size={80} color="grey" />
                    <Text style={styles.attentionHeader}>Account has been Suspended!</Text>
                    <Text style={styles.please}>Your account has been Suspended, please contact admin for clarification</Text>
                    <View>
                        <View style={{flexDirection: 'row', marginHorizontal:30, marginTop:15}}>
                            <Text style={styles.key}>Account status: </Text>
                            <Text style={{...styles.value, color:'red'}}>Suspended</Text>
                        </View>
  
                    </View>
                </View>
                

               }

            </View>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({
    please:{
        fontSize:10,
        textAlign:'center',
        color:'#bbb',
        fontFamily:'Nunito_400Regular',
    },
    key:{
        color:'orange',
        fontSize:13,
        fontFamily:'Nunito_400Regular',
    },
    value:{
     color:'#68823b',
     fontFamily:'Nunito_400Regular',
     fontSize:13
    },
    attentionHeader:{
        color:'orange',
        marginVertical:10,
        fontFamily:'Nunito_400Regular',
        fontSize:15,
        textAlign:'center'
    },  
    listContainer:{
        borderLeftWidth:2,
        borderRightWidth:2,
        borderLeftColor:'#ddd',
        borderRightColor:'#ddd',

    },
    waiting:{
        fontSize:16,
        color:'#8b8989',
        fontFamily:'Nunito_400Regular',
        textTransform:'uppercase'
    },
    bookingContainer:{
        marginHorizontal:15,
        marginVertical:20
    },
    headerContainer:{
        height:55,
        backgroundColor:'#ddd',
        justifyContent:'center'
    },
    newBookingHeader:{
        paddingHorizontal:10,
        fontSize:14,
        color:'black',
        fontFamily:'Nunito_600SemiBold',
        textTransform:'uppercase'
    },
    confirmationContainer:{
        flexDirection:'row',
        backgroundColor:'#68823b',
        justifyContent:'center',
        alignItems:'center'
    },
    left:{
        flex:3
    },
    right:{
        flex:3
    },
    reject:{
        textAlign:'center',
        color:'#e74311',
        fontFamily:'Nunito_300Light'
    },

    accept:{
        textAlign:'center',
        color:'white',
        fontFamily:'Nunito_300Light'
    },
    parent:{
        paddingVertical:10
    }


})

homeScreen.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        title:'Home',
        tabBarIcon:({tintColor})=><FontAwesome5 name="home" size={24} color={tintColor} />,
    }
}


export default homeScreen;