import React, { Component } from 'react';
import FacetsToolbar from './facets.toolbar';
import FacetsContent from './facets.content';
import {connect} from 'react-redux';
import './facets.css';

const mapStateToProps = (state) => {
  return {
    results: state.results
  };
}

class Facets extends Component {
  render() {
    return (
      <section className={['facets'].concat(this.props.results.opened ? 'facets--collapsed' : []).join(' ')}>
        <FacetsToolbar />
        <FacetsContent />
      </section>
    );
  }
}

export default connect(mapStateToProps)(Facets);