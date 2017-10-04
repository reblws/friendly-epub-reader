import React from 'react';
import { Card, Icon, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
      <Card.Content extra as={Segment.Group} padded horizontal>
        <Segment>
          <Button to="/" content="Read" color="green" icon="book" />
        </Segment>
        <Segment>
          <DeleteButton deleteBook={deleteBook} />
        </Segment>
      </Card.Content>
    </Card>
  )
}
