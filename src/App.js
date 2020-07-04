import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';
import './App.css';
import Axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRepos, setUserRepos] = useState([]);
  const [alert, setAlert] = useState(null);

  // Get a single user profile
  const getUser = async (username) => {
    setLoading(true);
    const res = await Axios.get(`https://api.github.com/users/${username}?client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  };

  // Get last five repos for the user
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await Axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUserRepos(res.data);
    setLoading(false);
  };

  // Search Github users
  // because this function is an arrow function, we use the keyword async before the params
  const searchUsers = async (search) => {
    setLoading(true);
    const res = await Axios.get(`https://api.github.com/search/users?q=${search}&client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set an alert when the search field is blank
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
        <div className='container'>
          <Alert alert={alert}></Alert>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  ></Search>
                  <Users loading={loading} users={users}></Users>
                </Fragment>
              )}
            ></Route>
            <Route exact path='/about' component={About}></Route>
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  loading={loading}
                  repos={userRepos}
                ></User>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
