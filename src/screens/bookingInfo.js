import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, ToastAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {NavTitle} from "../components/headers";
import DividerWithTextInbetween from '../components/dividerWithTextInbetween';
import { Button, Overlay, AirbnbRating, Rating} from 'react-native-elements';
import { Processing } from '../components/processing';
import { Entypo } from '@expo/vector-icons';
import blissApi from '../api/blissApi';
import AuthContext from '../context/authContext';
import axios from 'axios';
import { TextInput } from 'react-native';

const BookingInfo = ({navigation})=>{
    const item = navigation.state.params.item;
    console.log(item)
    const [processing, setProcessing] = useState(false);
    const {stateAuth,getUser} = useContext(AuthContext);
    const [overlay, setOverlay] = useState(false);
    const [rating, setRating] = useState(3);
    const [review, setReview] = useState("");
    const therapistStatus = (status)=>{
        switch (status) {
          case "On my way":
            return "On my way"
          case "Arrived":
              return "Arrived"
          case "Job Started":
              return "Started Job"
          case "Job Completed":
              return "Job Completed"
          default:
            return "Booking Confirmed"
        }
      }

    const buttonRenderer = (status)=>{
        switch (status) {
            case "On my way":
              return <Button title="Arrived" onPress={()=>changeStatus("Arrived")} titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{marginTop:15,borderRadius:0, backgroundColor:'#68823b'}} />
            case "Arrived":
                return <Button title="Starting Job" onPress={()=>changeStatus("Job Started")} titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{marginTop:15,borderRadius:0, backgroundColor:'#68823b'}} />
            case "Job Started":
                return <Button title="Job Completed" onPress={()=>changeStatus("Job Completed")} titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{marginTop:15,borderRadius:0, backgroundColor:'#68823b'}} />
            case "Job Completed":
                return <Button title="Review" onPress={()=>setOverlay(true)} titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{marginTop:15,borderRadius:0, backgroundColor:'#68823b'}} />
            default:
              return <Button title="On my way" onPress={()=>changeStatus("On my way")} titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{marginTop:15,borderRadius:0, backgroundColor:'#68823b'}} />
          }
    }
    const changeStatus = async (status)=>{
        try {
            setProcessing(true);
            const responseClient = await blissApi.get(`/get-client-details/${item.client[0]}`);
            const clientDetails = responseClient.data;
            const updateStatus = await blissApi.post(`/update-job-status/${item._id}`,{status});
            const message = {
                to:clientDetails.notificationToken,
                sound: 'default',
                title:status,
                _displayInForeground: true,
                priority: 'high',
                body: `Status update for booking ${item.bookingId}`,
                data:{
                    type:'Booking Status'
                }
            }
            const res = await axios.post('https://exp.host/--/api/v2/push/send', message, {
                headers:{
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate', 
                    'Content-Type': 'application/json',
                }
            });   
           await getUser(stateAuth.userDetails._id);
           console.log(updateStatus.data)
           setProcessing(false);
           navigation.navigate("myOrders");
        } catch (error) {
            console.log(error);
            setProcessing(false);
            ToastAndroid.show("There was an error updating your status, please try again later", 2000);
        }

    }
    const ratingCompleted = (rating)=>{
        setRating(rating);
    }
    const sendReview = async ()=>{
        setProcessing(true)
        const body = {
            review, rating
        }
        const sendStuff = await blissApi.post(`/post/review/${item._id}/client`, {body});
        setOverlay(false);
        ToastAndroid.show("Rating & review has been saved", 1000);
        setProcessing(false);
    }
    return(
        <View>
            <StatusBar animated={true}  backgroundColor="grey" />
            <View style={styles.inside}>
                <Review keys="Date" value={new Date(item.date).toDateString()} />
                <Review keys="Time" value={item.time} />
                <Review keys="Address" value={item.address} />
            </View>

            <DividerWithTextInbetween title="Booking details" />

            <View style={styles.inside}>
                 <Review keys="Service" value={item.name} />
                 <Review  keys="Earnings" value={`R ${(parseFloat(item.price) * 0.8).toFixed(2)}`} />
                 <Review keys="BookingId" value={`B${item.orderId}`} />
            </View>

            <DividerWithTextInbetween title="Booking status" />

            <View style={styles.inside}>
                <Review keys="Status" value={therapistStatus(item.status)} />
                {item.status=="Job Completed"? <Rating reviews startingValue={item.clientRating}  readonly   /> : null}
                {new Date(item.date).toDateString() === new Date().toDateString() ?  buttonRenderer(item.status)
                :  <Button disabled titleStyle={{fontFamily:'Nunito_300Light'}} title={item.isComplete? "Completed" : "On my way"} buttonStyle={{marginTop:15,borderRadius:0}} />
                }
                
            </View>
            <Processing processing={processing} />

            <View style={styles.Design}>
                   <TouchableOpacity onPress={()=>navigation.navigate('contacts')}>
                     <Entypo name="message" size={35} color="white" />
                 </TouchableOpacity>
            </View>


            <Overlay 
              isVisible={overlay}
              onBackdropPress={()=>setOverlay(false)}
              overlayStyle={{width:'100%', height:'80%', position:'absolute', bottom:0, left:0, right:0}}
              animationType="slide"
            >
                <View>             
                     <DividerWithTextInbetween style={{marginRight:20}} title="Rate your client" />
                     {/* <Review keys="Rating" /> */}
                     <AirbnbRating
                        defaultRating={3}
                        onFinishRating={ratingCompleted}
                    />
                    <View style={{backgroundColor:"#ddd", marginTop:15}}>
                      <TextInput onChangeText={(text)=>setReview(text)}  placeholder="Enter review here" style={{backgroundColor:'#ddd',padding:10}} multiline />
                    </View>

                    <Button onPress={()=>sendReview()} title="Submit" buttonStyle={{backgroundColor:'#68823b', marginTop:30, borderRadius:0}} titleStyle={{fontFamily:'Nunito_300Light'}} />
                    


                </View>
            </Overlay>






        </View> 
    )
}

const styles = StyleSheet.create({
    inside:{
        backgroundColor:'#fff',
        marginHorizontal:10,
        marginVertical:5
    },
    Design:{
        position:'absolute',   
        right:20,
        bottom:150,
        backgroundColor:'#68823b',
        padding:10,
        borderRadius:100,
        zIndex:10
      },  
})


BookingInfo.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=><NavTitle navigation={navigation} title="Booking info"/>,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('myOrders')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}


export default BookingInfo;