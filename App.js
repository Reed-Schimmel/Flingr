import React, { Component } from 'react';
import { Dimensions, Text, ScrollView, View, StyleSheet, SafeAreaView, TouchableHighlight,} from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';
import MapView, {Marker} from 'react-native-maps';

//How zoomed in the map is on the location
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

// Sets the default scene you want for AR 
var InitialARScene = require('./js/HelloWorldSceneAR');
//var InitialVRScene = require('./js/HelloWorldScene');

//Navigation types: How we navigate betweenscreens
var HOME = "HOME";
var AR_NAVIGATOR_TYPE = "AR";
var LOG_NAVIGATOR_TYPE = "Log";
var PIN_NAVIGATOR_TYPE = "Location";
var defaultNavigatorType = HOME;

//Source for getCurrentLocation function: https://github.com/react-native-community/react-native-maps/issues/1858
//This function tracks the lat. and long. of the user
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

export default class Flingr extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType : defaultNavigatorType, //state of the current screen 
      sharedProps : sharedProps, 
      addMarker : false, //set to true once a pin is added to map to save it (aka when "Edit Base" is pressed)

      //Used so that the map view starts over the users position. State is changed once they allow location services
      region: {
        latitude: 39,
        longitude: -98,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    },

  
    this.getHomeScreen = this.getHomeScreen.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this.getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  //Source for componentDidMount function: https://github.com/react-native-community/react-native-maps/issues/1858
  //Updates the state of region to that of the users current location
  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA 
          },
        });
      }
    });
  }

  //Check the state of the screen to see which screen should be rendered 
  render() {
    if(this.state.navigatorType == HOME && this.state.addMarker == false) 
      return this.getHomeScreen();
    else if(this.state.navigatorType == HOME && this.state.addMarker == true) 
      return this.addPin();
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) 
      return this._getARNavigator();
    else if (this.state.navigatorType == LOG_NAVIGATOR_TYPE) 
      return this._getLogScreen();
    else if (this.state.navigatorType == PIN_NAVIGATOR_TYPE) 
        return this.addPin();
  }

  // Home screen layout: Function is called by default
  getHomeScreen() {
    return (
      
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.region}  showsUserLocation={true}>
        <Marker coordinate = {{latitude: 0, longitude: 0}} />
        </MapView>
        <SafeAreaView><View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.backButton} onPress={this.getExperienceButtonOnPress(LOG_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableHighlight></View></SafeAreaView>
          <View style={styles.outer}>
          <TouchableHighlight style={styles.ARButton} 
                              onPress={this.getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={styles.buttonText}>AR Screen</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.ARButton} 
                              onPress={this.getExperienceButtonOnPress(PIN_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={styles.buttonText}>Edit Base</Text>
          </TouchableHighlight>
          </View>          
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

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  // Change the state of the screen depending on which button is pressed
  getExperienceButtonOnPress(navigatorType) {
    return () => {
      if(navigatorType != PIN_NAVIGATOR_TYPE)
      this.setState({navigatorType : navigatorType})
      else
      this.setState({navigatorType : navigatorType, addMarker: true})
    }
  }
  
  //Called when "Log out" is pressed
  _getLogScreen(){
    return(
      <SafeAreaView style={styles.viroContainer}>
        <ScrollView style = {{backgroundColor: "white"}}>
          <Text style ={styles.titleText}>This is the log in screen.</Text>
        </ScrollView>
       
        <TouchableHighlight style={styles.buttons}
            onPress={this._getExperienceButtonOnPress(HOME)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttons}
            onPress={this._getExperienceButtonOnPress(HOME)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableHighlight>

     </SafeAreaView>

    )
  }

  //Function is called when "Edit Base" is pressed. Adds pin to the map
  addPin() {
    return(
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.region}  showsUserLocation={true}>
          <Marker coordinate = {{latitude: this.state.region.latitude, longitude: this.state.region.longitude}} pinColor = {"red"} />
        </MapView>
        <SafeAreaView>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.backButton} onPress={this.getExperienceButtonOnPress(LOG_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={styles.buttonText}>Log Out</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
          <View style={styles.outer}>
            <TouchableHighlight style={styles.ARButton} 
                              onPress={this.getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
              <Text style={styles.buttonText}>AR Screen</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.ARButton} 
                              onPress={this.getExperienceButtonOnPress(PIN_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
              <Text style={styles.buttonText}>Edit Base</Text>
            </TouchableHighlight>
          </View>          
        </View>
      )
      
      }
    
    
  // This function "exits" Viro by setting the navigatorType to HOME.
  _exitViro() {
    this.setState({
      navigatorType : HOME
    })
  }
}

var styles = StyleSheet.create({
  viroContainer :{
    alignItems: "center",
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonContainer: {
    alignItems: "flex-start",
    marginLeft: 5,  
  },

  outer : { 
    flexDirection: "row",
    justifyContent: "space-evenly",
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