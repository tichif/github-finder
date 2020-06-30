import React, { Component } from 'react';
import PropsTypes from 'prop-types';

class Navbar extends Component {
  // if you not pass props in the component
  static defaultProps = {
    icon: 'fab fa-github',
    title: 'Github Finder',
  };

  static propTypes = {
    icon: PropsTypes.string.isRequired,
    title: PropsTypes.string.isRequired,
  };
  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={this.props.icon}></i> {this.props.title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
