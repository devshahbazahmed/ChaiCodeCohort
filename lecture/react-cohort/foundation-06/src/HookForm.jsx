import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ROLES = ['Frontend', 'Backend', 'AI Engineer'];

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
  } = useForm({
    defaultValues: {
      name: 'hitesh',
    },
    mode: 'onTouched',
  });

  function submit(data) {
    return new Promise((res) => {
      console.log('Submitted', data);
    });
  }

  if (isSubmitSuccessful) {
    return (
      <div>
        <h1>Form submitted successfully</h1>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <label>
          Full Name{' '}
          <input
            type="text"
            {...register('name', { required: 'name is required' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label>
          Email{' '}
          <input
            type="text"
            {...register('email', { required: 'email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default HookForm;
