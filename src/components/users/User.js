import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const {
      name,
      location,
      avatar_url,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    } = this.props.user;

    const { loading } = this.props;
    if (loading) {
      return <Spinner></Spinner>;
    } else {
      return (
        <Fragment>
          <Link to='/' className='btn btn-light'>
            Back to Search
          </Link>
          Hireable: {''}{' '}
          {hireable ? (
            <i className='fas fa-check text-success'></i>
          ) : (
            <i className='fas fa-times-circle text-danger'></i>
          )}
          <div className='card grid-2'>
            <div className='all-center'>
              <img
                alt={login}
                src={avatar_url}
                className='round-img'
                style={{ width: '150px' }}
              />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a href={html_url} className='btn btn-dark my-1'>
                Visit Github Profile
              </a>
              <ul>
                <li>
                  {' '}
                  {login && (
                    <Fragment>
                      <strong> Username: </strong> {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {' '}
                  {company && (
                    <Fragment>
                      <strong> Company: </strong> {company}
                    </Fragment>
                  )}
                </li>
                <li>
                  {' '}
                  {blog && (
                    <Fragment>
                      <strong> Website: </strong> {blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div class='text-center card'>
            <div className='badge badge-primary'>Followers: {followers}</div>
            <div className='badge badge-success'>Followings: {following}</div>
            <div className='badge badge-light'>
              Public Repos: {public_repos}
            </div>
            <div className='badge badge-dark'>Public Gists: {public_gists}</div>
          </div>
        </Fragment>
      );
    }
  }
}

export default User;
