import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cart from '../img/cart.png';

export default class CartIcon extends Component {
  render() {
    const { cartItemsAmount, cartProducts } = this.props;

    return (
      <Link
        to={{
          pathname: "cart",
          state: { cartItemsAmount, cartProducts }
        }}
        data-testid="shopping-cart-button"
        className="cart-wrapper"
      >
        <img src={cart} alt="icone do carrinho" className="icon" />
        {
          cartProducts
          ? <div
            data-testid="shopping-cart-size"
            className="itens-in-cart"
          >{cartItemsAmount}</div>
          : <div data-testid="shoppping-cart-size">0</div>
        }
      </Link>
    )
  }
}
