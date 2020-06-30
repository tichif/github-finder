import React from 'react';
import PropsTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon}></i> {title}
      </h1>
    </nav>
  );
};

// if you not pass props in the component
Navbar.defaultProps = {
  icon: 'fab fa-github',
  title: 'Github Finder',
};

Navbar.propTypes = {
  icon: PropsTypes.string.isRequired,
  title: PropsTypes.string.isRequired,
};

export default Navbar;
