import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import RoleModel from '../RoleModel';

describe('RoleModel page', () => {
  it('renders hero heading and reveals legal notes', async () => {
    render(
      <MemoryRouter>
        <RoleModel />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /role model/i })).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /show legal notes/i });
    await userEvent.click(btn);
    expect(screen.getByRole('heading', { name: /legal notes, probably/i })).toBeInTheDocument();
  });
});
