import axios from 'axios';
// read the local storeage for the JWT token, if it exists set the header
const setAuthToken = () => {
  const token = localStorage.getItem('token') || null;
  console.log(token);
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
