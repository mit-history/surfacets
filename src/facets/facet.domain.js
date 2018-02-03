import React, { Component } from 'react';
import I18N from './../common/i18n';
import './facet.domain.css';
import pack from './facets.i18n.json';
import {activateDomain} from '../domains/action';
import FacetUtils from './facet.utils';
import {connect} from 'react-redux';
import { DragSource } from 'react-dnd';
import {ItemTypes} from './../common/constants';

const mapStateToProps = (state) => {  
  
  return {
    sortedDomains: FacetUtils.sortDomains(state.domains)
  };
}

const domainSource = {   
  beginDrag(props) {
    return props.domain;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()    
  }
}

class FacetDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {domain: this.props.domain};
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div
        id={this.props.domain.resource}
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

  handleClick(event) {
    if(!this.props.empty) {
      this.props.dispatch(activateDomain(this.state.domain.resource, 
        this.props.domain.index ? undefined : this.props.sortedDomains.findIndex(domain => !domain.active) + 1), NaN);  
    }
  }
}

export default connect(mapStateToProps)(DragSource(ItemTypes.DOMAIN, domainSource, collect)(FacetDomain));
