import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { url } from '../const';
import { Header } from '../components/Header';

export const NewBook = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrormessage] = useState();
  const [title, setTitle] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setBookUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const onNewBook = () => {
    const data = {
      title,
      url: bookUrl,
      detail,
      review,
    };

    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        setErrormessage(`変更に失敗しました。 ${err}`);
      });
    return null;
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
              onChange={handleTitleChange}
              id="title"
            />
          </label>
          <label htmlFor="url">
            url
            <input {...register('url')} type="text" onChange={handleUrlChange} id="url" />
          </label>
          <label htmlFor="detail">
            detail
            <input
              {...register('detail', {
                required: 'please input detail',
              })}
              type="text"
              onChange={handleDetailChange}
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
              onChange={handleReviewChange}
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
