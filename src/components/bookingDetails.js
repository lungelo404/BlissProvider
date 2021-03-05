import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const BookingDetails = ({navigation, param, Key, Value})=>{
    return(
        <View>
            {param?
            <TouchableOpacity onPress={()=>navigation.navigate(param)}>
                <View style={styles.confirmation} >
                    <Text style={styles.key} >{Key}</Text>
                    <Text style={styles.child}>{Value}</Text>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity>
                 <View style={styles.confirmation} >
                    <Text style={styles.key} >{Key}</Text>
                    <Text style={styles.child}>{Value}</Text>
                </View>
           </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    confirmation:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:5
    },
    key:{
        fontSize:11,
        flex:3,
        fontFamily:'Nunito_300Light'
    }, 
    child:{
        fontSize:11,
        flex:3,
        fontFamily:'Nunito_300Light',
        color:'gray'
    }
})

export default BookingDetails;  