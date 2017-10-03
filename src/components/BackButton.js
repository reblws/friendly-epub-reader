import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

const BackButton = () => (
  <Menu secondary>
    <Menu.Menu position="right">
      <Button content="Back" icon="left arrow" labelPosition="left" />
    </Menu.Menu>
  </Menu>
);

export default BackButton;
