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

describe(`Visualizar a lista de produtos adicionados ao carrinho em sua página e
          manipular sua quantidade`, () => {
  it('Adiciona produtos ao carrinho e manipula suas quantidades', async () => {
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
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[0]);
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    await waitFor(() => expect(screen.getByTestId('shopping-cart-size')).toHaveTextContent(2));
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    expect(screen.getAllByTestId('shopping-cart-product-name')[0]).toHaveTextContent(
    mockedQueryResult.results[0].title,);
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '1',
    );
    expect(screen.getAllByTestId('shopping-cart-product-name')[1]).toHaveTextContent(
      mockedQueryResult.results[1].title,
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[1]).toHaveTextContent(
      '1',
    );
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-decrease-quantity')[0]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
    fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(
      '2',
    );
    expect(screen.getAllByTestId('shopping-cart-product-quantity')[1]).toHaveTextContent(
      '3',
    );
  });
});
