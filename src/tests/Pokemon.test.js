import React from 'react';
import { fireEvent } from '@testing-library/dom';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('check favorites page', () => {
  const CHARMANDER_ID = 4;
  const POKEMON = pokemons.filter((poke) => poke.id === CHARMANDER_ID)[0];
  it('render favorite pokemons', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokemon pokemon={ POKEMON } />);
    const { value, measurementUnit } = POKEMON.averageWeight;

    expect(getByText(POKEMON.name)).toBeInTheDocument();
    expect(getByText(POKEMON.type)).toBeInTheDocument();
    expect(getByRole('img').src).toBe(POKEMON.image);
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  });

  it('render pokemon detail link. Link must redirect to pokemon details page ', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ POKEMON } />);
    const DETAIL_LINK = getByRole('link');

    fireEvent.click(DETAIL_LINK);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${CHARMANDER_ID}`);
  });

  it('Favorite pokemons card must render a star', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon pokemon={ POKEMON } isFavorite />);
    const IMG = getAllByRole('img')[1];
    expect(IMG.src).toBe('http://localhost/star-icon.svg');
    expect(IMG.alt).toBe(`${POKEMON.name} is marked as favorite`);
  });
});
