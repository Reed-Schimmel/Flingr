import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Context as GlobalContext } from '../context/GlobalContext';

const RegisterScreen = () => {

  const [textFields, setTextFields] = useState({
    email: '',
    username: '',
    password: '',
  });

  const { emailPasswordCreateAccount, state: { loginError } } = useContext(GlobalContext);

  const onRegisterPress = () => {
    // check for validity
    emailPasswordCreateAccount(textFields.email, textFields.password, textFields.username);
  }

  return (
    <View style ={styles.container}>
      <Text style={styles.mainheader}>Flingr</Text>
      <Text>{loginError}</Text>

      <View style ={styles.inputView}>
        <TextInput 
          style ={styles.textinput}
          underlineColorAndroid = 'transparent'
          placeholder ="Email"
          placeholderTextColor= "#ffffff"
          value={textFields.email}
          onChangeText ={(email) => setTextFields ({ ...textFields, email })}
        />
      </View>

      <View style ={styles.inputView}>
        <TextInput 
          style ={styles.textinput}
          underlineColorAndroid = 'transparent'
          placeholder ="Username"
          placeholderTextColor= "#ffffff"
          value={textFields.username}
          onChangeText ={(username) => setTextFields ({ ...textFields, username })}
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.textinput}
          underlineColorAndroid = 'transparent'
          placeholder ="Password"
          placeholderTextColor= "#ffffff"
          value={textFields.password}
          onChangeText ={(password) => setTextFields ({ ...textFields, password })}
        />
      </View>

      <TouchableOpacity style = {styles.button} onPress={onRegisterPress}>
        <Text style ={styles.buttontext}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigateLogin()} style = {styles.button}>
        <Text style ={styles.buttontext}>Already have an account? Login here!</Text>
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
  textInput: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },

  mainheader:{
    fontFamily: 'System',
    fontWeight: "bold",
    color: "#f5f5f5",
    fontSize: 50,
    marginBottom: 40
  },

  button: {
    width: 300,
    backgroundColor: '#a9a9a9',
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