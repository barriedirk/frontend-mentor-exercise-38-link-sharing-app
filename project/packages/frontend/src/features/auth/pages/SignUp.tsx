import './SignUp.css';

import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { signUpUser } from '@src/services/authApi';
import { useAuthStore } from '@src/store/useAuthStore';

import { signUpFormSchema, type SignUpFormValues } from '../schemas/signUp';

import InputForm from '@src/components/forms/fields/InputForm';

import { useFocusFirstInput } from '@src/hooks/useFocusFirstInput';

import { loadingSignal } from '@src/services/loadingSignal';

import toast from 'react-hot-toast';

function SignUp() {
  const navigate = useNavigate();
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({
    email,
    password,
  }) => {
    const toastId = toast.loading('SignUp ...');

    try {
      loadingSignal.show();

      const { user, token } = await signUpUser({ email, password });

      useAuthStore.getState().login(user, token);

      toast.success('Success!', { id: toastId });

      navigate('/');
    } catch (err) {
      useAuthStore.getState().logout();
      console.error(err);

      const error =
        (err as any)['message'] || 'Invalid credentials. Please try again.';

      toast.error(error, { id: toastId });
    } finally {
      loadingSignal.hide();
    }
  };

  return (
    <div className="signup">
      <h1
        id="signup-heading"
        className="text-preset-2 md:text-preset-1 text-grey-900 mb-2.5"
      >
        Create account
      </h1>
      <p className="text-preset-3-regular text-grey-500 mb-10">
        Let’s get you started sharing your links!
      </p>

      <form
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="signup-heading"
        className="flex flex-col gap-5"
      >
        <InputForm<SignUpFormValues>
          name="email"
          control={control}
          label="Email Address"
          type="email"
          error={errors.email}
          autoComplete="email"
          icon="IconEmail"
          placeholder="e.g. alex@email.com"
        />
        <InputForm<SignUpFormValues>
          name="password"
          control={control}
          label="Create password"
          type="password"
          error={errors.password}
          autoComplete="password"
          icon="IconPassword"
          placeholder="At least 8 characters"
        />
        <InputForm<SignUpFormValues>
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
          autoComplete="confirmPassword"
          icon="IconPassword"
          placeholder="At least 8 characters"
          helperText="Password must contain at least 8 characters"
        />
        <button
          className="btn--submit mt-5 button button--primary"
          type="submit"
          aria-label="Create your account"
          disabled={!isValid || isSubmitting}
        >
          Create new account
        </button>
      </form>

      <p className="text-preset-4 mt-[20px] flex justify-center items-center gap-2">
        <span className="text-white-custom">Already have an account?</span>
        <Link className="link" to="/login" aria-label="Sign Up">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
