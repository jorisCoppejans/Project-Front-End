import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import LabelInput from '../components/LabelINput';
import { useAuth } from '../contexts/Auth.context';
import Error from '../components/Error';
import { useCallback, useMemo } from 'react';


const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {

  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();


  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect"))
      return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm({
    defaultValues: {
      email: 'joris.coppejans@yahoo.com',
      password: '12345678',
    },
  });
  const { handleSubmit, reset } = methods;


  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);


  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);

      if (loggedIn) {
        navigate({
          pathname: redirect,
          replace: true,
        });
      }
    },
    [login, navigate, redirect],
  );

  return (
    <FormProvider {...methods}>
      <div className='container'>
        <form
          className='d-flex flex-column'
          onSubmit={handleSubmit(handleLogin)}>
          <h1>Sign in</h1>

          <Error error={error} />

          <LabelInput
            label='email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />

          <LabelInput
            label='password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading}>
                Sign in
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
