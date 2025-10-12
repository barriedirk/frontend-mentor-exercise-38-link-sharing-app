import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { loginUser } from '@src/services/authApi';
import { useAuthStore } from '@src/store/useAuthStore';

import { loginFormSchema, type LoginFormValues } from '../schemas/login';

import InputForm from '@src/components/forms/fields/InputForm';

import { useFocusFirstInput } from '@src/hooks/useFocusFirstInput';

import { loadingSignal } from '@src/services/loadingSignal';

import toast from 'react-hot-toast';

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
    const toastId = toast.loading('Logging in...');

    try {
      loadingSignal.show();

      const { user, token } = await loginUser({ email, password });

      useAuthStore.getState().login(user, token);

      toast.success('Success!', { id: toastId });

      navigate('/');
    } catch (err) {
      useAuthStore.getState().logout();
      console.error(err);

      const error =
        (err as { message: string })['message'] ||
        'Invalid credentials. Please try again.';

      toast.error(error, { id: toastId });
    } finally {
      loadingSignal.hide();
    }
  };

  const loginWithDemoCredential = () => {
    onSubmit({
      email: 'demo-devlinks-app@fakeemail.com',
      password: '3nT3rt4inMen1',
    });
  };

  return (
    <div className="login">
      <h1
        id="login-heading"
        className="text-preset-2 md:text-preset-1 text-grey-900 mb-2.5"
      >
        Login
      </h1>
      <p className="text-preset-3-regular text-grey-500 mb-10">
        Add your details below to get back into the app
      </p>
      <form
        className="flex flex-col gap-5"
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="login-heading"
      >
        <InputForm<LoginFormValues>
          name="email"
          control={control}
          label="Email Address"
          type="email"
          error={errors.email}
          autoComplete="email"
          icon="IconEmail"
          placeholder="e.g. alex@email.com"
        />
        <InputForm<LoginFormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
          icon="IconPassword"
          placeholder="Enter your password"
        />
        <button
          className="btn--submit mt-5 button button--primary"
          type="submit"
          aria-label="Log in to your account"
          disabled={!isValid || isSubmitting}
        >
          Login
        </button>
      </form>

      <p className="text-preset-4 mt-3 flex justify-center items-center gap-2">
        <span className="text-white-custom">Don’t have an account?</span>
        <Link className="link" to="/signup" aria-label="Sign Up">
          Sign Up
        </Link>
      </p>

      <div className="text-preset-4 mt-3 flex justify-center items-center gap-2 text-white-custom">
        <span>Use</span>
        <button
          className="link"
          type="button"
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
