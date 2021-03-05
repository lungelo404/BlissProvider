import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';

import Header from "../components/headers"; 
import Product from "../components/product";
import LocationContext from "../context/locationContext";

import BookingDetails from "../components/bookingDetails"

const homeScreen = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation} = useContext(LocationContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const stateAuth = {name:'Moses', surname:'Ncube', phoneNumber:'+27 8595841215', email:'agromoss@umgaiwa.co.za',gender:'Male'}
    useEffect(()=>{
      setTimeout(function(){
         setLoader(false)
      },5000)
    },[])
    if(fontsLoaded){
        return(
            <View style={{flex:1}}>
                <StatusBar animated={true}  backgroundColor="grey" />   
                <Header navigation={navigation} title="Live tasks" />

                {!loader?
                <View style={styles.bookingContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.newBookingHeader}>New Booking!</Text>
                    </View>
                    <View style={styles.listContainer}>
                       <BookingDetails Key='Date' Value='Thu Mar 04 2021' />
                       <BookingDetails Key='Time' Value='09:00am' /> 
                       <BookingDetails Key='Service booked' Value='Gents Hot Towel Express & Double-close shave' />
                       <BookingDetails Key='Address' Value='407 Kirkness Street, Clydsdale, Pretoria, Gauteng, 0002, ZA' /> 
                    </View>
                    <View style={styles.confirmationContainer}>
                        <View style={styles.left}>
                            <TouchableOpacity style={styles.parent}>
                                <Text style={styles.reject}>Reject</Text>
                                <MaterialIcons  style={{textAlign:'center'}} name="cancel" size={24} color="#e74311" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.parent}>
                                    <Text style={styles.accept}>Accept</Text>
                                    <Entypo style={{textAlign:'center'}} name="check" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                :
 
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

                }
        
            </View>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({
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