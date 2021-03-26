import React, { useContext, useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, ToastAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {NavTitle, TitleHeaderz} from "../components/headers";
import AuthContext from '../context/authContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import { Button, Overlay} from 'react-native-elements';

const Wallet = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    const {stateAuth, withdraw} = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState(false);
    const [isDeposit, setDeposit] = useState(false);
      
    const formValidation = (amount)=>{
        if(!amount){
            ToastAndroid.show("Please enter a valid amount", ToastAndroid.SHORT);
            return
        } 
        if(amount < 100){
            ToastAndroid.show('Amount cannot be less than R 100.00', ToastAndroid.SHORT);
            return 
        }

        if(isDeposit){
            setModalVisible(false); 
            navigation.navigate('deposit',{amount});
        }else {
            let newBalance =  parseFloat(stateAuth.userDetails.balance) - parseFloat(amount)
            if(newBalance < 0){
                ToastAndroid.show("You cannot withdraw more than your current balance", ToastAndroid.SHORT); 
            }else{ 
                ToastAndroid.show('..updating', ToastAndroid.SHORT);
                withdraw(stateAuth.userDetails._id, amount,()=>{
                    ToastAndroid.show("Your requested has been submitted and qued reviewed.", ToastAndroid.LONG);
                    setModalVisible(false);
                });
            } 
        } 
    }  
    if(fontsLoaded){
        return(      
            <View style={{backgroundColor:'#fff', flex:1}}>
                <View>
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Wallet Balance:</Text>
                        <Text style={styles.money}>R {parseFloat(stateAuth.userDetails.balance).toFixed(2)}</Text>
                    </View>
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Reserved for booking:</Text>
                        <Text style={styles.money}>R {parseFloat(stateAuth.userDetails.reserved).toFixed(2)}</Text>
                    </View>

                    
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Reserved for withdrawal:</Text>
                        <Text style={styles.money}>R {parseFloat(stateAuth.userDetails.pending).toFixed(2)}</Text>
                    </View>  

  


                    <View style={styles.actionContainer}>
                        <Button onPress={()=>{
                            setModalVisible(true);
                            setDeposit(false);
                        }} titleStyle={styles.titleStyle2} buttonStyle={styles.buttonStyle2} title="Withdraw" />


                        <Button onPress={()=>{
                            setModalVisible(true);
                            setDeposit(true)
                        }} titleStyle={styles.titleStyle} buttonStyle={styles.buttonStyle} title="Deposit" />
                    </View>



                </View>
                
                <View style={styles.historyContainer}>
                    <Text style={styles.history}>History</Text>
                    <FlatList
                        data={stateAuth.userDetails.wallet}
                        keyExtractor={(key)=>key._id.toString()}
                        renderItem={({item})=>{
                            return(
                                <View style={styles.FlatListRow}>
                                    <View style={{}}>
                                        <Text style={styles.type}>{item.type}</Text>
                                        <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
                                     </View>
                                     <View style={{justifyContent:'center'}}>
                                         {item.type === 'Deposit'?
                                            <Text style={styles.amount}>R {parseFloat(item.amount).toFixed(2)}</Text>
                                            :
                                            <Text style={styles.amount}>R -{parseFloat(item.amount).toFixed(2)}</Text>
                                        }
                                     </View>
                                </View>
                            )
                        }}
                    />
                   {stateAuth.userDetails.wallet.length === 0?
                     <View style={styles.noneContainer}>
                         <MaterialIcons style={styles.none} name="hourglass-empty" size={50} color="black" />
                         <Text style={styles.none}>No records yet</Text>
                    </View>
                    :null
                   }
  


                </View>


















            
        <Overlay  
            animationType="slide" 
            overlayStyle={styles.overlay} 
            onBackdropPress={()=>setModalVisible(false)}
            isVisible={modalVisible}> 
            <View style={{flex:1, justifyContent:'center'}}>

            <View style={styles.phoneContainer}>
                <TouchableOpacity  style={{flex:2,marginRight:10}}>
                   <Text style={{textAlign:'center',color:'gray', fontSize:15}}>R </Text>
                </TouchableOpacity>
                <View style={{flex:4}}>
                   <TextInput value={amount} onChangeText={(text)=>setAmount(text)} style={{fontSize:15, color:'gray'}} keyboardType='number-pad' placeholder="Enter Amount"  />
                </View>    
            </View>

            {isDeposit?
                    <View style={{marginHorizontal:15}}>
                      <Button
                           buttonStyle={{backgroundColor:'#68823b',borderRadius:0}}
                           title="Deposit"
                              onPress={()=>formValidation(amount)}
                              icon={
                                  <Ionicons 
                                  style={{marginHorizontal:10}}
                                  name="add-circle-outline" 
                                  size={30} color="#fff"
                                  />
                              }
                          iconLeft
                          raised
                       />
                  </View>
                  :
                <View style={{marginHorizontal:15}}>
                  <Button
                       buttonStyle={{backgroundColor:'#68823b',borderRadius:0}}
                       title="Withdraw"
                          onPress={()=>formValidation(amount)}
                          icon={
                            <AntDesign
                            style={{marginHorizontal:10}}
                             name="minuscircleo" 
                             size={25} 
                             color="#fff"
                              />
                          }
                      iconLeft
                      raised
                   />
              </View>
        
        }
  




            </View>
        </Overlay>
            



         </View>
        )
    }else{
        return <Loading />
    }
}

const styles = StyleSheet.create({
    actionContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginVertical:15
    },
    noneContainer:{
        position:'absolute',
        left:0,
        right:0,
        top:170,
        fontSize:18
    },  
    none:{
        color:'grey',
        textAlign:'center',
        fontSize:20,
        fontFamily:'Nunito_400Regular'

    },
    history:{
      marginVertical:8,
      fontSize:14,
      color:'grey',
      fontFamily:'Nunito_400Regular' 
    },
    historyContainer:{
        backgroundColor:'#eee',
        flex:1,
        marginTop:5,
        paddingHorizontal:20
        
    },
    walletContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:5,
        marginHorizontal:20
    },
    heading:{
        fontSize:12,
        fontFamily:'Nunito_400Regular'
    },
    money:{
        fontSize:12,
        fontFamily:'Nunito_400Regular',
        fontWeight:'bold',
        color:'#68823b'
    },
    amount:{
        fontSize:8
    },
    type:{
        fontSize:10,
        color:'gray'
    },
    date:{
        fontSize:9,
        color:'#c1ccae'
    },
    FlatListRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:5
    },
    titleStyle:{
        textTransform:'uppercase',
        fontFamily:'Nunito_300Light'
    },
    
    titleStyle2:{
        textTransform:'uppercase',
        fontFamily:'Nunito_300Light',
        color:'black'
    },

    button:{
        position:'absolute',
        bottom:15,
        left:0,
        right:0,
        marginHorizontal:15
    },
    buttonStyle:{
        borderRadius:0,
        backgroundColor:'#68823b'
    },
    buttonStyle2:{
        borderRadius:0,
        backgroundColor:'#ddd'
    },
    phoneContainer:{
        marginVertical:40,
        flexDirection:'row',
        marginHorizontal:15,
        backgroundColor:'#fff',
        height:55,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        borderBottomColor:'gray',
        borderBottomWidth:8,
        borderBottomEndRadius:10,
        borderBottomLeftRadius:10
    },
    overlay:{
        backgroundColor:'#dddddd',
        width:'100%', 
        height:400,
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        marginTop:120
    },

});

Wallet.navigationOptions = ({navigation})=>{
    return{ 
        headerTitle:()=> <NavTitle title='My Wallet' navigation={navigation} />,
        headerLeft:()=>(
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>navigation.navigate('account')} >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        )
    } 
} 

export default Wallet;