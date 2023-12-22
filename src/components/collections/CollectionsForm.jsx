import {  useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { COLLECTIONS_DATA } from '../../assets/data/mock_data';
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';
import { useNavigate } from 'react-router';
import { useThemeColors } from '../../contexts/Theme.context';

const validationRules = {
  id: {
    required: "id is required",
    validate: (value) => {
      const isUnique = isIdUnique(value);
      return isUnique || 'This id has already been used';
    }
  }
};

//unique values
const isIdUnique = (id) => {
  const collections = COLLECTIONS_DATA;
  const ids = collections.map((c) => c.id);
  return !ids.includes(id);
};

function LabelInput({ label, name, type, ...rest }) {
  const {
    register,
    errors,
    isSubmitting
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...register(name, validationRules[name])}
        id={name}
        type={type}
        disabled={isSubmitting}
        className="form-control"
        {...rest}
      />
      {hasError ? (
        <div className="form-text text-danger">
          {errors[name].message}
        </div>
      ) : null}
    </div>
  );
}

export default function CollectionForm({collection}) {
  const { register, handleSubmit, reset, setValue, formState: { errors }, isSubmitting } = useForm();
  const {trigger: saveCollection, error: saveError} = useSWRMutation('collections', save); 
  const navigate = useNavigate();
  const { theme, oppositeTheme } = useThemeColors();

  

  const onSubmit = useCallback(async (data) => {
    const { userId } = data
    try{
      await saveCollection({id: collection?.id, userId: userId, value: 0});
    }catch(error){
      console.log(error)
    }
    navigate('/');
  }, [reset, saveCollection, navigate]);

  useEffect(() => {
    if (
      collection &&
      (Object.keys(collection).length !== 0 ||
          collection.constructor !== Object)
    ) {
      setValue("userId", collection.userId);
      navigate('/')
    } else {
      reset();
    }
  }, [collection, setValue, reset]);
  

  return (
    <FormProvider handleSubmit={handleSubmit} errors={errors} register={register} isSubmitting={isSubmitting}>
      <h2 className={`container-xl bg-${theme} text-${oppositeTheme}`}>Add collection</h2>
      <Error error={saveError} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>

        <div className='clearfix' data-cy= "submitButton">
          <div className='btn-group float-end'>
            <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
            Add collection
            </button>
          </div>
        </div>

      </form>
    </FormProvider>
  );
};