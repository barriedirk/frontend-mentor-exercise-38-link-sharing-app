import './SignUp.css';

import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { signUpFormSchema, type SignUpFormValues } from '../schemas/signUp';

import InputForm from '@src/components/forms/fields/FormInput';

import { useFocusFirstInput } from '@src/hooks/useFocusFirstInput';

import { loadingSignal } from '@src/services/loadingSignal';

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

  // useEffect(() => {
  //   let timeId: ReturnType<typeof setTimeout>;

  //   if (errorApi) {
  //     timeId = setTimeout(() => setErrorApi(''), 5000);
  //   }

  //   return () => {
  //     if (timeId) clearTimeout(timeId);
  //   };
  // }, [errorApi]);

  const onSubmit: SubmitHandler<SignUpFormValues> = async ({
    email,
    password,
  }) => {
    loadingSignal.show();

    // try {
    //   const { error, data } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });

    //   if (data.session) {
    //     navigate('/');
    //   }

    //   if (error) {
    //     setErrorApi(error?.message);
    //   }
    // } finally {
    //   loadingSignal.hide();
    // }
  };

  return (
    <div className="signup">
      <h1 id="signup-heading" className="text-preset-1 mb-[40px]">
        Sign Up
      </h1>
      <form
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="signup-heading"
      >
        <InputForm<SignUpFormValues>
          name="email"
          control={control}
          label="Email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <InputForm<SignUpFormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
        />
        <InputForm<SignUpFormValues>
          name="confirmPassword"
          control={control}
          label="Repeat Password"
          type="password"
          error={errors.confirmPassword}
          autoComplete="confirmPassword"
        />
        <button
          className="btn--submit mt-[40px] text-preset-4 flex justify-center items-center"
          type="button"
          aria-label="Create your account"
          disabled={!isValid || isSubmitting}
        >
          Create an account
        </button>

        {/* {errorApi && (
          <p className="text-red-500 text-preset-3 text-center my-2">
            {String(errorApi)}
          </p>
        )} */}
      </form>

      <p className="text-preset-4 mt-[20px] flex justify-center items-center gap-2">
        <span className="text-white-custom">Already have an account?</span>
        <Link className="text-red-500" to="/login" aria-label="Sign Up">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
