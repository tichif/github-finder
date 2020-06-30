import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await Axios.get('https://api.github.com/users');
    this.setState({ users: res.data, loading: false });
  }

  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users}></Users>
        </div>
      </div>
    );
  }
}

export default App;
