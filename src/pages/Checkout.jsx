import React, { Component } from 'react';
import '../styles/Checkout.css';

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      roundedTotal: 0,
      emptyFieldStyle: '',
      fullName: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      extraAddressInfo: '',
      residenceNumber: '',
      city: '',
      state: '',
      paymentMethod: '',
    };

    this.buildCartFromStorage = this.buildCartFromStorage.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addProductsToState = this.addProductsToState.bind(this);
  }

  componentDidMount() {
    this.buildCartFromStorage();
    this.addProductsToState();
  }

  buildCartFromStorage() {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.setState({ productList: cart });
    }
  }

  addProductsToState() {
    if (localStorage.getItem('cart')) {
      const productList = JSON.parse(localStorage.getItem('cart'));
      this.setState({ productList }, () => {
        this.calculateTotal();
      });
    }
  }

  calculateTotal() {
    const { productList } = this.state;
    const empty = 0;
    const twoDigits = 2;

    if (productList.length > empty) {
      const total = productList
        .reduce((accumulator, currentproduct) => accumulator + currentproduct.price, empty);
      const roundedTotal = total.toFixed(twoDigits);
      this.setState({ roundedTotal });
    }
  }

  closeOrder() {
    let areThereEmptyFields = false;
    const listOfEmptyFields = [];
    const formInfo = { ...this.state };

    if (formInfo) {
      delete formInfo.productList;
      delete formInfo.roundedTotal;
      delete formInfo.emptyFieldStyle;
    }

    for (const key in formInfo) {
      const value = formInfo[key];

      if (!value) {
        areThereEmptyFields = true;
        listOfEmptyFields.push(key);
      }
    }

    if (areThereEmptyFields) {
      this.setState({ emptyFieldStyle: 'empty-field' });

    } else {
      this.state({
        productList: '',
        roundedTotal: '',
        fullName: '',
        cpf: '',
        email: '',
        phone: '',
        cep: '',
        address: '',
        extraAddressInfo: '',
        residenceNumber: '',
        city: '',
        state: '',
        paymentMethod: '',
      });
      this.props.history.push('/');
    }
  }

  handleChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value });
  }

  render() {
    const {
      productList,
      roundedTotal,
      emptyFieldStyle,
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      extraAddressInfo,
      residenceNumber,
      city,
    } = this.state;

    return (
      <main>
        <section>
          <h2>Revise seus produtos</h2>
          {
            productList && productList.map((product, index) => (
              <p key={index}>
                <span>{product.title}</span>
                <span>{`R$ ${product.price}`}</span>
              </p>
            ))
          }
          <p>{`Total: R$ ${roundedTotal}`}</p>
        </section>
        <section>
          <h2>Informações do comprador</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Nome completo"
            onChange={ this.handleChange }
            value={ fullName }
            className={ emptyFieldStyle }
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
            className={ emptyFieldStyle }
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            onChange={ this.handleChange }
            value={ cpf }
            className={ emptyFieldStyle }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            onChange={ this.handleChange }
            value={ phone }
            className={ emptyFieldStyle }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            onChange={ this.handleChange }
            value={ cep }
            className={ emptyFieldStyle }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            onChange={ this.handleChange }
            value={ address }
            className={ emptyFieldStyle }
            data-testid="checkout-address"
          />
          <input
            type="text"
            name="extraAddressInfo"
            placeholder="Complemento"
            onChange={ this.handleChange }
            value={ extraAddressInfo }
            className={ emptyFieldStyle }
          />
          <input
            type="text"
            name="residenceNumber"
            placeholder="Número"
            onChange={ this.handleChange }
            value={ residenceNumber }
            className={ emptyFieldStyle }
          />
          <input
            type="text"
            name="city"
            placeholder="Cidade"
            onChange={ this.handleChange }
            value={ city }
            className={ emptyFieldStyle }
          />
          <select name="state" onChange={ this.handleChange }>
            <option value="">Estado</option>
            <option value="Rio Grande do Sul">Rio Grande do Sul</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Minas Gerais">Minas Gerais</option>
          </select>
        </section>
        <section>
          <h2>Método de pagamento</h2>
          <label htmlFor="bank-invoice">
            Boleto
            <input
              type="radio"
              name="paymentMethod"
              value="bank-invoice"
              onChange={ this.handleChange }
              id="bank-invoice"
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              type="radio"
              name="paymentMethod"
              value="visa"
              onChange={ this.handleChange }
              id="visa"
            />
          </label>
          <label htmlFor="master-card">
            MasterCard
            <input
              type="radio"
              name="paymentMethod"
              value="master-card"
              onChange={ this.handleChange }
              id="master-card"
            />
          </label>
          <label htmlFor="elo">
            Elo
            <input
              type="radio"
              name="paymentMethod"
              value="elo"
              onChange={ this.handleChange }
              id="elo"
            />
          </label>
        </section>
        <button type="submit" onClick={ this.closeOrder }>Comprar</button>
      </main>
    );
  }
}
