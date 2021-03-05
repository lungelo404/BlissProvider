import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const Header = ({navigation, title})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    if(fontsLoaded){
    return(
        <View style={styles.Header}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <View style={styles.left}>
                    <Entypo name="menu" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <View style={styles.mid}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.right}>
            {/* <TouchableOpacity>
                <View style={styles.left}>
                   <MaterialIcons name="logout" size={27} color="gray" />
                </View>
            </TouchableOpacity> */}
            </View>
        </View>
    )
    }
    return <Loading />
}

export const NavTitle = ({navigation, title, forward, params})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    if(fontsLoaded){
        return(
            <View style={styles.headerz}>
            {fontsLoaded?
            <View style={{flex:5, justifyContent:'center'}}>
                <Text style={{...styles.title, fontFamily:'Nunito_400Regular'}}>{`${title}`}</Text>
            </View>
            :
            <View style={{flex:5, justifyContent:'center'}}>
                <Text style={{...styles.title}}>{`${title}`}</Text>
            </View>
                
            }
    </View>
        )
    }
    return <Loading />
}


const styles = StyleSheet.create({
    Header:{
        paddingTop:40,
        paddingLeft:15,
        paddingBottom:15,
        backgroundColor:"#fff",
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.4,
        // shadowRadius: 3,
        elevation: 3,
        flexDirection:'row',
        justifyContent:'center'
   
    },
    title:{
        fontSize:16,
        color:'#68823b',
        fontFamily:'Nunito_400Regular',
        textAlign:'center',
    },
    left:{
        flex:1
    },
    right:{
        flex:1
    },
    mid:{
        flex:4,
        alignItems:'center',
    },
    headerz:{
        backgroundColor:"#fff",
        flexDirection:'row',
        justifyContent:'space-between'
    },
})

export default Header;