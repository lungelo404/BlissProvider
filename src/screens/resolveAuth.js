import React, {useContext} from 'react';

import AuthContext from "../context/authContext";


const ResolveAuth  = ({navigation})=>{
    const {stateAuth, checkForToken} = useContext(AuthContext);
    checkForToken((token)=>{ 
        if(token){
            navigation.navigate('mainFlow');
            return
        }
        navigation.navigate("loginFlow")
    });
    return null 
}
     
export default ResolveAuth;