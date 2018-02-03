import React, { Component } from 'react';
import FacetDomain from './facet.domain';
import Icon from './../common/icon';
import FacetFilter from './facet.filter';
import './facet.css';
import {connect} from 'react-redux';
import {clearFilters, refreshFilters} from '../filters/action';
import {fetchResultsIfNeeded, resetResults} from '../results/action';
import {activateDomain} from '../domains/action';

const mapStateToProps = (state) => {
  return {
    filtersDefinition: state.filtersDefinition
  };
}

class Facet extends Component {
  constructor(props) {
    super(props);
    this.handleResetFilters = this.handleResetFilters.bind(this);
    this.handleRemoveDomain = this.handleRemoveDomain.bind(this);
  }

  render() {
    return (
        <div className={['facet'].concat(
            this.props.empty ? ['facet--empty'] : []).join(' ')}>
          <Icon iconClass={'fa-repeat facet__reset'} onClick={this.handleResetFilters}/>
          <FacetDomain domain={this.props.domain} 
            active={this.props.domain.active} 
            empty={this.props.empty}/>
          <Icon iconClass={'fa-close facet__remove'} alternate={true} onClick={this.handleRemoveDomain}/>
          {!this.props.empty ? this.props.filtersDefinition[this.props.domain.id].map(filter => 
            <FacetFilter key={filter.id} filter={filter} />) : ''}
        </div>
    );
  }

  handleResetFilters() {
    this.props.dispatch(clearFilters());
    this.props.dispatch(refreshFilters());
    this.props.dispatch(resetResults());
    this.props.dispatch(fetchResultsIfNeeded(0));
  }

  handleRemoveDomain() {
    this.props.dispatch(activateDomain(this.props.domain.id, undefined));
  }
}

export default connect(mapStateToProps)(Facet);