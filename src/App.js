import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // Search Github users
  // because this function is an arrow function, we use the keyword async before the params
  searchUsers = async (search) => {
    this.setState({ loading: true });
    const res = await Axios.get(`https://api.github.com/search/users?q=${search}&client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  };

  // clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          ></Search>
          <Users loading={loading} users={users}></Users>
        </div>
      </div>
    );
  }
}

export default App;
