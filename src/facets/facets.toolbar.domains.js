import React, { Component } from 'react';
import FacetDomain from './facet.domain';
import {connect} from 'react-redux';
import {activateDomain} from '../domains/action';
import { DropTarget } from 'react-dnd';
import {ItemTypes} from './../common/constants';

const mapStateToProps = (state) => {
  return {};
}

const facetContentTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    props.dispatch(activateDomain(item.id));

  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class FacetsToolbarDomains extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='facets-toolbar-domains'>
        {this.props.domains.map(domain =>
          <FacetDomain key={domain.id} domain={domain} empty={domain.active}/>)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(DropTarget(ItemTypes.DOMAIN, facetContentTarget, collect)(FacetsToolbarDomains));