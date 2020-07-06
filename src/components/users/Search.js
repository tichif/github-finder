import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [search, setSearch] = useState('');

  const onChange = (e) => setSearch(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (search === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(search);
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
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
