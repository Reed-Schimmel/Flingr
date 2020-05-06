/* eslint-disable no-undef */
import React, { useState as useStateMock } from 'react';
// import ReactDOM from 'react-dom';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from '../../../src/context/GlobalContext';
import AuthenticationModal from '../../../src/components/AuthenticationModal';
import RegisterScreen from '../../../src/screens/RegisterScreen';
import LoginScreen from '../../../src/screens/LoginScreen';

// mocks the useState hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

// tests AuthenticationModal
describe('<AuthenticationModal />', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
  });

  it('switches between login and register', () => {
    const authenticationWrapper = mount(<Provider><AuthenticationModal /></Provider>);

    authenticationWrapper.findWhere(n => n.text() === 'Don\'t have an account? Signup here!').first().props().onPress();

    expect(setState).toHaveBeenCalled();
  });
});