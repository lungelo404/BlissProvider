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
            console.log(response.data)
            ToastAndroid.show('Update successful', ToastAndroid.SHORT);
        }catch(err){
            console.log(err);
            ToastAndroid.show('Could not get user details', ToastAndroid.SHORT);
        }
    }   

    const checkForToken = async (callback)=>{
        const token = await AsyncStorage.getItem('token');
        try{
            if(!token){ 
                 callback(false);
                 return
            }
          let  response = await blissApi.get(`/${token}/check-provider-token`);
            dispatch({type:'register', payload:response.data.regObj[0]}); 
            ToastAndroid.show('Welcome', ToastAndroid.SHORT)
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
           console.log(response.data)
           callback();
        }catch(err){
            console.log(err.message);
            ToastAndroid.show('Could not upload the image, please try again later on', ToastAndroid.SHORT);
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


 
    const [stateAuth, dispatch] = useReducer(authReducer, {userDetails:{
        name:'',
        surname:'Kaseke',
        email:'',
        gender:'',
        phoneNumber:'', 
        Image:'https://i.ibb.co/G31rGgP/30-307416-profile-icon-png-image-free-download-searchpng-employee.png',
        _id:'123654789',
        address:'409 Kirkness St, Sunnyside, Pretoria, Gauteng, 0002, ZA',
        balance:'0',
        skills:[
            { 
                name:'Gents Hot Towel Express Facial & Double close shave'
            },
            {
                name:'Hair and scalp treatment'
            },
            {
                name:'Ladies Long/Xlong cut and blowdry' 
            }
        ],
        sosContacts:[],
        bankingDetails:{
            bank:'',
            accountNumber:'',
            branchCode:'',
            accountHolder:'' 
        }
      }
    }
  )
    return <AuthContext.Provider value={{withdraw,deposit,deleteDate,setUserDate,worksSun,worksSat,updateSos,removeSkill,addSkill,getUser,stateAuth,editBio,editBank,saveNumber, uploadImage,logout, register, checkForToken,isThisYourFirstTime}}>{children}</AuthContext.Provider>
}


export default AuthContext ;