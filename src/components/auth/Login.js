import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/contextAuth';
import AlertContext from '../../context/alert/alertContext';

export default function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { alerts, setAlert } = alertContext;
  const { login, error, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    } else {
      if (error) {
        error.map((err) => setAlert(err.msg, 'danger'));
      }
    }
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className='form-container' onSubmit={onSubmit}>
      <h1>
        <span className='text-primary'> Login</span>
      </h1>
      <form>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
}
