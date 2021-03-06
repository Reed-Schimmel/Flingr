//Description: Login screen for app
//Author: Jamima Abdul Hakkeem

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
import { Context as GlobalContext } from '../context/GlobalContext';


const LoginScreen = (props) => {
  const [textFields, setTextFields] = useState({
    email: '',
    password: '',
  });

  //Function that sets username and password
  const { emailPasswordLogin, state: { loginError } } = useContext(GlobalContext);

  // checks validity when login button is pressed
  const onLoginPress = () => {


    if (textFields.email.length === 0 && textFields.password.length === 0) {
      Alert.alert('Please enter a username and password to continue!');
    }

    else if (textFields.email.length === 0) {
      Alert.alert('Please enter a username to continue!');
    }

    else if (textFields.password.length === 0) {
      Alert.alert('Please enter a password to continue!');
    }

    else if (textFields.email.length > 0 && textFields.password.length > 0) {

      emailPasswordLogin(textFields.email, textFields.password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainheader}>Flingr</Text>
      <Text>{loginError}</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textinput}
          underlineColorAndroid='transparent'
          placeholder='Email'
          placeholderTextColor='#ffffff'
          onChangeText={(email) => setTextFields({ ...textFields, email })}
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.textinput}
          underlineColorAndroid='transparent'
          placeholder='Password'
          placeholderTextColor='#ffffff'
          onChangeText={(password) => setTextFields({ ...textFields, password })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onLoginPress}>
        <Text style={styles.buttontext}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => props.navigateRegister()} style={styles.button}>
        <Text style={styles.buttontext}>Don't have an account? Signup here!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(47,79,79,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },

  mainheader: {
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#f5f5f5',
    fontSize: 50,
    marginBottom: 40
  },

  inputView: {
    width: '80%',
    backgroundColor: '#2f4f4f',
    marginTop: 0,
    marginRight: 1,
    marginLeft: 0,
    borderBottomColor: '#ffffff',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },

  textinput: {
    width: 300,
    color: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 40,
    marginVertical: 10,
  },

  button: {
    width: 300,
    marginVertical: 10,
    paddingVertical: 12,
    backgroundColor: '#1c313a',
  },

  buttontext: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',

  }

});

export default LoginScreen;
