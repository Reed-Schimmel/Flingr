//Description: Registration screen for app
//Author: Jamima Abdul Hakkeem
import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Context as GlobalContext } from '../context/GlobalContext';

const RegisterScreen = (props) => {

  const [textFields, setTextFields] = useState({
    email: '',
    username: '',
    password: '',
  });

  //Function that sets email, username and password
  const { emailPasswordCreateAccount, state: { loginError } } = useContext(GlobalContext);

  // checks validity when register button is pressed
  const onRegisterPress = () => {


    if (textFields.email.length === 0 && textFields.username.length === 0 && textFields.password.length === 0) {
      Alert.alert('Please enter the text fields to continue!');
    }
    else if (textFields.email.length === 0) {
      Alert.alert('Please enter an email to continue!');
    }

    else if (textFields.username.length === 0) {
      Alert.alert('Please enter a username to continue!');
    }

    else if (textFields.password.length === 0) {
      Alert.alert('Please enter a password to continue!');
    }

    else if (textFields.email.length > 0 && textFields.username.length > 0 && textFields.password.length > 0) {
      emailPasswordCreateAccount(textFields.email, textFields.password, textFields.username);
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
          placeholderTextColor= '#ffffff'
          value={textFields.email}
          onChangeText={(email) => setTextFields({ ...textFields, email })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textinput}
          underlineColorAndroid='transparent'
          placeholder='Username'
          placeholderTextColor= '#ffffff'
          value={textFields.username}
          onChangeText={(username) => setTextFields({ ...textFields, username })}
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.textinput}
          underlineColorAndroid='transparent'
          placeholder='Password'
          placeholderTextColor= '#ffffff'
          value={textFields.password}
          onChangeText={(password) => setTextFields({ ...textFields, password })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
        <Text style={styles.buttontext}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigateLogin()} style={styles.button}>
        <Text style={styles.buttontext}>Already have an account? Login here!</Text>
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
    color: '#ffffff',
    marginVertical: 10,
    height: 40,
  },

  mainheader: {
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#f5f5f5',
    fontSize: 50,
    marginBottom: 40
  },

  button: {
    width: 300,
    marginVertical: 10,
    paddingVertical: 12,
    backgroundColor: '#1c313a'
  },

  buttontext: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',

  }
});

export default RegisterScreen;
