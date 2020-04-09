import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

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
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

var ar = ["AR page"];
var map = ["Map page"];


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
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <SafeAreaView style={localStyles.container}>
        <ScrollView style = {{backgroundColor: "white"}}>
          <Text style ={localStyles.titleText}>This is the home page.</Text>
        </ScrollView>
      
        <View style={localStyles.inner} >
          <TouchableHighlight style={localStyles.buttons} onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons} onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
                              underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>MAP</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
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
  _getVRNavigator() {
    return (
      <SafeAreaView style={localStyles.container}>
        <ScrollView style = {{backgroundColor: "white"}}>
          <Text style ={localStyles.titleText}>This is the Map Page.</Text>
        </ScrollView>
        <View style={localStyles.outer} >
          <TouchableHighlight style={localStyles.backButton} onPress={this._getExperienceButtonOnPress(UNSET)}
                              underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>back</Text>
          </TouchableHighlight>
          </View>
     </SafeAreaView>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }
  




  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight, // for Android. If this looks weird in iOS tell Reed.

      },
  outer : {
    alignSelf: "flex-start",
    marginTop: 25,
    marginLeft: 5,
    position: "absolute"
   
  },
  inner: {
    flex : .225,
    justifyContent: "space-evenly",
    flexDirection: 'row',
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
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    
    height: 80,
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
    height: 50,
    width: 75,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
module.exports = Flingr


