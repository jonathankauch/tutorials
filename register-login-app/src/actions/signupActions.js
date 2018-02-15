import axios from 'axios';

export function userSignupRequest(user) {
  return dispatch => {
    return axios.post('https://reqres.in/api/register', user);
  }
}
