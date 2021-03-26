import React,{useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text,ScrollView, TouchableOpacity, Image, ImageBackground, Dimensions} from 'react-native';
import {Avatar, Overlay} from 'react-native-elements';

import {NavTitles} from "../components/headers";
import {Processing} from "../components/processing";
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import {WebView} from 'react-native-webview'
import AuthContext from "../context/authContext";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



const Dematologica = ({navigation})=>{
    const [url] = useState('https://bit.ly/32VSCgO');
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setTimeout(function(){
          setLoading(false)
        },3000)
    },[])
    if(loading){
    return(
        <View>
            <SkeletonPlaceholder>
                <View style={{ alignItems: "center" }}>
                    <View style={{  }}>
                        <View style={{ width: 340, height: 600, borderRadius: 4 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>
    )
    }else{
        return(
          <WebView
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled
            source={{
            uri: url, 
            }}
        />
        )
    }
}


export default Dematologica;