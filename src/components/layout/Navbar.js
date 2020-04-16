import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/contextAuth';
import ContactContext from '../../context/contact/contactContext';

export default function Navbar({ icon, title }) {
  const authContext = useContext(AuthContext);
  const { user, logout, isAuthenticated } = authContext;
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;
  const onLogout = () => {
    clearContacts(); // just App state clear and not the backend!!
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        Hello <strong> {user && user.name} </strong>
      </li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'> Logout </span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <i className='fas fa-info-circle'></i>
        <Link to='/about'>About | </Link>
      </li>
      <li>
        <i className='fas fa-id-card'></i>
        <Link to='/register'>Register | </Link>
      </li>
      <li>
        <i className='fas fa-sign-in-alt'></i>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul className='medium'>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
}

Navbar.defaultTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};
