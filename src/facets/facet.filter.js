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
    dispatch(fetchFiltersIfNeeded(filter.payload));
  }

  render() {
    const {filtersByPayload, filter} = this.props;
    let data = filtersByPayload && filter && filtersByPayload[filter.payload] ? filtersByPayload[filter.payload].data : [];
    return (
        <section className='facet-filter'>
          <h5 className='facet-filter__title' 
            dangerouslySetInnerHTML={{__html: I18N.get(this.props.filter.resource, pack)}}></h5>
          <input className='facet-filter__search' type='text' placeholder={I18N.get('search', pack)}/>
          <section className='facet-filter__list'>
            <table className='facet-filter__entry'>
              <tbody>
              {data ? 
                data.map(filter => 
                  <FacetFilterEntry key={filter.id} filter={filter}/>) : null}
              </tbody>
            </table>
          </section>
        </section>
    );
  }
}

export default connect(mapStateToProps)(FacetFilter);