import React, { Component } from 'react';
import Facet from './facet';
import './facets.content.css';
import {activateDomain} from '../domains/action';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    sortedDomains: state.domains.slice().sort((a, b) => {
      if(a.index && b.index) {
        return a.index - b.index;
      } else if(!b.index) {
        return -1;
      } else {
        return 1;
      }
    })
  };
}

class FacetsContent extends Component {
  constructor(props) {
    super(props);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    let domain = event.dataTransfer.getData('text');
    this.props.dispatch(activateDomain(domain, 
      this.props.sortedDomains.findIndex(domain => !domain.active) + 1));
  }

  render() {
    return (
      <section onDragOver={this.allowDrop} onDrop={this.drop} className='facets-content'>
        {this.props.sortedDomains.map(domain => 
          <Facet key={domain.id} domain={domain} empty={!domain.active} />)}
      </section>
    );
  }
}

FacetsContent = connect(mapStateToProps)(FacetsContent);

export default FacetsContent;