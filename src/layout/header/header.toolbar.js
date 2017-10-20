import React, { Component } from 'react';
import I18N from './../../common/i18n';
import pack from './header.i18n.json';
import './header.toolbar.css';

class HeaderToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {resource: 'project', url: 'project-url'},
        {resource: 'encyclopedia', url: 'encyclopedia-url'},
        {resource: 'pedagogia', url: 'pedagogia-url'},
        {resource: 'registers', url: 'registers-url'},
        {resource: 'tools', url: 'tools-url', active: true}
      ]
    } 
  }

  render() {
    return (
      <nav className='header-toolbar'>
         {this.state.items.map(item => 
          <div key={item.resource} className={['header-toolbar__item']}>
            <a href={I18N.get(item.url, pack)} className={['header-item__link'].concat(
              item.active ? ['header-item__link--active'] : []).join(' ')}>
              {I18N.get(item.resource, pack)}
            </a>            
          </div>)}
      </nav>
    );
  }
}

export default HeaderToolbar;
