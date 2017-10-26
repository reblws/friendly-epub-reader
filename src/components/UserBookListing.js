import React from 'react';
import {
  Card,
} from 'semantic-ui-react';
import BookCard from './BookCard';

export default function UserBookListing({ books, deleteBook }) {
  const booksExist = books.length > 0;
  return booksExist
      ? (
        <Card.Group itemsPerRow={3}>
          {books.map((book) => (
            <BookCard book={book} key={book.id}
              deleteBook={deleteBook(book.id)} />
          ))}
        </Card.Group>
      ) : <div>You don't have any books! Try uploading one.</div>;
}
