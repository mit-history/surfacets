import React, { Component } from 'react';
import Header from './layout/header/header';
import Main from './layout/main/main';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
