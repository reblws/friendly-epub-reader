import React, { Component } from 'react';
import { Menu, Button, Divider } from 'semantic-ui-react';
import BookAccordion from './BookAccordion';


export default function BookList({ books }) {
  return (
    <Menu pointing vertical inverted>
      <Menu.Item>
        <Button primary as="a" icon="upload">Upload ePub</Button>
      </Menu.Item>
      <Divider />
      <BookAccordion books={books} />
    </Menu>
  );
}
