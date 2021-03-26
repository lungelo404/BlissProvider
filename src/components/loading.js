import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';


const Loading = ({navigation})=>{
    return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#68823b" />
        </View>
    )
}

export default Loading;