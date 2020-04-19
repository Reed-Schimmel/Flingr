import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import { Context } from '../context/GlobalContext';
import FloatingButton from '../components/FloatingButton';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE",
}

// Set base flow
// 1. confirm world location via gps
// 2. confirm compass
// 3. find world anchor
// 4. place base relative to anchor

// Fire projectile flow
// 1. find world location and orientation (gps & compass)
// 2. display projectile and UI AR
//   a. 3 DoF display (debug)
//   b. KE units input
//   c. show projectile
//   d. fire button
//   e. minimap
// 3. launching animation
// 4. record & upload launch

// Sets the default scene you want for AR and VR
var InitialARScene = require('./HelloWorldSceneAR');
var SetBaseScene = require('./SetBaseScene');
var BasicARPhysicsSample = require('./BasicPhysicsSample');

export default () => {
  const { state, actions } = useContext(Context);
  const { buttonTitle, buttonAction } = state;

  return (
    <>
      {buttonTitle !== "" && <FloatingButton
        title={buttonTitle}
        onPress={buttonAction}
      // style={styles.floatingButton}
      />}
      <ViroARSceneNavigator {...sharedProps}
        initialScene={{ scene: SetBaseScene }}
        shadowsEnabled
        extra="asdf"
      />
    </>
  );
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
