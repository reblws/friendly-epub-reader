import React from 'react';
import {
  Grid,
  Card,
} from 'semantic-ui-react';
import BookCard from './BookCard';

export default function UserBookListing({ books, deleteBook }) {
  const booksExist = books.length > 0;
  return booksExist
      ? (<Grid columns={4}>
          <Grid.Row>
            {books.map((book) => (
              <Grid.Column key={book.id}>
                <BookCard book={book} key={book.id} deleteBook={deleteBook(book.id)} />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>)
      : <div>You don't have any books! Try uploading one.</div>;
}
