import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid, FlatList} from 'react-native';
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



const Notifications = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation} = useContext(LocationContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const {stateAuth, getUser} = useContext(AuthContext);
    const [finished, setFinished] = useState(false);
    const [range, setRange] = useState([]);
    const [query, setQuery] = useState('');
    const [notifications, setNotifications] = useState([]);
    useEffect(()=>{
       getNotifications();
    },[]); 

 
    const getNotifications = async ()=>{
        try{ 
            const response = await blissApi.get(`/get-provider-notification/${stateAuth.userDetails._id}/`);
            setNotifications(response.data);
            getUser(stateAuth.userDetails._id);
            setFinished(true);
        }catch(err){
            ToastAndroid.show("Could not load the notification, please try again later", ToastAndroid.SHORT);
            setFinished(true);
        }
    }

    const readNotification = async (id)=>{
        try {
            const response = await blissApi.get(`/read-notification/${id}/`);
            console.log(response.data)
            getNotifications();
        } catch (err) {
            console.log(err);
        }
    }

    if(fontsLoaded){
        return( 
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {finished?
                <View style={styles.view}>
                    <FlatList
                        data={stateAuth.userDetails.notifications.sort((a,b)=>new Date(b.date) - new Date(a.date))}
                        keyExtractor={(key)=>key._id} 
                        renderItem={({item})=>{
                            return(
                               <TouchableOpacity onPress={()=>{
                                    readNotification(item._id);
                                    navigation.navigate("NotificationDetail",{notification:item.notification})
                                }}>
                                    <View style={styles.notContainer}>  
                                        <View style={{flex:1}}>
                                            {item.isRead?
                                            <Entypo name="bell" size={45} color="grey" />
                                            :
                                            <Entypo name="bell" size={45} color="#68823b" />
                                            }
                                        </View>
                                        <View style={{flex:4}}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                        {item.isRead?
                                           <Text style={styles.unread}>read</Text>
                                        :
                                           <Text style={styles.unread}>unread</Text>
                                        }
                                           
                                        </View>
                                    </View> 
                                    <Divider />
                                </TouchableOpacity>
                            )
                        }}
                    />
                   
                </View>
                :
                <Loading />
    }
            </  View>
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
       paddingBottom:10,
       paddingTop:10
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

Notifications.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="Notifications"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('Home')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}


export default withNavigation(Notifications); 