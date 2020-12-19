import React from 'react';
import { fireEvent } from '@testing-library/dom';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';

describe('check Pokedex page', () => {
  it('render a differnt pokemon when next pokemon button is clicked.', () => {
    const { getByText,
      getAllByText,
      getByRole,
      queryByTestId,
    } = renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);

    pokemons.forEach((poke, index) => {
      const { value, measurementUnit } = poke.averageWeight;
      const POKE_LIST_SIZE = pokemons.length - 1;
      const NEXT_BTN = queryByTestId('next-pokemon');

      expect(getByText(poke.name)).toBeInTheDocument();
      expect(getAllByText(poke.type)[0]).toBeInTheDocument();
      expect(getByRole('img').src).toBe(poke.image);
      expect(getByText(
        `Average weight: ${value} ${measurementUnit}`,
      )).toBeInTheDocument();
      fireEvent.click(NEXT_BTN);
      if (index === POKE_LIST_SIZE) {
        const FIRST_POKE = pokemons[0];
        const POKE_WEIGHT = FIRST_POKE.averageWeight.value;
        const WEIGHT_UNIT = FIRST_POKE.averageWeight.measurementUnit;
        expect(getByText(FIRST_POKE.name)).toBeInTheDocument();
        expect(getAllByText(FIRST_POKE.type)[0]).toBeInTheDocument();
        expect(getByRole('img').src).toBe(FIRST_POKE.image);
        expect(getByText(
          `Average weight: ${POKE_WEIGHT} ${WEIGHT_UNIT}`,
        )).toBeInTheDocument();
      }
    });
  });

  it('render filter buttons and check its functionality', () => {
    const { getAllByTestId,
      getByText,
      getAllByText,
    } = renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
    const EXPECTED_LENGTH = 7;
    const FIRST_EXPECTED_TYPE = 'Electric';
    const BTNS_POKE_TYPE = getAllByTestId('pokemon-type-button');
    const BTN_ALL = getByText('All');
    const NEXT_BTN = getByText('Próximo pokémon');
    expect(BTNS_POKE_TYPE.length).toBe(EXPECTED_LENGTH);
    expect(BTNS_POKE_TYPE[0]).toHaveTextContent(FIRST_EXPECTED_TYPE);
    fireEvent.click(BTNS_POKE_TYPE[1]);
    expect(getByText('Charmander')).toBeInTheDocument();
    expect(getAllByText('Fire')[0]).toBeInTheDocument();
    expect(BTN_ALL).toBeInTheDocument();
    fireEvent.click(BTN_ALL);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getAllByText('Electric')[0]).toBeInTheDocument();
    fireEvent.click(NEXT_BTN);
    expect(getByText('Charmander')).toBeInTheDocument();
    expect(getAllByText('Fire')[0]).toBeInTheDocument();
  });
});
