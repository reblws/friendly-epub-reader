import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import IndexLayout from './layouts/IndexLayout';
import BookLayout from './layouts/BookLayout';
import UploadLayout from './layouts/UploadLayout';

const Router = () => (
  <Container style={{ marginTop: 10 }}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexLayout} />
        <Route path="/upload" component={UploadLayout} />
        <Route path="/books/:id" component={BookLayout} />
      </Switch>
    </BrowserRouter>
  </Container>
);

export default Router;
