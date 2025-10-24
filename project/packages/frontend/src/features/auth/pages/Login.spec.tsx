import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { AppProvidersNoRouter } from '@src/test-utils/AppProvidersNoRouter';
import { ProviderLoginWithRouter } from '@src/test-utils/ProviderLoginWithRouter';

import * as authApi from '@src/services/authApi';
import * as authStore from '@src/store/useAuthStore';

// Error: to avoid this TypeError: matchMedia is not a function at prefersReducedMotion (react-hot-toast)
//
// Problem: "This is a classic issue when testing React components that use window.matchMedia in a Node environment like Vitest or Jest. The window.matchMedia API is not implemented in Node.js, so the test crashes.""
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {
      /* empty */
    },
    removeListener: () => {
      /* empty */
    },
    addEventListener: () => {
      /* empty */
    },
    removeEventListener: () => {
      /* empty */
    },
    dispatchEvent: () => false,
  }),
});

beforeEach(() => {
  vi.restoreAllMocks();
});

const renderLogin = () =>
  render(
    <AppProvidersNoRouter>
      <ProviderLoginWithRouter />
    </AppProvidersNoRouter>
  );

describe('Login page', () => {
  it('renders email and password fields and submit button', () => {
    renderLogin();

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('button-login-submit')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderLogin();

    // fireEvent.click(screen.getByTestId('button-login-submit'));

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test' },
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('calls loginUser and navigates on successful login', async () => {
    const user = userEvent.setup();

    const loginSpy = vi.spyOn(authStore.useAuthStore.getState(), 'login');
    const mockLogin = vi.spyOn(authApi, 'loginUser').mockResolvedValue({
      token: 'token123',
      user: {
        email: 'test@test.com',
        firstName: '',
        lastName: '',
        slug: '',
        password: 'mypassword123',
      },
    });

    renderLogin();

    await user.type(screen.getByTestId('email'), 'test@test.com');
    await user.type(screen.getByTestId('password'), 'mypassword123');

    await user.click(screen.getByTestId('button-login-submit'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'mypassword123',
      });
      expect(loginSpy).toHaveBeenCalled();
    });

    // await waitFor(() => {
    //   console.log('test => ', document.body.innerHTML);
    // });

    expect(await screen.findByText(/home page/i)).toBeInTheDocument();

    expect(await screen.findByText(/success!/i)).toBeInTheDocument();
  });

  it('shows error message on login failure', async () => {
    const loginSpy = vi.spyOn(authApi, 'loginUser').mockRejectedValue({
      message: 'Invalid credentials',
    });

    renderLogin();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'Wrongpass@1234' },
    });

    await waitFor(() =>
      expect(screen.getByTestId('button-login-submit')).not.toBeDisabled()
    );

    fireEvent.click(screen.getByTestId('button-login-submit'));

    fireEvent.click(screen.getByTestId('button-login-submit'));

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith({
        email: 'wrong@example.com',
        password: 'Wrongpass@1234',
      });
    });

    // await waitFor(() => {
    //   console.log('test => ', document.body.innerHTML);
    // });

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
