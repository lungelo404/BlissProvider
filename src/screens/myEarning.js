import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {NavTitle, TitleHeaderz} from "../components/headers"
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';



const myEarning = ({navigation})=>{
    return(
        <View style={{flex:1, backgroundColor:'#fff'}}>
            <View>
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Total Earnings:</Text>
                        <Text style={styles.money}>R 0.00</Text>
                    </View>
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Bookings completed:</Text>
                        <Text style={styles.money}>0</Text>
                    </View>
             </View>




        </View>
    )
}

const styles = StyleSheet.create({
    walletContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:5,
        marginHorizontal:20
    },
    heading:{
        fontSize:12,
        fontFamily:'Nunito_400Regular'
    },
    money:{
        fontSize:12,
        fontFamily:'Nunito_400Regular',
        fontWeight:'bold',
        color:'#68823b'
    },
});

myEarning.navigationOptions = ({navigation})=>{
    return{
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        ),
        headerTitle:()=> <NavTitle title='My Earnings' navigation={navigation} />
    }
}

export default myEarning;