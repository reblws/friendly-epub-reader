import React, { Component } from 'react';
import { Accordion, Menu, Button, Icon } from 'semantic-ui-react';

export default function BookAccordion({ books }) {
  return (
    <Accordion as={Menu} vertical>
      {books.map(({ title, authors }) => {
        /* TODO: Add a delete button */
        return (
          <Menu.Item>
            <Accordion.Title>
              {title} <br /> By: {authors.join(', ')}
              <Button icon>
                <Icon name="trash" />
              </Button>
            </Accordion.Title>
          </Menu.Item>
        );
      })}
    </Accordion>
  )
}
