import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  onChange = (e) => this.setState({ search: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='search'
            placeholder='Search Users...'
            value={this.state.search}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default Search;
