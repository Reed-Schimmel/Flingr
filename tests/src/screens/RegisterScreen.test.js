/* eslint-disable no-undef */
import React from 'react';
// import ReactDOM from 'react-dom';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { mount } from 'enzyme';
import { Provider } from '../../../src/context/GlobalContext';
import RegisterScreen from '../../../src/screens/RegisterScreen';

// TESTING RESOURCES USED:
// Testing with Jest and Enzyme
// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
// https://www.robinwieruch.de/react-testing-jest-enzyme
// Testing React Context
// https://testing-library.com/docs/example-react-context

Alert.alert = jest.fn();

describe('<LoginScreen />', () => {
  const registerComponent = mount(<Provider><RegisterScreen /></Provider>);

  it('renders correctly', () => {
    expect(registerComponent).toMatchSnapshot();
  });

  it('renders three text fields (email, username, password)', () => {
    expect(registerComponent.find(TextInput).length).toEqual(3);
  });

  it('has a register button', () => {
    const registerButton = registerComponent.find(TouchableOpacity).first();
    expect(registerButton.text()).toEqual('Register');
  });

  // it('fires an alert if text fields empty', () => {
  //   const loginButton = loginComponent.findWhere(n => n.props().id == 'loginButton');
  //   loginButton.simulate('click');
  //   expect(Alert.alert).toHaveBeenCalled();
  // });
});