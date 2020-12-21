import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShoppingCart.css';
import cart from '../img/cart.png';
import goHome from '../img/back.png';
import empytCart from '../img/empty-cart.png';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      productList: []
    };

    this.buildCartFromStorage = this.buildCartFromStorage.bind(this);
    this.lessProduct = this.lessProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.checkoutItems = this.checkoutItems.bind(this);
  }

  async buildCartFromStorage() {
    if (localStorage.getItem('cart')) {
      const productsFromStorage = await JSON.parse(localStorage.getItem('cart'));
      this.setState({ productList: productsFromStorage });
    }
  }

  componentDidMount() {
    this.buildCartFromStorage();
  }

  addProduct(productTitle, addQuantity) {
    const productListOnAdd = JSON.parse(localStorage.getItem('cart'));
    const indexProduct = productListOnAdd.findIndex(item => item.title === productTitle);
    productListOnAdd[indexProduct].quantity = addQuantity + 1;
    this.setState(() => ({ productList: productListOnAdd }));
    this.updateLocalStorage(productListOnAdd);
  }


  lessProduct(productTitle, decreaseQuantity) {
    const value = decreaseQuantity < 1
      ? 1
      : decreaseQuantity;
    const productListOnRemove = JSON.parse(localStorage.getItem('cart'));
    const indexProduct = productListOnRemove.findIndex(item => item.title === productTitle);
    productListOnRemove[indexProduct].quantity = value - 1;
    this.setState({ productList: productListOnRemove });
    this.updateLocalStorage(productListOnRemove);
  }

  updateLocalStorage(productList) {
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(productList));
  }

  checkoutItems() {
    const checkedOutProducts = this.state.productList;
    this.updateLocalStorage(checkedOutProducts);
  }

  headerMount() {
    return (
      <div>
        <div className="icon-box">
          <Link to="/">
            <img src={goHome} alt="imagem voltar para home" />
          </Link>
          <Link to="/cart">
            <img src={cart} alt="imagem do carrinho" data-testid="shopping-cart-button" />
            <span>Carrinho de Compras</span>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { productList } = this.state;
        
    if (!localStorage.getItem('cart')) {
      return (
        <>
          <this.headerMount />
          <div className="empty-cart">
            <img src={empytCart} alt="carrinho vazio" />
            <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
            {
              productList
               ? <div className="items-in-cart" data-testid="shopping-cart-size">{ productList.length }</div>
               : <div data-testid="shopping-cart-size" hidden></div>
            }
          </div>
        </>
      );
    }

    return (
      <div className="product-on-cart">
        <this.headerMount />
        {
          productList.map((product, index) => (
            <div key={index}>
              <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
              <h5 data-testid="shopping-cart-product-quantity">{product.quantity}</h5>
              <div className="add-cart-button">
                <span>Quantidade</span>
                <button
                  data-testid="product-decrease-quantity"
                  className="less-product"
                  onClick={ () => this.lessProduct(product.title, product.quantity) }
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  data-testid="product-increase-quantity"
                  className="plus-product"
                  onClick={ () => this.addProduct(product.title, product.quantity) }
                  disabled={ product.quantity === product.availableQuantity }
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
        <Link to="/checkout">
          <button
            onClick={this.checkoutItems}
            data-testid="checkout-products"
          >
            Finalizar compra
          </button>
        </Link>
      </div>
    );
  }
}

export default ShoppingCart;
