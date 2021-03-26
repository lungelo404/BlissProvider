import React,{useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, ToastAndroid, ScrollView} from 'react-native';
import {Button, Badge, CheckBox, Overlay, Divider} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Datepicker } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import moment from "moment";

  
import AuthContext from "../context/authContext";

import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import {NavTitle} from "../components/headers";  



const subCategory = ({navigation})=>{
    const [data, setData] = useState(navigation.state.params.services);
    const [filteredData, setFilteredData] = useState(navigation.state.params.services);
    const [choice, setChoice] = useState({name:'',price:'',timeToCompleteInMinutes:'', time:'', date:''});
    const [textInputValue, setTextInputValue] = useState('');
    const {stateAuth, addSkill, removeSkill} = useContext(AuthContext);
    const [checked, setChecked] = useState({});   
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    const [pressed, setPressed] = useState(false)    
    const [skills, setSkills] = useState(stateAuth.userDetails.skills);

    const filterFunction = (text)=>{
        if(' ' === text){
            setData(data);
            return
        }
        setData(filteredData.filter(item=>{
            return item.name.includes(text);
        }))  
    }


    if(fontsLoaded){
    return(
        <View style={{flex:1, backgroundColor:'#fff'}}>
             <StatusBar animated={true}  backgroundColor="grey" />
            <View style={styles.choice}>
              <TextInput  value={textInputValue} onChangeText={(text)=>{ setTextInputValue(text); filterFunction(text)}} style={styles.text} placeholder="Search" />
            </View> 
            
            <ScrollView style={{marginTop:5}}>
                {data.map((item)=>{
                    if(stateAuth.userDetails.skills.some(e=>e.name === item.name)){
                        let isChecked = checked[item._id];
                        console.log(item.name)
                        return(
                            <TouchableOpacity onPress={()=>{
                                removeSkill(stateAuth.userDetails._id,item._id,(err, done)=>{
                                    setChecked(...checked,{[item._id]:!isChecked});
                                    setPressed(true);
                                    ToastAndroid.show('Succesfully removed skill', ToastAndroid.SHORT);
                                });
                             }}>
                                <View style={styles.choiceContainer}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                    <View style={styles.checkBoxContainer}>
                                        <CheckBox 
                                            checkedColor='#68823b'   
                                            checked
                                            onPress={()=>{
                                                removeSkill(stateAuth.userDetails._id,item._id,(err, done)=>{
                                                    setChecked(...checked,{[item._id]:!isChecked});
                                                    setPressed(true);
                                                    ToastAndroid.show('Succesfully removed skill', ToastAndroid.SHORT);
                                                })
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }else{
                        let isChecked = checked[item._id];
                        return(
                            <TouchableOpacity onPress={()=>{
                                ToastAndroid.show('Updating....', ToastAndroid.LONG);
                                addSkill(stateAuth.userDetails._id,item._id,(err, done)=>{
                                    setChecked(...checked,{[item._id]:!isChecked});
                                    setPressed(true);
                                    ToastAndroid.show('Succesfully removed', ToastAndroid.SHORT);
                                })
                                }}>
                                <View style={styles.choiceContainer}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                    <View style={styles.checkBoxContainer}>
                                        <CheckBox 
                                            checkedColor='#68823b'  
                                            checked={isChecked === true} 
                                            onPress={()=>{
                                                addSkill(stateAuth.userDetails._id,item._id,(err, done)=>{
                                                    setChecked(...checked,{[item._id]:!isChecked});
                                                    setPressed(true);
                                                    ToastAndroid.show('Succesfully added skill', ToastAndroid.SHORT);
                                                })
                                            }}
                                        />
                                    </View> 
                                </View>
                            </TouchableOpacity>
                        )
                    }
                })}
          
            </ScrollView>
            

            

        </View> 
    )
    }
    return (
       <View>

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


subCategory.navigationOptions = ({navigation})=>{
    return{
      headerTitle: props=> <NavTitle title={`${navigation.state.params.name} Services`} forward='Home' navigation={navigation} />  
    }
}


export default subCategory;