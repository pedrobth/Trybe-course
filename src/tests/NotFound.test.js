import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('check not found page', () => {
  it('Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const HEADING = getByRole('heading', { level: 2 });
    expect(HEADING).toHaveTextContent('Page requested not found 😭');
  });

  it('page contains the image `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const IMG = getAllByRole('img')[1];
    const IMG_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(IMG).toBeInTheDocument();
    expect(IMG.src).toBe(IMG_SRC);
  });
});
