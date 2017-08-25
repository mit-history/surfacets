import React, { Component } from 'react';
import {fetchFiltersIfNeeded} from './../filters/action';
import I18N from './../common/i18n';
import pack from './facets.i18n.json';
import {connect} from 'react-redux';
import './facet.filter.css';
import FacetFilterEntry from './facet.filter.entry';

const mapStateToProps = (state) => {
  return {
    filtersByPayload: state.filtersByPayload
  };
}

class FacetFilter extends Component {
  componentDidMount() {
    const { dispatch, filter } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.state = {search: ''};
    dispatch(fetchFiltersIfNeeded(filter.payload));
  }

  render() {
    let data = this.listFilters();
    return (
        <section className='facet-filter'>
          <h5 className='facet-filter__title' 
            dangerouslySetInnerHTML={{__html: I18N.get(this.props.filter.resource, pack)}}></h5>
          <input className='facet-filter__search'
            name='search'
            onChange={this.handleChange} 
            type='text' 
            placeholder={I18N.get('search', pack)}/>
          <section className='facet-filter__list'>
            <table className='facet-filter__entries'>
              <tbody>
              {data ? 
                data.map(filter => 
                  <FacetFilterEntry key={filter.id} filter={filter} payload={this.props.filter.payload}/>) : null}
              </tbody>
            </table>
          </section>
        </section>
    );
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  listFilters() {
    const {filtersByPayload, filter} = this.props;
    const filterExp = new RegExp(this.state ? '^' + this.state.search: '', 'i');
    let data = filtersByPayload && 
      filter && 
      filtersByPayload[filter.payload] ? filtersByPayload[filter.payload].data : [];
    return data.filter(currentFilter => (currentFilter ? currentFilter.name.search(filterExp) !== -1 : false));
  }
}

export default connect(mapStateToProps)(FacetFilter);