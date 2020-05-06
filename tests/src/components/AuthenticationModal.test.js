/* eslint-disable no-undef */
import React, { useState as useStateMock } from 'react';
// import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from '../../../src/context/GlobalContext';
import AuthenticationModal from '../../../src/components/AuthenticationModal';

// TESTING RESOURCES USED:
// Testing with Jest and Enzyme
// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
// https://www.robinwieruch.de/react-testing-jest-enzyme
// Testing React Context
// https://testing-library.com/docs/example-react-context

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