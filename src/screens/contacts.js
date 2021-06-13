import React,{useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import { Divider, Avatar } from 'react-native-elements';
import Headers from "../components/hears";
import Loading from '../components/loading';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import authContext from "../context/authContext";
import blissApi from '../api/blissApi';
    
const Contact = ({navigation})=>{
    const {stateAuth} = useContext(authContext);
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const [contact, setContacts] = useState([]);

    useEffect(()=>{
        getContacts();
    },[]);
    
    const getContacts = async ()=>{
        try {
            const response = await blissApi.get(`/get-contacts-provider/${stateAuth.userDetails._id}/focus`);
            setContacts(response.data.room);
        } catch (error) {
            console.log(error);
        }
        
    }

    if(fontsLoaded){
    return(
        <View style={{flex:1}}>
            {contact.length === 0?
                <Loading />  
                :   
                <FlatList
                    data={contact}
                    keyExtractor={(key)=>key.name}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={()=>navigation.navigate("chat",{item})}>
                                <View style={{flexDirection:"row", marginHorizontal:15, marginVertical:10}}>
                                    <View style={styles.avatar}>
                                        <Avatar rounded size="medium" source={{uri:item.user.Image}} />
                                    </View>
                                    <View style={styles.Name}>
                                        <Text style={styles.name}>{item.user.name} {item.user.surname}</Text>
                                        <Text style={styles.admin}>{item.isAdmin?"Admin":"Client"}</Text>
                                    </View>
                                </View>
                                <Divider style={{marginHorizontal:20}} />
                            </TouchableOpacity>
                        )
                    }}
                
                />


            }
             
        </View>
    )
   }else{
       return <Loading />
   }
}

const styles = StyleSheet.create({
    name:{
        fontSize:15,
        color:"grey",
        fontFamily:"Nunito_400Regular"
    },
    Name:{
        flex:4
    },
    avatar:{
        flex:1
    },
    admin:{
        fontSize:11,
        color:"#68823b",
        fontFamily:"Nunito_400Regular"
    }
});

Contact.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        headerTitle:()=><Headers  title="Contacts" />,
        headerLeft:()=>null
   }
}

export default Contact;