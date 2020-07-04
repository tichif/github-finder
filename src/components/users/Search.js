import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ clearUsers, showClear, searchUsers, setAlert }) => {
  const [search, setSearch] = useState('');

  const onChange = (e) => setSearch(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (search === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(search);
      setSearch('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='search'
          placeholder='Search Users...'
          value={search}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
