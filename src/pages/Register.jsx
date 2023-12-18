import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/Auth.context';
import Error from '../components/Error';
import { useThemeColors } from '../contexts/Theme.context';

export default function Register() {
  const { theme, oppositeTheme } = useThemeColors();
  const { error, loading, register, isAuthed } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ firstname, lastname, email, password }) => {
      try {
        await register({ firstname, lastname, email, password });
        // De registratie is voltooid, nu kun je navigeren
        navigate('/login');
      } catch (error) {
        console.error("Error during registration:", error);
        // Behandel de fout hier indien nodig
      }
    },
    [register, navigate]
  );
  


  const validationRules = useMemo(() => ({
    firstname: {
      required: 'Firstname is required',
    },
    lastname: {
      required: 'Lastname is required',
    },
    email: {
      required: 'Email is required',
    },
    password: {
      required: 'Password is required',
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Passwords do not match';
      },
    },
  }), []);

  return (
    <FormProvider {...methods}>
      <div className={`container bg-${theme} text-${oppositeTheme}`}>
        <form
          className='d-flex flex-column'
          onSubmit={handleSubmit(handleRegister)}
        >
          <h1>Register</h1>

          <Error error={error} />

          <LabelInput
            label='Firstname'
            type='text'
            name='firstname'
            placeholder='Your Firstname'
            validationRules={validationRules.firstname}
          />

          <LabelInput
            label='Lastname'
            type='text'
            name='lastname'
            placeholder='Your Lastname'
            validationRules={validationRules.lastname}
          />

          <LabelInput
            label='Email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />

          <LabelInput
            label='Password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />

          <LabelInput
            label='Confirm password'
            type='password'
            name='confirmPassword'
            validationRules={validationRules.confirmPassword}
          />

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading}
              >
                Register
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}