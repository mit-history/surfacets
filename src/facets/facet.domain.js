import React, { Component } from 'react';
import I18N from './../common/i18n';
import './facet.domain.css';
import pack from './facets.i18n.json';
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

class FacetDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {domain: this.props.domain};
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div draggable={!this.props.domain.active}
        id={this.props.domain.resource} 
        onDragStart={this.handleDragStart}
        onClick={this.handleClick} 
        className={['facet-domain'].concat(
          this.props.empty ? 'facet-domain--empty' : []
          ).concat(
            this.props.active ? 'facet-domain--active' : []  
          ).join(' ')}>
        {I18N.get(this.props.domain.resource, pack)}
      </div>
    );
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
  }

  handleClick(event) {
    if(!this.props.empty) {
      this.props.dispatch(activateDomain(this.state.domain.resource, 
        this.props.sortedDomains.findIndex(domain => !domain.active) + 1));  
    }
  }
}

FacetDomain = connect(mapStateToProps)(FacetDomain);

export default FacetDomain;