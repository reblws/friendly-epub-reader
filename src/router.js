import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import UploadLayout from './layouts/UploadLayout';
import IndexLayout from './layouts/IndexLayout';

const Router = () => (
  <Container style={{ marginTop: 10 }}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexLayout} />
        <Route path="/upload" component={UploadLayout} />
      </Switch>
    </BrowserRouter>
  </Container>
);

export default Router;
