import {
    LOGIN_SUCCESS,
    REGISTER_NEW_USER,
    LOG_OUT
  } from '../actions/users';
  
  const initialState = {
    token: '',
    username: ''
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
    return state;
  };
  
  export default users;