import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import DiscoAscension from '../DiscoAscension';

describe('DiscoAscension page', () => {
  it('shows hero heading and toggles incident log', async () => {
    render(
      <MemoryRouter>
        <DiscoAscension />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /disco ascension/i })).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: /access classified research files/i });
    await userEvent.click(toggle);
    expect(screen.getByText(/disco ball manifestation/i)).toBeInTheDocument();
  });
});
