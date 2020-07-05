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
import GithubState from './context/github/GithubState';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [userRepos, setUserRepos] = useState([]);
  const [alert, setAlert] = useState(null);

  // Get last five repos for the user
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await Axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUserRepos(res.data);
    setLoading(false);
  };

  // Set an alert when the search field is blank
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <GithubState>
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
                    <Search setAlert={showAlert}></Search>
                    <Users></Users>
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
                    getUserRepos={getUserRepos}
                    repos={userRepos}
                  ></User>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
