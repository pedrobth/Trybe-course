import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('check about page', () => {
  it('page contains a h2 tag with the text `About Pokédex`', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const HEADING = getAllByRole('heading', { level: 2 });
    expect(HEADING[1]).toHaveTextContent('About Pokédex');
  });

  it('page contains the image `https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const IMG = getByAltText('Pokédex');
    const IMG_SRC = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(IMG).toBeInTheDocument();
    expect(IMG.src).toBe(IMG_SRC);
  });
});
