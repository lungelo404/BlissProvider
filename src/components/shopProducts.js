import React from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Avatar, AirbnbRating} from 'react-native-elements'
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import {withNavigation} from 'react-navigation'

import DividerWithTextInbetween from "../components/dividerWithTextInbetween"; 
 
const shopProducts = ({navigation, Image, name, rating,price})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    if(fontsLoaded){
    return( 
        <TouchableOpacity onPress={()=>navigation.navigate('productDetail',{name:name})}>
            <View style={styles.productContainer}> 

                    <View style={{flex:3}}>
                        <Avatar size='xlarge' source={{uri:Image}} />
                    </View>
                    <View style={{flex:3, align: 'flex-start'}}>
                        <Text style={styles.name}>{name}</Text>
                        <View style={{marginRight:50}}> 
                            <AirbnbRating isDisabled showRating={false} defaultRating={rating} count={5} size={18} />
                        </View>
                        <View>
                            <Text style={styles.price}>R {parseFloat(price).toFixed(2)}</Text>
                        </View>
                    </View>

            </View>
        </TouchableOpacity>
    )
    }  
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('productDetail')}>
            <View style={styles.productContainer}> 

                    <View style={{flex:3}}>
                        <Avatar size='xlarge' source={Image} />
                    </View>
                    <View style={{flex:3, align: 'flex-start'}}>
                        <Text style={styles.name}>{name}</Text>
                        <View style={{marginRight:50}}> 
                            <AirbnbRating isDisabled showRating={false} defaultRating={rating} count={5} size={18} />
                        </View>
                    </View>

            </View>
        </TouchableOpacity>
    )
}  


const styles = StyleSheet.create({
    Image:{
        height:120,
        width:120

    },
    productContainer:{
        flexDirection:'row',
        marginVertical:15,
        backgroundColor:'#eee',
        borderRadius:15,
    },
    name:{
        fontSize:11,
        marginVertical:10,
        fontFamily:'Nunito_300Light',
        color:'#68823b'
    },
    price:{
        color:'#e74311',
        marginVertical:15,
        fontSize:15, 
        fontFamily:'Nunito_400Regular'
    }

});


export default withNavigation(shopProducts); 