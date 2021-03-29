import React,{useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import {WebView} from 'react-native-webview'
import { AntDesign } from '@expo/vector-icons';
import querystring from 'querystring'
import {NavTitle} from '../components/headers';
import AuthContext from '../context/authContext';

 
const LoadWallets = ({navigation})=>{
    const [url] = useState('https://www.payfast.co.za/eng/process');
    const [trackUrl, setMwana] = useState('');
    const {stateAuth, deposit} = useContext(AuthContext);
    const changeScreen = async ()=>{ 
        console.log("Yes")
         await deposit(stateAuth.userDetails._id,navigation.state.params.amount, ()=>{
             ToastAndroid.show("Transaction successfull, your balance has been updated", ToastAndroid.SHORT);
             navigation.navigate('Checkout');
         })
    }
    const data = querystring.stringify({
        'merchant_id':'15846325',
        'merchant_key':'s2dwh1hhc2p37',
        'amount':navigation.state.params.amount,
        'item_name':'Bliss account deposit',
        'return_url':'https://bebcleanse.com/booking-confirmed-api',
        'cancel_url':'https://bebcleanse.com/cancel-transaction-api',
        'notify_url':'https://bebcleanse.com/notify-api',
        'email_confirmation':'1',
        'confirmation-address':stateAuth.userDetails.email,
        'email_address':stateAuth.userDetails.email 
   });
   const checkStatus = (url)=>{
        url.includes('https://bebcleanse.com/cancel-transaction-api')?bang():null
        url.includes('https://bebcleanse.com/error-in-transaction-api')?bang():null
        url.includes('https://bebcleanse.com/error-in-transaction-api')?bang():null
        url.includes('https://bebcleanse.com/notify-api')?bang():null
        url.includes('https://bebcleanse.com/booking-confirmed-api')?changeScreen():null      
    }
    const bang = ()=>{
        ToastAndroid.show('Transaction has been cancelled', ToastAndroid.SHORT);
        navigation.navigate('Checkout');
    }
    return(
        <WebView 
            source={{uri: url, method:'post', body:data }}
            onNavigationStateChange={(WebViewUrl)=>{
                checkStatus(WebViewUrl.url);
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