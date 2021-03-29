import React, {useReducer} from 'react';
import NavigationService from '../navigationRef';
import blissApi from "../api/blissApi";
import {NavigationActions} from 'react-navigation';
import {AsyncStorage, ToastAndroid} from 'react-native';
import mime from 'mime';
import { call } from 'react-native-reanimated';


const AuthContext = React.createContext();

const authReducer = (state, action) =>{
    switch(action.type){
        case 'register':
            return {...state, userDetails:action.payload}
        case 'image':
            return {...state, Image:action.payload}
        case 'updateBio': 
            return {...state, name:action.payload.name, phoneNumber:action.payload.phoneNumber, surname:action.payload.surname, email:action.payload.email}
       case 'bankingDetails':
           return {...state, bankingDetails:action.payload}
       case 'number': 
           return {...state,sosContacts:action.payload}
       case 'unread':
           return {...state, unread:action.payload}
       default: 
            return state
    }
}   


export const AuthProvider = ({children})=>{
    
    register = async (regObj, callback)=>{
        try{
          const response = await blissApi.post('/new-provider',{regObj:regObj});
          dispatch({type:'register', payload:response.data.regObj});
          await AsyncStorage.setItem('token', response.data.regObj.Token);
          callback(true);
        }catch(err){ 
            console.log(err);
            callback(false);
        }
    }

   getUser = async (id)=>{
        try{
            const response = await blissApi.get(`/${id}/get-provider-details`);
            dispatch({type:'register', payload:response.data.regObj});
            isUnread(response.data.regObj.notifications)
            ToastAndroid.show('Update successful', ToastAndroid.SHORT);
        }catch(err){
            console.log(err);
            ToastAndroid.show('Could not get user details', ToastAndroid.SHORT);
        }
    }   


    const isUnread = (array)=>{ 
       let readNotifications = [];
        array.forEach((item)=>{
          if(item.isRead === false){
             readNotifications.push(item.isRead)
          }
       }); 
      dispatch({type:'unread', payload:readNotifications});
    }

    const checkForToken = async (callback)=>{
        const token = await AsyncStorage.getItem('token');
        try{
            if(!token){ 
                 callback(false);
                 return 
            }
          let  response = await blissApi.get(`/${token}/check-provider-token`);
          const check = response.data.regObj.length;
          if(check === 0){
              callback(false);
              return
          }
            dispatch({type:'register', payload:response.data.regObj[0]}); 
            ToastAndroid.show('Welcome', ToastAndroid.SHORT)
            isUnread(response.data.regObj[0].notifications);  
            callback(true);
        }catch (err) {
            console.log(err.message)
        }
    
    }

    const isThisYourFirstTime = async (userPhone,callback) =>{
        try {
            const response = await blissApi.get(`/is-first-time/${userPhone}/check-time`);
            const user = response.data.regObj.length;
            if(user > 0){
                dispatch({type:'register', payload:response.data.regObj[0]}); 
                await AsyncStorage.setItem('token', response.data.regObj[0].Token);
                ToastAndroid.show('Welcome', ToastAndroid.SHORT)
                getUser(response.data.regObj[0]._id)
                callback(false); 
            }else{
                console.log(user);
                 callback(true);    
            }
                    
        } catch (error) {
            callback(false);
        }
    }

    const logout = async (callback) =>{
        await AsyncStorage.removeItem('token');
        callback()
    }


    const uploadImage = async (id,url, callback) =>{
        const newImageUri =  "file:///" + url.split("file:/").join("");
        let formData = new FormData();
        formData.append('id', id);
        formData.append('url',{
            uri:newImageUri,
            name:newImageUri.split("/").pop(),
            type:mime.getType(newImageUri),
        });
        try{ 
            console.log(formData)
            const response = await blissApi.post(`/${id}/upload-image-provider`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                },
                onUploadProgress:data=>{
                    console.log(data);
                }
            });  
           await getUser(id);

           callback();
        }catch(err){
            console.log(err.message);
            ToastAndroid.show('Could not upload the image, please try again later on', ToastAndroid.SHORT);
        }

    }


    const uploadPortfolio = async (id,url, callback) =>{
        const newImageUri =  "file:///" + url.split("file:/").join("");
        let formData = new FormData();
        formData.append('id', id);
        formData.append('url',{
            uri:newImageUri,
            name:newImageUri.split("/").pop(),
            type:mime.getType(newImageUri),
        });
        try{ 
            console.log(formData)
            const response = await blissApi.post(`/${id}/upload-image-provider-portfolio`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                },
                onUploadProgress:data=>{
                    console.log(data);
                }
            });  
           await getUser(id);

           callback();
        }catch(err){
            console.log(err.message);
            ToastAndroid.show('Could not upload the image, please try again later on', ToastAndroid.SHORT);
        }

    }

    const deleteImage = async (id, imageId,imgId, callback)=>{
        try {
            await blissApi.get(`/delete-image/${imageId}/${imgId}`);
            await getUser(id);
            callback();
        } catch (err) {
            console.log(err);
        }
    }

    const editBio = async (id,regObj,callback) =>{
        try{
         const response = await blissApi.post(`/${id}/edit-provider-bio`,{regObj});
         getUser(id);
         callback();
        }catch(err){
            console.log(err);
            ToastAndroid.show("Could not upload details, please try again later", ToastAndroid.SHORT);
        }
    }

    const editBank = async (id,bankingDetails, callback)=>{
        try{
          const response  = await blissApi.post(`/${id}/edit-banking-details-provider`,{bankingDetails}); 
          getUser(id);
          callback();
        }catch(err){
            console.log(err); 
            ToastAndroid('could not make changes, try again later.', ToastAndroid.SHORT);
        }
    }

    const saveNumber = async (number)=>{
        try{
            console.log(number);
            dispatch({type:'number', payload:number});
        }catch(err){
            console.log(err);
        }
    }

    const addSkill =  async (id, skillId, callback) =>{
        try{
            const response = await blissApi.get(`/provider/${id}/add-skill/${skillId}/to-portfolio`);
            await getUser(id);   
            callback();            
        }catch(err){ 
            console.log(err);   
        }
    }


    

    const removeSkill =  async (id, skillId, callback) =>{
        try{
            const response = await blissApi.get(`/provider/${id}/remove-skill/${skillId}/to-portfolio`);
            await getUser(id);   
            callback();
        }catch(err){
            console.log(err);  
        }
    }


    const updateSos = async (id, contacts, callback)=>{
        try{
            await blissApi.post(`/update-sos/${id}/-now`,{contacts});
            getUser(id);
            callback();
        }catch(err){
            console.log(err);
        }
    }

    const worksSat = async (id)=>{
        try{
            await blissApi.get(`/change-sat/${id}/change`);
            getUser(id);
        }catch(err){
            console.log(err);
        }
    }

    const worksSun = async (id)=>{
        console.log(id); 
        try{
            await blissApi.get(`/change-sun/${id}/change`);
            getUser(id);
        }catch(err){
            console.log(err);
        }
    }

    const setUserDate = async (id, date, callback)=>{
        try{
            await blissApi.post(`/${id}/set-offDay`,{date});
            getUser(id);
        }catch(err){
            console.log(err);
        }
    }

    const deleteDate = async (id, userId)=>{
        try{
            await blissApi.get(`/${id}/delete-day`);
            getUser(userId)
        }catch(err){
            console.log(err);
        }
    }

    const deposit = async (id, amount, callback)=>{
        try {
            await blissApi.post(`/update-provider-balance/${id}`, {amount});
            await getUser(id);
            callback();
        } catch (err) {
            console.log(err)
        }
    }

    const withdraw = async (id, amount ,callback)=>{
        try {
            await blissApi.post(`/withdraw-provider/${id}`, {amount});
            await getUser(id);
            callback();
        } catch (err) {
            console.log(err);
        }
    }

    const order = async(userId, productId, obj, callback)=>{
         try {
            await blissApi.post(`/confirm-booking/${userId}/${productId}`,{obj});
            getUser(userId);
            callback();
         } catch (err) {
             console.log(err);
         }   
    }


 
    const [stateAuth, dispatch] = useReducer(authReducer, {
        userDetails:{},
        unread:[]
    }
  )
    return <AuthContext.Provider value={{deleteImage,uploadPortfolio,order,withdraw,deposit,deleteDate,setUserDate,worksSun,worksSat,updateSos,removeSkill,addSkill,getUser,stateAuth,editBio,editBank,saveNumber, uploadImage,logout, register, checkForToken,isThisYourFirstTime,}}>{children}</AuthContext.Provider>
}


export default AuthContext ; 