import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Modal, Text, View, SafeAreaView, TouchableHighlight, Alert } from 'react-native'; //Animate
import MapScreen from './MapScreen';
import FloatingButton from '../components/FloatingButton';
//import AREntery from '../ar/AREntery'
//import { Context } from '../context/GlobalContext';
const HomeScreen = (props) => {
    const [state, setState] = useState({isModalVisible: true})
    const [base, setBases] = useState({isPin: false})

    const getMod = () => {
        if (state.isModalVisible == false)
            setState({ isModalVisible: true })
        else
            setState({ isModalVisible: false })
    }
    const setBase = () => {
        if(base.isPin == false)
        {
            Alert.alert("Important", "Are you sure you would like to set your base at your current location?",
            [
                {text: "Yes", onPress: () => {setBases({isPin: true})}, style: 'OK'},
                {text: "No", onPress: () => {setBases({isPin: false})}, style: "cancel"}
            ]);
        }
        else{
            //<AREntery/>
            return(<View><Text>ar screen</Text></View>)
        }
    }
    //const { userAuth, loginError } = useContext(Context)
    return (
        //login popup, ar button, map screen, mini map style
        <>
            <FloatingButton title="Log Out" onPress={getMod} style = {styles.FloatingButton}/>
            
            <MapScreen message = {base.isPin == false ? false : true}/> 
        
            <FloatingButton title={[base.isPin == true ? "Fire" : "Set Base"]} 
                            onPress={setBase}/>
            <Modal 
                animationType="fade"
                transparent={false}
                visible={state.isModalVisible}>

                <View style={{alignItems: "center"}}>
                    <SafeAreaView>
                        <Text>The log in/sign up component goes here
                        </Text>
                        <TouchableHighlight underlayColor = 'gray' style = {{alignItems: "center"}}
                            onPress={getMod}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </SafeAreaView>
                </View>
            </Modal>
         </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.

    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

    modal: {
        backgroundColor: "red"
    },

    FloatingButton: {
        borderRadius: 25,
        backgroundColor: "transparent", 
        borderWidth: 1,
        position: 'relative',
        bottom: 0,
        left: 10,
        height: 50,
        width: 75,

    }

});

export default HomeScreen;








