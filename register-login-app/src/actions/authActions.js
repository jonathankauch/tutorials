import axios from 'axios';

import { SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function login(data) {
  return dispatch => {
    const { email } = data;
    const user = {
      email,
    }
    return axios.post('https://reqres.in/api/login', data).then(res => {
      const token =  res.data.token;
      setAuthorizationToken(token);
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(user));
    });
  }
}
