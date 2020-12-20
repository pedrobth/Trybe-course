import React, { Component } from 'react';
import freeShipping from '../img/free-shipping.png';

export default class FreeShipping extends Component {
  render() {
    return (
      <div data-testid="free-shipping">
        <img id="free-shipping-icon" src={freeShipping} alt="free-shipping" />
      </div>
    )
  }
}
