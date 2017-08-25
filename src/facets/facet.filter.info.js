import React, { Component } from 'react';
import './facet.filter.info.css';

class FacetFilterInfo extends Component {
  render() {
    return (
        <tr>
          <td className='facet-filter__info' title={this.props.filter.info}>{this.props.filter.info}</td>
        </tr>);
  }
}

export default FacetFilterInfo;