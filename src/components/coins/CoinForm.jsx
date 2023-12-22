import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { getAll, save } from '../../api';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useThemeColors } from '../../contexts/Theme.context';
import useSWR from 'swr';



export default function CoinForm({coin}) {
  const { register, handleSubmit, reset, setValue, isSubmitting, formState: { errors } } = useForm();
  const {trigger: saveCoin} = useSWRMutation('coins', save); 
  const navigate = useNavigate();
  const { theme, oppositeTheme } = useThemeColors();
  const {data: coins = []} = useSWR('coins', getAll);
  const {data: collections = []} = useSWR('collections', getAll);
  const {data: apiCoins = []} = useSWR('apiCoins', getAll);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApiCoins = apiCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
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
    },
    collectionId: {
      required: "collectionId is required",
      validate: (value) =>{
        return collections.filter(c => c.id==value).length !== 0 || "there is no collection with this id"
      }
    }
  };


  const onSubmit = useCallback(async (data) => {

    const { name, collectionId, favorite } = data;
    try{
      await saveCoin({id: coin?.id, name: name, value: 0, collectionId: collectionId, favorite: favorite});
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
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
          key="name"
            type="text"
            {...register('name')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to filter..."
          />
          <ul>
            {filteredApiCoins.map((filteredCoin) => (
              <li
                key={filteredCoin.id}
                onClick={() => setValue('name', filteredCoin.name)}
              >
                {filteredCoin.name}
              </li>
            ))}
          </ul>
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
        {errors.collectionId && <p className="error-message">{errors.collectionId.message}</p>}

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
