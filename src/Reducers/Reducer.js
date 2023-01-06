import {combineReducers} from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage'

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGGINGIN = 'LOGGINGIN';
const SEARCH = 'SEARCH';
const ITEMSELECT = 'ITEMSELECT';
const UPDATEITEMS = 'UPDATEITEMS';

const initialAuthState = {
  isLoggedIn: false,
  isLoggingIn: false,
  user: {},
};

const initialSearchState = {
  searchResults: [],
  item: {}
};


export const search = (searchResults) => ({
  type: SEARCH,
  payload: searchResults,
})

export const itemSelect = (item) => ({
  type: ITEMSELECT,
  payload: item
})

export const updateItems = (items) => ({
  type: UPDATEITEMS,
  payload: items
})
export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = (user) => ({
  type: LOGOUT,
});

export const loggingin = (loggingInProperty) => ({
  type: LOGGINGIN,
  payload: loggingInProperty
});

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, isLoggedIn: true, user: action.payload};
    case LOGOUT:
    //   AsyncStorage.removeItem('@loggedInUserID:id');
    //   AsyncStorage.removeItem('@loggedInUserID:key');
    //   AsyncStorage.removeItem('@loggedInUserID:password');
      return {...state, isLoggedIn: false, user: {}};
    case LOGGINGIN:
        return {...state, isLoggingIn: action.payload}
    default:
      return state;
  }
}

function searchReducer(state = initialSearchState, action) {
  switch (action.type) {
    case SEARCH:
      return {...state, searchResults: action.payload}
    case ITEMSELECT:
      return {...state, item: action.payload}
    case UPDATEITEMS:
      const userUpdated = {...state.user, items: action.payload}
      return {...state, user: userUpdated}
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  authReducer,
  searchReducer,
});

export default AppReducer;
