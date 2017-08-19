import React, { Component } from 'react';
import FacetDomain from './facet.domain';
import FacetFilter from './facet.filter';
import './facet.css';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    filtersDefinition: state.filtersDefinition
  };
}

class Facet extends Component {
  render() {
    return (
        <div className={['facet'].concat(
            this.props.empty ? ['facet--empty'] : []).join(' ')}>
          <FacetDomain domain={this.props.domain} 
            active={this.props.domain.active} 
            empty={this.props.empty}/>
          {!this.props.empty ? this.props.filtersDefinition[this.props.domain.id].map(filter => 
            <FacetFilter key={filter.id} filter={filter} />) : ''}
        </div>
    );
  }
}

export default connect(mapStateToProps)(Facet);