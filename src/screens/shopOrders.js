import React,{useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, StatusBar} from 'react-native';
import {OrdersHeader}  from '../components/headers';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/headers'
import UpcomingProducts from '../components/upcomingProducts'; 
import PastProducts from '../components/pastProducts';

const shopOrders = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const [color, setColor]= useState('green');
    const [title1Selected, setTitleSelected] = useState(true);
    const [title2Selected, setTitleSelected2] = useState(false);
    const [processing, setProcessing] = useState(false);
    if(fontsLoaded){
        return(  
            <View>
                <StatusBar animated={true}  backgroundColor="#94a720" /> 
                <OrdersHeader setProcessing={setProcessing} title1Selected={title1Selected} setTitleSelected={setTitleSelected} title2Selected={title2Selected} setTitleSelected2={setTitleSelected2} title1="Upcoming" title2="Past orders" />
                {title1Selected?
                  <UpcomingProducts />
                  :
                  <PastProducts />
                }
            </View>
        )
    }
    return <Loading />
}


const styles = StyleSheet.create({

});

shopOrders.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        title:'Orders',
        tabBarIcon:({tintColor})=><Ionicons name="bookmarks-outline" size={24} color={tintColor} />
    }
}

export default shopOrders;