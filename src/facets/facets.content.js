import React, { Component } from 'react';
import Facet from './facet';
import './facets.content.css';
import FacetUtils from './facet.utils';
import {activateDomain} from '../domains/action';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    sortedDomains: FacetUtils.sortDomains(state.domains)
  };
}

const FACETS_CONTENT_ID = 'active-facets';

class FacetsContent extends Component {
  constructor(props) {
    super(props);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.leave = this.leave.bind(this);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  leave(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const facets = document.getElementById(FACETS_CONTENT_ID);
    const clientRect = facets.getBoundingClientRect();
    const index = Math.floor((event.clientX / (clientRect.width - clientRect.x)) * 6);
    let domain = event.dataTransfer.getData('text');
    let fromIndex = parseInt(event.dataTransfer.getData('index'), 10);
    this.props.dispatch(activateDomain(domain, index + 1, fromIndex));
  }

  render() {
    return (
      <section id={FACETS_CONTENT_ID} onDragOver={this.allowDrop} 
        onDragLeave={this.leave}
        onDrop={this.drop} 
        className='facets-content'>
        {this.props.sortedDomains.map(domain => 
          <Facet key={domain.id} domain={domain} empty={!domain.active} />)}
      </section>
    );
  }
}

FacetsContent = connect(mapStateToProps)(FacetsContent);

export default FacetsContent;