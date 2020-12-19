import React from 'react';
import pokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('check favorites page', () => {
  it('render favorite pokemons', () => {
    const ONE_FIVE_ONE = 151;
    const FOUR = 4;
    const TWENTY_FIVE = 25;
    const IDS = [ONE_FIVE_ONE, FOUR, TWENTY_FIVE];
    const POKEMONS = pokemons.filter((poke) => IDS.includes(poke.id));

    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ POKEMONS } />);

    POKEMONS.forEach((poke) => expect(getByText(poke.name)).toBeInTheDocument());
  });

  it('if no favorite pokemons must render `No favorite pokemon  found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const NOT_FOUND = getByText(/No favorite pokemon found/i);
    expect(NOT_FOUND).toBeInTheDocument();
  });
});
