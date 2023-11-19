import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { COLLECTIONS_DATA } from '../../assets/data/mock_data';

export default memo(function CollectionForm({ onSaveCollection }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const { id, userId, value } = data;
    onSaveCollection(id, userId, value);
    reset();
  };

  const isIdUnique = (id) => {
    const collections = COLLECTIONS_DATA;
    const ids = collections.map((c) => c.id);
    return !ids.includes(id);
  };
  

  return (
    <>
      <h2>Add collection</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">Id</label>
          <input
            {...register('id', {
              required: "id is required",
              validate: (value) => {
                const isUnique = isIdUnique(value);
                return isUnique || 'This id has already been used';
              }
            })}
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
            <button type='submit' className='btn btn-primary'>
              Add Collection
            </button>
          </div>
        </div>
      </form>
    </>
  );
});