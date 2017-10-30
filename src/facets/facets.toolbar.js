import React, { Component } from 'react';
import FacetsToolbarSearch from './facets.toolbar.search';
import FacetsToolbarDomains from './facets.toolbar.domains';
import FacetsToolbarSort from './facets.toolbar.sort';
import {activateDomain} from './../domains/action';
import {connect} from 'react-redux';
import './facets.toolbar.css';

const mapStateToProps = (state) => {
  return {
    domains: state.domains,
    activeDomain: state.domains.filter(domain => domain.active).length > 0
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDomainActivated: (domain, index) => {
      activateDomain(domain, index);
    }
  } 
}

class FacetsToolbar extends Component {
  render() {
    return (
      <section className='facets-toolbar'>
        <FacetsToolbarSearch />
        <FacetsToolbarDomains domains={this.props.domains} />
        <FacetsToolbarSort disabled={!this.props.activeDomain}/>
      </section>
    );
  }
}

FacetsToolbar = connect(mapStateToProps, mapDispatchToProps)(FacetsToolbar);

export default FacetsToolbar;