import React,{useState} from 'react';  
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {NavTitle} from "../components/headers";
import {WebView} from 'react-native-webview'
import { AntDesign } from '@expo/vector-icons';


const LoadWallets = ({navigation})=>{
    const [url] = useState('https://www.payfast.co.za/eng/process');
    const [amount] = useState(navigation.state.params.amount);
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

LoadWallets.navigationOptions = ({navigation})=>{
    return{
        headerTitle:props=> <NavTitle title={`Payment R ${navigation.state.params.amount.toFixed(2)}`} forward='Checkout' navigation={navigation} /> ,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('Checkout')}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}

export default LoadWallets;