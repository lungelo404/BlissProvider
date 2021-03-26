import React, { useContext } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import { CheckBox } from 'react-native-elements';

import AuthContext from '../context/authContext';

const Avail = ({navigation})=>{
    const {stateAuth, worksSat, worksSun} = useContext(AuthContext);
    return(
        <View>
             <TouchableOpacity onPress={()=>{
                 ToastAndroid.show('...updating', ToastAndroid.LONG);
                 worksSat(stateAuth.userDetails._id)}}>
                       <View style={styles.choiceContainer}>
                             <View style={styles.nameContainer}>
                                <Text style={styles.name}>Works on Saturdays</Text>
                             </View>
                             <View style={styles.checkBoxContainer}>
                                 {stateAuth.userDetails.worksSat?
                                    <CheckBox 
                                        checkedColor='#68823b'   
                                        checked
                                        onPress={()=>{
                                            ToastAndroid.show('...updating', ToastAndroid.LONG);
                                            worksSat(stateAuth.userDetails._id)}}
                                    />
                                    : 
                                    <CheckBox 
                                    checkedColor='#68823b'   
                                    onPress={()=>{
                                        ToastAndroid.show('...updating', ToastAndroid.LONG);
                                        worksSat(stateAuth.userDetails._id)}}
                                    />
                                }

                             </View>
                        </View>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={()=>{
                       ToastAndroid.show('...updating', ToastAndroid.LONG);
                       worksSun(stateAuth.userDetails._id)}}>
                       <View style={styles.choiceContainer}>
                             <View style={styles.nameContainer}>
                                <Text style={styles.name}>Works on Sundays</Text>
                             </View>
                             <View style={styles.checkBoxContainer}>
                                 {stateAuth.userDetails.worksSun?
                                <CheckBox 
                                    checkedColor='#68823b'   
                                    checked
                                    onPress={()=>{
                                        ToastAndroid.show('...updating', ToastAndroid.LONG);
                                        worksSun(stateAuth.userDetails._id)}}
                                />
                                : 
                                <CheckBox 
                                checkedColor='#68823b'   
                                onPress={()=>()=>{
                                    ToastAndroid.show('...updating', ToastAndroid.LONG);
                                    worksSun(stateAuth.userDetails._id)}}
                               />
                             }
                             </View>
                        </View>
                   </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    description: {
        fontSize:12,
        marginLeft:15,
        fontFamily:'Nunito_400Regular'
    },
    inside:{
        fontSize:9,
        marginLeft:15,
        color:'gray',
        fontFamily:'Nunito_400Regular'
    },
    choice:{
      height:45,
      flexDirection:'row', 
      marginTop:5,
      marginHorizontal:15,
      backgroundColor:'lightgrey',
      borderRadius:70
    },
    text:{
        marginHorizontal:10,
        color:'#eee',
        fontFamily:'Nunito_400Regular'
    },
    cartDesign:{
        position:'absolute',   
        right:45,
        bottom:50,
        backgroundColor:'lightgrey',
        padding:10,
        borderRadius:100
    },
    emoji:{
        justifyContent:'center',
        alignItems:'center',
    },

    Design:{
        position:'absolute',   
        right:45,
        bottom:50,
        backgroundColor:'#68823b',
        padding:10,
        borderRadius:100
    },


    choiceContainer:{  
        flexDirection:'row',
        marginHorizontal:15,
        paddingVertical:3,
        borderBottomColor:'#dddddd',
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center',

    },
    nameContainer:{
        flex:5
    },
    checkBoxContainer:{
        flex:1
    },
    name:{
        color:'gray',
        fontSize:12,
        fontFamily:'Nunito_400Regular'
    },
    serviceContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        fontSize:18,
        color:'#68823b',fontFamily:'Nunito_400Regular'
    },
    headerz:{
        backgroundColor:"#fff",
        flexDirection:'row',
        justifyContent:'space-between'
    },
})


export default Avail;