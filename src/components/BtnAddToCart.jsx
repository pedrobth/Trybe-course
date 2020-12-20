import React, { Component } from 'react';

export default class BtnAddToCart extends Component {
  render() {
    const { addToCart } = this.props
    return (
      <button
        type="submit"
        data-testid="product-add-to-cart"
        onClick={addToCart}
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}
