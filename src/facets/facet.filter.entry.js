import React, { Component } from 'react';
import './facet.filter.entry.css';
import {connect} from 'react-redux';
import {addFilter, removeFilter, refreshFilters} from './../filters/action';
import {fetchResultsIfNeeded, resetResults} from './../results/action';

const mapStateToProps = (state) => {
  return {
    filterOn: state.filterOn
  };
}

class FacetFilterEntry extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    // console.log('this.props.filter', this.props.filter);
    return (
        <tr className='facet-filter__entry' onClick={this.handleClick}>
          <td className='facet-filter__name' title={this.props.filter.id}>{this.props.filter.id}</td>
          <td className='facet-filter__count'>{this.props.filter.count}</td>
        </tr>);
  }

  handleClick(event) {
    if(this.props.filterOn[this.props.payload]) {
      this.props.dispatch(removeFilter(this.props.payload));
    } else {
      this.props.dispatch(addFilter(this.props.payload, this.props.filter.id));
    }
    this.props.dispatch(refreshFilters());
    this.props.dispatch(resetResults());
    this.props.dispatch(fetchResultsIfNeeded(0));
  }
}

export default connect(mapStateToProps)(FacetFilterEntry);