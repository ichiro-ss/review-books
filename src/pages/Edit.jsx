import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { url } from '../const';

export const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState();
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/books/${params.id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBook(res.data);
        if (!res.data.isMine) {
          navigate(`/detail/${params.id}`);
        }
      })
      .catch((err) => {
        setErrorMessage(`本データの取得に失敗しました．${err}`);
      });
  }, []);

  return (
    <div>
      <main className="edit">
        <Header />
        <p className="error-msg">{errorMessage}</p>
        <h1>Edit</h1>
        {book.id}
      </main>
    </div>
  );
};
