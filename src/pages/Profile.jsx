import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

export const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const handleNameChange = (e) => setName(e.target.value);

  const onEdit = () => {
    return null;
  };

  return (
    <div className="edit-username">
      <h1>edit username</h1>
      <img src={cookies.iconUrl} alt="" />
      <form className="edit-form" onSubmit={handleSubmit(onEdit)}>
        {/* eslint-disable */}
        <label htmlFor="name">
          name
          <input
            {...register('name', {
              required: 'please input your name',
              maxLength: {
                value: 30,
                message: 'maxLength: 30',
              },
            })}
            type="text"
            onChange={handleNameChange}
            id="text"
          />
        </label>
        {errors.name && <div>{errors.name.message}</div>}
        <button type="submit" className="edit-button">
          Edit
        </button>
        {/* eslint-enable */}
      </form>
    </div>
  );
};
