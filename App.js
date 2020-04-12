import React, { Component } from 'react';
import { Dimensions, Text, StatusBar, ScrollView, View, StyleSheet, SafeAreaView, TouchableHighlight,} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialVRScene = require('./js/HelloWorldScene');

var UNSET = "UNSET";
var HOME_NAVIGATOR_TYPE = "Home";
var AR_NAVIGATOR_TYPE = "AR";
var LOG_NAVIGATOR_TYPE = "Log";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class Flingr extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this.getHomeScreen = this.getHomeScreen.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this.getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if(this.state.navigatorType == UNSET) 
      return this.getHomeScreen();
    else if (this.state.navigatorType == HOME_NAVIGATOR_TYPE) 
      return this.getHomeScreen();
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) 
      return this._getARNavigator();
    else if (this.state.navigatorType == LOG_NAVIGATOR_TYPE) 
      return this._getLogScreen();
    
  }

  // Home screen layout
  getHomeScreen() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} ref={ref => {this.map = ref;}} showsUserLocation={true}
          region={{
            latitude: 39,
            longitude: -98,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
        </MapView>
       
        <SafeAreaView><View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.backButton} onPress={this.getExperienceButtonOnPress(LOG_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableHighlight></View>
          <View style={styles.outer}>
          <TouchableHighlight style={styles.ARButton} 
                              onPress={this.getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={styles.buttonText}>AR Screen</Text>
          </TouchableHighlight>
          </View>
          
          </SafeAreaView>
        </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  }
  
  // Returns the ViroSceneNavigator which will start the VR experience

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }
  

  _getLogScreen(){
    return(
      <SafeAreaView style={styles.viroContainer}>
        <ScrollView style = {{backgroundColor: "white"}}>
          <Text style ={styles.titleText}>This is the log in screen.</Text>
        </ScrollView>
       
        <TouchableHighlight style={styles.buttons}
            onPress={this._getExperienceButtonOnPress(HOME_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttons}
            onPress={this._getExperienceButtonOnPress(HOME_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableHighlight>

     </SafeAreaView>

    )
  }


  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var styles = StyleSheet.create({
  viroContainer :{
    alignItems: "center",
  },

  container: {
        ...StyleSheet.absoluteFillObject,
        
        //alignItems: 'center',
        flex: 1
      },

      map: {
        ...StyleSheet.absoluteFillObject,
      },

      buttonContainer: {
        alignItems: "flex-start",
        marginLeft: 5,
        flex: 1
},
  outer : { 
    alignItems: "flex-end",
    marginRight: 5,
    flex: 1
  },

  inner: {

    justifyContent: "space-evenly",
    flexDirection: 'column',
    alignItems: "center",
    backgroundColor: "black",
  },

  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'black',
    textAlign:'center',
    fontSize : 25
  },
 
  buttons : { 
    height: 70,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  backButton : {
    height: 45,
    width: 80,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  ARButton : {
    height: 70,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  buttonText: {
        color:'black',
        textAlign:'center',
        fontSize : 20
      },
});
module.exports = Flingr

// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   TouchableHighlight,
//   TouchableOpacity,
//   AlertIOS,
//   SafeAreaView,
// } from 'react-native';
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps';

// const screen = Dimensions.get('window');

// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default class App extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView style={styles.map} ref={ref => {this.map = ref;}} showsUserLocation={true}
//           region={{
//             latitude: 39,
//             longitude: -98,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           }}>
//         </MapView>
       
//         <SafeAreaView><View style={styles.buttonContainer}>
//       <TouchableHighlight style={styles.backButton} onPress={this.fitToMarkersToMap()}
//                               underlayColor={'#68a0ff'} >
//             <Text style={styles.buttonText}>Log Out</Text>
//           </TouchableHighlight>
          
//           </View>
//           </SafeAreaView>
//         </View>
//     );
//   }
//   fitToMarkersToMap() {
    
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     //justifyContent: 'flex-end',
//     //alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   bubble: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20,
//     marginRight: 20,
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   buttonContainer: {
//     marginTop: 25,
//     marginLeft: 5,
//     position: "absolute"
//   },
//   members: {
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   backButton : {
//         height: 45,
//         width: 80,
//         paddingTop:10,
//         paddingBottom:10,
//         marginTop: 10,
//         marginBottom: 10,
//         backgroundColor:'transparent',
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: 'black',
//       },
//       buttonText: {
//             color:'black',
//             textAlign:'center',
//             fontSize : 20
//           },
// });
