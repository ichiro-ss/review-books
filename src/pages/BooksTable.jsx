import React from 'react';

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
              <td>{book.title}</td>
              <td>{book.title}</td>
              <td>{book.detail}</td>
              <td>{book.review}</td>
              <td>{book.reviewer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
