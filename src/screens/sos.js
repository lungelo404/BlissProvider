import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import { NavTitle, TitleHeaderz } from '../components/headers';
import {Button, Overlay} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '../components/loading';
import  phoneCodes from "../countryCodeProvider";
import { AntDesign } from '@expo/vector-icons';

import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';

import AuthContext from '../context/authContext';
import { TextInput } from 'react-native';
import { ToastAndroid } from 'react-native';
import DividerWithText from '../components/dividerWithTextInbetween';

const SOs = ({navigation})=>{
    const {stateAuth, saveNumber,updateSos} = useContext(AuthContext);
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [codeValue, setCodeValue] = useState({
        "name": "South Africa",
        "flag": "🇿🇦",
        "code": "ZA", 
        "dial_code": "+27"
    });
    const [phoneList, setPhoneList] = useState(phoneCodes); 
    const [processing, setProcessing] = useState(false);
    const [filterPhoneList, setFilterPhoneList] = useState(phoneCodes);
    const [countryName, setCountryName] = useState('');
    const [contacts, setContacts] = useState(stateAuth.userDetails.sosContacts);

    const handleClick = async (text)=>{
        let sup = await phoneCodes.filter(item=>{return item.name === text});
        setCodeValue(sup[0]);
        setModalVisible(false);
     }   

      
    const handleTextChange = (text)=>{
        if(' ' === text){
            setPhoneList(phoneList);
            return
        }
        setPhoneList(filterPhoneList.filter(item=>{
            return item.name.includes(text);
        }))
    }

    const deleteNumber = (number)=>{
        console.log(contacts);
        const newArray  = contacts.filter((nun)=>{
            return nun != number
        });
        setContacts(newArray);
        updateSos(stateAuth.userDetails._id,newArray,()=>{
            setMode(false);
            ToastAndroid.show('Number has been saved', ToastAndroid.SHORT); 
        })   
    }
    
    const handleSave = ()=>{
        var newNumber  = `${codeValue.dial_code}${phoneNumber}`;
        var newArray = [...contacts,newNumber];
        setContacts(newArray);
        updateSos(stateAuth.userDetails._id,newArray,()=>{
            setMode(false);
            ToastAndroid.show('Number has been saved', ToastAndroid.SHORT); 
        })
    }
 if(fontsLoaded){
    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{marginHorizontal:15, marginVertical:25}}>
                <DividerWithText title="My SOS Contacts" />
                {stateAuth.userDetails.sosContacts.map((d)=>{
                    return(
                       <View key={d} style={styles.container}>
                           <View>
                               <Text style={styles.phone}>{d}</Text>
                          </View>
                          <TouchableOpacity onPress={()=>deleteNumber(d)}>
                              <View>
                                   <MaterialCommunityIcons name="delete" size={24} color="#e74311" />
                              </View>
                          </TouchableOpacity>
                       </View>
                    )
                })}
            </View> 
            <Overlay
                isVisible={mode}
                onBackdropPress={()=>setMode(false)}
                style={{width:250, height:250}}
            >
                <View>
                     
                   <View>
                       
                        <View style={styles.phoneContainer}>
                            <TouchableOpacity onPress={()=>setModalVisible(true)} style={{flex:2,marginRight:10}}>
                            <Text style={{textAlign:'center',color:'gray', fontSize:15}}>{codeValue.flag}  {codeValue.dial_code}</Text>
                            </TouchableOpacity>
                            <View style={{flex:4}}>
                            <TextInput value={phoneNumber} onChangeText={(text)=>setPhoneNumber(text)} style={{fontSize:15, color:'gray', fontFamily:'Nunito_400Regular'}} keyboardType='number-pad' placeholder="Mobile number"  />
                            </View>    

                        </View>
                        <View style={{marginHorizontal:15,marginBottom:15, borderRadius:0}}>
                             <Button onPress={()=>handleSave()} buttonStyle={{backgroundColor:'#68823b', fontFamily:'Nunito_300Light', borderRadius:0}} title="Save number" />
                       </View>


                   </View>

                </View> 
            </Overlay>
            <View style={{marginHorizontal:15,marginBottom:15,position:'absolute', bottom:10, left:0, right:0, borderRadius:0}}>
                <Button onPress={()=>setMode(true)} buttonStyle={{backgroundColor:'#68823b', fontFamily:'Nunito_300Light', borderRadius:0}} title="NEW NUMBER" />
            </View>





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
    }else{
        return(
            <Loading />
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginVertical:8,
        marginLeft:15,
        marginRight:15
    },
    phoneContainer:{
        marginVertical:40,
        flexDirection:'row',
        marginHorizontal:15,
        backgroundColor:'#eee',
        height:55,
        width:300,
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
    },
    phone:{
        color:'grey',
        fontSize:15,
        fontFamily:'Nunito_300Light'
    }
});


SOs.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=> <NavTitle title='SOS Contacts' navigation={navigation} />,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}

export default SOs;