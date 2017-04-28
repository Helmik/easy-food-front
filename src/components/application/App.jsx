import React, { Component } from 'react';
import './App.css';
import Dashboard from '../dashboard/dashboard';
import Header from '../header/header';

class App extends Component {
  render() {
    if(!localStorage.token){
        this.props.history.push('/login');
    }
    return (
        <div>
            <Header/>
            <Dashboard/>
        </div>
    );
  }
}

export default App;
