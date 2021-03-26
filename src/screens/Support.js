import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Review from '../components/review'
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import Headers from "../components/hears"; 
import LocationContext from "../context/locationContext";
import AuthContext from "../context/authContext";
import {withNavigation} from 'react-navigation';
import blissApi from '../api/blissApi'


const Support = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation} = useContext(LocationContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const {stateAuth} = useContext(AuthContext);
    const [finished, setFinished] = useState(false);
    const [range, setRange] = useState([]);
    const [query, setQuery] = useState('')
    useEffect(()=>{
       
    },[]);

 
    const submitTicket = async ()=>{
        ToastAndroid.show("Submitting query", ToastAndroid.SHORT)
        try {
            const response = await blissApi.post(`/send-support-request-provider/${stateAuth.userDetails._id}/`,{message:query});
            ToastAndroid.show("Ticket successfully  submitted", ToastAndroid.SHORT)
        } catch (error) {
            ToastAndroid.show("Ticket successfully  submitted", ToastAndroid.SHORT)
        }
    }

    if(fontsLoaded){
        return(
            <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
               <View style={styles.supportContainer}>
                    <Text style={styles.header}>Support</Text>
                    <Text style={styles.submit}>submit your query and we will get back to you as soon as possible</Text>
               </View>

               <View style={styles.card}>
                    <View style={styles.inside}>
                        <Text style={styles.head}>Need a hand ?</Text>
                        <Text style={styles.port}>Send us a brief description of your issue and we'll get back to you as soon as we can</Text>

                        <View style={styles.textContainer}>
                            <Input 
                               value={query}
                               onChangeText={(text)=>setQuery(text)} 
                               placeholder="describe your query here" 
                               multiline
                               style={styles.input} 
                           
                            />

                           {query.length > 5?
                            <Button title="Submit ticket" onPress={()=>submitTicket()} titleStyle={styles.buttonTitle} buttonStyle={styles.buttonStyle} />
                            :
                            <Button title="Submit ticket" titleStyle={styles.buttonTitle} buttonStyle={{...styles.buttonStyle, backgroundColor:'#ddd'}} />
                           }

                        
                        </View>


                    </View>
               </View>




            </ScrollView>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({
   
titleContainer:{
    backgroundColor:'#eee',
    justifyContent:'center',
    alignItems: 'center',
    marginVertical:10,
    marginHorizontal:25,
    height:40
},
range:{
    color:'gray'
},
reviewContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:30
},
supportContainer:{
    marginVertical:15,
    marginHorizontal:15,
    backgroundColor:'#68823b',
    borderRadius:18
},
header:{
    color:'#fff',
    marginHorizontal:15,
    marginVertical:5,
    fontSize:11,
    fontFamily:'Nunito_400Regular'
},
submit:{
    color:'#fff',
    fontSize:10,
    marginHorizontal:15,
    marginBottom:10,
    fontFamily:'Nunito_400Regular'
},
card:{
    backgroundColor:'#fff',
    marginHorizontal:15,
    marginVertical:10,
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity:  0.4,
    // shadowRadius: 3,
    elevation: 3,
},
port:{
    textAlign:'center',
    color:'grey',
    fontSize:13,
    fontFamily:'Nunito_400Regular'
},
head:{
    textAlign:'center',
    fontFamily:'Nunito_400Regular',
    fontSize:15,
    marginBottom:15
},
inside:{
    margin:20
},
input:{
    fontSize:10,
    backgroundColor:'#eee',
    padding:8
},
textContainer:{
    marginTop:15
},
buttonStyle:{
backgroundColor:'#68823b'
},
buttonTitle:{
    textTransform:'uppercase',
    fontFamily:'Nunito_300Light'
}

})

Support.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        headerTitle:()=><Headers title="Support" />,
        headerLeft:()=>null
   }
}


export default withNavigation(Support); 