import {
    LOGIN_SUCCESS,
    REGISTER_NEW_USER,
    LOG_OUT,
    GET_CURRENT_USER_SUCCESS
  } from '../actions/users';
  
  const initialState = {
    token: '',
    username: '',
    currentUser: {},
    token: '',
    user: ''
  };
  
  const users = (state = initialState, action) => {
    if(action.type === LOGIN_SUCCESS) {
      return {
        ...state,
        token: action.token,
        user: action.user,
      }
    }
    if (action.type === REGISTER_NEW_USER) {
        return {
          ...state,
          token: action.token,
          user: action.user,
        };
      }
      if (action.type === LOG_OUT) {
        return {
          ...state,
          user: {},
          token: "",
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