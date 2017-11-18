import React, { Component } from 'react';
import I18N from './../common/i18n';
import './facet.domain.css';
import pack from './facets.i18n.json';
import {activateDomain} from '../domains/action';
import FacetUtils from './facet.utils';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {  
  
  return {
    sortedDomains: FacetUtils.sortDomains(state.domains)
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
      <div draggable={true}
        id={this.props.domain.resource}
        data={this.props.domain.index}
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
    if(event.nativeEvent && event.nativeEvent.target) {
      event.dataTransfer.setData('index', event.nativeEvent.target.getAttribute('data'));
    }
  }

  handleClick(event) {
    if(!this.props.empty) {
      this.props.dispatch(activateDomain(this.state.domain.resource, 
        this.props.domain.index ? undefined : this.props.sortedDomains.findIndex(domain => !domain.active) + 1), NaN);  
    }
  }
}

FacetDomain = connect(mapStateToProps)(FacetDomain);

export default FacetDomain;