/* eslint-disable no-undef */
import React from 'react';
// import ReactDOM from 'react-dom';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { mount } from 'enzyme';
import { Provider } from '../../../src/context/GlobalContext';
import LoginScreen from '../../../src/screens/LoginScreen';

// TESTING RESOURCES USED:
// Testing with Jest and Enzyme
// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
// https://www.robinwieruch.de/react-testing-jest-enzyme
// Testing React Context
// https://testing-library.com/docs/example-react-context

Alert.alert = jest.fn();

describe('<RegisterScreen />', () => {
  const loginComponent = mount(<Provider><LoginScreen /></Provider>);

  it('renders correctly', () => {
    expect(loginComponent).toMatchSnapshot();
  });

  it('renders two text fields', () => {
    expect(loginComponent.find(TextInput).length).toEqual(2);
  });

  it('has a login button', () => {
    const loginButton = loginComponent.find(TouchableOpacity).first();
    expect(loginButton.text()).toEqual('Login');
  });

  // it('fires an alert if text fields empty', () => {
  //   const loginButton = loginComponent.findWhere(n => n.props().id == 'loginButton');
  //   loginButton.simulate('click');
  //   expect(Alert.alert).toHaveBeenCalled();
  // });
});