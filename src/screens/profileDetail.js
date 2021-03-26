import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, ScrollView, Platform, Alert, ProgressBarAndroid, ToastAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,} from '@expo-google-fonts/nunito';
import {NavTitle} from "../components/headers";
import {Avatar, Input, Button, Overlay} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

 
import {Processing} from "../components/processing";


import AuthContext from "../context/authContext";
const profileDetail = ({navigation})=>{
    const {stateAuth, uploadImage, editBio} = useContext(AuthContext);
    const [name, setName] = useState(stateAuth.userDetails.name);
    const [surname, setSurname] = useState(stateAuth.userDetails.surname);
    const [email, setEmail] = useState(stateAuth.userDetails.email);
    const [phoneNumber, setPhoneNumber] = useState(stateAuth.userDetails.phoneNumber);
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,});
    const [processing, setProcessing] = useState(false)
    const [imageAddress, setImageAddress] = useState(stateAuth.userDetails.Image);
    const [modal, setModal] = useState(false);
    const [cameraGrant, setCameraGrant] = useState(false);
    const [progress, setProgress] = useState(false);
    

    const saveUs = ()=>{
       setProcessing(true);
       var regObj = {name,surname,email,phoneNumber};
       editBio(stateAuth.userDetails._id,regObj,(done)=>{
        setProcessing(false);
        ToastAndroid.show('Upload successful', ToastAndroid.SHORT);
        navigation.navigate('account');
       });
    }

    const cameraChoice = async ()=>{
        (async () => {
            if (Platform.OS !== 'web') {
              const cameraStatus = await Permissions.askAsync(Permissions.CAMERA); 
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Oops!','Sorry, we need camera permissions to make this work!');
                return
              }
              setCameraGrant(true)
            }
          })(); 

          if(cameraGrant){
             const pick = await ImagePicker.launchCameraAsync({
                 allowsEditing:true,
                 quality:1
             });

             if(!pick.cancelled){
                 attemptToUploadImage(pick.uri);
             }else{
                 setCameraGrant(false);
             }

          }
    }


    const uploadChoice = async ()=>{
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Oops!','Sorry, we need camera permissions to make this  work!');
                return
              }
              setCameraGrant(true)
            }
          })(); 

          if(cameraGrant){
             const pick = await ImagePicker.launchImageLibraryAsync({
                 allowsEditing:true,
                 allowsMultipleSelection:false,
                 quality:1
             });

             if(!pick.cancelled){
                 attemptToUploadImage(pick.uri);
             }else{
                 setCameraGrant(false);
             }

          }
    }


    const attemptToUploadImage = (uri)=>{
        console.log("We will make the upload request here");
        setImageAddress(uri);
        setProgress(true);
        setModal(false);
        uploadImage(stateAuth.userDetails._id,uri,(done)=>{
            setCameraGrant(false);
            setModal(false);
            setProgress(false);
            ToastAndroid.show('Upload complete', ToastAndroid.SHORT);
        })
    }

    if(fontsLoaded){
    return(
        <ScrollView style={{flex:1}}>
            <StatusBar animated={true}  backgroundColor="grey" />
            <View style={styles.imageContainer}>
                <Avatar rounded size="large" source={{uri:imageAddress}} />
                <TouchableOpacity onPress={()=>setModal(true)} style={styles.iconContainer}>
                   <AntDesign style={{marginVertical:5,marginHorizontal:5}} name="edit" size={15} color="#fff" />
                </TouchableOpacity>
                {progress?
                <View style={{marginHorizontal:15}}>
                <ProgressBarAndroid styleAttr="Horizontal" color="#68823b" />    
                </View>
                :null
             }

            </View>

            <View style={styles.textContainer}>
                 <Input inputStyle={styles.inputText} labelStyle={{...styles.label,fontFamily:'Nunito_200ExtraLight'}} value={name} onChangeText={(text)=>{setName(text)}} style={styles.Input} label="NAME" />
            </View>

            <View style={styles.textContainer2}>
                 <Input inputStyle={styles.inputText} labelStyle={styles.label} value={surname} onChangeText={(text)=>{setSurname(text)}} style={styles.Input} label="SURNAME" />
            </View>

            <View style={styles.textContainer2}>
                 <Input inputStyle={styles.inputText} labelStyle={styles.label} value={email} onChangeText={(text)=>{setEmail(text)}} style={styles.Input} label="EMAIL" />
            </View>

            <View style={styles.textContainer2}>
                 <Input inputStyle={styles.inputText} labelStyle={styles.label} value={phoneNumber} onChangeText={(text)=>{setPhoneNumber(text)}} style={styles.Input} label="MOBILE NUMBER" />
            </View>

            <View style={styles.button}>
                <Button raised onPress={()=>saveUs()} title='SAVE' buttonStyle={styles.buttonInner} titleStyle={{color:'#fff',fontFamily:'Nunito_200ExtraLight' }} />
            </View>

            <Processing processing={processing} />

            <Overlay
                 animationType="slide" 
                 overlayStyle={styles.overlay} 
                 onBackdropPress={()=>setModal(false)} 
                 isVisible={modal} 
            >
                <View>
                    {fontsLoaded?
                    <View>

                        <View style={{marginBottom:25,marginHorizontal:25, alignItems:'center'}}>
                            <Text style={{fontSize:15,fontFamily:'Nunito_200ExtraLight', color:'gray', textAlign:'center'}}>Select a source</Text>
                        </View>

                        <View style={{flexDirection:'row',marginHorizontal:20, marginBottom:25, justifyContent:'space-between', alignItems:'center'}}>
                              <View style={{alignItems:'center'}}>
                                  <TouchableOpacity onPress={()=>cameraChoice()}>
                                    <FontAwesome style={{textAlign:'center'}} name="camera" size={35} color="#68823b" />
                                  </TouchableOpacity>
                              </View> 

                              <View>
                                  <TouchableOpacity onPress={()=>uploadChoice()}>
                                     <Ionicons style={{textAlign:'center'}} name="images" size={35} color="#68823b" />
                                  </TouchableOpacity>
                              </View>
                        </View>
                        
                        




                    </View>
                    :
                    null
                    }
                </View>
            </Overlay>
 

        </ScrollView>
    ) 
    }

    return null
        
       
   
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

profileDetail.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="EDIT PROFILE"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}
 
export default profileDetail;

