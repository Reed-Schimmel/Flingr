import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, StatusBar, Modal, Text, View, SafeAreaView, TouchableHighlight } from 'react-native'; //Animate
import MapScreen from './MapScreen';
import FloatingButton from '../components/FloatingButton'
//import { Context } from '../context/GlobalContext';
export default (props) => {
    const [state, setState] = useState({
        isModalVisible: true
    })

    const getMod = () => {
        if (state.isModalVisible == false)
            setState({ isModalVisible: true })
        else
            setState({ isModalVisible: false })
    }
    const setBase = () => {
        
    }

    //const { userAuth, loginError } = useContext(Context)
    return (
        //login popup, ar button, map screen, mini map style
        <><FloatingButton title="Log Out" onPress={getMod} style = {styles.FloatingButton}/>
        <MapScreen/>
        <FloatingButton title={["Create Base"]} onPress={setBase}/>
            <>
           <Modal
           animationType="slide"
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
         </Modal></>
         
         </>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.
        backgroundColor: '#FFF'
    },

    map: {
        ...StyleSheet.absoluteFillObject,
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











