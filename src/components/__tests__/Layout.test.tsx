import { render, screen } from '@testing-library/react';
import Layout from '../Layout';
import React from 'react';

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
