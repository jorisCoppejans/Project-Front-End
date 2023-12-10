import { memo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { COLLECTIONS_DATA } from '../../assets/data/mock_data';
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';
import { useEffect } from 'react';

//validationRules
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

export default function CollectionForm({currentCollection, setCollectionToUpdate}) {
  const { register, handleSubmit, reset, setValue, formState: { errors }, isSubmitting } = useForm();
  const {trigger: saveCollection, error: saveError} = useSWRMutation('collections', save); 

  const onSubmit = useCallback(async (data) => {
    const { userId } = data
    try{
      await saveCollection({id: currentCollection?.id, userId: userId, value: 0});
      setCollectionToUpdate(null);}
    catch(error){
      console.log(error)
    }
  }, [reset, saveCollection, currentCollection, setCollectionToUpdate]);

  useEffect(() => {
    if (
      // check on non-empty object
      currentCollection &&
      (Object.keys(currentCollection).length !== 0 ||
          currentCollection.constructor !== Object)
    ) {
      setValue("id", currentCollection.id);
      setValue("userId", currentCollection.userId);
      setValue("value", currentCollection.value);
    } else {
      reset();
    }
  }, [currentCollection, setValue, reset]);
  

  return (
    <FormProvider handleSubmit={handleSubmit} errors={errors} register={register} isSubmitting={isSubmitting}>
      <h2>Add collection</h2>
      <Error error={saveError} />
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">userId</label>
          <input
            {...register('userId')}
            defaultValue=''
            id="userId"
            type="text"
            className="form-control"
            placeholder="userId"
            required
          />
        </div>

        <div className='clearfix'>
          <div className='btn-group float-end'>
          <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
          {currentCollection?.id
          ? "Save collection"
          : "Add collection"}
        </button>
          </div>
        </div>

        

      </form>
    </FormProvider>
  );
};