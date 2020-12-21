import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import freeShipping from '../img/free-shipping.png';

export default class ProductCard extends Component {
  constructor(props) {
    super();

    this.state = {
      details: false,
      productId: props.product.id,
      title: props.product.title,
      price: props.product.price,
      thumbnail: props.product.thumbnail,
      quantity: 1,
      availableQuantity: props.product.available_quantity,
    };

    this.openDetails = this.openDetails.bind(this);
    this.plainProduct = this.plainProduct.bind(this);
    this.detailedProduct = this.detailedProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.freeShipping = this.freeShipping.bind(this);
    this.calcShipping = this.calcShipping.bind(this);
  }

  addToCart() {
    const { title, price, thumbnail, quantity, availableQuantity, productId } = this.state;

    const obj = {
      title,
      price,
      thumbnail,
      quantity,
      availableQuantity,
      productId,
    };

    if (!localStorage.getItem('cart')) {
      const array = [];
      array.push(obj);
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(array));
    } else {
      const save = JSON.parse(localStorage.getItem('cart'));
      save.push(obj);
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(save));
    }
    this.props.updateCartIcon();
  }

  detailedProduct() {
    const { cartProducts, product } = this.props;
    const { title, price, thumbnail, attributes, id } = product;
    const { quantity } = this.state;

    return (
      <div data-testid="product">
        <div data-testid="shopping-cart-product-name">{title}</div>
        <div>{price}</div>
        <img src={ thumbnail } alt={ title } />
        <div data-testid="shopping-cart-product-quantity">{quantity}</div>
        <Link
          to={{
            pathname: `/productDetails/${id}`,
            state: { cartProducts }
          }}
          data-testid="product-detail-link"
        >
          DETALHES
        </Link>
        {
          attributes.map(({ name, value_name: valueName, productId }) => (
            <p key={ `${productId}-${name}` }>{`${name}: ${valueName}`}</p>
          ))
        }
      </div>
    );
  }

  openDetails() {
    this.setState({ details: true });
  }

  plainProduct() {
    const { cartProducts, product } = this.props
    const { title, price, thumbnail, id, shipping } = product;

    return (
      <div data-testid="product" onClick={ this.openDetails }>
        <div>{title}</div>
        <div>{price}</div>

        <img src={thumbnail} alt={title} />
        {
          shipping.free_shipping
          ? <this.freeShipping />
          : <this.calcShipping />
        }
        <Link
          to={{
            pathname: `/productDetails/${id}`,
            state: { cartProducts }
          }}
          data-testid="product-detail-link"
          >
            DETALHES
          </Link>
      </div>
    );
  }

  calcShipping() {
    return (
      <section>Calcule o frete</section>
    )
  }

  freeShipping() {
    return (
      <div className="free-shipping" data-testid="free-shipping" >
        <img src={freeShipping} alt="free-shipping" />
      </div>
    )
  }

  render() {
    const { details } = this.state;

    return (
      details
        ? <>
          <this.detailedProduct />
          <button
            type="submit"
            data-testid="product-add-to-cart"
            onClick={this.addToCart}
          >
            Adicionar ao Carrinho
            </button>
        </>
        : <>
          <this.plainProduct />
          <button
            type="submit"
            data-testid="product-add-to-cart"
            onClick={this.addToCart}
          >
            Adicionar ao Carrinho
            </button>
          </>
    );
  }
}
