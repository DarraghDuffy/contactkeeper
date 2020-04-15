import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({ icon, title }) {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}></i> {title}
      </h1>

      <ul>
        <li>
          <Link to='/'> Home </Link>
        </li>
        <li>
          <Link to='About'> About </Link>
        </li>
      </ul>
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
