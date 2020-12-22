import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';
import mockedQueryResult from '../__mocks__/query';
import mockedIdResult from '../__mocks__/id';

jest.mock('../services/api');
api.getCategories.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedCategoriesResult
      ? resolve(mockedCategoriesResult)
      : reject(error)
  })
);
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedQueryResult
      ? resolve(mockedQueryResult)
      : reject(error)
  })
);
api.getProductsFromId.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedIdResult
      ? resolve(mockedIdResult)
      : reject(error)
  })
);

describe(`A quantidade de produtos adicionados ao carrinho deve ser limitada pela quantidade disponível em estoque`, () => {
  it(`Não adiciona ao carrinho mais produtos do que o disponível em
      estoque`, async () => {
    render(<App />);
    try {
      await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    } catch(error) {
      console.log(error);
    }
    fireEvent.click(screen.getAllByTestId('category')[0]);
    try {
      await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    } catch(error) {
      console.log(error);
    }
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    try {
      await waitFor(() => expect(screen.getByTestId('shopping-cart-size')).toHaveTextContent(1));
    } catch(error) {
      console.log(error);
    }
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    try {
      await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    } catch(error) {
      console.log(error);
    }
    expect(screen.getAllByTestId('shopping-cart-product-name')[0]).toHaveTextContent(
      mockedQueryResult.results[1].title,
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '1',
    );
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    // await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(3));
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      mockedQueryResult.results[1].available_quantity,
    );
    // console.log(screen.getAllByTestId('product-increase-quantity')[0])
    // expect(screen.getAllByTestId('product-increase-quantity')[0].closest('button')).toBeDisabled();
  });
});
