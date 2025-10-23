import '@testing-library/jest-dom';

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

import { AppProviders } from '../test-utils/providers';

describe('App', () => {
  it('should render without crashing', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
