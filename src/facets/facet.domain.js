import React, { Component } from 'react';
import I18N from './../common/i18n';
import './facet.domain.css';
import pack from './facets.i18n.json';

class FacetDomain extends Component {
  constructor(props) {
    super(props);
    this.dragStart = this.dragStart.bind(this);
  }

  render() {
    return (
      <div draggable={!this.props.domain.active}
        id={this.props.domain.resource} 
        onDragStart={this.dragStart} 
        className={['facet-domain'].concat(this.props.empty ? 'facet-domain--empty' : []).join(' ')}>
        {I18N.get(this.props.domain.resource, pack)}
      </div>
    );
  }

  dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
  }
}

export default FacetDomain;