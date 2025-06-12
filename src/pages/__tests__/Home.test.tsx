import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Home from '../Home';

describe('Home page', () => {
  it('renders hero heading and CTA links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /it all begins/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /media page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /epk download/i })).toBeInTheDocument();
  });
});
