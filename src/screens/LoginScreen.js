/* eslint-disable react/no-unescaped-entities */
import React, { useState, /*useContext*/ } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
// import { Context as GlobalContext } from '../context/GlobalContext';

const LoginScreen = () => {
  const [textFields, setTextFields] = useState({
    username: '',
    password: '',
  });

  // const { emailPasswordLogin } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.mainheader}>Flingr</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textinput}
          underlineColorAndroid='transparent'
          placeholder='Username'
          placeholderTextColor='#ffffff'
          onchangeText={(username) => setTextFields({ ...textFields, username })}
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.textinput}
          underlineColorAndroid='transparent'
          placeholder='Password'
          placeholderTextColor='#ffffff'
          onchangeText={(password) => setTextFields({ ...textFields, password })}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => console.log('navigate to create account screen')} style={styles.button}>
        <Text style={styles.buttontext}>Don't have an account? Signup here!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
    alignItems: 'center',
    justifyContent: 'center'
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

  textInput: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10

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