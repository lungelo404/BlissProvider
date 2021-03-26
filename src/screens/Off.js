import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import Headers from "../components/hears"; 
import LocationContext from "../context/locationContext";
import AuthContext from "../context/authContext";
import {withNavigation} from 'react-navigation';
import Avail from '../components/weekendAvailability';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native';
 
 
const Off = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation} = useContext(LocationContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const {stateAuth, setUserDate, deleteDate} = useContext(AuthContext);
    const [finished, setFinished] = useState(false);
    const [range, setRange] = useState([]);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    if(fontsLoaded){
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{paddingHorizontal:15}}>
                   <Avail />
                </View>
                <View style={{flex:1, backgroundColor:'#eee', paddingHorizontal:15}}>
                    <Text style={styles.hello}>
                        Days taken off
                    </Text>

                   <FlatList
                    data={stateAuth.userDetails.offDays}
                    keyExtractor={(key)=>key._id}
                    renderItem={({item})=>{
                        return(
                            <View style={{flexDirection:'row',marginTop:15}}>
                                <View style={{flex:5, marginLeft:25}}>
                                    <Text style={{color:'grey'}}>{new Date(item.date).toDateString()}</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <TouchableOpacity onPress={()=>{
                                        ToastAndroid.show('..Updating', ToastAndroid.LONG);
                                        deleteDate(item._id, stateAuth.userDetails._id)}}>
                                        <MaterialCommunityIcons name="delete" size={30} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }} 
                   
                   />





               </View>

                {show && (
                    <DateTimePicker
                        value={new Date()}
                        minimumDate={new Date()}
                        mode='date'
                        display="default"
                        onChange={(event,date)=>{
                            setShow(false);
                            ToastAndroid.show('..updating', ToastAndroid.LONG);
                            if(event.type !== "dismissed"){
                                setUserDate(stateAuth.userDetails._id, date,()=>{
                                    console.log(date);
                                })
                            }
                        }}
                    />
                )}

                <View style={styles.buttonContainer}>
                    <Button onPress={()=>setShow(true)} raised titleStyle={styles.titleStyle} buttonStyle={styles.buttonStyle} title='Take day off' />
                </View>


            </View>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({
    titleStyle:{
      textTransform:'uppercase',
      fontFamily:'Nunito_300Light'
    },
   buttonStyle:{
        backgroundColor:'#68823b',
        borderRadius:0
    },
   buttonContainer:{
    marginHorizontal:15,
    position:'absolute',
    left:0,
    right:0,
    bottom:15
   },
   hello:{
       marginVertical:10,
       color:'#68823b',
       textAlign:'center',
       fontSize:15,
       fontFamily:'Nunito_600SemiBold'
   }

})

Off.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><Headers title="Availability" />,
        headerLeft:()=>null
   }
}


export default withNavigation(Off);