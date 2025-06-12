import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import NostalgiaTrap from '../NostalgiaTrap';

describe('NostalgiaTrap page', () => {
  it('displays intro prompt and handles dismissal', async () => {
    render(
      <MemoryRouter>
        <NostalgiaTrap />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /before you enter/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /i'm ready to remember/i }));
    expect(screen.getByRole('heading', { name: /how are you feeling right now/i })).toBeInTheDocument();
  });
});
