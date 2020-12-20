import React, { Component } from 'react';

export default class ManageAmountFromCart extends Component {
  render() {
    const { product } = this.props
    const { available_quantity, chosenAmount, id } = product;

    return (
      <>
        <h5 data-testid="shopping-cart-product-quantity">Itens no carrinho: {
            chosenAmount
        }</h5>
        <div className="add-cart-button">
          <span>Quantidade </span>
          <button
            data-testid="product-decrease-quantity"
            className="less-product"
            onClick={() => this.props.deductProduct(id, chosenAmount)}
          >
            -
        </button>
          <span>{
            chosenAmount
          }</span>
          <button
            data-testid="product-increase-quantity"
            className="plus-product"
            onClick={() => this.props.addProduct(id, chosenAmount)}
            disabled={chosenAmount === available_quantity}
          >
            +
        </button>
        </div>
      </>
    )
  }
}
