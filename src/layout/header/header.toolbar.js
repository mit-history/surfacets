import React, { Component } from 'react';
import I18N from './../../common/i18n';
import pack from './header.i18n.json';
import './header.toolbar.css';

class HeaderToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {resource: 'project'},
        {resource: 'encyclopedia'},
        {resource: 'pedagogia'},
        {resource: 'registers'},
        {resource: 'tools', active: true}
      ]
    } 
  }

  render() {
    return (
      <nav className='header-toolbar'>
         {this.state.items.map(item => 
          <div key={item.resource} className={['header-toolbar__item'].concat(
              item.active ? ['header-toolbar--active'] : []).join(' ')}>
            {I18N.get(item.resource, pack)}
          </div>)}
      </nav>
    );
  }
}

export default HeaderToolbar;
