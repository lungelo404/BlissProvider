import React,{useState} from 'react';  
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {NavTitle} from "../components/headers";
import {WebView} from 'react-native-webview'
import { AntDesign } from '@expo/vector-icons';


const PrivacyPolicy = ({navigation})=>{
    const [url] = useState('https://bliss.africa/privacy-policy-2/');
    return(
        <WebView
                automaticallyAdjustContentInsets={false}
                javaScriptEnabled
                source={{
                uri: url, 
                }}
         />
    )
}   

const styles = StyleSheet.create({

});

PrivacyPolicy.navigationOptions = ({navigation})=>{
    return{
        headerTitle:props=> <NavTitle title='Privacy policy' forward='Checkout' navigation={navigation} /> ,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}

export default PrivacyPolicy;