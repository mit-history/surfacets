import React, { Component } from 'react';
import HeaderContent from './header.content'
import HeaderToolbar from './header.toolbar'

class Header extends Component {
  render() {
    return (
      <header>
        <HeaderContent />
        <HeaderToolbar />
      </header>
    );
  }
}

export default Header;
