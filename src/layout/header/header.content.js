import React, { Component } from 'react';
import I18N from './../../common/i18n';
import './header.content.css';
import pack from './header.i18n.json';
import logo from './logo.png'; 

class HeaderContent extends Component {
  render() {
    return (
      <div className='header'>
        <div className='header__logo'>
          <img alt='Logo registres de la Comédie Française' src={logo}/>
        </div>
        <h1 className='header__title'>
            {I18N.get('title', pack)}
        </h1>
        <div className='header__search'>
          <input type='text'/>
        </div><div className='header__language'>
          <a href=''>{I18N.get('fr', pack)}</a>
          <span> | </span>
          <a href=''>{I18N.get('en', pack)}</a>
        </div>        
      </div>
    );
  }
}

export default HeaderContent;


