import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Overlay, Button} from 'react-native-elements';


const AddressOverlay = ({navigation, addressModal, setAddressModal})=>{
    return(
            <Overlay
                animationType='slide'
                overlayStyle={styles.Overlay}
                onBackdropPress={()=>setAddressModal(false)}
                isVisible={addressModal}
            >

                <View>
                    <Text>Search text input here lol</Text>
                </View>


            </Overlay>
    )
}

const styles = StyleSheet.create({
    Overlay:{
        height:350,
        width:'100%'
    }
});


export default AddressOverlay;