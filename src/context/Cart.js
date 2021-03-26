import React, {useReducer, useState}from 'react';


const CartContext = React.createContext();

const cartReducer = (state, action)=>{
    switch(action.type){
        case 'details':
            return {...state, product: action.payload}
        default:
            return state
    }
}  

export const CartProvider = ({children})=>{
    
    const addProduct = (details,callback)=>{
        dispatch({type:'details', payload:details});
        callback(); 
    } 
    
    const [stateCart, dispatch] = useReducer(cartReducer,{product:{name:''}});
    return <CartContext.Provider value={{stateCart, addProduct}}>{children}</CartContext.Provider>
}

export default CartContext;