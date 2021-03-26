import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,} from '@expo-google-fonts/nunito';

export default Review =({navigation, keys , value})=>{
    let   [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular, Nunito_300Light,});
    if(fontsLoaded){
    return(
        <View style={styles.confirmation}>
            <Text style={styles.key}>{keys}:</Text>
            <Text style={styles.child}>{value}</Text>
        </View>
    )
   }
   return null
}
 

const styles  =  StyleSheet.create({
   confirmation:{
       flexDirection:'row',
       marginHorizontal:20,
       marginVertical:5
   },
   key:{
       fontSize:11,
       flex:3,
       fontFamily:'Nunito_300Light'
   }, 
   child:{
       fontSize:11,
       flex:3,
       fontFamily:'Nunito_300Light',
       color:'gray'
   }
});

