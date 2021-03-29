import React, {useState, useContext,useEffect} from 'react';
import {StyleSheet, View, Text, FlatList,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../context/authContext';
import LocationContext from '../context/locationContext';
import {Avatar} from 'react-native-elements';
import Review from './review';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const UpcomingProducts = ({navigation})=>{
    const {stateAuth} = useContext(AuthContext);
    const [list, setList] = useState(stateAuth.userDetails.Orders);
    return(
        <View>    
            <View>
                <FlatList
                    data={stateAuth.userDetails.Orders}
                    keyExtractor={(key)=>key._id}
                    renderItem={({item})=>{
                    if(!item.isDelivered){
                        return(
                        <View>
                                <View style={styles.containerImage}>
                                    <Image style={styles.Image} source={{uri:item.Image}} />
                                </View>
                                <View style={{marginHorizontal:15}}>
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Name of product:</Text>
                                            <Text style={styles.child}>{item.name}</Text>
                                        </View>
                                        
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Status:</Text>
                                            <Text style={styles.child}>{item.status}</Text>
                                        </View>
                                        {item.dateOfDelivery?
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Delivery date:</Text>
                                            <Text style={styles.child}>{item.dateOfDelivery}</Text>
                                        </View>
                                        : 
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Delivery date:</Text>
                                            <Text style={styles.child}>To be confirmed</Text>
                                        </View>
                                        }
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Quantity:</Text>
                                            <Text style={styles.child}>{item.quantity}</Text>
                                        </View>

                                        
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Delivery fee:</Text>
                                            <Text style={styles.child}>R {parseFloat(item.deliveryFee).toFixed(2)}</Text>
                                        </View>

                                        
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Cost per unit:</Text>
                                            <Text style={styles.child}>R { ((parseFloat(item.total) - parseFloat(item.deliveryFee)) / parseFloat(item.quantity)).toFixed(2) }</Text>
                                        </View>

                                        
                                        <View style={styles.namesContainer}>
                                            <Text style={styles.key}>Total:</Text>
                                            <Text style={styles.child}>R {parseFloat(item.total).toFixed(2)}</Text>
                                        </View>



                                </View>
                        </View>
                        )
                    }
                    }}
                
                /> 
                <View style={styles.spacer}>   
                </View>
           </View>
      
      
      {list.length === 0?
            <View style={styles.nothingContainer}>
                 <MaterialCommunityIcons style={styles.nothing} name="timer-sand-empty" size={24} color="black" />
                 <Text style={styles.nothing}>No records found</Text>
             </View>
        :null
      }
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

export default UpcomingProducts;