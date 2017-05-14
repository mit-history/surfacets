import React, { Component } from 'react';
import FacetsToolbar from './facets.toolbar';
import FacetsContent from './facets.content';
import './facets.css';

class Facets extends Component {
  render() {
    return (
      <section className='facets'>
        <FacetsToolbar />
        <FacetsContent />
      </section>
    );
  }
}

export default Facets;