import React, { useState,useContext } from 'react';
import {StyleSheet, View, Text, Flatlist, TouchableOpacity, LogBox} from 'react-native';
import { NavTitle } from '../components/headers';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import {withNavigation} from 'react-navigation'
import {StoreProducts}  from "../storeProvider";
import { Image } from 'react-native';
import { Button, AirbnbRating, Avatar, Overlay, Divider } from 'react-native-elements';
import DividerWithTextInbetween from "../components/dividerWithTextInbetween";
import { ScrollView } from 'react-native'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Datepicker } from '@ui-kitten/components';
import CartContext from "../context/Cart";
import { ToastAndroid } from 'react-native';
import {Review} from "../components/review";
import StoreContext from "../storeProvider";

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);

const ProductDetails = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    const product = navigation.state.params.name;
    const {stateCart, addProduct} = useContext(CartContext);
    const {stateStore, getProducts} = useContext(StoreContext);
    const detail = stateStore.StoreProducts.filter(function(obj){
        return obj.name === product;
    }); 
    const details = detail[0]
    const [reviews, setReviews] = useState(false);

    
    const handlePress = ()=>{
       addProduct(details, ()=>{
           ToastAndroid.show('Product added to cart, proceed to checkout', ToastAndroid.SHORT);
       })
    }

    
 
    if(fontsLoaded){
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>


                {!stateCart.product.name.length ? 
                   <View style={styles.cartDesign}>
                        <TouchableOpacity>
                          <Ionicons name="cart" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.Design}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Checkout')}>
                           <Ionicons name="cart" size={35} color="white" />
                        </TouchableOpacity>
                   </View>
                }

                    <View style={styles.cartDesign2}>
                        <TouchableOpacity onPress={()=>setReviews(true)}>
                           <Text style={{fontSize:15,fontFamily:'Nunito_400Regular', color:'#68823b'}}>See reviews</Text>
                        </TouchableOpacity>
                    </View>


               <View style={styles.containerImage}>
                   <Image style={styles.Image} source={{uri:details.Image}} />
               </View>

               <View style={{marginHorizontal:15}}>

                    <View style={styles.namesContainer}>
                        <Text style={styles.key}>Name of product:</Text>
                        <Text style={styles.child}>{details.name.substring(0,30)}...</Text>
                    </View>

                     <View style={styles.namesContainer}>
                        <Text style={styles.key}>Rating:</Text>
                        <View style={{marginRight:50}}>
                            <AirbnbRating size={18} count={5} defaultRating={details.rating} isDisabled showRating={false}/>
                        </View>
                    </View>

                    <View style={styles.namesContainer}>
                        <Text style={styles.key}>Price:</Text>
                        <Text style={{...styles.child, color:'red'}}>R {parseFloat(details.price).toFixed(2)}</Text>
                    </View>


                    <View style={{marginTop:20}}>
                        <Button onPress={()=>handlePress()} titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{borderRadius:0, backgroundColor:'#68823b'}} title="ADD TO CART" />
                    </View>
               </View>


               <Overlay
                animationType='slide'
                isVisible={reviews}
                onBackdropPress={()=>setReviews(false)}
                overlayStyle={styles.Overlay}
               >
                   <View>
                       <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>Product reviews</Text>
                       </View>

                       <ScrollView>

                            {details.reviews.map((d)=>{
                                return(
                                    <View>
                                        <View key={d._id.toString()} style={styles.reviewsContainer}>
                                            <View style={{flex:1.5}}>
                                                <Avatar size='large' rounded source={{uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}} />
                                            </View>  
                                            <View style={{flex:4}}>
                                                <Text style={styles.name}>{d.name}</Text>
                                                <Text style={styles.date}>{new Date().toDateString()}</Text>
                                                <Text style={styles.review}>{d.review}</Text>
                                            </View>
                                        </View>
                                        <DividerWithTextInbetween title="  " />
                                     </View>   
                                    )
                            })}

                    </ScrollView>
                   </View>
               </Overlay>



                

        



            </View>
        )
    }
    return (
        <View> 

        </View>
    )
} 

const styles = StyleSheet.create({
    headerText:{
        color:'#68823b'
    },
    cartDesign:{
        position:'absolute',   
        right:20,
        bottom:40,
        backgroundColor:'lightgrey',
        padding:10,
        borderRadius:100
    },
    Design:{
        position:'absolute',   
        right:20,
        bottom:40,
        backgroundColor:'#68823b',
        padding:10,
        borderRadius:100
    },
    
    cartDesign2:{
        position:'absolute',   
        left:20,
        bottom:40,
        backgroundColor:'#eee',
        padding:10,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    },

    reviewsContainer:{
     flexDirection:'row',
     marginVertical:10
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
    aboutContainer:{
        marginHorizontal:20
    },
    name:{
        fontSize:12,
        fontFamily:'Nunito_400Regular',
    },
    date:{
        fontSize:8,
        color:'gray',
        fontFamily:'Nunito_400Regular',
        marginBottom:8
    },
    review:{
        fontSize:10,
        color:'gray',
        fontFamily:'Nunito_400Regular',
    },
    button:{
        marginHorizontal:15,
        position:'absolute',
        left:0, 
        right:0,
        bottom:15
    },
    Overlay:{
        height:'95%',
        width:'95%',
    }
});

ProductDetails.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=> <NavTitle navigation={navigation} title='Product detail' forward='Products'  />,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('shop')}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
       
    }
}

export default ProductDetails