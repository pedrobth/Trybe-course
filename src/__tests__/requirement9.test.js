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
      : reject(err)
  })
);
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedQueryResult
      ? resolve(mockedQueryResult)
      : reject(err)
  })
);
api.getProductsFromId.mockImplementation(
  () => new Promise((resolve, reject) => {
    mockedIdResult
      ? resolve(mockedIdResult)
      : reject(err)
  })
);

describe(`Adicionar um produto ao carrinho a partir de sua tela de exibição
          detalhada`, () => {
  it('Adiciona um produto ao carrinho da sua tela de detalhes', async () => {
    render(<App />);
    try {
      await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    } catch(error) {
      console.log(error);
    }
    fireEvent.click(screen.getAllByTestId('category')[0]);
    try {
      await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
      // await waitFor(() => expect(api.getProductsFromId).toHaveBeenCalled());
    } catch(error) {
      console.log(error);
    }
    fireEvent.click(screen.getAllByTestId('product-detail-link')[0]);
    try {
      await waitFor(
        () => expect(screen.getByTestId('product-detail-name')).toHaveTextContent(
          mockedIdResult.results[0].title,
        ),
      );
    } catch(error) {
      console.log(error);
    }
    fireEvent.click(screen.getByTestId('product-detail-add-to-cart'));
    try {
      await waitFor(
        () => expect(screen.getByTestId
          ('shopping-cart-button')).toBeInTheDocument
      );
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
      mockedIdResult.results[0].title,
    );
    expect(
      screen.getAllByTestId('shopping-cart-product-quantity')[0],
    ).toHaveTextContent('1');
  });
});
