import * as firebase from 'firebase';
import createDataContext from './createDataContext';

// these are just to ensure string consistency
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILURE = 'login_failure';

// default user document fields when a new user is generated
const DEFAULT_USER_DOC = {
  outgoingFlings: [],
  incomingFlings: [],
  homeLatitude: undefined,
  homeLongitude: undefined,
}

// REDUCER
// a reducer processes actions and updates the state
const reducer = (state, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userAuth: action.payload,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload,
      }
    default:
      return state;
  }
}

// ACTIONS
// actions take the form of an object with 2 key/value pairs:
// { type, payload }
// type is a string, which specifies which action we are dispatching to the reducer
// payload is the data associated with the action, usually used to update state

const emailPasswordLogin = (dispatch) => (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredentials) => dispatch({ type: LOGIN_SUCCESS, payload: userCredentials }))
    .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: e }));
}

const emailPasswordCreateAccount = (dispatch) => (email, password, username) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      dispatch({ type: LOGIN_SUCCESS, payload: userCredentials });
      firebase.firestore().collection('users').add({
        ...DEFAULT_USER_DOC,
        email: userCredentials.email,
        username,
      })
    })
    .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: e }))
}

// export the newly created context
export const { Context, Provider } = createDataContext(
  reducer,
  {
    emailPasswordLogin,
    emailPasswordCreateAccount,
  }, // actions (functions to be used to update global state)
  {
    userAuth: undefined,
    loginError: '',
  }, // initial state
);

// if you need to update the global state somehow, and there doesn't
// exist an action to do so, add an action in the same form as the others,
// call dispatch from it which will trigger the state update in the reducer

// to use this context in a file, put this at the top of the file:
// import Context as GlobalContext from '<path_to_this_file>'
