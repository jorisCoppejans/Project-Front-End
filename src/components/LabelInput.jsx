import { useFormContext } from 'react-hook-form';

export default function LabelInput({label, name, type, validationRules, ...rest}) {
  const {
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        className="form-control"
        {...rest}
      />
      {error ? (
        <div className="form-text text-danger" data-cy="label_input_error">
          {error.message}
        </div>
      ) : null}
    </div>
  );
}
