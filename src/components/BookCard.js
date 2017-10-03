import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default function BookCard({ book }) {
  const { title, authors, publishedAt, id } = book;
  const authorString = authors.join(', ');
  return (
    <Card>
      <Card.Content header={title} />
      <Card.Content description={authorString} />
      <Card.Content extra>
        <Icon name='calendar' />
        <strong>Released: {publishedAt}</strong>
      </Card.Content>
    </Card>
  )
}
