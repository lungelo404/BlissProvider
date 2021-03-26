import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native';
import {Button, Divider, Input} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Review from '../components/review'
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import Headers from "../components/hears"; 
import LocationContext from "../context/locationContext";
import AuthContext from "../context/authContext";
import {withNavigation} from 'react-navigation';
import blissApi from '../api/blissApi';
import {NavTitle} from "../components/headers";


const Notificationsdetails = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation} = useContext(LocationContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const {stateAuth} = useContext(AuthContext);
    const [finished, setFinished] = useState(false);
    const [range, setRange] = useState([]);
    const [query, setQuery] = useState('')
    useEffect(()=>{
       getNotifications();
    },[]); 


    const getNotifications = async ()=>{
        try{
            const response = await blissApi.get(`/get-provider-notification/${stateAuth.userDetails._id}/`);
            console.log(response.data);
            setFinished(true);
        }catch(err){
            ToastAndroid.show("Could not load the notification, please try again later", ToastAndroid.SHORT);
            setFinished(true);
        }
    }

    if(fontsLoaded){
        return(
            <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
                {finished?
                <View style={styles.view}>
                    
                        <View style={styles.notContainer}>  
                            <View style={{flex:1}}>
                                  <Entypo name="bell" size={45} color="grey" />
                            </View>
                            <View style={{flex:4}}>
                                <Text style={styles.title}>{navigation.state.params.notification}</Text>
                                <Text style={styles.date}>{new Date().toLocaleString()}</Text>
                            </View>
                        </View>
                        <Divider />
                   
                </View>
                :
                <Loading />
    }
            </ScrollView>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({
   view:{
       backgroundColor:'#fff',
       marginHorizontal:20,
       marginVertical:25
   },
   notContainer:{
       flexDirection:'row',
       paddingBottom:10
   },
   title:{
       fontSize:12,
       fontFamily:'Nunito_400Regular',
       flexWrap:'wrap'
   },
   date:{
       fontSize:10,
       marginVertical:5,
       color:'gray'
   },
   unread:{
       fontSize:10,
       color:'#68823b'
   }
});

Notificationsdetails.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="Notification detail"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('Notifications')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}


export default withNavigation(Notificationsdetails); 