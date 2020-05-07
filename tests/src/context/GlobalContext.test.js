/* eslint-disable no-undef */
import React, { useContext } from 'react';
// import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Context, Provider } from '../../../src/context/GlobalContext';

/**
 * @jest-environment jsdom
 */

// TESTING RESOURCES USED:
// Testing with Jest and Enzyme
// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
// https://www.robinwieruch.de/react-testing-jest-enzyme
// Testing React Context
// https://testing-library.com/docs/example-react-context

afterEach(cleanup);

const TestGlobalContext = (props) => {
  const {
    state,
    emailPasswordLogin,
    setCoords,
    goBackHome,
    setARscreen,
  } = useContext(Context);

  const clickEvent = () => {
    switch(props.test) {
    case 'setARscreen': {
      setARscreen('setBase');
      break;
    }

    case 'setCoords': {
      setCoords({
        coords: {
          longitude: 10,
          latitude: 10,
          altitude: 10,
          accuracy: 10,
          altitudeAccuracy: 10,
        },
      });
      break;
    }

    case 'emailPasswordLogin': {
      emailPasswordLogin(props.email, props.password);
      break;
    }

    case 'goBackHome': {
      setARscreen('something went wrong');
      goBackHome();
      break;
    }
      
    default: null;
    }
  };

  return (
    <div>
      <button onClick={clickEvent}>update</button>
      <p>userAuth {state.userAuth}</p>
      <p>userData {state.userData.username}</p>
      <p>loginError {state.loginError}</p>
      <p>renderedBases {state.renderedBases}</p>
      <p>ARscreen {state.ARscreen}</p>
      <p>longitude {state.coords.longitude}</p>
      <p>latitude {state.coords.latitude}</p>
      <p>altitude {state.coords.altitude}</p>
      <p>accuracy {state.coords.accuracy}</p>
      <p>altAcc {state.coords.altitudeAccuracy}</p>
    </div>
  );
};

// tests initial state
test('correct initial state', () => {
  const { getByText } = render(<Provider><TestGlobalContext /></Provider>);

  expect(getByText(/userAuth/i).textContent).toBe('userAuth ');
  expect(getByText(/userData/i).textContent).toBe('userData ');
  expect(getByText(/loginError/i).textContent).toBe('loginError ');
  expect(getByText(/renderedBases/i).textContent).toBe('renderedBases ');
  expect(getByText(/ARscreen/i).textContent).toBe('ARscreen ');
  expect(getByText(/longitude/i).textContent).toBe('longitude ');
  expect(getByText(/latitude/i).textContent).toBe('latitude ');
  expect(getByText(/altitude/i).textContent).toBe('altitude ');
  expect(getByText(/accuracy/i).textContent).toBe('accuracy ');
  expect(getByText(/altAcc/i).textContent).toBe('altAcc ');
});

// Tests setARscreen action
test('setARscreen action working', () => {
  const { getByText } = render(<Provider><TestGlobalContext test="setARscreen" /></Provider>);
  fireEvent.click(getByText('update'));
  expect(getByText(/ARscreen/i).textContent).toBe('ARscreen setBase');
});

// tests setCoords action
test('setCoords action working', () => {
  const { getByText } = render(<Provider><TestGlobalContext test="setCoords" /></Provider>);
  fireEvent.click(getByText('update'));
  expect(getByText(/longitude/i).textContent).toBe('longitude 10');
  expect(getByText(/latitude/i).textContent).toBe('latitude 10');
  expect(getByText(/altitude/i).textContent).toBe('altitude 10');
  expect(getByText(/accuracy/i).textContent).toBe('accuracy 10');
  expect(getByText(/altAcc/i).textContent).toBe('altAcc 10');
});

// Tests goBackHome action
test('goBackHome action working', () => {
  const { getByText } = render(<Provider><TestGlobalContext test="goBackHome" /></Provider>);
  fireEvent.click(getByText('update'));
  expect(getByText(/ARscreen/i).textContent).toBe('ARscreen ');
});
