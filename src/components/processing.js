import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,} from '@expo-google-fonts/nunito';


export const Processing = ({navigation,processing})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Overlay
              animationType="fade" 
              overlayStyle={styles.overlay} 
              onBackdropPress={()=>console.log('Wait for the process to finish first')} 
              isVisible={processing} 
            > 
             {!fontsLoaded?
                <View style={{flexDirection:'row'}}>
                    <ActivityIndicator style={{flex:1}} color="#68823b" size="large" />
                    <Text style={{flex:5,color:'gray'}}>Please wait...</Text>
                </View>  
                :
                <View style={{flexDirection:'row'}}>
                    <ActivityIndicator style={{flex:1}} color="#68823b" size="large" />
                    <Text style={{flex:4,fontFamily:'Nunito_200ExtraLight', color:'gray'}}>Please wait...</Text>
                </View>

             }
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay:{
        backgroundColor:'#fff',
        width:'80%', 
        
    },
})
