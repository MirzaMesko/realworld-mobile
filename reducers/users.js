import {
    LOGIN_SUCCESS
  } from '../actions/users';
  
  const initialState = {
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
    return state;
  };
  
  export default users;