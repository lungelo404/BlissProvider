import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useFonts,Nunito_200ExtraLight,Nunito_300Light,Nunito_400Regular,Nunito_600SemiBold} from '@expo-google-fonts/nunito';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ProfileTabs = ({navigation, title, Icon, forward})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight,Nunito_300Light,Nunito_400Regular,Nunito_600SemiBold});
    if(fontsLoaded){
        return(
            <TouchableOpacity onPress={()=>navigation.navigate(forward)}>
                <View style={styles.Box}>
                    <View style={{flex:1,justifyContent:'center'}}>
                       <Ionicons name={Icon} size={20} color="#706c61" />
                    </View>
                    <View style={{flex:5, justifyContent:'center'}}>
                        <Text style={styles.text}>{title}</Text>
                    </View> 
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Fontisto style={{textAlign:'center'}} name="angle-right" size={15} color="#706c61" />
                    </View>
            </View>
           </TouchableOpacity>
        )
    }
    return null
}

const styles = StyleSheet.create({
    Box:{
        flexDirection:'row',
        marginHorizontal:15,
        marginVertical:13,
        justifyContent:'center'
    },
    text:{
        fontSize:8.5,
        fontFamily:'Nunito_400Regular'
    }
}) 


export default ProfileTabs;