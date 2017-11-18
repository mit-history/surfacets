import React, { Component } from 'react';
import FacetDomain from './facet.domain';
import {connect} from 'react-redux';
import {activateDomain} from '../domains/action';


const mapStateToProps = (state) => {
  return {};
}

class FacetsToolbarDomains extends Component {
  constructor(props) {
    super(props);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.leave = this.leave.bind(this);
  }

  render() {
    return (
      <div onDragOver={this.allowDrop} 
        onDragLeave={this.leave}
        onDrop={this.drop}
        className='facets-toolbar-domains'>
        {this.props.domains.map(domain =>
          <FacetDomain key={domain.id} domain={domain} empty={domain.active}/>)}
      </div>
    );
  }

  allowDrop(event) {
    event.preventDefault();
  }

  leave(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    let domain = event.dataTransfer.getData('text');
    this.props.dispatch(activateDomain(domain));
  }
}

export default connect(mapStateToProps)(FacetsToolbarDomains);