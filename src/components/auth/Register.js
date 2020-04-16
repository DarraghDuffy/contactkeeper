import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/contextAuth';

export default function Register(props) {
  const alertContext = useContext(AlertContext);
  const { alerts, setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { register, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    } else {
      if (error) {
        error.map((err) => setAlert(err.msg, 'danger'));
      }
    }
    //eslint-disable-next-line
  }, [authContext, error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      password2.length === 0
    ) {
      setAlert('all fields are required', 'danger');
      return;
    }
    if (password !== password2) {
      setAlert('passwords must match', 'danger');
      return;
    }
    register({ name, email, password });
  };

  return (
    <div className='form-container' onSubmit={onSubmit}>
      <h1>
        <span className='text-primary'> Account Register</span>
      </h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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

        <div className='form-group'>
          <label htmlFor='password2'>Confirm password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
}
