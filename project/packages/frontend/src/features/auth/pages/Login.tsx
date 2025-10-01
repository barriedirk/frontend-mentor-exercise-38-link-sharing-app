import './Login.css';

import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { loginFormSchema, type LoginFormValues } from '../schemas/login';

import InputForm from '@src/components/forms/fields/FormInput';

import { useFocusFirstInput } from '@src/hooks/useFocusFirstInput';

import { loadingSignal } from '@src/services/loadingSignal';

export default function Login() {
  const navigate = useNavigate();
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    loadingSignal.show();
  };

  const loginWithDemoCredential = () => {
    onSubmit({
      email: 'demo-entertainment-web-app@fakeemail.com',
      password: '3nT3rt4inMen1',
    });
  };

  return (
    <div className="login">
      <h1 id="login-heading" className="text-preset-2 text-grey-900">
        Login
      </h1>
      <p className="text-preset-3-regular text-grey-500">
        Add your details below to get back into the app
      </p>
      <form
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="login-heading"
      >
        <InputForm<LoginFormValues>
          name="email"
          control={control}
          label="Email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <InputForm<LoginFormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
        />
        <button
          className="btn--submit mt-[40px] text-preset-4 flex justify-center items-center"
          type="button"
          aria-label="Log in to your account"
          disabled={!isValid || isSubmitting}
        >
          Login to your account
        </button>

        {/* {errorApi && (
          <p className="text-red-500 text-preset-3 text-center my-2">
            {String(errorApi)}
          </p>
        )} */}
      </form>

      <p className="text-preset-4 mt-[20px] flex justify-center items-center gap-2">
        <span className="text-white-custom">Don’t have an account?</span>
        <Link className="text-red-500" to="/signup" aria-label="Sign Up">
          Sign Up
        </Link>
      </p>
      <div className="text-preset-5 mt-[20px] flex justify-center items-center gap-2 text-white-custom">
        <span>Use</span>
        <button
          type="button"
          className="text-red-500 underline"
          aria-label="Login with demo credentials"
          onClick={() => loginWithDemoCredential()}
        >
          Login Credentials
        </button>
        <span>to explore the demo.</span>
      </div>
    </div>
  );
}
