import React, {useReducer} from 'react';


const LocationContext = React.createContext();

const locationReducer = (state, action)=>{
    switch(action.type){
        case 'setAddress':
            return {...state, address:action.payload}
        case 'setCoords':
            return {...state, coords:action.payload}
        default:
            return state
    }
}

export const LocationProvider = ({children})=>{
    const setAddress = (address)=>{
        dispatch({type:'setAddress', payload:address});
    }
    const setCoords = (coords)=>{
        dispatch({type:'setCoords', payload:coords});
    }

    const [stateLocation, dispatch] = useReducer(locationReducer,{
    address:[{
        "city": "...waiting",
        "country": "...waiting",
        "district": "waiting",
        "isoCountryCode": "...waiting",
        "name": "...waiting",
        "postalCode": "...waiting",
        "region": "...waiting",
        "street": "...waiting",
        "subregion": "...waiting",
        "timezone": null,
    }], 
    coords:{
        coords:{
            latitude:'... waiting',
            longitude:'... waiting'
        }
    }});

    return <LocationContext.Provider value={{setAddress, setCoords, stateLocation}}>{children}</LocationContext.Provider>
}


export default LocationContext