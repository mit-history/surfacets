import React, { Component } from 'react';
import I18N from './../../common/i18n';
import './header.content.css';
import pack from './header.i18n.json';
import logo from './logo.png'; 

class HeaderContent extends Component {
  constructor(props) {
    super(props);
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
          <input type='text'/>
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
}

export default HeaderContent;
