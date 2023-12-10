import { COINS_DATA } from '../../assets/data/mock_data';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';
import { useCallback } from 'react';
import { useEffect } from 'react';


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


export default function CoinForm({ currentCoin, setCoinToUpdate }) {
  const { register, handleSubmit, reset, setvalue, formState: { errors } } = useForm();
  const {trigger: saveCoin, error: saveError} = useSWRMutation('coins', save); 

  //other methodes
  const onSubmit = useCallback(async (data) => {
    const { name, value, collectionId, favorite } = data;
    await saveCoin({id: currentCoin?.id, name: name, value: value, collectionId: collectionId, favorite: favorite});
    setCoinToUpdate(null)
  }, [reset, saveCoin]);

  useEffect(() => {
    if (
      // check on non-empty object
      currentCoin &&
      (Object.keys(currentCoin).length !== 0 ||
          currentCoin.constructor !== Object)
    ) {
      setvalue("name", currentCoin.name);
      setvalue("collectionId", currentCoin.collectionId);
      setvalue("value", currentCoin.value);
      setvalue("favorite", currentCoin.favorite);
    } else {
      reset();
    }
  }, [currentCoin, setvalue, reset]);

  return (
    <>
      <h2>Add coin</h2>
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
            <button type='submit' className='btn btn-primary'>
              Add Coin
            </button>
          </div>
        </div>
      </form>
    </>
  )
};
