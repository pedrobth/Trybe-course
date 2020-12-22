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
  }),
);
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedQueryResult
      ? resolve(mockedQueryResult)
      : reject(error)
  }),
);
api.getProductsFromId.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedIdResult
      ? resolve(mockedIdResult)
      : reject(error)
  })
);

describe('Adicionar produtos a partir da tela de listagem de produtos', () => {
  it('Adiciona da tela de listagem um produto que aparece no carrinho', async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[0]);
    await waitFor(() => expect(screen.getByTestId('shopping-cart-size')).toHaveTextContent(1));
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    await waitFor(() => expect(screen.getByTestId('shopping-cart-product-name')).toHaveTextContent(
      mockedQueryResult.results[0].title,
    ));
    expect(screen.getByTestId('shopping-cart-product-quantity')).toHaveTextContent('1');
  });
});
