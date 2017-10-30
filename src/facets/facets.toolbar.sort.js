import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './facets.i18n.json';
import Icon from './../common/icon';
import {connect} from 'react-redux';
import {sortFilters} from './../filters/action';

const mapStateToProps = (state) => {
  return {
    alphabetical: state.sort.alphabetical,
    ascending: state.sort.ascending
  };
}

class FacetsToolbarSort extends Component {
  constructor(props) {
    super(props);    
    this.handleSortAlphabeticalClicked = this.handleSortAlphabeticalClicked.bind(this);
    this.handleSortNumericalClicked = this.handleSortNumericalClicked.bind(this);
    this.state = this.getState(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps);
    this.setState(this.getState(nextProps));    
  }

  getState(props) {
    return {
      classes: ['facets-toolbar-sort'].concat(props.disabled ? ['facets-toolbar-sort--disabled'] : []),
      iconClasses: props.ascending ? 'fa-long-arrow-down' : 'fa-long-arrow-up'
    };
  }
  
  render() {
    return (
      <div className={this.state.classes.join(' ')}>
        <div className='facets-toolbar-sort--block'>
          <h5 className='facets-toolbar-sort__title' >{I18N.get('sort-by', pack)}</h5>
          <div className={['facets-toolbar-sort__alphabetical'].concat(this.props.alphabetical ? 'facets-toolbar-sort--active': '').join(' ')} 
            onClick={this.handleSortAlphabeticalClicked}>
            <span>{I18N.get('sort-alphabetical', pack)}</span>
            <Icon iconClass={this.state.iconClasses} disabled={this.props.disabled} alternate={true}/>
          </div><div className={['facets-toolbar-sort__receipts'].concat(this.props.alphabetical ? '': 'facets-toolbar-sort--active').join(' ')}
            onClick={this.handleSortNumericalClicked}>
            <span>{I18N.get('sort-receipts', pack)}</span>
            <Icon iconClass={this.state.iconClasses} disabled={this.props.disabled} alternate={true}/>
          </div>                
        </div>
      </div>
    );
  }

  handleSortAlphabeticalClicked() {
    if(!this.props.disabled) {
      if(this.props.alphabetical) {
        this.props.dispatch(sortFilters(true, !this.props.ascending));
      } else {
        this.props.dispatch(sortFilters(true, this.props.ascending));
      }
    }    
  }

  handleSortNumericalClicked() {
    if(!this.props.disabled) {
      if(!this.props.alphabetical) {
        this.props.dispatch(sortFilters(false, !this.props.ascending));
      } else {
        this.props.dispatch(sortFilters(false, this.props.ascending));
      }
    }    
  }
}

export default connect(mapStateToProps)(FacetsToolbarSort);