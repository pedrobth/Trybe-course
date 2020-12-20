import React, { Component } from 'react';

export default class ManageProductAmount extends Component {
  render() {
    const { product, deductProduct, addProduct } = this.props;
    const { amountAdded, available_quantity, chosenAmountToAdd, id } = product;

    return (
      <>
        <h5 data-testid="shopping-cart-product-quantity">
          Quantidade no carrinho:
          {
            amountAdded
          }
        </h5>
        <div className="add-cart-button">
          <span>Quantidade </span>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            className="less-product"
            onClick={ () => deductProduct(id, chosenAmountToAdd) }
          >
            -
          </button>
          <span>
            {
              chosenAmountToAdd
            }
          </span>
          <button
            data-testid="product-increase-quantity"
            type="button"
            className="plus-product"
            onClick={ () => addProduct(id, chosenAmountToAdd) }
            disabled={ chosenAmountToAdd === available_quantity }
          >
            +
          </button>
        </div>
      </>
    );
  }
}
