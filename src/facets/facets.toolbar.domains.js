import React, { Component } from 'react';
import FacetDomain from './facet.domain';

class FacetsToolbarDomains extends Component {
  render() {
    return (
      <div className='facets-toolbar-domains'>
        {this.props.domains.map(domain =>
          <FacetDomain key={domain.id} domain={domain} empty={domain.active}/>)}
      </div>
    );
  }
}

export default FacetsToolbarDomains;