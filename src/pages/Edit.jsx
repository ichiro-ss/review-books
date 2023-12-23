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
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
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
        setPageLoading(false);
      })
      .catch((err) => {
        setErrorMessage(`本データの取得に失敗しました．${err}`);
        setPageLoading(false);
      });
  }, []);

  return (
    <div>
      <main className="edit">
        <Header />
        <p className="error-msg">{errorMessage}</p>
        <h1>Edit</h1>
        {pageLoading ? (
          <div className="loading custom-loader">
            <ClipLoader color="blue" size={50} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        ) : (
          <div className="book-detail">
            <div className="book-detail__title">{book.title}</div>
            <div className="book-detail__url">{book.url}</div>
            <div className="book-detail__detail">{book.detail}</div>
            <div className="book-detail__review">{book.review}</div>
            <div className="book-detail__reviewer">{book.reviewer}</div>
          </div>
        )}{' '}
      </main>
    </div>
  );
};
