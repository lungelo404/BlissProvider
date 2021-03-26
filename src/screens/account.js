import React, {useContext} from "react";
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import ProfileTabs from "../components/profileTabs";

import Header from "../components/headers"; 
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import AuthContext from "../context/authContext";

const account = ({navigation})=>{ 
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    const {stateAuth} = useContext(AuthContext);
    if(fontsLoaded){
        return(
            <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar animated={true}  backgroundColor="grey" />
                <Header navigation={navigation} title="My account" />
                <TouchableOpacity onPress={()=>navigation.navigate('profileDetail')}>
                    <View style={styles.header}> 
                       <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                       <Avatar rounded source={{uri:stateAuth.userDetails.Image}} />
                    </View>
                   <View style={{flex:4}}>
                        <TouchableOpacity>
                          <Text style={styles.serviceLocation}>{stateAuth.userDetails.name} {stateAuth.userDetails.surname}</Text>
                          <Text style={styles.address}>{stateAuth.userDetails.phoneNumber} - {stateAuth.userDetails.email.substring(0,14)}... </Text>
                       </TouchableOpacity>
                  </View>
                   <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
                       <TouchableOpacity onPress={()=>navigation.navigate('profileDetail')}>
                          <Text style={{fontSize:12,color:'#68823b',fontFamily:'Nunito_300Light'}}>Edit</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </TouchableOpacity>
              
               <View style={{marginHorizontal:15}}>
                    <Divider style={styles.divider} />
              </View>

                <View style={styles.accountContainerSecond}>
                        <ProfileTabs forward='banking' Icon='list'  navigation={navigation} title='BANKING DETAILS' />
                        <ProfileTabs forward='skills'  Icon='list'  navigation={navigation} title='MY SKILLS MATRIX' />
                        <ProfileTabs forward='wallet' Icon='wallet-outline' navigation={navigation} title='MY WALLET' />
                        <ProfileTabs forward='myOrders' Icon='wallet-outline' navigation={navigation} title='PAST JOBS & EARNINGS' />
                        <ProfileTabs forward='Orders' Icon='bookmarks-outline' navigation={navigation} title='MY ORDERS' />
                        <ProfileTabs forward='sos' Icon='phone' navigation={navigation} title='EMERGENCY CONTACTS' />
                        <ProfileTabs forward='privacy' Icon='list'  navigation={navigation} title='PRIVACY POLICY' />
                        <ProfileTabs forward='finance' Icon='list'  navigation={navigation} title='TERMS & CONDITIONS' />
                </View>
            
           
            </ScrollView>
        )
    }
    return <Loading />
}

const styles = StyleSheet.create({
    header:{
        paddingTop:12,
        paddingHorizontal:13,
        paddingBottom:12,
        backgroundColor:"#fff",
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.4,
        // shadowRadius: 3,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    serviceLocation: {
        fontSize:12,
        color:"black",
        fontWeight:'400',
        fontFamily:'Nunito_400Regular'
        
    },
    address:{
        fontSize:9,
        color:'grey',
        fontFamily:'Nunito_300Light'
    }, 
    divider:{
        borderColor:'gray',
        borderWidth:1,
        width:'100%',
        marginVertical:1,
        borderStyle: 'dashed',
        borderRadius:1
    },
});

account.navigationOptions = ({navigation})=>{
    navigation.isFocused(()=>console.log("Hello from the outside"))
    return{
        title:'Account',
        tabBarIcon:({tintColor})=><FontAwesome5 name="user-circle" size={24} color={tintColor} />,
    }
}

export default account;