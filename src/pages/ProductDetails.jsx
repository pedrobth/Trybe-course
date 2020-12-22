import React, { Component } from 'react';
import * as api from '../services/api';
import { Redirect } from 'react-router-dom';
import empytCart from '../img/empty-cart.png';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      thumbnail: '',
      attributes: '',
      loading: true,
      productId: props.match.params.productId,
      quantity: 1,
      available_quantity: 0,
      email: '',
      comment: '',
    }

    this.detailedProduct = this.detailedProduct.bind(this);
    this.lessProduct = this.lessProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.formProduct = this.formProduct.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.divReview = this.divReview.bind(this);
    this.loadingPage = this.loadingPage.bind(this);
    this.itemsInCart = this.itemsInCart.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
  }

  async componentDidMount() {
    const { productId, category, title } = this.props.match.params;
    const productFromId = await api.getProductsFromId(productId);
    const productList = await api.getProductsFromCategoryAndQuery(category, title);
    const productFilter = productList.results.filter(product => product.id === productId)[0];
    const product = productFilter ? productFilter : productFromId;
    const { price, thumbnail, attributes, available_quantity } = product;
    this.setState({
      addedToCart: false,
      title: product.title,
      price,
      thumbnail,
      attributes,
      available_quantity,
      loading: false,
    });
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', '');
    }
  }

  loadingPage() {
    const { cartProducts } = this.props.location.state;
    return (
      cartProducts
        ? <this.itemsInCart />
        : <this.emptyCart />
    )
  }
  
  emptyCart() {
    return (
      <div>
        <p>Carregando...</p>
        <div className="empty-cart">
          <img src={empytCart} alt="carrinho" />
          <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        </div >
      </div>
    )
  }
  
  itemsInCart() {
    const { cartProducts } = this.props.location.state;
    return (
      <div className="empty-cart">
          <img src={empytCart} alt="carrinho" />
          <span></span>
          <div className="items-in-cart" data-testid="shopping-cart-size">{cartProducts.length}</div>
        </div >
    )
  }

  lessProduct() {
    const { quantity } = this.state;
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      this.setState({
        quantity: newQuantity,
      });
    }
  }

  addProduct() {
    const { quantity } = this.state;
    const newQuantity = quantity + 1;
    this.setState({
      quantity: newQuantity,
    });
  }

  async addToCart() {

    const { title, price, thumbnail, quantity, productId } = this.state;
    const { available_quantity } = await api.getProductsFromId(productId);
    const product = {
      title,
      price,
      thumbnail,
      quantity,
      availableQuantity: available_quantity,
      productId,
    };

    const newLocalStorage = [];

    if (!localStorage.getItem('cart')) {
      newLocalStorage.push(product);
    } else {
      const oldLocalStorage = JSON.parse(localStorage.getItem('cart'));
      const productIndex = oldLocalStorage.findIndex((product) => product.productId === productId);
      if (productIndex === -1) {
        product.quantity = quantity;
        oldLocalStorage.push(product);
      } else if (available_quantity <= (quantity + oldLocalStorage[productIndex].quantity)) {
        oldLocalStorage[productIndex].quantity = available_quantity;
      } else {
        oldLocalStorage[productIndex].quantity += quantity;
      }
      oldLocalStorage.map((product) => newLocalStorage.push(product));
    }
    localStorage.setItem('cart', JSON.stringify(newLocalStorage));
    this.setState({ addedToCart: true })
  }

  formProduct() {
    return (
      <form>
        <input type="text" onChange={this.handleChangeEmail} />
        <textarea data-testid="product-detail-evaluation" onChange={this.handleChangeText}></textarea>
        <button onClick={this.saveForm}>Avaliar</button>
      </form>
    );
  }

  divReview() {
    const { title } = this.state;
    if (localStorage.getItem(title)) {
      const reviewArray = JSON.parse(localStorage.getItem(title));
      return (
        <div>
          {
            reviewArray.map((review) => <div><h3>email {review.email}</h3><p>comentario : {review.comment}</p></div>)
          }
        </div>
      );
    } else {
      return (<div>
        <p>Produto sem comentarios.</p>
      </div>
      );
    }
  }

  saveForm() {
    const { productId, email, comment } = this.state;
    if (!localStorage.getItem(productId)) {
      const array = [];
      if (email) {
        const obj = {
          email,
          comment,
        };
        array.push(obj);
        localStorage.setItem(productId, JSON.stringify(array));
      } else {

      }
    } else {
      if (email) {
        const save = JSON.parse(localStorage.getItem(productId));
        const obj = {
          email,
          comment,
        };
        save.push(obj);
        localStorage.setItem(productId, JSON.stringify(save));
      } else {
        alert('Digite um email')
      }
    }
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({
      email,
    });
  }

  handleChangeText(event) {
    const comment = event.target.value;
    this.setState({
      comment,
    });
  }

  detailedProduct() {
    const { cartProducts } = this.props.location.state;
    const { title, price, thumbnail, attributes, quantity } = this.state;
    return (
      <>
        <div data-testid="product-detail-link">
          <div data-testid="product-detail-name">{title}</div>
          <div>{price}</div>
          <img src={thumbnail} alt={`${title}`} />
          {
            attributes.map(({ name, value_name, id }) => {
              return (<p key={`${id}`}>{`${name}: ${value_name}`}</p>);
            })
          }
          <div className="add-cart-button">
            <span>Quantidade</span>
            <button className="less-product" onClick={this.lessProduct}>-</button>
            <span>{quantity}</span>
            <button className="plus-product" onClick={this.addProduct}>+</button>
            <button
              // to={`/cart/`}
              data-testid="product-detail-add-to-cart" onClick={this.addToCart}
              type="button"
            >
              Inserir no Carrinho
            </button>
          </div>
          {
            cartProducts
            ? <this.itemsInCart />
            : <this.emptyCart />
          }
          <this.formProduct />
          <this.divReview />
        </div>
      </>
    )
  }

  render() {
    const { loading, addedToCart } = this.state
    return (
      addedToCart
      ? <Redirect to="/cart"/>
      : loading
          ? <this.loadingPage />
          : <this.detailedProduct />
    )
  }
}
