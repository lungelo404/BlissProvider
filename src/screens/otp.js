import React,{useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView, StatusBar, LogBox, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import { set } from 'react-native-reanimated';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
  
import {NavTitle} from "../components/headers";
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';

import AuthContext from "../context/authContext";
import {Processing} from "../components/processing";

LogBox.ignoreAllLogs();
const firebaseConfig = {
    apiKey: "AIzaSyBF5TGLHh8mYt5HuuXhtFt3DdY2FOgaVoQ",
    authDomain: "bliss-99e0b.firebaseapp.com",
    databaseURL: "https://bliss-99e0b.firebaseio.com",
    projectId: "bliss-99e0b",
    storageBucket: "bliss-99e0b.appspot.com",
    messagingSenderId: "424281601748",
    appId: "1:424281601748:web:e8b05282aeb7ab09812d41",
    measurementId: "G-W1ZZZ1P3HN"
};
       


try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  
}


  
const otp = ({navigation})=>{
    const [userPhone] = useState(navigation.state.params.phoneNumber);
    const [verificationId] = useState(navigation.state.params.verificationId);
    const [otpValue, setOtpValue] = useState('');
    const [errorMsg, setErrorMessage] = useState('');
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    const [processing, setProcessing] = useState(false);
    const {isThisYourFirstTime} = useContext(AuthContext);
    const imDone = async ()=>{
          setProcessing(true)
          try{
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                otpValue
              );
              await firebase.auth().signInWithCredential(credential);
              ToastAndroid.show('Phone authentication successful 👍', ToastAndroid.SHORT);
              setProcessing(false)
              isThisYourFirstTime(userPhone,(res)=>{
                  if(res){
                    navigation.navigate('signUp',{phoneNumber:userPhone});
                    return
                  }
                  navigation.navigate('Home');
              });
              

        }catch(err){
            ToastAndroid.show('Incorrect OTP', ToastAndroid.SHORT);
            setProcessing(false)
        }
    }

    const handlePress = ()=>{
        setErrorMessage('')
        if(otpValue === ''){
            setErrorMessage("Please enter a valid OTP.");
            return
        }
        imDone();
    }

    if(fontsLoaded){
    return(
       <ScrollView style={{flex:1,backgroundColor:'#f7f7f7'}}> 
         <StatusBar animated={true}  backgroundColor="#94a720" />   
                <View style={styles.ImageContainer}>
                        <Image style={styles.Image} source={require("../../assets/umgLogo.png")} />
                </View>
            <View style={{marginHorizontal:15}}>
                <Text style={{fontSize:15, textAlign:'center',fontFamily:'Nunito_400Regular', color:'gray'}}>Please type the verification code sent to your phone: </Text>
                <Text style={{fontSize:15, textAlign:'center', fontFamily:'Nunito_400Regular', color:'#68823b'}}>{userPhone}</Text>
            </View>

            {errorMsg?
                <View style={{marginHorizontal:15}}>
                    <Text style={{color:'red', fontSize:11 ,fontFamily:'Nunito_400Regular', textAlign:'center',marginVertical:10}}>{errorMsg}</Text>
                </View>
                    :
                null
            }

            <View style={styles.phoneContainer}>
                 <View>
                   <TextInput 
                        value={otpValue} 
                        onChangeText={(text)=>{setOtpValue(text)}}  
                        style={{fontSize:15, color:'gray', fontFamily:'Nunito_400Regular'}} 
                        keyboardType='number-pad' 
                        placeholder="Enter OTP" 
                     />
                </View>    
            </View>
            {otpValue.length > 5 ?
            <View style={{marginHorizontal:15}}>
                <Button raised onPress={()=>handlePress()} title="VERIFY" titleStyle={{fontFamily:'Nunito_200ExtraLight'}} buttonStyle={{backgroundColor:'#68823b', borderRadius:0}} />
            </View> 
            :
            <View style={{marginHorizontal:15}}>
                <Button raised onPress={()=>console.log("well")} title="VERIFY" titleStyle={{fontFamily:'Nunito_200ExtraLight', color:'black'}} buttonStyle={{backgroundColor:'#ddd', borderRadius:0}} />
            </View> 
            }
 
  

            <View style={{height:35, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginVertical:20, marginHorizontal:15}}>
                 <TouchableOpacity onPress={()=>navigation.pop()}>
                     <Text style={{color:'grey', fontFamily:'Nunito_400Regular'}}>Change number</Text>
                 </TouchableOpacity>

                <TouchableOpacity onPress={()=>console.log("Resend OTP function goes here")}>
                    <Text style={{color:'#68823b', fontFamily:'Nunito_400Regular'}}>Resend OTP</Text>
                </TouchableOpacity>

            </View>

            <Processing processing={processing} navigation={navigation} />

       </ScrollView>   
    )
    }
    return <Loading />
}         

otp.navigationOptions = ({navigation})=>{
    return{
        headerTitle: props=> <NavTitle title='Phone verification'  navigation={navigation} /> ,
    }
} 

const styles = StyleSheet.create({
    Image: {
        height:190, 
        width:190,
        marginTop:15
    },
    ImageContainer:{
        alignItems:'center'
    },
    phoneContainer:{
        marginTop:20,
        marginBottom:40,
        flexDirection:'row',
        marginHorizontal:15,
        backgroundColor:'#eee',
        height:55,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        borderBottomColor:'gray',
        borderBottomWidth:8,
        borderBottomEndRadius:10,
        borderBottomLeftRadius:10
    },
})


export default otp;