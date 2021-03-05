import React, {useContext} from 'react';

import AuthContext from "../context/authContext";
import {navigate} from "../navigationRef"

const ResolveAuth  = ({navigation})=>{
    const {stateAuth, checkForToken} = useContext(AuthContext);
    checkForToken();
    return null 
}
     
export default ResolveAuth;