import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // eslint-disable-line import/no-extraneous-dependencies
import { url } from '../const';
import { Header } from '../components/Header';

export const Detail = () => {
  const [cookies] = useCookies();
  const params = useParams();
  const [book, setBook] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const logging = () => {
    const data = {
      selectBookId: params.id,
    };
    axios
      .post(`${url}/logs`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log('successfully logged');
      })
      .catch((err) => {
        setErrorMessage(`ロギングに失敗しました。 ${err}`);
      });
  };
  useEffect(() => {
    setPageLoading(true);
    logging();
    axios
      .get(`${url}/books/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
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
      <main className="Detail">
        <Header />
        <p className="error-msg">{errorMessage}</p>
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
        )}
      </main>
    </div>
  );
};
