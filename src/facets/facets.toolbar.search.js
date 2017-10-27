import React, { Component } from 'react';
import Button from './../common/button';
import I18N from './../common/i18n';
import pack from './facets.i18n.json';
import {resetDomains, activateDomains} from '../domains/action';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    domains: state.domains,
    inProgress: state.domains.filter(domain => domain.active).length > 0,
    allActive: state.domains.filter(domain => !domain.active).length === 0
  };
}

class FacetsToolbarSearch extends Component {
  constructor(props) {
    super(props);
    this.handleClickNewSearch = this.handleClickNewSearch.bind(this);
    this.handleClickUseAllFilters = this.handleClickUseAllFilters.bind(this);
  }

  render() {
    return (
      <div className='facets-toolbar-search'>
        <h2 className='facets-toolbar-search__title'>{I18N.get('facets-search', pack)}</h2>
        <Button disabled={!this.props.inProgress} title={I18N.get('new-search', pack)} onClick={this.handleClickNewSearch}/>
        <Button disabled={this.props.allActive} title={I18N.get('search-use-filters', pack)} onClick={this.handleClickUseAllFilters}/>
      </div>
    );
  }

  handleClickNewSearch() {
    this.props.dispatch(resetDomains());
  }

  handleClickUseAllFilters() {
    this.props.dispatch(activateDomains());
  }
}

export default connect(mapStateToProps)(FacetsToolbarSearch);