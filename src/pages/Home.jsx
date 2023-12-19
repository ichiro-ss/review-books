import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { url } from '../const';
import { BooksTable } from './BooksTable';
import './Home.scss';

export const Home = () => {
  const [cookies] = useCookies();
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    axios
      .get(`${url}/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
        params: {
          offset,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setBooks(res.data);
        } else {
          setOffset((prevOffset) => prevOffset - 10);
        }
      })
      .catch((err) => {
        setErrorMessage(`本データの取得に失敗しました．${err}`);
      });
  }, [offset]);

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const handlePrev = () => {
    if (offset >= 10) {
      setOffset((prevOffset) => prevOffset - 10);
    }
  };

  return (
    <div className="book-list">
      <Header />
      <p className="error-msg">{errorMessage}</p>
      <h2>本一覧</h2>
      <BooksTable books={books} />
      <div className="book-list__btn-container">
        <button className="book-list__prev-btn" type="button" onClick={handlePrev}>
          前
        </button>
        <button className="book-list__next-btn" type="button" onClick={handleNext}>
          次
        </button>
      </div>
    </div>
  );
};
