import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  noProducts() {
    return <div>Nenhum produto foi encontrado</div>;
  }

  render() {
    const { products, emptyList, updateCartIcon, cartProducts } = this.props;

    return (
      <div>
        {
          emptyList
            ? this.noProducts()
            : products.map((product, index) => {
              return <ProductCard
                cartProducts={cartProducts}
                key={index}
                product={product}
                updateCartIcon={updateCartIcon}
              />;
            })
        }
      </div>
    );
  }
}
