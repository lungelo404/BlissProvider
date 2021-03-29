import React, { useState,useContext } from 'react';
import {StyleSheet, View, Text, Flatlist, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { NavTitle } from '../components/headers';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import {withNavigation} from 'react-navigation'
import {StoreProducts}  from "../storeProvider";
import { Image } from 'react-native';
import { Button, AirbnbRating, Avatar, Overlay, Divider, SearchBar } from 'react-native-elements';
import DividerWithTextInbetween from "../components/dividerWithTextInbetween";
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Datepicker } from '@ui-kitten/components';
import CartContext from "../context/Cart";
import LocationContext from "../context/locationContext";
import AuthContext from "../context/authContext";
import {Processing} from "../components/processing";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ToastAndroid } from 'react-native'; 
import Review from '../components/review'  
import AddressOverlay from '../components/headers';
import { add } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import * as Location from 'expo-location';

 
const Checkout = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    const {stateCart, addProduct} = useContext(CartContext)
    const {stateLocation, setCoords, setAddress} = useContext(LocationContext);
    const addressObject = stateLocation.address[0];
    const {stateAuth, order} = useContext(AuthContext);
    const [load, setLoad] = useState(false);
    const [visibiliy, setVisibilty] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState(1)
    const [subtotal, setSubTotal] = useState(parseFloat(stateCart.product.price));
    const [travel, setTravel] = useState(100)
    let outstanding = parseFloat(subtotal) + parseFloat(travel) - parseFloat(stateAuth.userDetails.balance) ;
    const [addressModal, setAddressModal] = useState(false);
    const [address, setAddresss]= useState('');
    const [addressString, setAddressString] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
 
        
    let outstandingAmount  
    if(outstanding > 0){  
        var convert  = outstanding.toString();
        outstandingAmount = convert.substring(0,50);
    }
    if(outstanding <= 0){
        outstanding = 0;
        var convert  = outstanding.toString();
         outstandingAmount = convert.substring(0,50);
    }

    const handlePress = async (fetchDetails, place_id)=>{
        const res = await fetchDetails(place_id);
        const longitude = res.geometry.location.lng;
        const latitude = res.geometry.location.lat;
        setLat(latitude);
        setLong(longitude);
        let geoCode = await Location.getCurrentPositionAsync({});
        setCoords(geoCode)
        const reverseGeoCodeParameters = {latitude,longitude}
        let reversedCode =  await Location.reverseGeocodeAsync(reverseGeoCodeParameters);
        setAddress(reversedCode);
        setAddressModal(false);
    } 


    
    const handleConfirm = ()=>{
        setProcessing(true);
        setTimeout(handleConfirms,3000);
    }


    const handleConfirms = ()=>{
        if(outstanding > 0){
            setAmount(parseFloat(outstandingAmount).toFixed(2))
            setVisibilty(true);
            setProcessing(false);
            return
        }
        const orderObj = {
            latitude:stateLocation.coords.coords.latitude, 
            longitude:stateLocation.coords.coords.longitude,
            address:`${addressObject.name} ${addressObject.street}, ${addressObject.district}, ${addressObject.city}, ${addressObject.region}, ${addressObject.postalCode}, ${addressObject.isoCountryCode}`, 
            by:'Provider',
            total:subtotal + travel,
            deliveryFee:travel,
            quantity:quantity,
            Image:stateCart.product.Image,
            name:stateCart.product.name
        }  
 
        order(stateAuth.userDetails._id, stateCart.product._id, orderObj,()=>{
            ToastAndroid.show('order has been confirmed', ToastAndroid.SHORT);
            setProcessing(false);
            navigation.navigate('Orders'); 
        });


       
 
    }

    const handleSubtraction = ()=>{
        if(quantity === 1 ){
            ToastAndroid.show("quantity cannot be less than one", ToastAndroid.SHORT);
            return
        }
        setQuantity(quantity - 1);
        setSubTotal(parseFloat(stateCart.product.price) * (quantity - 1));
    } 
    const handleAdd = ()=>{
        setQuantity(quantity + 1);
        setSubTotal(parseFloat(stateCart.product.price) * (quantity + 1));
    }
   
    if(fontsLoaded){
        return(
              <View style={{flex:1, backgroundColor:'#fff', paddingHorizontal:15}}>
               <ScrollView style={{flex:1}}> 
                <View style={styles.productContainer}> 
                    <View style={{flex:3}}>
                        <Avatar size='xlarge' source={{uri:stateCart.product.Image}} />
                    </View>
                    <View style={{flex:3, align: 'flex-start'}}>
                        <Text style={styles.name}>{stateCart.product.name}</Text>
                        <View style={{marginRight:50}}> 
                            <AirbnbRating isDisabled showRating={false} defaultRating={stateCart.product.rating} count={5} size={18} />
                        </View>
                        {/* <View>
                            <Text style={styles.price}>R {parseFloat(stateCart.product.price).toFixed(2)}</Text>
                        </View> */}
                    </View>
                </View>

                <View style={styles.quantityContainer}>
                    <View style={styles.inside}>
                        <TouchableOpacity onPress={()=>handleSubtraction()} style={styles.opacity}>
                            <AntDesign name="minus" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.quantity}>{quantity}</Text>

                        <TouchableOpacity onPress={()=>handleAdd()} style={styles.opacity}>
                            <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <DividerWithTextInbetween title="Delivery details" />

                <View style={styles.namesContainer}>
                            <Text style={styles.key}>Address:</Text>
                            <View style={styles.childContainer}>
                                <Text style={styles.child}>{addressObject.name} {addressObject.street}, {addressObject.district}, {addressObject.city}, {addressObject.region}, {addressObject.postalCode}, {addressObject.isoCountryCode}</Text>
                                <TouchableOpacity onPress={()=>setAddressModal(true)} style={styles.changeContainers}>
                                    <Text style={styles.change}>Change Address</Text>
                                </TouchableOpacity>
                            </View>
                 </View>
  
                 <DividerWithTextInbetween title="Payment" />
                 <Review keys='Subtotal' value={`R ${parseFloat(subtotal).toFixed(2)}`} />
                 <Review keys='Delivery fee' value={`R ${parseFloat(travel).toFixed(2)}`} />
                 <Review keys='Total' value={`R ${(parseFloat(travel) + parseFloat(stateCart.product.price)).toFixed(2) }`} />
                 <Review keys='Available credit' value={`R ${parseFloat(stateAuth.userDetails.balance).toFixed(2)}`} />
                 <Review keys='Amount to pay' value={`R ${parseFloat(outstandingAmount).toFixed(2)}`} />

                 <Processing processing={processing} />
               </ScrollView>
               <View style={styles.footer}>
                <View style={styles.footerContainer}>


                    <TouchableOpacity onPress={()=>{
                        var details = {name:''}
                        addProduct(details, ()=>{
                            ToastAndroid.show('Order cancelled succesfull', ToastAndroid.SHORT);
                            navigation.navigate('Products');
                        })
                    }}>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.cancel}>Cancel</Text>
                            <MaterialIcons  style={{textAlign:'center'}} name="cancel" size={24} color="#e74311" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleConfirm()}>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.confirm}>Confirm</Text>
                            <Entypo name="check" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    
 
                </View>
            </View>

            <DividerWithTextInbetween title="" />
            <DividerWithTextInbetween title="" />
         
       



            <Overlay
                animationType="fade" 
                overlayStyle={styles.overlay} 
                onBackdropPress={()=>console.log('Wait for the process to finish first')} 
                isVisible={visibiliy} 
            >
                <View style={{margin:15}}>
                    <View>
                        <Text style={styles.head}>Insufficient funds</Text>
                        <Text style={styles.walletMessage}>You wallet balance is not enough to confirm the booking, please load your wallet to continue</Text>
                        <View style={styles.choiceContainer}>
                            <View >
                                <TouchableOpacity onPress={()=>setVisibilty(false)}>
                                    <Text style={styles.cancelWallet}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>{setLoad(true)}}>
                                    <Text style={styles.loadWallet}>load wallet</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {load?
                        <View style={styles.amountContainer}>
                               <View style={styles.textContainer}>
                                    <Text style={{color:'gray', fontWeight:'bold',fontSize:16, textAlign:'center', flex:1}}>R</Text>
                                    <TextInput style={{...styles.amountInput, flex:5}} value={amount} placeholder="minimum 100.00" onChangeText={(text)=>setAmount(text)} />
                               </View>
                               {amount >= 100 ?
                               <Button  onPress={()=>{
                                     navigation.navigate('LoadWallets',{amount:parseFloat(amount)});
                                     setVisibilty(false);
                                     ToastAndroid.show('...LOADING', ToastAndroid.LONG);
                                    
                                    }
                                    } title='NEXT' titleStyle={{fontFamily:'Nunito_300Light'}} buttonStyle={{borderRadius:0, backgroundColor:'#68823b'}}/>
                                    :
                               <Button  onPress={()=>console.log("Going no where")} titleStyle={{color:'black',fontFamily:'Nunito_300Light'}} title='NEXT' buttonStyle={{borderRadius:0, backgroundColor:'#eee'}}/>    
                               }
                        </View>
                        :
                        null
                        }
                    </View>
                </View>

            </Overlay>



            <Overlay
                animationType='slide'
                overlayStyle={styles.Overlay}
                onBackdropPress={()=>setAddressModal(false)}
                isVisible={addressModal}
            >
             <View>
             <GoogleAutoComplete components="country:za" apiKey="AIzaSyApd5HqIt3zTKiH-Zgrh2ZUoDJAmR00Fm8" debounce={200} minLength={2}>
                {({handleTextChange, locationResults, fetchDetails})=>(
                    <React.Fragment>
                        <View>
                            <SearchBar style={{fontSize:10}} placeholder="Enter Street address e.g 85 Bliss Street" platform="ios" cancelButtonTitle=""
                                onChangeText={(text)=>{  
                                    handleTextChange(text)
                                    setAddresss(text)
                                }}
                                value={address}
                            />
                            <FlatList
                                data={locationResults} 
                                keyExtractor={(key)=>key.description}
                                renderItem={({item})=>{  
                                    return (
                                    <TouchableOpacity onPress={()=>handlePress(fetchDetails,item.place_id)}>
                                             <View style={styles.locationContainer}>
                                                <MaterialCommunityIcons name="map-marker-radius" size={24} color="#bbbbbb" />
                                                <Text style={{fontSize:12, color:'#000000', fontFamily:'Nunito_300Light'}}> {item.description}</Text>
                                            </View>
                                    </TouchableOpacity>
                                        )
                                }}
                             />


                        </View>
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
             </View>
            </Overlay>


            



            </View>    
        )
    }
    return (
        <Text>...loading</Text>
    )
} 

const styles = StyleSheet.create({
    opacity:{
        backgroundColor:'#eee',
        borderRadius:50,
        padding:10
    },
    quantity:{
        fontSize:20
    },
    inside:{
        flexDirection:'row',
       backgroundColor:'#fff',
       width:150,
       justifyContent:'space-between',
       marginVertical:15
    },
    quantityContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'#68823b',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 12,
    },
    footerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,
        paddingVertical:15
    },
    confirm:{
        color:'#fff',
        fontSize:16,
        fontFamily:'Nunito_300Light'
    },
    cancel:{
        color:'red',
        fontSize:16,
        fontFamily:'Nunito_300Light'
    },
    namesContainer:{
        flexDirection:'row',
        marginVertical:5
    },
    key:{
        flex:3,
        fontSize:12,
        fontFamily:'Nunito_300Light',
        color:'black'
    },
    child:{
        fontSize:12,
        fontFamily:'Nunito_300Light',
        color:'gray'
    },
    childContainer:{
        flex:3
    },
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
    },
    overlay:{
        width:'85%'
    },
    head:{
        fontSize:16,
        marginVertical:6,
        color:'#68823b',
        fontFamily:'Nunito_400Regular'
    },
    walletMessage:{
       fontSize:14,
       fontFamily:'Nunito_300Light',
       color:'grey'
    },
    choiceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10
    },
    cancelWallet:{
        fontSize:15,
        color:'gray',
        fontFamily:'Nunito_400Regular'
    },
    loadWallet:{
        fontSize:15,
        color:'#68823b',
        fontFamily:'Nunito_400Regular'
    },

    amountContainer:{
        marginVertical:10
        
    },
    textContainer:{
        height:55,
        justifyContent:'center',
        backgroundColor:'#ddd',
        alignItems:'center',
        marginVertical:10,
        flexDirection:'row'
    },
    changeContainer:{
       marginVertical:15
    },
    change:{
        fontSize:10,
        marginTop:20,
        color:'#68823b'
    },
    Overlay:{
        height:350,
        width:'100%',
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'#fff' 
    },
    locationContainer: {
        flexDirection:'row',
        padding: 10,
        marginTop: 2,
        backgroundColor: '#fff',
        borderTopColor: '#f4f4f4',
        borderTopWidth: 2,
        borderRadius: 5,
        color: '#222',
        fontSize:13
    }  


});

Checkout.navigationOptions = ({navigation})=>{
    return{
        headerTitle:()=> <NavTitle navigation={navigation} title='Checkout' forward='Products'  />,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('productDetail')}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}

export default Checkout