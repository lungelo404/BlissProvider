import React,{useState, useContext} from 'react';
import {StyleSheet, View, Text, FlatList,TouchableOpacity, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';

import ShopProducts from "../components/shopProducts";
import {StoreProducts}  from "../storeProvider";
import DividerWithTextInbetween from "../components/dividerWithTextInbetween";
import CartContext from "../context/Cart";
import StoreContext from "../storeProvider";
const Shop = ({navigation})=>{
    const [searchValue, setSearchValue] = useState('');
    const {stateCart} = useContext(CartContext); 
    const {stateStore} = useContext(StoreContext);
    const [list, setList] = useState(stateStore.StoreProducts);
    const [filterList, setFilterList] = useState(stateStore.StoreProducts);

    const handleSearch =(text)=>{
        setSearchValue(text); 
        if(text === ' '){
            setList(list);
            return; 
        }
        setList(filterList.filter(item=>{
            return item.name.includes(text);
        }))
    }

    return(
        <View style={{flex: 1}}>
               {!stateCart.product.name.length ? 
                   <View style={styles.cartDesign}>
                        <TouchableOpacity>
                          <Ionicons name="cart" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.Design}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Checkout',{name:'Hello'})}>
                           <Ionicons name="cart" size={35} color="white" />
                        </TouchableOpacity>
                   </View>
                } 
            <View style={styles.textContainer}>
                 <AntDesign style={styles.icon} name="search1" size={24} color="gray" />
                 <TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="Search" value={searchValue} onChangeText={(text=>handleSearch(text))}/>
             </View>
            <View style={styles.parentContainer}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={list}
                  keyExtractor={(key)=>key._id.toString()}
                  renderItem={({item})=>{
                      return( 
                        <ShopProducts name={item.name} price={item.price} rating={item.rating} reviews={item.reviews} Image={item.Image} navigation={navigation} />
                      )
                  }}
                />
            </View>
               <DividerWithTextInbetween title=' ' />
                <DividerWithTextInbetween title=' ' />
                <DividerWithTextInbetween title=' ' />
                <DividerWithTextInbetween title=' ' />
                
        </View> 
    ) 
}


const styles = StyleSheet.create({
    cartDesign:{
        position:'absolute',   
        right:20,
        bottom:40,
        backgroundColor:'lightgrey',
        padding:10,
        borderRadius:100,
        zIndex:10
    },
    Design:{
        position:'absolute',   
        right:20,
        bottom:40,
        backgroundColor:'#68823b',
        padding:10,
        borderRadius:100,
        zIndex:10
    },
    icon:{
        marginTop:15,
        marginLeft:10
    },
    parentContainer:{
        marginHorizontal:15,
        marginVertical:20,
        marginBottom:75,
        zIndex:-10
        
    },
    textContainer:{
        backgroundColor:'#eee',
        height:55,
        borderRadius:50,
        marginHorizontal:15,
        marginTop:15,
        flexDirection:'row'
    },
    textInput:{
        paddingLeft:10,
        color:'grey'
    }
});

export default withNavigation(Shop); 