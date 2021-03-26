import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, TextInput,ToastAndroid, FlatList, Alert} from'react-native';
import { HeaderTitle } from 'react-navigation-stack';
import {NavTitle} from "../components/headers";
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import  phoneCodes from "../countryCodeProvider";
import {Button, Overlay} from 'react-native-elements';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import {Processing} from "../components/processing"

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

const Login = ({navigation})=>{
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneList, setPhoneList] = useState(phoneCodes); 
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [filterPhoneList, setFilterPhoneList] = useState(phoneCodes);
    const [countryName, setCountryName] = useState('');
    const [permisionState, setPermissionState] = useState(false);
    const [codeValue, setCodeValue] = useState({
        "name": "South Africa",
        "flag": "🇿🇦",
        "code": "ZA", 
        "dial_code": "+27"
    });
    const recaptchaVerifier = React.useRef(null);
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const attemptInvisibleVerification = false;


    const handleTextChange = (text)=>{
        if(' ' === text){
            setPhoneList(phoneList);
            return
        }
        setPhoneList(filterPhoneList.filter(item=>{
            return item.name.includes(text);
        }))
    }
    
    const handleClick = async (text)=>{
       let sup = await phoneCodes.filter(item=>{return item.name === text});
       setCodeValue(sup[0]);
       setModalVisible(false);
    }  

    const sendOtp = async ()=>{
        var phoneUpdated = `${codeValue.dial_code}${phoneNumber}`
        setLoading(true);
        setProcessing(true);
        try {
            setTimeout(function(){
                setProcessing(false);
            },6000) 
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneUpdated,
              recaptchaVerifier.current
            );
            navigation.navigate('otp',{phoneNumber:`${codeValue.dial_code} ${phoneNumber}`, verificationId:verificationId});
            setVerificationId(verificationId);
            ToastAndroid.show('OTP has been sent to you phone.', ToastAndroid.SHORT); 

          } catch (err) {
            ToastAndroid.show(`Something went wrong, please try again`,ToastAndroid.LONG);   
            setLoading(false)
          }
        setLoading(false)
    } 

 


    if(fontsLoaded){
        return (
            <View style={{flex:1, backgroundColor:'#f7f7f7'}}>
                <StatusBar animated={true}  backgroundColor="#94a720" />   
                <View style={styles.ImageContainer}>
                        <Image style={styles.Image} source={require("../../assets/umgLogo.png")} />
                </View>   
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    attemptInvisibleVerification={attemptInvisibleVerification}
                    title="Prove that you are human"
                    cancelLabel="X"
                />

        

            <View style={styles.phoneContainer}>
                <TouchableOpacity onPress={()=>setModalVisible(true)} style={{flex:2,marginRight:10}}>
                   <Text style={{textAlign:'center',color:'gray', fontSize:15}}>{codeValue.flag}  {codeValue.dial_code}</Text>
                </TouchableOpacity>
                <View style={{flex:4}}>
                   <TextInput value={phoneNumber} onChangeText={(text)=>setPhoneNumber(text)} style={{fontSize:15, color:'gray', fontFamily:'Nunito_400Regular'}} keyboardType='number-pad' placeholder="Mobile number"  />
                </View>    
            </View>
            {phoneNumber.length > 5  ? 
            <View style={{marginHorizontal:15}}>
                <Button raised loading={loading} onPress={()=>sendOtp()} title="NEXT" titleStyle={{fontFamily:'Nunito_200ExtraLight'}} buttonStyle={{backgroundColor:'#68823b', borderRadius:0}} />
            </View>
            :

            <View style={{marginHorizontal:15}}>
                <Button raised onPress={()=>ToastAndroid.show("Invalid phone number", ToastAndroid.SHORT)} title="NEXT" titleStyle={{fontFamily:'Nunito_200ExtraLight', color:'black'}} buttonStyle={{backgroundColor:'#ddd', borderRadius:0}} />
            </View>

            }
            

            <Processing processing={processing} />


            <Overlay backdropStyle={{backgroundColor:'rgba(0,0,0,0.7)'}} overlayStyle={styles.overlay} animationType='fade' isVisible={modalVisible}  onBackdropPress={()=>setModalVisible(false)}>
                <View>
                    <View style={{marginVertical:5, marginBottom:20}}>
                        <View style={styles.textBox}>
                            <TextInput onChangeText={(text)=>{
                                setCountryName(text);
                                handleTextChange(text);
                                }} value={countryName} style={{fontSize:20, color:'gray',fontWeight:'400'}} placeholder="Country name" />
                        </View>
                    </View>

                    <FlatList
                        data={phoneList}
                        keyExtractor={(key)=>key.name}
                        initialNumToRender={20}
                        renderItem={({item})=>{
                            return(
                            <TouchableOpacity onPress={(text)=>handleClick(item.name)} style={{marginBottom:15}}>
                                <View style={styles.phoneCodeList}>
                                    <View style={{flex:2, justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{textAlign:'center',color:'gray'}}>{item.flag}</Text>
                                    </View>
                                    <View style={{flex:4}}>
                                        <Text style={{fontSize:16,color:'gray',fontWeight:'200'}}>{item.name}</Text>
                                    </View>
                                </View> 
                            </TouchableOpacity>
                            )
                        }}
                    />


 


                </View>
            </Overlay>







            </View>
        )
    }
    return <Loading />
}


const styles = StyleSheet.create({
    Image: {
        height:190, 
        width:190,
        marginTop:35
    },
    ImageContainer:{
        alignItems:'center'
    },
    phoneContainer:{
        marginVertical:40,
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
    overlay:{
        width:'85%',
        height:'99%'
    },
    textBox:{
        height:50, 
        borderBottomColor:'#68823b',
        borderBottomWidth:3,
        
    },
    phoneCodeList:{
        flexDirection:'row'
    }
});

Login.navigationOptions = ({navigation})=>{
    return{
        headerTitle: props=> <NavTitle title='Welcome to Bliss!'  navigation={navigation} />  
      }
}  

export default Login