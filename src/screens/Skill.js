import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text,View, Image, ScrollView, Modal,TouchableOpacity,LogBox} from "react-native";
import {Overlay, CheckBox, Divider, Button} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';


import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
 
import Services from "../components/services";
import AuthContext from "../context/authContext";
import {NavTitle} from "../components/headers";

LogBox.ignoreLogs(['fontFamily "Nunito_300Light" is not a system font and has not been loaded through Font.loadAsync.'])

const home = ({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);  
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});


    if(fontsLoaded){
    return(
       <SafeAreaView style={styles.container}>
            <StatusBar animated={true}  backgroundColor="grey" />   
            <Services navigation={navigation} style={styles} />
       </SafeAreaView>
    )
   }
   return (
       <SafeAreaView style={styles.container}>
         <StatusBar animated={true}  backgroundColor="grey" />   
         {/* <Services navigation={navigation} style={styles} /> */}
       </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header:{
        paddingTop:35,
        paddingHorizontal:15,
        paddingBottom:12,
        backgroundColor:"#fff",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 12,
        flexDirection:'row'
    },
    serviceLocation: {
        fontSize:12,
        color:"black",
        fontWeight:'400'
        
    },
    address:{
        fontSize:9,
        color:'grey'
    },
    headText:{
        marginHorizontal:15,
        marginVertical:7,
        fontSize:20,
        color:'#68823b'
    },
    serviceCardContainer: {
        marginHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-between'
       
    },
    image :{
        height:152,
        width:152,
        marginVertical:10
    }
});


home.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="Skills matrix"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}


export default home;