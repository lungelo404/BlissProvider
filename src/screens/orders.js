import React from "react";
import {StyleSheet, View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/headers"; 
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';

const orders = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    if(fontsLoaded){
        return(
            <View>
                <StatusBar animated={true}  backgroundColor="#94a720" /> 
                <Header navigation={navigation} title="My bookings" />
                <Text>Orders will appear here</Text>
            </View>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({

});

orders.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        title:'Bookings',
        tabBarIcon:({tintColor})=><FontAwesome5 name="list-alt" size={24} color={tintColor} />,
    }
}

export default orders;