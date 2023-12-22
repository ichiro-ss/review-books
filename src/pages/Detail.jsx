import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../const';
import { Header } from '../components/Header';

export const Detail = () => {
  const [cookies] = useCookies();
  const params = useParams();
  const [book, setBook] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/books/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        setErrorMessage(`本データの取得に失敗しました．${err}`);
      });
  }, []);
  return (
    <div>
      <main className="Detail">
        <Header />
        <p className="error-msg">{errorMessage}</p>
        <div className="book-detail">
          <div className="book-detail__title">{book.title}</div>
          <div className="book-detail__url">{book.url}</div>
          <div className="book-detail__detail">{book.detail}</div>
          <div className="book-detail__review">{book.review}</div>
          <div className="book-detail__reviewer">{book.reviewer}</div>
        </div>
      </main>
    </div>
  );
};
