import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader'; // eslint-disable-line import/no-extraneous-dependencies
import { Header } from '../components/Header';
import { url } from '../const';

export const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState();
  const [book, setBook] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    axios
      .get(`${url}/books/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        if (!res.data.isMine) {
          navigate(`/detail/${params.id}`);
        }
        setBook(res.data);
      })
      .catch((err) => {
        setErrorMessage(`本データの取得に失敗しました．${err}`);
      });
  }, []);

  const onEdit = () => {
    const data = {
      title: book.title,
      url: book.url,
      detail: book.detail,
      review: book.review,
    };
    axios
      .put(`${url}/books/${params.id}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBook(res.data);
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`変更に失敗しました。 ${err}`);
      });
    return null;
  };

  const onDelete = () => {
    axios
      .delete(`${url}/books/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。 ${err}`);
      });
    return null;
  };

  return (
    <div>
      <main className="edit">
        <Header />
        <p className="error-msg">{errorMessage}</p>
        <h1>Edit</h1>
        {book ? (
          <div>
            <form className="newbook-form" onSubmit={handleSubmit(onEdit)}>
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
                  value={book.title}
                  type="text"
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                  id="title"
                />
              </label>
              <label htmlFor="url">
                url
                <input
                  {...register('url')}
                  value={book.url}
                  type="text"
                  onChange={(e) => setBook({ ...book, url: e.target.value })}
                  id="url"
                />
              </label>
              <label htmlFor="detail">
                detail
                <input
                  {...register('detail', {
                    required: 'please input detail',
                  })}
                  value={book.detail}
                  type="text"
                  onChange={(e) => setBook({ ...book, detail: e.target.value })}
                  id="detail"
                />
              </label>
              <label htmlFor="review">
                review
                <input
                  {...register('review', {
                    required: 'please input review',
                  })}
                  value={book.review}
                  type="text"
                  onChange={(e) => setBook({ ...book, review: e.target.value })}
                  id="review"
                />
              </label>
              {errors.name && <div>{errors.name.message}</div>}
              <button type="submit" className="newbook-button">
                post
              </button>
              {/* eslint-enable */}
            </form>
            <button type="button" onClick={onDelete}>
              delete
            </button>
          </div>
        ) : (
          <div className="loading custom-loader">
            <ClipLoader color="blue" size={50} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        )}
      </main>
    </div>
  );
};
