import React, { Component } from 'react';
import I18N from './../../common/i18n';
import './header.content.css';
import pack from './header.i18n.json';
import logo from './logo.png'; 
import Icon from './../../common/icon';

const SEARCH_FIELD_ID = 'search-field';

class HeaderContent extends Component {
  constructor(props) {
    super(props);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleClickEnglish = this.handleClickEnglish.bind(this);
    this.handleClickFrench = this.handleClickFrench.bind(this);
  }

  render() {
    return (
      <div className='header'>
        <div className='header__logo'>
          <a href={I18N.get('title-url', pack)} title={I18N.get('title', pack)}>
            <img alt={I18N.get('logo', pack)} src={logo}/>
          </a>
        </div>
        <h1 className='header__title'>
            {I18N.get('title', pack)}
        </h1>
        <div className='header__search'>
          <form action={'https://www.cfregisters.org/' + I18N.lang() + '/search/results'}>
            <input id={SEARCH_FIELD_ID} type='text' tabIndex='0' name='q' placeholder={I18N.get('placeholder', pack)}/>
            <Icon iconClass={'fa-search'} alternate={true}/>            
          </form>
        </div><div className='header__language'>
          <a href='' onClick={this.handleClickFrench}>{I18N.get('fr', pack)}</a>
          <span> | </span>
          <a href='' onClick={this.handleClickEnglish}>{I18N.get('en', pack)}</a>
        </div>        
      </div>
    );
  }

  handleClickEnglish(event) {
    I18N.changeLanguage('en');
  }

  handleClickFrench(event) {
    I18N.changeLanguage('fr');
  }
  
  handleClickSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    setTimeout(() => document.getElementById(SEARCH_FIELD_ID).focus(), 10);
    return false;
  }
}

export default HeaderContent;
