import { COINS_DATA } from '../../assets/data/mock_data';
import { useForm } from 'react-hook-form';

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


export default function CoinForm({ onSaveCoin }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  //other methodes
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const { id, name, value, collectionId, favorite } = data;
    onSaveCoin(id, name, value, collectionId, favorite);
    reset();
  };

  return (
    <>
      <h2>Add coin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
      <div className="mb-3">
          <label htmlFor="id" className="form-label">Id</label>
          <input
            {...register('id', validationRules.id)}
            defaultValue=''
            id="id"
            type="text"
            className="form-control"
            placeholder="id"
            required
          />
          {errors.id && <p className="form-text text-danger">{errors.id.message}</p> }
        </div>
        
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
          <label htmlFor="Value" className="form-label">Value</label>
          <input
            {...register('Value')}
            defaultValue=''
            id="Value"
            type="text"
            className="form-control"
            placeholder="Value"
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
