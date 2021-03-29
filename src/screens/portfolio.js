import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, ScrollView, Platform,Image, Alert, ProgressBarAndroid, ToastAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,} from '@expo-google-fonts/nunito';
import {NavTitle} from "../components/headers";
import {Avatar, Input, Button, Overlay} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {Processing} from "../components/processing";
import AuthContext from "../context/authContext";


const Portfolio = ({navigation})=>{
    const {stateAuth,  uploadPortfolio, deleteImage} = useContext(AuthContext);
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,});
    const [processing, setProcessing] = useState(false)
    const [imageAddress, setImageAddress] = useState('');
    const [modal, setModal] = useState(false);
    const [cameraGrant, setCameraGrant] = useState(false);
    const [progress, setProgress] = useState(false);
    const [about , setAbout] = useState(stateAuth.userDetails.about);
    const [list, setList] = useState([]);
    const [imageModal, setImageModal] = useState(false)
    const [deleteUrl, setDeleteUrl] = useState('');
    const [imgId, setImgId] = useState('')




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
        uploadPortfolio(stateAuth.userDetails._id,uri,(done)=>{
            setCameraGrant(false);
            setModal(false);
            setProgress(false);
            ToastAndroid.show('Upload complete', ToastAndroid.SHORT);
        })
    }

    if(fontsLoaded){
    return(
        <View style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar animated={true}  backgroundColor="grey" />
            {stateAuth.userDetails.Portfolio.length === 0?
                <View style={styles.nothingContainer}>
                    <MaterialCommunityIcons style={styles.nothing} name="timer-sand-empty" size={24} color="black" />
                    <Text style={styles.nothing}> No records yet</Text>
                </View>
              :
              null
            }
            <ScrollView>

                <View style={styles.imageContainer}>
                       {stateAuth.userDetails.Portfolio.map((item)=>{
                           return(
                               <TouchableOpacity style={{marginVertical:10}} onPress={()=>{
                                   setImageAddress(item.Image);
                                   setDeleteUrl(item.ImageId)
                                   setImgId(item._id);
                                   setImageModal(true)
                               }}>
                                   <Avatar size="xlarge" source={{uri:item.Image}} />
                               </TouchableOpacity>
                           ) 
                       })} 
                </View>  
    


            </ScrollView>
            {progress?
                <View style={{marginHorizontal:15}}>
                <Text style={{fontSize:10, color:'grey', fontFamily:'Nunito_600SemiBold'}}>Uploading...</Text>
                <ProgressBarAndroid styleAttr="Horizontal" color="#68823b" />    
                </View>
                :null
            }
            <Processing processing={processing} />
            <View style={styles.button}>
                <Button raised onPress={()=>setModal(true)} title='Upload Image' buttonStyle={styles.buttonInner} titleStyle={{color:'#fff',fontFamily:'Nunito_200ExtraLight' }} />
            </View>
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
       
       
       
            <Overlay
                 animationType="slide" 
                 overlayStyle={styles.overlayAgain} 
                 onBackdropPress={()=>setImageModal(false)} 
                 isVisible={imageModal} 
            >
                <View>

                <View style={styles.back}>
                    <Image style={styles.heightImage} source={{uri:imageAddress}} />
                </View>

                <View style={styles.button}>  
                    <Button raised onPress={()=>{
                        setProcessing(true);
                        deleteImage(stateAuth.userDetails._id, deleteUrl,imgId, ()=>{
                            setProcessing(false);
                            setImageModal(false);
                            ToastAndroid.show('Image has been successfully deleted', ToastAndroid.SHORT);
                        })
                    }}  title='Delete Image' buttonStyle={{...styles.buttonInner, backgroundColor:'red'}} titleStyle={{color:'#fff',fontFamily:'Nunito_200ExtraLight' }} />
                </View>
                   
                </View>
            </Overlay>
       
       
       
       
       
       
       
       
       
       
       
       
        </View>
    ) 
    }

    return null
        
       
   
}
   
const styles = StyleSheet.create({
    back:{
        height:450
    },
    overlayAgain:{
        width:'100%',
        height:'90%'
    },
    nothingContainer:{
        marginTop:190
    },
    nothing:{
        textAlign:'center',
        color:'grey',
        fontSize:20,
        fontFamily:'Nunito_300Light'
    },
    imageContainer: {
        marginVertical:25,
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:15,
        justifyContent:'space-between',
        flexWrap:'wrap'
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
        position:'absolute',
        bottom:10,
        left:0,
        right:0

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
    },
    button:{
        marginHorizontal:15,
        marginVertical:20,

    },
    buttonInner:{
        borderRadius:0,
        backgroundColor:'#68823b'
    },
    heightImage:{
            width: '100%',
            height: undefined,
            aspectRatio: 1,
        }
});

Portfolio.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="My Portfolio"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}
 
export default Portfolio;

