import React, { Component } from 'react';
import './icon.css';

const DEFAULT_ICON = 'icon--default';
const ALTERNATE_ICON = 'icon--alternate';

class Icon extends Component {  
  constructor(props) {
    super(props);
    this.state = {baseClass: this.props.alternate ? ALTERNATE_ICON : DEFAULT_ICON};
  }
  
  render() {
    return (
      <span 
        className={['fa icon'].concat([this.state.baseClass, this.props.iconClass]).join(' ')} 
        onClick={this.props.onClick}>
      </span>
    );
  }
}

export default Icon;