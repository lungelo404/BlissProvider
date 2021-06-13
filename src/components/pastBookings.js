import React, {useState, useContext,useEffect} from 'react';
import {StyleSheet, View, Text, FlatList,Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import AuthContext from '../context/authContext';
import { AntDesign } from '@expo/vector-icons';
import LocationContext from '../context/locationContext';
import {Avatar} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Processing } from './processing';
import Review from './review';


const PastBookings = ({navigation})=>{
    const {stateAuth} = useContext(AuthContext);
    const [list, setList] = useState(stateAuth.userDetails.Orders);
    return( 
        <View>    
         
            {stateAuth.userDetails.bookings.filter((x)=>x.isComplete === true).length === 0 ?
            <View style={styles.nothingContainer}>
                 <MaterialCommunityIcons style={styles.nothing} name="timer-sand-empty" size={24} color="black" />
                 <Text style={styles.nothing}>No records found</Text>
             </View>
             :
             <FlatList
             style={{marginBottom:150}}
             data={stateAuth.userDetails.bookings.sort((a,b)=>new Date(b.date) - new Date(a.date))}
                 keyExtractor={(k)=>k._id}
                 renderItem={({item})=>{
                  if(item.isComplete === true){
                     return( 
                         <View style={styles.parentContainer}>
                         <View>
                           <TouchableOpacity style={styles.insideContainer} onPress={()=>{navigation.navigate("bookingInfo",{item})}}>
                             <View style={styles.insideContainer}>  
                                {new Date(item.date).toDateString() === new Date().toDateString()? 
                                <Text style={styles.todaysHeader}>
                                    {new Date(item.date).toDateString()} - Today
                                </Text>
                                :
                                <Text style={styles.todaysHeader}>
                                  { new Date(item.date).toDateString()}
                                </Text>
                                 }
                                 <View style={styles.viva}>
                                     <Text style={styles.description}>{item.name}</Text>
                                     <Text style={styles.time}>{item.time}</Text>
                                     <Text style={styles.address}>{item.address}</Text>
                                 </View>
                             </View>
                           </TouchableOpacity>
                         </View>
                       </View>
                     )
                }
             }}
        />
            }
        
      </View>  
    )
}

const styles = StyleSheet.create({
    containerFirst:{
        marginHorizontal:15
    },
    todaysHeader:{
        fontSize:13,
        color:'grey'
    },
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
    insideContainer:{
        marginTop:1,
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 3,
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
    },
    parentContainer:{
        marginTop:15
      },
      header:{
        paddingHorizontal:25, 
        marginTop:20,
        paddingVertical:10,
        backgroundColor:'#fff',
         shadowColor: '#000',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity:  0.4,
         shadowRadius: 3,
        elevation: 3,
      },
      textInput:{
        color:'grey',
        backgroundColor:'#eee',
        fontSize:12
    }, 
    textContainer:{
      backgroundColor:'#eee',
      height:35,
      borderRadius:1,
      marginTop:10,
      flexDirection:'row'
  },
  icon:{
    marginTop:10,
    marginHorizontal:5
  },
  insideContainer:{
    marginTop:1,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  description:{
    fontSize:12,
    marginLeft:6,
    color:'grey',
    fontFamily:"Nunito_400Regular"
  },
  time:{
    fontSize:11,
    marginLeft:6,
    marginTop:5,
    color:"grey",
    fontFamily:"Nunito_400Regular"
  },
  address:{
    fontSize:10,
    marginLeft:6,
    marginTop:5,
    color:'grey',
    fontFamily:"Nunito_400Regular"
  },
  date:{
    fontSize:13,
    marginLeft:6,
    marginTop:5,
    fontFamily:"Nunito_400Regular"
   
  },
  viva:{
    borderLeftColor:'#68823b',
    borderLeftWidth:5,
    borderStyle:"dotted", 
  }
});

export default withNavigation(PastBookings);