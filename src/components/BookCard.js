import React from 'react';
import { Card, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

export default function BookCard({ book, deleteBook }) {
  const { title, authors, publishedAt, id } = book;
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
      <Card.Content extra as={Segment.Group} padded horizontal>
        <Segment>
          <Button as={Link} to={`/books/${id}`} content="Read" color="green" icon="book" />
        </Segment>
        <Segment>
          <DeleteButton deleteBook={deleteBook} />
        </Segment>
      </Card.Content>
    </Card>
  )
}
