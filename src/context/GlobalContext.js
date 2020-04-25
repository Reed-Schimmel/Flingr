import * as firebase from 'firebase';
import createDataContext from './createDataContext';

// these are just to ensure string consistency
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILURE = 'login_failure';
const UPDATE_BASE_LOCATIONS = 'update_base_locations';
const SET_USER_BASE = 'set_user_base';
const SET_BASE_ERROR = 'set_base_error';
const QUERY_BASES_ERROR = 'query_bases_error';
const SET_COORDS = 'set_coords';

// default user document fields when a new user is generated
const DEFAULT_USER_DOC = {
  outgoingFlings: [],
  incomingFlings: [],
  homeLatitude: undefined,
  homeLongitude: undefined,
};

// REDUCER
// a reducer processes actions and updates the state
const reducer = (state, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      userAuth: action.payload,
    };

  case LOGIN_FAILURE:
    return {
      ...state,
      loginError: action.payload,
    };

  case UPDATE_BASE_LOCATIONS:
    return {
      ...state,
      renderedBases: action.payload,
    };

  case SET_USER_BASE:
    return {
      ...state,
      userData: {
        ...state.userData,
        baseLatitude: action.payload.latitude,
        baseLongitude: action.payload.longitude,
      },
    };

  case SET_BASE_ERROR:
    return {
      ...state,
      setBaseError: action.payload,
    };

  case QUERY_BASES_ERROR:
    return {
      ...state,
      queryBasesError: action.payload,
    };

  case SET_COORDS:
    return {
      ...state,
      coords: action.payload,
    };
  default:
    return state;
  }
};

// ACTIONS
// actions take the form of an object with 2 key/value pairs:
// { type, payload }
// type is a string, which specifies which action we are dispatching to the reducer
// payload is the data associated with the action, usually used to update state

const emailPasswordLogin = (dispatch) => (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredentials) => dispatch({ type: LOGIN_SUCCESS, payload: userCredentials }))
    .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: e }));
};

const emailPasswordCreateAccount = (dispatch) => (email, password, username) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      dispatch({ type: LOGIN_SUCCESS, payload: userCredentials });
      firebase.firestore().collection('users').add({
        ...DEFAULT_USER_DOC,
        email: userCredentials.email,
        username,
      });
    })
    .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: e }));
};

const queryNewBaseLocations = (dispatch) => (region) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
  const left = longitude - longitudeDelta;
  const right = longitude + longitudeDelta;
  const bottom = latitude - latitudeDelta;
  const top = latitude + latitudeDelta;

  const regionBases = [];

  // query database for users w/ bases within the correct longitude range
  const slice = firebase.firestore().collection('users').where('baseLongitude', '>=', left).where('baseLongitude', '<=', right);
  slice.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        // checks for bases within the correct latitude range
        if (docData.baseLatitude <= top && docData.baseLatitude >= bottom) {
          // if both lat & long within region, push it to regionBases to be rendered
          regionBases.push(docData);
        }
      });
      dispatch({ type: UPDATE_BASE_LOCATIONS, payload: regionBases });
    })
    .catch((e) => dispatch({ type: QUERY_BASES_ERROR, payload: e }));
};

const setBaseLocation = (dispatch) => async (latitude, longitude, uid) => {
  firebase.firestore().collection('users').doc(uid).update({
    baseLatitude: latitude,
    baseLongitude: longitude,
  })
    .then(() => dispatch({ type: SET_USER_BASE, payload: { latitude, longitude } }))
    .catch((e) => dispatch({ type: SET_BASE_ERROR, payload: e }));
};

const setCoords = (dispatch) => ({ coords }) => {
  dispatch({ type: SET_COORDS, payload: coords });
};

// export the newly created context
export const { Context, Provider } = createDataContext(
  reducer,
  {
    emailPasswordLogin,
    emailPasswordCreateAccount,
    queryNewBaseLocations,
    setBaseLocation,
  }, // actions (functions to be used to update global state)
  {
    userAuth: undefined,
    userData: {},
    loginError: '',
    renderedBases: [],
    coords: {
      longitude: null,
      latitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
    },
  }, // initial state
);

// if you need to update the global state somehow, and there doesn't
// exist an action to do so, add an action in the same form as the others,
// call dispatch from it which will trigger the state update in the reducer

// to use this context in a file, put this at the top of the file:
// import Context as GlobalContext from '<path_to_this_file>'
