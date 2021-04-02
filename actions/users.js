import AsyncStorage from '@react-native-community/async-storage';
const axios = require('axios');

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const LOG_OUT = 'LOG_OUT';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';

export function loginSuccess(token, user) {
    return {
      type: LOGIN_SUCCESS,
      token,
      user,
    };
  }

  export function registrationSuccess(token, user) {
    return {
      type: REGISTER_NEW_USER,
      token,
      user,
    };
  }

  export function logout() {
    AsyncStorage.removeItem('token');
    return {
      type: LOG_OUT,
    };
  }

  export function getCurrentUserSuccess(user, token) {
    return {
      type: GET_CURRENT_USER_SUCCESS,
      user,
      token
    }
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

  export function registerUser(user) {
    return (dispatch) =>
      axios
        .post('https://conduit.productionready.io/api/users', { user })
        .then((response) => {
          AsyncStorage.setItem('token', response.data.user.token);
          dispatch(registrationSuccess(response.data.user.token, response.data.user));
          return response
        })
        .catch((error) => {
          return error.response.data.errors
        });
  }

  export function getCurrentUser(token) {
    const url = 'https://conduit.productionready.io/api/user';
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) => {
      axios
      .get(url, {headers})
      .then((response) => {
        dispatch(getCurrentUserSuccess(response.data.user, token)) 
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }
  }

  export function getProfile(token, username) {
    const url = 'https://conduit.productionready.io/api/profiles/' + username;
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) => 
      axios
      .get(url, {headers})
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error);
      });
    }
  

  export function followUser(token, username) {
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    const url = 'https://conduit.productionready.io/api/profiles/' + username + '/follow';
    return (dispatch) => 
      axios
      .post(url, {}, {headers})
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error.errors);
      });
  }

  export function unfollowUser(token, username) {
    const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    const url = 'https://conduit.productionready.io/api/profiles/' + username + '/follow';
    return (dispatch) => 
      axios
      .delete(url, {headers}, {params: {} })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error.errors);
      });
    }