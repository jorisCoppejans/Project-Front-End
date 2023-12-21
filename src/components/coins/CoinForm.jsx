import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { getAll, save } from '../../api';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useThemeColors } from '../../contexts/Theme.context';
import useSWR from 'swr';



export default function CoinForm({coin}) {
  const { register, handleSubmit, reset, setValue, isSubmitting, formState: { errors } } = useForm();
  const {trigger: saveCoin} = useSWRMutation('coins', save); 
  const navigate = useNavigate();
  const { theme, oppositeTheme } = useThemeColors();
  const {data: coins = []} = useSWR('coins', getAll);
  
  
  const isIdUnique = (id) => {
    const ids = coins.map((c) => c.id);
    return !ids.includes(id);
  };
  
  const isNameUnique = (name) => {
    const names = coins.map((c) => c.name);
    return !names.includes(name);
  };
  
  const isValuePositive = (value) => {
    return value >= 0;
  };
  

  const validationRules = {
    id: {
      required: "id is required",
      validate: (value) => {
        const isUnique = isIdUnique(value);
        return isUnique || 'This id has already been used';
      }
    },
    name: {
      required: "name is required",
      validate: (value) => {
        const isUnique = isNameUnique(value);
        return isUnique || 'This name has already been used';
      }
    },
    value: {
      required: "value is required",
      validate: (value) => {
        const isPositive = isValuePositive(value);
        return isPositive || "the value can't be negative";
      }
    }
  };


  const onSubmit = useCallback(async (data) => {
    data.value = Number(String(data.value).replace(",", "."));
    const { name, value, collectionId, favorite } = data;
    try{
      await saveCoin({id: coin?.id, name: name, value: value, collectionId: collectionId, favorite: favorite});
      navigate('/')
    }catch(error){
      console.log(error);
    }
  }, [reset, saveCoin, navigate]);

  useEffect(() => {
    if (coin && coin.id !== undefined)
      {
      setValue("name", coin.name);
      setValue("collectionId", coin.collectionId);
      setValue("value", coin.value);
      setValue("favorite", coin.favorite);
      
    } else {
      reset();
    }
  }, [coin, setValue, reset]);

  return (
    <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
      <h1>{coin ? "Save coin" : "Add coin"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>        
      <div className="mb-3">
        <label htmlFor="Name" className="form-label">Name</label>
        <input
          {...register('name', coin ? {} : validationRules.name)}
          defaultValue=''
          id="Name"
          type="text"
          className="form-control"
          placeholder="Name"
          required
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

        <div className="mb-3">
          <label htmlFor="value" className="form-label">value</label>
          <input
            {...register('value', validationRules.value)}
            defaultValue=''
            id="value"
            type="text"
            className="form-control"
            placeholder="value"
            required
          />
          {errors.value && <p className="error-message">{errors.value.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="collectionId" className="form-label">collectionId</label>
          <input
            {...register('collectionId', validationRules.collectionId)}
            defaultValue=''
            id="collectionId"
            type="text"
            className="form-control"
            placeholder="collectionId"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="favorite" className="form-label">favorite</label>
          <input
            {...register('favorite')}
            defaultValue=''
            id='favorite'
            type='checkbox'
            className='form-check-input'
            placeholder="favorite"
          />
        </div>

          <div className='clearfix'>
            <div className='btn-group float-end'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isSubmitting}
                data-cy="submit_coin"
              >
                {coin ? "Save coin" : "Add coin"}
              </button>
            </div>
          </div>
      </form>
    </div>
  )
};
