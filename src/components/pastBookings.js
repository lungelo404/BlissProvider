import React, {useState, useContext,useEffect} from 'react';
import {StyleSheet, View, Text, FlatList,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../context/authContext';
import LocationContext from '../context/locationContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';
import Review from './review';


const PastBookings = ({navigation})=>{
    const {stateAuth} = useContext(AuthContext);
    const [list, setList] = useState(stateAuth.userDetails.Orders);
    return(
        <View>    
         
            <View style={styles.nothingContainer}>
                 <MaterialCommunityIcons style={styles.nothing} name="timer-sand-empty" size={24} color="black" />
                 <Text style={styles.nothing}>No records found</Text>
             </View>
        
      </View>  
    )
}

const styles = StyleSheet.create({
    nothingContainer:{
        marginTop:190
    },
    nothing:{
        textAlign:'center',
        color:'gray',
        fontSize:20,
        fontFamily:'Nunito_300Light'
    },
    Image:{
        width:320,
        height:200,
    },
    containerImage: {
        marginHorizontal:15,
        marginVertical:10,
        alignItems:'center'
    },
    namesContainer:{
        flexDirection:'row',
        marginVertical:5
    },
    key:{
        flex:3,
        fontSize:12,
        fontFamily:'Nunito_300Light'
    },
    keys:{
        fontSize:12,
        fontFamily:'Nunito_300Light'
    },
    childs:{
        fontSize:10,
        fontFamily:'Nunito_300Light',
        color:'gray'
    },
    child:{
        flex:3,
        fontSize:12,
        fontFamily:'Nunito_300Light',
        color:'gray'
    },
    spacer:{
        marginTop:-82
    }
});

export default PastBookings;