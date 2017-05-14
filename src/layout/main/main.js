import React, { Component } from 'react';
import Facets from './../../facets/facets';
import Results from './../../results/results';
import './main.css';


class Main extends Component {
  render() {
    return (
      <main className='main'>
        <Facets />
        <Results />
      </main>
    );
  }
}

export default Main;
