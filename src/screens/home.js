import React, {useContext, useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Platform, ToastAndroid} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import CountDown from 'react-native-countdown-component';
import io from "socket.io-client";

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
import axios from 'axios';




Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
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
    const [newBooking, setNewBooking] = useState([]);
    const [bookingExpired, setBookingExpired] = useState(false);
    const [socket, setSocket] = useState();
    const [accepted, setAccepted] = useState(false);

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
               getUser(stateAuth.userDetails._id);
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
                lightColor:'#68823b',
            })
        }
}




    useEffect(()=>{
        socketConnect();
        getProducts();
        findNewBooking();
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
            findNewBookingTwo();
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response=>{
           getUser(stateAuth.userDetails._id);
           findNewBookingTwo();
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

    const socketConnect = ()=>{ 
        const Socket = io(blissApi.defaults.baseURL,{query:{id:stateAuth.userDetails._id}});
        console.log(Socket.connected);
        setSocket(Socket);
        Socket.on('connect', ()=>{
            console.log("has the socket been connected?", Socket.connected);
        })   
    }  
    const findNewBookingTwo  = async ()=>{
        try {
            const response = await blissApi.get(`/get-new-booking/${stateAuth.userDetails._id}/for-students`); 
            const confirmationLength =  response.data.length;
            if(confirmationLength === 0){
                setNewBooking(response.data);
                ToastAndroid.show('The booking has expired', ToastAndroid.SHORT);
                return
            }
            setNewBooking(response.data);
        } catch (err) {
            console.log(err);   
        }
    } 


    const findNewBooking = async ()=>{
        try {
            const response = await blissApi.get(`/get-new-booking/${stateAuth.userDetails._id}/for-students`); 
            if(response.data.length >= 1 && response.data[0].Accepted === false){
                setNewBooking(response.data);
                return
            }
                // ToastAndroid.show("Booking has expired", ToastAndroid.SHORT);
                setNewBooking([]);
            
        } catch (err) {
            console.log(err);
        }
    }
    const updateLocation = async (latitude, longitude)=>{
        try {
            await blissApi.post(`/update-location-provider-coords/${stateAuth.userDetails._id}/`,{latitude,longitude});
            console.log('done');
        } catch (err) {
            console.log(err);
        }
    }  

    const acceptedBooking = async (bookingDetails)=>{
        try {
            if(bookingExpired){
                ToastAndroid.show('The booking has expired', ToastAndroid.SHORT);
                deleteBookingIgnored(bookingDetails);
                setNewBooking([]);
                return;
            }
            // const response = await blissApi.get(`/has-the-booking-expired/${bookingDetails._id}/`);
            const message = {
                to:bookingDetails.userNotificationToken,
                sound: 'default',
                title:'Accepted', 
                _displayInForeground: true,
                priority: 'high',
                body:`${stateAuth.userDetails.name} has accepted your booking, please continue`,
                data:{type:'Accepted'}    
            }
            const res = await axios.post('https://exp.host/--/api/v2/push/send', message, {
                headers:{
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate', 
                  'Content-Type': 'application/json',
                }
            });
            setAccepted(true);
            handleSocket(bookingDetails.userDetails[0], "Accepted");
            const response = await blissApi.get(`/send-booking-accepted/${bookingDetails._id}/booking`);
        } catch (err) {
            ToastAndroid.show("Error, Booking has expired / cancelled", ToastAndroid.SHORT);
            console.log(err);
        }
    }

    const handleSocket = async (recipient, text)=>{
        socket.emit('Check-availability',{recipient, text});
        console.log("this function has been called");
    }

    const handleRejection = async(bookingDetails)=>{
        try {
            if(bookingExpired){
                ToastAndroid.show('The booking has expired', ToastAndroid.SHORT);
                deleteBookingIgnored(bookingDetails);
                setNewBooking([]);
                return;
            }
            const message = {
                to:bookingDetails.userNotificationToken,
                sound: 'default',
                title:'Not available', 
                _displayInForeground: true,
                priority: 'high',
                body:`${stateAuth.userDetails.name} is not available`,
                data:{type:'Rejected'}    
            }
            const res = await axios.post('https://exp.host/--/api/v2/push/send', message, {
                headers:{
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate', 
                  'Content-Type': 'application/json',
                }
            });
            handleSocket(bookingDetails.userDetails[0], "Rejected");
            ToastAndroid.show("Booking has been succesfully removed", ToastAndroid.SHORT);
            deleteBookingIgnored(bookingDetails);
        } catch (err) {
            ToastAndroid.show("Error, Booking has expired / cancelled", ToastAndroid.SHORT);
            setNewBooking([]);
            console.log(err);
        }
    } 

    const deleteBookingIgnored = async (bookingDetails)=>{
        try {
            console.log(newBooking);
            const response = await blissApi.get(`/delete-this-booking/${newBooking[0]._id}/booking`);
            setNewBooking([]);
        } catch (error) {
            setNewBooking([]);
            console.log("there was an error with the booking");
        }
    }

    if(fontsLoaded){
        return( 
            <View style={{flex:1}}>
                <StatusBar animated={true}  backgroundColor="grey" />   
                <Header navigation={navigation} title="Live tasks" /> 
                {stateAuth.userDetails.isAproved  && !stateAuth.userDetails.isSuspended?
                <>          
                {newBooking.length === 0 ?       
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

                <View style={styles.bookingContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.newBookingHeader}>New Booking!</Text>
                    </View>
                    {!accepted?
                    <View style={styles.listContainer}>
                       <BookingDetails Key='Date: ' Value={newBooking[0].date} />
                       <BookingDetails Key='Time: ' Value={newBooking[0].time} /> 
                       <BookingDetails Key='Service booked: ' Value={newBooking[0].service} />
                       <BookingDetails Key='Address: ' Value={newBooking[0].Address} /> 
                       <BookingDetails Key='Time remaining: ' Value={
                        <CountDown 
                                    until={360 - Math.abs((new Date().getTime() - new Date(newBooking[0].createdAt).getTime()) / 1000)} 
                                    size={12}
                                    onFinish={() =>{ 
                                        ToastAndroid.show("Session has expired", ToastAndroid.SHORT);
                                        setBookingExpired(true);
                                        deleteBookingIgnored(newBooking[0]);
                                        setNewBooking([]);
                                    }}
                                    digitStyle={{backgroundColor: '#FFF'}}
                                    digitTxtStyle={{color: 'grey'}}
                                    timeToShow={['M', 'S']} 
                                    showSeparator
                                    separatorStyle={{marginBottom:25}}
                        />} 
                       /> 
                    </View>
                    :
                    <View style={styles.confirmedContainer}>
                        <Text style={styles.key}>Thanks for confirming</Text>
                        <Text style={styles.key}>Whats next?</Text>
                        <Text style={styles.please}>The client still needs to confirm the booking, thereafter you will be notified if the client chooses to continue.</Text>
                    </View>
                }

                    <View style={styles.confirmationContainer}>
                        <View style={styles.left}>
                            
                            <TouchableOpacity onPress={()=>{
                                if(accepted){
                                    ToastAndroid.show("booking has already been accepted", ToastAndroid.SHORT);
                                    return
                                }
                                handleRejection(newBooking[0])}
                                } style={styles.parent}>
                                <Text style={styles.reject}>Reject</Text>
                                <MaterialIcons  style={{textAlign:'center'}} name="cancel" size={24} color="#e74311" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity onPress={()=>{if(accepted){
                                    ToastAndroid.show("booking has already been accepted", ToastAndroid.SHORT);
                                    return
                                }
                                acceptedBooking(newBooking[0]);
                                }
                            }
                                 style={styles.parent}>
                                    <Text style={styles.accept}>Accept</Text>
                                    <Entypo style={{textAlign:'center'}} name="check" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                }


                </>

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
    },
    confirmedContainer:{
        backgroundColor:'#68823b',
        height:150,
        justifyContent:'center',
        alignItems:'center'
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