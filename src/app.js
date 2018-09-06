import React, { Component } from 'react';
import Header from './layout/header/header';
import Main from './layout/main/main';
import I18N from './common/i18n';
import './app.css';
import pack from './app.i18n.json'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  constructor(props) {
    super(props);

    document.title = I18N.get('title', pack);
  }

  render() {
    return (
      <div className='app'>
        {/* <Header /> Removed header for environment*/}
        <Main />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
