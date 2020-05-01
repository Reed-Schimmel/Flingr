import * as firebase from 'firebase';
import 'firebase/firestore';
import createDataContext from './createDataContext';

// default initial state
const INITIAL_STATE = { // actions (functions to be used to update global state)
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
};

// these are just to ensure string consistency
const LOGIN_SUCCESS          = 'login_success';
const LOGIN_FAILURE          = 'login_failure';
const UPDATE_BASE_LOCATIONS  = 'update_base_locations';
const SET_USER_BASE          = 'set_user_base';
const SET_BASE_ERROR         = 'set_base_error';
const QUERY_BASES_ERROR      = 'query_bases_error';
const WIPE_CONTEXT           = 'wipe_context';
const SET_COORDS             = 'set_coords';
const LOAD_USER_DATA         = 'load_user_data';
const FIRE_ERROR             = 'fire_error';
const STORE_JSON_BLOB        = 'store_json_blob';
const UPLOAD_ERROR           = 'upload_error';

// default user document fields when a new user is generated
const DEFAULT_USER_DOC = {
  outgoingFlings: [],
  incomingFlings: [],
  baseLatitude: 0,
  baseLongitude: 0,
};

// REDUCER
// a reducer processes actions and updates the state
const reducer = (state, action) => {
  switch(action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      userAuth: action.payload,
    };

  case LOAD_USER_DATA:
    return {
      ...state,
      userData: action.payload,
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

  case WIPE_CONTEXT:
    return INITIAL_STATE;

  case SET_COORDS:
    return {
      ...state,
      coords: action.payload,
    };

  case FIRE_ERROR:
    return {
      ...state,
      launchFlingError: action.payload,
    };

  case UPLOAD_ERROR:
    return {
      ...state,
      uploadError: action.payload,
    };

  case STORE_JSON_BLOB:
    return {
      ...state,
      userData: {
        ...state.userData,
        baseJsonData: action.payload,
      }
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
    .then(({ user }) => {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      const userDoc = firebase.firestore().collection('users').doc(user.uid);
      userDoc.get()
        .then((userSnapshot) => dispatch({ type: LOAD_USER_DATA, payload: userSnapshot.data() }));
    })
    .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: e.message }));
};

const emailPasswordCreateAccount = (dispatch) => (email, password, username) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      const userData = {
        ...DEFAULT_USER_DOC,
        email: user.email,
        username,
      };
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      dispatch({ type: LOAD_USER_DATA, payload: userData });
      await firebase.firestore().collection('users').doc(`${user.uid}`).set(userData)
        .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: `error setting data: ${e.message} ${user}` }));
    })
    .catch((e) => dispatch({ type: LOGIN_FAILURE, payload: e.message }));
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

// called when a user launches a new fling
const launchFling = (dispatch) => ({ coords }, uid) => {
  const landingDelta = 5;
  const userRef = firebase.firestore().collection('users').doc(uid);
  // create new outgoing fling
  firebase.firestore().collection('flings').add({
    landingLocation: coords,
    sender: userRef,
  })
    .then((flingRef) => {
      // Add new fling to outgoing flings of current user
      userRef.update({ outgoingFlings: firebase.firestore.FieldValue.arrayUnion(flingRef) });

      // query for bases around the landing location
      const slice = firebase.firestore().collection('users')
        .where('baseLongitude', '>=', coords.latitude - landingDelta).where('baseLongitude', '<=', coords.latitude + landingDelta);

      // get all the users from around that longitude 
      slice.get()
        .then((querySnapshot) => {
          // update everyone within the range
          querySnapshot.forEach(async (userDoc) => {
            await firebase.firestore().collection('users').doc(userDoc.id).update({
              incomingFlings: firebase.firestore.FieldValue.arrayUnion(flingRef)
            });
          });
        })
        .catch((e) => dispatch({ type: FIRE_ERROR, payload: e.message }));
    })
    .catch((e) => dispatch({ type: FIRE_ERROR, payload: e.message }));
};

const uploadJSONblob = (dispatch) => (JSONblob, uid) => {
  firebase.firestore().collection('users').doc(uid).update({
    baseJsonBlob: JSONblob,
  })
    .then(() => dispatch({ type: STORE_JSON_BLOB, payload: JSONblob }))
    .catch((e) => dispatch({ type: UPLOAD_ERROR, payload: e.message }));
};

const wipeContext = (dispatch) => () => {
  dispatch({ type: WIPE_CONTEXT });
};

// export the newly created context
export const { Context, Provider } = createDataContext(
  reducer,
  {
    emailPasswordLogin,
    emailPasswordCreateAccount,
    queryNewBaseLocations,
    setBaseLocation,
    wipeContext,
    setCoords,
    launchFling,
    uploadJSONblob,
  }, // actions (functions to be used to update global state)
  INITIAL_STATE, // initial state
);

// if you need to update the global state somehow, and there doesn't
// exist an action to do so, add an action in the same form as the others,
// call dispatch from it which will trigger the state update in the reducer

// to use this context in a file, put this at the top of the file:
// import Context as GlobalContext from '<path_to_this_file>'
