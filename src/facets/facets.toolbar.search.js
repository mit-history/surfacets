import React, { Component } from 'react';
import Button from './../common/button';
import I18N from './../common/i18n';
import pack from './facets.i18n.json';

class FacetsToolbarSearch extends Component {
  render() {
    return (
      <div className='facets-toolbar-search'>
        <h2 className='facets-toolbar-search__title'>{I18N.get('facets-search', pack)}</h2>
        <Button disabled='true' title={I18N.get('new-search', pack)}/>
        <Button title={I18N.get('search-use-filters', pack)}/>
      </div>
    );
  }
}

export default FacetsToolbarSearch;