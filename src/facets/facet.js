import React, { Component } from 'react';
import FacetDomain from './facet.domain';
import './facet.css';

class Facet extends Component {
  render() {
    return (
        <div className={['facet'].concat(
            this.props.empty ? ['facet--empty'] : []).join(' ')}>
          <FacetDomain domain={this.props.domain} empty={this.props.empty}/>
        </div>
    );
  }
}

export default Facet;