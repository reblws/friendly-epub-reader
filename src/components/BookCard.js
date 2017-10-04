import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import DeleteButton from './DeleteButton';

export default function BookCard({ book, deleteBook }) {
  const { title, authors, publishedAt, id } = book;
  const authorString = `By: ${authors.join(', ')}`;
  return (
    <Card>
      <Card.Content header={title} />
      <Card.Content>
        <Card.Description>
          By {authors.join(', ')}
        </Card.Description>
        <Card.Meta>
          Released {publishedAt}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <DeleteButton deleteBook={deleteBook} />
      </Card.Content>
    </Card>
  )
}
