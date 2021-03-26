import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, ScrollView, Platform, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,} from '@expo-google-fonts/nunito';
import {NavTitle, TitleHeaderz} from "../components/headers";
import {Avatar, Input, Button, Overlay} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

 
import {Processing} from "../components/processing";


import AuthContext from "../context/authContext";
import { set } from 'react-native-reanimated';
import { ToastAndroid } from 'react-native';

const Banking = ({navigation})=>{
    const {stateAuth, editBank} = useContext(AuthContext);
    const [bank, setBank] = useState(stateAuth.userDetails.bankingDetails.bank);
    const [accountNumber, setAccountNumber] = useState(stateAuth.userDetails.bankingDetails.accountNumber);
    const [branchCode, setBranchCode] = useState(stateAuth.userDetails.bankingDetails.branchCode);
    const [accountHolder, setAccountHolder] = useState(stateAuth.userDetails.bankingDetails.accountHolder);
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,});
    const [processing, setProcessing] = useState(false)
    const [modal, setModal] = useState(false);


    const saveUs = ()=>{
       setProcessing(true);
       var bankingDetails = {bank,accountNumber,branchCode,accountHolder};
       editBank(stateAuth.userDetails._id,bankingDetails,(done)=>{
        setProcessing(false);
        ToastAndroid.show("Update successfull", ToastAndroid.SHORT);
        navigation.navigate('account');
       });
    }








    if(fontsLoaded){
    return(
        <ScrollView style={{flex:1}}>
            <StatusBar animated={true}  backgroundColor='grey' />


            <View style={{marginTop:100}}></View>

            <View style={styles.textContainer}>
                 <Input inputStyle={styles.inputText} labelStyle={{...styles.label,fontFamily:'Nunito_200ExtraLight'}} value={bank} onChangeText={(text)=>{setBank(text)}} style={styles.Input} label="BANK NAME" />
            </View>
  
            <View style={styles.textContainer2}>
                 <Input inputStyle={styles.inputText} labelStyle={styles.label} value={accountNumber} onChangeText={(text)=>{setAccountNumber(text)}} style={styles.Input} label="ACCOUNT NUMBER" />
            </View>

            <View style={styles.textContainer2}>
                 <Input inputStyle={styles.inputText} labelStyle={styles.label} value={branchCode} onChangeText={(text)=>{setBranchCode(text)}} style={styles.Input} label="BRANCH CODE" />
            </View>

            <View style={styles.textContainer2}>
                 <Input inputStyle={styles.inputText} labelStyle={styles.label} value={accountHolder} onChangeText={(text)=>{setAccountHolder(text)}} style={styles.Input} label="ACCOUNT HOLDER" />
            </View>

            <View style={styles.button}>
                <Button raised onPress={()=>saveUs()} title='SAVE' buttonStyle={styles.buttonInner} titleStyle={{color:'#fff',fontFamily:'Nunito_200ExtraLight' }} />
            </View>

            <Processing processing={processing} />


        </ScrollView>
    ) 
    }

    return (
        <View>
            <Text>loading</Text>
        </View>
    )
        
       
   
}
   
const styles = StyleSheet.create({
    imageContainer: {
        marginVertical:25,
        alignItems:'center',
    },
    iconContainer:{
        backgroundColor:'#68823b',
        borderRadius:100,
        position:'absolute',
        bottom:-10
    },
    textContainer:{
        marginHorizontal:15,
        marginVertical:-10
    },
    textContainer2:{
        marginHorizontal:15,
        marginVertical:-10
    },

    label:{
        fontSize:10,
        color:'lightgrey',
        fontFamily:'Nunito_600SemiBold'
    },
    inputText:{
        fontSize:9
    },
    button:{
        marginHorizontal:15,
        marginVertical:20
    },
    buttonInner:{
        borderRadius:0,
        backgroundColor:'#68823b'
    },
    overlay:{
        backgroundColor:'#fff',
        // width:'100%', 
        // height:250,
        // position:'absolute',
        // bottom:15,
        // left:0,
        // right:0,
    }
});

Banking.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="MY BANK DETAILS"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        ),
    }
}
 
export default Banking;

