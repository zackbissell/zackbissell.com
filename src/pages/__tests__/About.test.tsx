import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../About';
import React from 'react';

describe('About page', () => {
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /The Story Behind the Sound/i })
    ).toBeInTheDocument();
  });
});
