import React from 'react';
import {
  Grid,
  Card,
} from 'semantic-ui-react';
import BookCard from './BookCard';

export default function UserBookListing({ books }) {
  console.log(books);
  return (
    <Grid columns={4}>
      <Grid.Row>
        {books ? books.map((book) => (
          <Grid.Column key={book.id}>
            <BookCard book={book} key={book.id} />
          </Grid.Column>
        )) : <p>You don&rsqou;t have any books! Why don&rsquo;t you try uploading one</p>}
      </Grid.Row>
    </Grid>
  );
}
