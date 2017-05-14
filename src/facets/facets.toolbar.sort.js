import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './facets.i18n.json';

class FacetsToolbarSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['facets-toolbar-sort'].concat(props.disabled ? ['facets-toolbar-sort--disabled'] : [])
    };
  }

  render() {
    return (
      <div className={this.state.classes.join(' ')}>
        <div className='facets-toolbar-sort--block'>
          <h5 className='facets-toolbar-sort__title' >{I18N.get('sort-by', pack)}</h5>
          <span className='facets-toolbar-sort__alphabetical'>{I18N.get('sort-alphabetical', pack)}</span>
          <span></span>
          <span className='facets-toolbar-sort__receipts'>{I18N.get('sort-receipts', pack)}</span>
          <span></span>
        </div>
      </div>
    );
  }
}

export default FacetsToolbarSort;