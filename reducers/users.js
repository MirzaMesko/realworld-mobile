import {
    LOGIN_SUCCESS,
    LOG_OUT,
    GET_CURRENT_USER_SUCCESS
  } from '../actions/users';

  
  const initialState = {
    username: '',
    currentUser: {},
    token: '',
    isLoggedIn: false,
  };
  
  const users = (state = initialState, action) => {
    if(action.type === LOGIN_SUCCESS) {
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
      }
    }
      if (action.type === LOG_OUT) {
        return {
          ...state,
          isLoggedIn: false,
          token: '',
        };
      }
      if (action.type === GET_CURRENT_USER_SUCCESS) {
        return {
          ...state,
          currentUser: action.user,
          token: action.token
        };
      }
    return state;
  };
  
  export default users;