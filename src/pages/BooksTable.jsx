import React from 'react';
import { Link } from 'react-router-dom';

const Props = {
  books: String,
};

export const BooksTable = (props) => {
  const { books } = props;
  return (
    <div className="book-list__table-container">
      <table className="book-list__table">
        <thead className="book-list__table-head">
          <tr>
            <th>タイトル</th>
            <th>リンク</th>
            <th>詳細</th>
            <th>レビュー</th>
            <th>投稿者</th>
          </tr>
        </thead>
        <tbody className="book-list__table-body">
          {books.map((book, key) => (
            <tr key={book.id}>
              <td>
                <Link to={`detail/${book.id}`}>{book.title}</Link>
              </td>
              <td>{book.url}</td>
              <td>{book.detail}</td>
              <td>{book.review}</td>
              <td>{book.reviewer}</td>
              {book.isMine && <Link to={`edit/${book.id}`}>edit</Link>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
