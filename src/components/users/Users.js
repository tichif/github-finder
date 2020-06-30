import React from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => {
          return <UserItem key={user.id} user={user}></UserItem>;
        })}
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
