import React, { Component } from 'react';
import { CalcShipping, FreeShipping } from './'

export default class DetailedProduct extends Component {

  render() {
    const { product } = this.props;
    const { available_quantity, chosenAmountToAdd, id, price, shipping, thumbnail, title } = product;

    return (
      <div data-testid="product">
        <div key={id}>
          <h3 data-testid="shopping-cart-product-name" onClick={this.props.openDetails}>{title}</h3>
          <div id="images-wrapper">
            <img
              src={thumbnail}
              alt={title}
              onClick={this.props.openDetails}
            />
            {
              shipping.free_shipping
                ? <FreeShipping />
                : <CalcShipping />
            }
          </div>
          <div>R$ {price}</div>
          <h4>Quantidade disponível: {available_quantity}</h4>
        </div>
      </div>
    );
  }
}
