import React, { useContext } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {NavTitle, TitleHeaderz} from "../components/headers";
import AuthContext from '../context/authContext';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';

const Wallet = ({navigation})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light});
    const {stateAuth} = useContext(AuthContext);
    const history = [
        {
            type:'Widthdrawal',
            date:new Date().toDateString(),
            amount:'20',
            _id:1
        },
        {
            type:'Deposit',
            date:new Date().toDateString(),
            amount:'70',
            _id:2
        },
        {
            type:'Withdrawal',
            date:new Date().toDateString(),
            amount:'100',
            _id:3
        },

        {
            type:'Deposit',
            date:new Date().toDateString(),
            amount:'150',
            _id:4
        },

        {
            type:'Withdrawal',
            date:new Date().toDateString(),
            amount:'200',
            _id:5
        },

        {
            type:'Deposit',
            date:new Date().toDateString(),
            amount:'250',
            _id:6
        },


        
    ]
    if(fontsLoaded){
        return(      
            <View style={{backgroundColor:'#fff', flex:1}}>
                <View>
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Wallet Balance:</Text>
                        <Text style={styles.money}>R {parseFloat(stateAuth.userDetails.balance).toFixed(2)}</Text>
                    </View>
                    <View style={styles.walletContainer}>
                        <Text style={styles.heading}>Reserved funds:</Text>
                        <Text style={styles.money}>R {parseFloat(stateAuth.userDetails.reserved).toFixed(2)}</Text>
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
                                        <Text style={styles.date}>{item.date}</Text>
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
                   {!stateAuth.userDetails.wallet?
                    <Text style={styles.none}>No records yet</Text>
                    :null
                   }

                </View>


         </View>
        )
    }else{
        return <Loading />
    }
}

const styles = StyleSheet.create({
    none:{
        textAlign:'center', marginTop:180, fontSize:23, color:'grey'
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
    }

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