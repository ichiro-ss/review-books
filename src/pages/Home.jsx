import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { url } from '../const';
import { BooksTable } from './BooksTable';

export const Home = () => {
  const [cookies] = useCookies();
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        setErrorMessage(`本データの取得に失敗しました．${err}`);
      });
  }, []);
  return (
    <>
      <Header />
      <p className="error-msg">{errorMessage}</p>
      <h2>本一覧</h2>
      <BooksTable books={books} />
    </>
  );
};
