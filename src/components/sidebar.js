import React, {useState, useContext} from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, ToastAndroid} from "react-native";
import {Avatar, Divider} from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import AuthContext from "../context/authContext";
import blissApi from "../api/blissApi";
import LocationContext from "../context/locationContext";


const Sidebar = ({navigation}) =>{
   let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
   const {stateAuth, logout} = useContext(AuthContext);
   const {stateLocation, setCoords, setAddress} = useContext(LocationContext);
   const addressObject = stateLocation.address[0];
   const mess = `Please help!! 
   I am in danger at ${addressObject.name, addressObject.street, addressObject.district, addressObject.city, addressObject.region, addressObject.postalCode, addressObject.isoCountryCode}
   ` 
   const twilio = async()=>{
      try{
         const response = await blissApi.post('/send-message',{numbers:stateAuth.userDetails.sosContacts, })
         console.log("The sos message has been sent here");
         ToastAndroid.show('Message has been sent and the relevant authorities have been notified', ToastAndroid.SHORT);
         navigation.closeDrawer();
      }catch(err){
         console.log(err.message);
         ToastAndroid.show('Message was not sent', ToastAndroid.SHORT);
      }

   }

   if(fontsLoaded){
    return(
       <ScrollView style={{flexDirection:'column', backgroundColor:"#ddd"}}>
           <View style={styles.bioContainer}>
               <View style={{alignItems:'center'}}>
                  <Avatar rounded size="large" source={{uri :stateAuth.userDetails.Image}} />
               </View>
               <Divider style={styles.divider} />
               <TouchableOpacity onPress={()=>navigation.navigate('account')} style={styles.edits}>
                  <Text style={styles.edit}>edit</Text>
               </TouchableOpacity>
                <Text style={styles.name}>{stateAuth.userDetails.name} {stateAuth.userDetails.surname}</Text>
           </View>

          <View style={{paddingVertical:15, paddingHorizontal:15, backgroundColor:'#fff',height:420, flex:5}}>
                 
               <TouchableOpacity onPress={()=>{navigation.closeDrawer();navigation.navigate("Home")}} style={styles.linkContainer}>
                  <Text style={styles.link}>Home</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>{navigation.closeDrawer();navigation.navigate("Notifications")}} style={styles.linkContainer}>
                  <Text style={styles.link}>Notifications</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>{navigation.closeDrawer();navigation.navigate("account")}} style={styles.linkContainer}>
                  <Text style={styles.link}>Profile</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>{navigation.closeDrawer();navigation.navigate("off")}} style={styles.linkContainer}>
                  <Text style={styles.link}>Availability</Text>
               </TouchableOpacity>


               <TouchableOpacity  onPress={()=>{navigation.closeDrawer();navigation.navigate("TravelCharge")}} style={styles.linkContainer}>
                  <Text style={styles.link}>Travel charges</Text>
               </TouchableOpacity>


               <Divider style={styles.dividers} />

               <TouchableOpacity onPress={()=>{navigation.closeDrawer();navigation.navigate("support")}} style={styles.linkContainer}>
                  <Text style={styles.link}>Support</Text>
               </TouchableOpacity>

               <Divider style={styles.dividers} />

               <TouchableOpacity onPress={()=>logout(()=>{navigation.navigate('loginFlow')})} style={styles.linkContainer}>
                  <Text style={styles.link}>Logout</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>logout(()=>{twilio()})} style={styles.linkContainer}>
                  <Text style={styles.SOS}>SOS</Text>
               </TouchableOpacity>
               

 
          </View>

 

          <View style={{flex:1}}>
               <Text style={styles.copyright}>Copyright Bliss (Pty) Ltd 2021</Text>
          </View>
          
       </ScrollView>
    )
   }
   return <Loading />
}

const styles = StyleSheet.create({
    bioContainer:{
       backgroundColor:'#68823b',
       height:190,
       flex:2,
       paddingHorizontal:15,
       paddingTop:40
    },
    name:{
       fontSize:10,
       color:'#fff',
       fontFamily:'Nunito_600SemiBold'
    },
    mail:{
       fontSize:10,
       color:'#fff',
       fontFamily:'Nunito_600SemiBold'
    },
    edit:{
       fontSize:10,
       color:'#fff',
       fontFamily:'Nunito_400Regular'
    },
    edits:{
      fontSize:10,
       color:'#fff',
       position:'absolute',
       bottom:15,
       right:15,
       fontFamily:'Nunito_400Regular'
    },
    divider:{
       marginVertical:10,
       borderWidth:1,
       borderColor:'#fff'
    },
    copy:{
       position:'absolute',
       fontSize:8,
       textAlign:'center',
       bottom:0,
       left:0,
       right:0
    },
    link:{
       fontSize:14,
       fontFamily:'Nunito_300Light',
       color:'grey'
      },
      SOS:{
         fontSize:14,
         fontFamily:'Nunito_300Light',
         color:'#e74311'
        },
      
    linkContainer:{
       marginVertical:10
    },
    copyright:{
       fontSize:8,
       textAlign:'center',
       justifyContent:'center',
       marginTop:5,
       fontFamily:'Nunito_300Light'
    },
})

export default Sidebar;