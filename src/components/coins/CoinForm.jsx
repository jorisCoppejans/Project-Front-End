import { COINS_DATA } from '../../assets/data/mock_data';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useThemeColors } from '../../contexts/Theme.context';


//validationrules for the form
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
  }
};


//methodes for unique values
const isIdUnique = (id) => {
  const collections = COINS_DATA;
  const ids = collections.map((c) => c.id);
  return !ids.includes(id);
};

const isNameUnique = (name) => {
  const collections = COINS_DATA;
  const names = collections.map((c) => c.name);
  return !names.includes(name);
};


export default function CoinForm({coin}) {
  const { register, handleSubmit, reset, setValue, isSubmitting, formState: { errors } } = useForm();
  const {trigger: saveCoin, error: saveError} = useSWRMutation('coins', save); 
  const navigate = useNavigate();
  const { theme, oppositeTheme } = useThemeColors();



  //other methodes
  const onSubmit = useCallback(async (data) => {
    const { name, value, collectionId, favorite } = data;
    try{
      await saveCoin({id: coin?.id, name: name, value: value, collectionId: collectionId, favorite: favorite});
      navigate('/')
    }catch(error){
      console.log(error);
    }
  }, [reset, saveCoin, navigate]);

  useEffect(() => {
    if (
      coin &&
      (Object.keys(coin).length !== 0 ||
          coin.constructor !== Object)
    ) {
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
      <h1>{coin?.id
            ? "Save coin"
            : "Add coin"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>        
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name</label>
          <input
            {...register('name', validationRules.name)}
            defaultValue=''
            id="Name"
            type="text"
            className="form-control"
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="value" className="form-label">value</label>
          <input
            {...register('value')}
            defaultValue=''
            id="value"
            type="text"
            className="form-control"
            placeholder="value"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="collectionId" className="form-label">collectionId</label>
          <input
            {...register('collectionId')}
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
                {coin?.id
                  ? "Save coin"
                  : "Add coin"}
              </button>
            </div>
          </div>
      </form>
    </div>
  )
};
