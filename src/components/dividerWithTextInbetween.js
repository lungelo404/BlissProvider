import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Divider, Avatar} from 'react-native-elements';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,} from '@expo-google-fonts/nunito';



const DividerWithTextInbetween = ({navigation, title})=>{
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,});
    if(fontsLoaded){
    return(
        <View style={styles.dividerContainer}>
            <View style={styles.leftContainer}>
                <Divider  style={styles.dividerColor} />
            </View>
            <View>
                <Text style={styles.textStyle}>{title}</Text>
            </View>
            <View style={styles.RightContainer} >
                <Divider style={styles.dividerColor} />
            </View>
        </View>
    )
    }
    return null
}


const styles  =  StyleSheet.create({
    dividerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:15
    },

    dividerColor:{
        borderColor:'#eee', 
        borderWidth:1,
        width:90
    },

    leftContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    RightContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    textStyle:{
        color:'#68823b',
        fontFamily:'Nunito_300Light'
    }

}); 


export default DividerWithTextInbetween;