import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native';
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


const TravelScreen = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateLocation} = useContext(LocationContext);
    const [loader, setLoader] = useState(true)
    const addressObject = stateLocation.address[0];
    const {stateAuth} = useContext(AuthContext);
    const [finished, setFinished] = useState(false);
    const [range, setRange] = useState([]);
    useEffect(()=>{
       fetchRange();
    },[]);

    const fetchRange = async ()=>{
        try{
            const response = await blissApi.get('/all-ranges');
            setRange(response.data);
            setFinished(true);
            console.log(response.data)
        }catch(err){
            console.log(err.message);
            ToastAndroid.show('Error communicating with the Api. Please try again later', ToastAndroid.SHORT);
            setFinished(false);
            navigation.navigate('mainFlow');
        }
        
    }

    if(fontsLoaded){
        return(
            <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
               {finished?
               range.map((d)=>{
                   return(
                        <View style={{paddingTop:2}}>
                            <View style={styles.titleContainer}>
                                    <Text style={styles.range}>{d.range} km</Text>
                            </View>
                            <View style={styles.reviewContainer}>
                                    <Review keys='Day' value={`R ${parseFloat(d.price).toFixed(2)}`} />
                                    <Review keys='Night' value={`R ${parseFloat(d.price).toFixed(2)}`} />
                                    <Review keys='Weekend' value={`R ${parseFloat(d.price).toFixed(2)}`}/>
                            </View>
                        </View>
                )
            })
               :
               <View>
                     <SkeletonPlaceholder>
                        <View style={{ alignItems: "center" }}>
                            <View style={{  }}>
                               <View style={{ width: 340, height: 600, borderRadius: 4 }} />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
               </View>

               }
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
}

})

TravelScreen.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        headerTitle:()=><Headers title="Travel Charges" />
   }
}


export default withNavigation(TravelScreen);