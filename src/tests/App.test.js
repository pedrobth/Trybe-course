import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('check app routes', () => {
  it('renders link with the text `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('renders the Link about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('renders Pokémons Favoritados as favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('renders not found page if a random page is typed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/random-addres');
    const NOT_FOUND = getByText(/Page requested not found/i);
    expect(NOT_FOUND).toBeInTheDocument();
  });
});
