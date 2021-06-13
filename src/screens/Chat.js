import React,{useEffect, useState, useContext, useReducer} from 'react';
import { ToastAndroid , ScrollView} from 'react-native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import blissApi from "../api/blissApi";
import { TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from "../context/authContext";
import { FlatList } from 'react-native';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import { FontAwesome } from '@expo/vector-icons';
import io from "socket.io-client"
import {NavigationEvents} from 'react-navigation';


const Chat = ({navigation})=>{
    const bookingId = navigation.state.params.Id;
    const {stateAuth, stateSocket, openSocket } = useContext(AuthContext);
    const [chat, setChat] = useState([]);
    const scrollViewRef = React.useRef();
    const [text, setText] = useState('');
    const [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light})
    useEffect(()=>{
        openSocket(navigation.state.params.item.room, ()=>{
            console.log("the socket has been opened");
        })
        return ()=>{
            cleanup();
        }
    },[]);
    const cleanup = ()=>{
        if(stateSocket !== undefined){
            stateSocket.disconnect();
        }
    }
    const sendMessage = ()=>{
        const mess =  {
            date:new Date(),
            senderId:stateAuth.userDetails._id,
            message:text,
            _id:Math.random().toString()
        }
        setText('');;
        setChat([...chat,mess]);
        if(stateSocket !== undefined){
            stateSocket.emit("message", mess);
            stateSocket.emit("status", "online")
        }
    }
    if(stateSocket !== undefined){
        stateSocket.on("message", (data)=>{
            setChat([...chat,data]);
        })
    }
    return(
        <View style={{flex:1, backgroundColor:"#fff"}}>   
        <NavigationEvents onWillBlur={()=>{stateSocket.disconnect();}} />
        {chat.length === 0?
            <View style={{flex:1, justifyContent:"center", alignItems:'center'}}>
                <FontAwesome style={styles.noIcon} name="folder-open-o" size={50} color="grey" />
                <Text style={styles.no}>No messages here yet</Text>
           </View>
            :
            <ScrollView onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} ref={scrollViewRef} style={{marginBottom:80}}>
              {chat.map((item,index)=>{
                   return(
                     <View>    
                       <View style={stateAuth.userDetails._id === item.senderId?styles.messageBox:styles.messageBoxTwo}>
                          <Text style={styles.message}>{item.message}</Text>
                          <Text style={styles.timeStamp}>{new Date(item.date).getHours()} : {new Date(item.date).getMinutes()} </Text>
                       </View>       
                     </View>
                 )           
                })}
            </ScrollView>
           }
    
            <View style={styles.inputContainer}>
                <TextInput value={text} onChangeText={(tex)=>{
                     if(stateSocket !== undefined){
                         stateSocket.emit("status","...typing");
                     }
                    setText(tex)}} style={styles.input} multiline placeholder="Message" />
                <TouchableOpacity onPress={()=>sendMessage()}>
                   <MaterialCommunityIcons name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Bheader = ({navigation})=>{
    const item = navigation.state.params.item.user
    const [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light}) 
    const [status, setStatus] = useState("offline")
    const {stateSocket} = useContext(AuthContext);
    if(stateSocket !== undefined){
        stateSocket.emit("status", "online");
        stateSocket.on("status", data=>{
            setStatus(data);
        })
    }
    if(fontsLoaded){
    return(
        <View style={styles.headerMainContainer}>
            <View style={{marginTop:10, flex:1}}>
                <Avatar  rounded source={{uri:item.Image}} />
            </View>
            <View style={{marginLeft:10, flex:4, marginTop:10,marginBottom:10}}>
                <Text style={styles.therapistChat}>{item.name} {item.surname}</Text> 
                <Text style={status !== "offline"?styles.status:styles.status2}>{status}</Text>
            </View>
            <View style={{...styles.iconBox, flex:1}}>
                <TouchableOpacity>
                     <Ionicons style={{marginTop:10}} name="call" size={26} color="#68823b" />
                </TouchableOpacity>
            </View>
        </View>
    )
    }else{
        return <Loading />
    }
}


const styles = StyleSheet.create({
    timeStamp:{
        textAlign:'right',
        fontSize:9,
    },

    status2:{
        fontSize:8,
        color:"red"
    },
    
    status:{
        fontSize:8,
        color:"#68823b"
    },

    no:{
        fontFamily:"Nunito_400Regular",
        fontSize:15,
        textAlign:"center",
        color:"grey"
    },
    noIcon:{
        textAlign:'center'
    },
    headerMainContainer:{
        flexDirection:'row',
        // justifyContent:'space-between'
    },
    therapistChat:{
        fontSize:13,
        color:"grey"
    },
    name:{
        fontSize:12,
        color:"grey"
    },
    iconBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:50
    },
    inputContainer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:2,
        elevation:3,
        padding:15,
        backgroundColor:'#eee',
        flexDirection:'row'
    },
    input:{
        flex:5
    },
    messageBox:{
        backgroundColor:"#68823b",
        marginTop:10,
        marginLeft:25,
        borderTopLeftRadius:10,
        borderTopRightRadius:30,
        padding:10,
        fontFamily:"Nunito_400Regular"
    },
    message:{
        fontSize:12,
        color:'#fff',
        fontFamily:"Nunito_400Regular"
    },
    messageBoxTwo:{
        backgroundColor:'#c1ccae',
        marginTop:10,
        marginRight:25,
        borderTopRightRadius:10,
        borderTopLeftRadius:30,
        padding:10
    },
    name2:{
        fontSize:10,
        color:"grey",
        fontFamily:"Nunito_400Regular"
    }
});

Chat.navigationOptions = ({navigation})=>{
    return{ 
        headerTitle:()=> <Bheader navigation={navigation} />,
        // headerStyle:{
        //     backgroundColor:'#68823b'
        // }
    }  
}

export default Chat;