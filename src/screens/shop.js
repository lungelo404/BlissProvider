import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text,View} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

import {OrdersHeader} from "../components/headers";
import Dematologica from "../components/dematologice";
import {Processing} from "../components/processing";
import StoreContext from "../storeProvider";
import Shop from "../components/shop";

const shop = ({navigation})=>{ 
    const [color, setColor]= useState('green');
    const [title1Selected, setTitleSelected] = useState(true);
    const [title2Selected, setTitleSelected2] = useState(false);
    const [processing, setProcessing] = useState(false);
    const {stateStore, getProducts} = useContext(StoreContext);
    useEffect(()=>{
        getProducts();
    },[])
    return(
       <SafeAreaView style={styles.container}>
            <StatusBar animated={true}  backgroundColor="#c1ccae" />
            <OrdersHeader setProcessing={setProcessing} title1Selected={title1Selected} setTitleSelected={setTitleSelected} title2Selected={title2Selected} setTitleSelected2={setTitleSelected2} title1="Bliss shop" title2="Dermatologica" />
            {title2Selected?
              <Dematologica />
              :
              <Shop />
            }
           
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
 
});


shop.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        tabBarIcon:({tintColor})=><FontAwesome5 name="shopping-cart" size={24} color={tintColor} />
    }
}


export default shop;