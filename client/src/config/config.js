let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://darraghduffy-contactkeeper.herokuapp.com';
} else {
  baseURL = 'http://localhost:5000';
}

const users = baseURL + '/api/users';
const contacts = baseURL + '/api/contacts';
const auth = baseURL + '/api/auth';

export { users, contacts, auth };
