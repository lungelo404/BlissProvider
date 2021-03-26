import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, ScrollView, Platform, Alert, ToastAndroid, ProgressBarAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,} from '@expo-google-fonts/nunito';
import {TitleHeader} from "../components/headers";
import {Avatar, Input, Button, Overlay} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

 
import {Processing} from "../components/processing";


import AuthContext from "../context/authContext";
import Loading from '../components/loading';

const uploadPic = ({navigation})=>{
    const {stateAuth, uploadImage, getUser} = useContext(AuthContext);
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,});
    const [processing, setProcessing] = useState(false)
    const [imageAddress, setImageAddress] = useState(stateAuth.userDetails.Image);
    console.log(stateAuth.userDetails._id)
    const [modal, setModal] = useState(false);
    const [cameraGrant, setCameraGrant] = useState(false);
    const [next, setNext] = useState(true);
    const [progress, setProgress] = useState(false);


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
                 console.log(pick);
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
                Alert.alert('Oops!','Sorry, we need camera permissions to make this work!');
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
                 console.log(pick)
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
            setNext(true)
            ToastAndroid.show('Upload complete', ToastAndroid.SHORT);
            navigation.navigate('mainFlow');
        })
    }

    if(fontsLoaded){
    return(
        <ScrollView style={{flex: 1}}>
             <StatusBar animated={true}  backgroundColor="grey" />
             <View style={{flex: 1, justifyContent:'center', marginVertical:50, alignItems: 'center'}}>
                <View style={styles.imageContainer}>
                    <Avatar rounded size="xlarge" source={{uri:imageAddress}} />
                </View>
                <Button onPress={()=>setModal(true)} titleStyle={{fontFamily:'Nunito_200ExtraLight', color:'#fff', paddingHorizontal:15}} title="Select picture" buttonStyle={{backgroundColor:'#68823b', borderRadius:0}} />
                <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                    <Text style={{marginTop:15, color:'#6',color:'#68823b', fontFamily:'Nunito_400Regular',}}>
                        NEXT
                    </Text>
                </TouchableOpacity>

                {progress?
                <View style={{marginHorizontal:15}}>
                <ProgressBarAndroid styleAttr="Horizontal" color="#68823b" />    
                </View>
                :null
             }


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
   return <Loading />
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

uploadPic.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=> <TitleHeader navigation={navigation} forward={'signup'} title='Upload picture' />
    }
}

export default uploadPic;

