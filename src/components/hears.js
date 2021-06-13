import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useFonts,Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular,Nunito_300Light} from '@expo-google-fonts/nunito';
import Loading from '../components/loading';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {DrawerAction } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import {withNavigation} from 'react-navigation';


const Header = ({navigation, title})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    if(fontsLoaded){
    return(
        <View style={styles.Header}>
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                <View style={styles.left}>
                    <Entypo name="menu" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <View style={styles.mid}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.right}>
            {/* <TouchableOpacity>
                <View style={styles.left}>
                   <MaterialIcons name="logout" size={27} color="gray" />
                </View>
            </TouchableOpacity> */}
            </View>
        </View>
    )
    }
    return <Loading />
}

const Headers = ({navigation, title})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_300Light,Nunito_400Regular});
    if(fontsLoaded){
    return(
        <View style={{...styles.Headers,paddingTop:2}}>
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                <View style={styles.left}>
                    <Entypo name="menu" size={35} color="gray" />
                </View>
            </TouchableOpacity>
            <View style={styles.mid}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.right}>
            {/* <TouchableOpacity>
                <View style={styles.left}>
                   <MaterialIcons name="logout" size={27} color="gray" />
                </View>
            </TouchableOpacity> */}
            </View>
        </View>
    )
    }
    return <Loading />
}

export const NavTitle = ({navigation, title, forward, params})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    if(fontsLoaded){
        return(
            <View style={styles.headerz}>
            {fontsLoaded?
            <View style={{flex:5, justifyContent:'center'}}>
                <Text style={{...styles.title5, fontFamily:'Nunito_400Regular'}}>{`${title}`}</Text>
            </View>
            :
            <View style={{flex:5, justifyContent:'center'}}>
                <Text style={{...styles.title}}>{`${title}`}</Text>
            </View>
                
            }
    </View>
        )
    }
    return <Loading />
} 
 
export const TitleHeaderz = ({navigation, title})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    return(
        <View style={styles.headers}>
        <View style={{ flex:1}}>
            <TouchableOpacity onPress={()=>navigation.navigate('account')}>
                 <AntDesign name="arrowleft" size={30} style={{marginLeft:5, marginTop:3}}  color="#68823b" />
            </TouchableOpacity>
        </View> 
        {fontsLoaded?
           <View style={{flex:5, justifyContent:'center'}}>
              <Text style={{...styles.title3, fontFamily:'Nunito_400Regular'}}>{title}</Text>
          </View>
          :
          <View style={{flex:5, justifyContent:'center'}}>
              <Text style={{...styles.title}}>{title}</Text>
         </View>
            
        }
   </View>
    )
}



export const TitleHeader = ({navigation, title, forward})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    if(fontsLoaded){
    return(
        <View style={styles.headerz}>
           <View style={{flex:5, justifyContent:'center'}}>
              <Text style={{...styles.title2, fontFamily:'Nunito_400Regular'}}>{title}</Text>
          </View>
          
   </View>
    )
   }
   return <Loading />
}



export const OrdersHeader = ({navigation,title1Selected,setProcessing, setTitleSelected, title2Selected,setTitleSelected2, title1, title2, forward, params})=>{
    let [fontsLoaded] = useFonts({Nunito_200ExtraLight, Nunito_600SemiBold,Nunito_400Regular});
    if(fontsLoaded){ 
    return(
        <View style={styles.headerp}>
          {title1Selected?
           <View style={{flex:5, justifyContent:'center'}}>
               <TouchableOpacity onPress={()=>{
                    setTitleSelected2(false);
                    setTitleSelected(true)
               }}>
                  <Text style={{...styles.title,fontSize:15, fontFamily:'Nunito_400Regular'}}>{`${title1}`}</Text>
               </TouchableOpacity>
          </View>
          :
          <View style={{flex:5, justifyContent:'center'}}>
               <TouchableOpacity onPress={()=>{
                   setTitleSelected2(false);
                   setTitleSelected(true)
               }}>
                  <Text style={{...styles.title,fontSize:15,color:'gray', fontFamily:'Nunito_400Regular'}}>{`${title1}`}</Text>
               </TouchableOpacity>
          </View>
         }
          
          {title2Selected?
          <View style={{flex:5, justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>{
                  setTitleSelected2(true);
                  setTitleSelected(false)
              }}>
                  <Text style={{...styles.title, fontSize:15}}>{`${title2}`}</Text>
              </TouchableOpacity>
          </View>
          :
          <View style={{flex:5, justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>{
                 setTitleSelected2(true);
                 setTitleSelected(false)
            }}>
                <Text style={{...styles.title,color:'gray', fontSize:15}}>{`${title2}`}</Text>
            </TouchableOpacity>
         </View>

          }
             
        
   </View>
    )
    }
    return null
}






const styles = StyleSheet.create({
    Header:{
        paddingTop:40,
        paddingLeft:15,
        paddingBottom:15,
        backgroundColor:"#fff",
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.4,
        // shadowRadius: 3,
        elevation: 3,
        flexDirection:'row',
        justifyContent:'center'
   
    },

    
    Headers:{
        paddingTop:15,
        paddingLeft:2,
        paddingBottom:1,
        backgroundColor:"#fff",
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.4,
        // shadowRadius: 3,

        flexDirection:'row',
        justifyContent:'center'
   
    },


    title:{
        fontSize:16,
        color:'#68823b',
        fontFamily:'Nunito_400Regular',
        textAlign:'center',
    },
    title5:{
        fontSize:16,
        color:'#68823b',
        fontFamily:'Nunito_400Regular',
    },

    title3:{
        fontSize:18,
        color:'#68823b',
        fontFamily:'Nunito_400Regular',

    },

    title2:{
        fontSize:16,
        color:'#68823b',
        fontFamily:'Nunito_400Regular',
       
    },

    left:{
        flex:1
    },
    right:{
        flex:1
    },
    mid:{
        flex:4,
        alignItems:'center',
    },
    headerz:{
        backgroundColor:"#fff",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headers:{
        paddingTop:7, 
        paddingHorizontal:15,
        paddingBottom:12,
        backgroundColor:"#fff",
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.4,
        // shadowRadius: 3,

        flexDirection:'row',
        justifyContent:'space-between'
    },
    headerp:{
        paddingTop:35 ,
        paddingHorizontal:15,
        paddingBottom:12,
        backgroundColor:"#fff",
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity:  0.4,
        // shadowRadius: 3,
        elevation: 3,
        flexDirection:'row',
        justifyContent:'space-between'
    }, 
})

export default withNavigation(Headers);