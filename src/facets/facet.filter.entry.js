import React, { Component } from 'react';
import './facet.filter.entry.css';
import {connect} from 'react-redux';
import {addFilter, removeFilter, refreshFilters} from './../filters/action';
import {fetchResultsIfNeeded} from './../results/action';

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
    return (
        <tr className='facet-filter__entry' onClick={this.handleClick}>
          <td className='facet-filter__name' title={this.props.filter.name}>{this.props.filter.name}</td>
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
    this.props.dispatch(fetchResultsIfNeeded());
  }
}

export default connect(mapStateToProps)(FacetFilterEntry);