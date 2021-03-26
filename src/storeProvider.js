import React, {useReducer} from 'react';
import { ToastAndroid } from 'react-native';
import bebApi from './api/blissApi';


const StoreContext = React.createContext();

const storeReducer = (state, action)=>{
    switch(action.type){
        case 'load':
            return {...state, StoreProducts:action.payload}
        default:
            return state;
    }
}


export const StoreProvider = ({children})=>{
    const getProducts = async ()=>{
        try{
         const response = await bebApi.get('/get-all-products');
         let load = []
         response.data.forEach(function(d){
             if(d.target === 'Provider'){
                load.push(d)
             }
         });
         dispatch({type:'load', payload:load});
        }catch(err){
            console.log(err);
            ToastAndroid.show("Something went wrong, try again later", ToastAndroid.SHORT);
        }
    }
    const [stateStore, dispatch] = useReducer(storeReducer, {StoreProducts:[]})
    return <StoreContext.Provider value={{stateStore, getProducts}}>{children}</StoreContext.Provider>
}

export default StoreContext;