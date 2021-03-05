import React,{useState, useContext} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, FlatList, StatusBar, LogBox, ScrollView} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import {NavTitle} from "../components/headers";
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';


import {Processing} from "../components/processing";

LogBox.ignoreAllLogs();

import AuthContext from "../context/authContext";


const details = ({navigation})=>{
    const {stateAuth, register} = useContext(AuthContext);
    const [phoneNumber] = useState(navigation.state.params.phoneNumber);
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [name, setName] = useState('');
    const [terms, setTerms] = useState(false)
    const [email, setEmail] = useState('')  
    const [surname, setSurname] = useState('')
    const [gender, setGender] = useState('Male');
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    const [processing, setProcessing] = useState(false);
    const biographyObject ={
        name:name, 
        surname:surname,
        phoneNumber:phoneNumber,
        email:email,
        gender:gender
    };
    if(fontsLoaded){
    return(
        <ScrollView style={{flex:1, backgroundColor:'#f7f7f7'}}>
                <StatusBar animated={true}  backgroundColor="#94a720" />   
                <View style={styles.ImageContainer}>
                        <Image style={styles.Image} source={require("../../assets/umgLogo.png")} />
                </View>
 

            <View style={styles.phoneContainer}>
                <View style={{flex:1}}>
                  <FontAwesome5 style={{textAlign:'center'}} name="user-alt" size={20} color="grey" />
                </View>
                <View style={{flex:5}}>
                   <TextInput value={name} onChangeText={(text)=>setName(text)} style={{fontSize:15, color:'gray', fontFamily:'Nunito_400Regular'}}  placeholder="Name"  />
                </View>    
            </View>

            <View style={styles.phoneContainer}>
                <View style={{flex:1}}>
                  <FontAwesome5 style={{textAlign:'center'}} name="user-alt" size={20} color="grey" />
                </View>
                <View style={{flex:5}}>
                   <TextInput value={surname} onChangeText={(text)=>setSurname(text)} style={{fontSize:15, color:'gray',  fontFamily:'Nunito_400Regular'}}  placeholder="Surname"  />
                </View>    
            </View>





            <View style={styles.phoneContainer}>
                <View style={{flex:1}}>
                  <FontAwesome5 style={{textAlign:'center'}} name="envelope" size={20} color="grey" />
                </View>
                <View style={{flex:5}}>
                   <TextInput value={email} onChangeText={(text)=>setEmail(text)} style={{fontSize:15, color:'gray',  fontFamily:'Nunito_400Regular'}}  placeholder="Email Address"  />
                </View>    
            </View>

            <View style={styles.phoneContainers}>
                <View style={{}}>
                <CheckBox
                    center
                    containerStyle={{backgroundColor:'#fff', borderWidth:0}}
                    checkedColor='#68823b'
                    title='Male'
                    titleStyle={{ fontFamily:'Nunito_400Regular'}}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={male}
                    onPress={()=>{
                        setMale(true);
                        setFemale(false);
                        setGender('Male')
                    }}
                />
                </View>   

                <View style={{}}>
                    <CheckBox
                        center
                        checkedColor='#68823b'
                        containerStyle={{backgroundColor:'#fff', borderWidth:0}}
                        title='Female'
                        titleStyle={{
                            fontFamily:'Nunito_400Regular'
                        }}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={female}
                        onPress={()=>{
                            setMale(false);
                            setFemale(true);
                            setGender('Female')
                        }}
                    />
                </View>   
                

            </View>


            <View style={{marginHorizontal:15, marginVertical:10}}>
                <View style={{}}>
                   <CheckBox
                        containerStyle={{backgroundColor:'rgba(0,0,0,0)', borderWidth:0}}
                        center
                        title='I Accept the terms and conditions'
                        checked={terms}
                        checkedColor='#68823b'
                        titleStyle={{fontWeight:'200',color:'green'}}
                        onPress={()=>{
                            setTerms(!terms);
                        }}
                    />
                </View>    
            </View>







       { name.length > 2 && surname.length > 2 && phoneNumber.length > 5 && email.length > 5 && gender ?
            <View style={{marginHorizontal:15, marginBottom:25}}>
                <Button
                 raised 
                 title="REGISTER" 
                 titleStyle={{
                     fontFamily:'Nunito_200ExtraLight'
                 }}
                 buttonStyle={{backgroundColor:'#68823b', borderRadius:0}}
                 onPress={()=>{
                    // register(biographyObject);
                    navigation.navigate('Home')
                 }}
                />
            </View>  
            :
    <View style={{marginHorizontal:15, marginBottom:25}}>
        <Button
            raised 
            title="REGISTER" 
            titleStyle={{
                fontFamily:'Nunito_200ExtraLight', color:'black'
            }}
            buttonStyle={{backgroundColor:'#ddd', borderRadius:0}}
            onPress={()=>{
                 console.log(biographyObject);
            }}
           />
       </View>  

     }
   
    </ScrollView>   
    )
    }
    return <Loading />
}


const styles = StyleSheet.create({
    Image: {
        height:190, 
        width:190,
        marginTop:15
    },
    ImageContainer:{
        alignItems:'center'
    },
    phoneContainer:{
        marginVertical:8,
        flexDirection:'row',
        marginHorizontal:15,
        backgroundColor:'#eee',
        height:55,
        alignItems:'center',
        paddingLeft:5,
        borderBottomColor:'gray',
        borderBottomWidth:4,
        borderBottomEndRadius:10,
        borderBottomLeftRadius:10
    },

    phoneContainers:{
        marginVertical:8,
        flexDirection:'row',
        marginHorizontal:15,
        backgroundColor:'#fff',
        height:55,
        alignItems:'center',
        paddingLeft:5,
        borderBottomColor:'gray',
        borderBottomWidth:4,
        borderBottomEndRadius:10,
        borderBottomLeftRadius:10
    },

    textBox:{
        height:50, 
        borderBottomColor:'#68823b',
        borderBottomWidth:3
    },
})
 
details.navigationOptions = ({navigation})=>{
    return{
        headerTitle: props=> <NavTitle title='Sign up'  navigation={navigation} /> ,
        headerLeft:()=>null
    }
}

export default details;