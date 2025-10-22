import '@testing-library/jest-dom';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import Login from './Login';

import { AppProviders } from '@src/test-utils/providers';

import * as authApi from '@src/services/authApi';
import * as authStore from '@src/store/useAuthStore';

beforeEach(() => {
  vi.restoreAllMocks();
});

const renderLogin = () =>
  render(
    <AppProviders>
      <Login />
      <Toaster />
    </AppProviders>
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
    const mockLogin = vi.spyOn(authApi, 'loginUser').mockResolvedValue({
      token: 'token123',
      user: { email: 'test@test.com', firstName: '', lastName: '', slug: '' },
    });

    const loginSpy = vi.spyOn(authStore.useAuthStore.getState(), 'login');

    renderLogin();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'mypassword123' },
    });

    fireEvent.click(screen.getByTestId('button-login-submit'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'mypassword123',
      });
      expect(loginSpy).toHaveBeenCalled();
    });

    expect(
      await screen.findByText(/success!/i, {}, { timeout: 1500 })
    ).toBeInTheDocument();
  });

  it('shows error message on login failure', async () => {
    vi.spyOn(authApi, 'loginUser').mockRejectedValue({
      message: 'Invalid credentials',
    });

    renderLogin();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByTestId('button-login-submit'));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
