import AsyncStorage from '@react-native-community/async-storage';
const axios = require('axios');

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function loginSuccess(token, user) {
    return {
      type: LOGIN_SUCCESS,
      token,
      user,
    };
  }

export function login(user) {
    return (dispatch) =>
      axios
        .post('https://conduit.productionready.io/api/users/login', { user })
        .then((response) => {
          AsyncStorage.setItem('token', response.data.user.token);
          dispatch(loginSuccess(response.data.user.token, response.data.user.username));
          return response
        })
        .catch((error) => {
          return error.response.data.errors
        });
  }

