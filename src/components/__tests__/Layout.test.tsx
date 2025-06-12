import { render, screen } from '@testing-library/react';
import Layout from '../global/Layout';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('Layout', () => {
  it('renders children', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Child</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
