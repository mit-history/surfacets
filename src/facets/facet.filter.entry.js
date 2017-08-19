import React, { Component } from 'react';
import './facet.filter.entry.css';

class FacetFilterEntry extends Component {
  render() {
    return (
        <tr>
          <td className='facet-filter__name'>{this.props.filter.name}</td>
          <td className='facet-filter__count'>{this.props.filter.count}</td>
        </tr>);
  }
}

export default FacetFilterEntry;