import React, { Component } from 'react';
import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['button'].concat(props.disabled ? ['button--disabled']: [])
    };
  }

  render() {
    return (
      <button className={this.state.classes.join(' ')}>
        {this.props.title}
      </button>
    );
  }
}

export default Button;