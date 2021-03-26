import React,{useState, useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text,View, Image, ScrollView, FlatList} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {allServices} from "../servicesProvider";
import ServiceContext from "../servicesProvider";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';

const services = ({navigation, style})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    const temba = [1,2];
    const {stateService, getServices} = useContext(ServiceContext);
    useEffect(()=>{
        getServices();
    },[]);
    return(
        <View style={{flex:1}}>
            {stateService.allServices.length > 0 ?
              <ScrollView>
                <View style={styles.serviceCardContainer}>
                    {stateService.allServices.map((item)=>{
                        return (
                        <TouchableOpacity onPress={()=>navigation.navigate('SubCategory',{name:item.nameOfService, services:item.services})} key={item.id}>
                            <Image style={style.image} source={{uri:item.Image}}/>
                        </TouchableOpacity>
                        )
                    })}
                </View> 
              </ScrollView>   
              :
             <SkeletonPlaceholder>
                <View style={{ alignItems: "center" }}>
                    <View style={{  }}>
                        <View style={{ width: 340, height: 600, borderRadius: 4 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            }
           
               
          



        </View>
    )
}

const styles = StyleSheet.create({
    serviceCardContainer: {
        marginHorizontal:15,
        flexDirection:'row',
        flex:3,
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    serviceCardContainerZ: {
        flexDirection:'row'
    },
    image :{
        height:152,
        width:152,
        marginVertical:10
    }
});

export default services;