import React, { Component } from 'react';
import './button.css';

class Button extends Component {  
  render() {
    return (
      <button 
        disabled={this.props.disabled}
        className={['button'].concat(this.props.disabled ? ['button--disabled']: []).join(' ')} 
        onClick={this.props.onClick}>
        {this.props.title}
      </button>
    );
  }
}

export default Button;