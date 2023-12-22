import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Header } from '../components/Header';

export const NewBook = () => {
  const [errorMessage, setErrorMessge] = useState();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onNewBook = () => {
    const data = {
      title,
      url,
      detail,
      review,
    };
  };
  return (
    <div>
      <main className="newbook">
        <Header />
        <h1>NewBook</h1>
        <p className="error-message">{errorMessage}</p>
        <form className="newbook-form" onSubmit={handleSubmit(onNewBook)}>
          {/* eslint-disable */}
          <label htmlFor="title">
            title
            <input
              {...register('title', {
                required: 'please input title',
                maxLength: {
                  value: 30,
                  message: 'maxLength: 30',
                },
              })}
              type="text"
              //   onChange={handleTitleChange}
              id="title"
            />
          </label>
          <label htmlFor="url">
            url
            <input
              {...register('url')}
              type="text"
              //   onChange={handleTitleChange}
              id="url"
            />
          </label>
          <label htmlFor="detail">
            detail
            <input
              {...register('detail', {
                required: 'please input detail',
              })}
              type="text"
              //   onChange={handleTitleChange}
              id="detail"
            />
          </label>
          <label htmlFor="review">
            review
            <input
              {...register('review', {
                required: 'please input review',
              })}
              type="text"
              //   onChange={handleTitleChange}
              id="review"
            />
          </label>
          {errors.name && <div>{errors.name.message}</div>}
          <button type="submit" className="newbook-button">
            post
          </button>
          {/* eslint-enable */}
        </form>
      </main>
    </div>
  );
};
