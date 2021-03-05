import React, {useReducer} from 'react';
import NavigationService from '../navigationRef';
import {NavigationActions} from 'react-navigation';


const AuthContext = React.createContext();

const authReducer = (state, action) =>{
    switch(action){
        case 'register':
            return {...state, name:action.payload.name, surname:action.payload.surname, email:action.payload.email, phoneNumber:action.payload.phoneNumber, gender:action.payload.gender}
        default:
            return state
    }
} 

export const AuthProvider = ({children})=>{
    const register = (value)=>{
        // dispatch({type:'register', payload:value});
        // navigate('Home');
    }   
    const checkForToken = async ()=>{
        const token = false
        try{
            if(!token){
                 await NavigationService.navigate('login'); 
                console.log("Navigation function is being read just fine..because I run after she has been executed")
                return
            }
        }catch (err) {
            console.log(err.message)
        }
    
    }


    const [stateAuth, dispatch] = useReducer(authReducer, {name:'Tanaka', surname:'Kaseke', phoneNumber:'+27 8595841215', email:'agromoss@umgaiwa.co.za',gender:'Male'})
    return <AuthContext.Provider value={{stateAuth, register, checkForToken}}>{children}</AuthContext.Provider>
}


export default AuthContext ;