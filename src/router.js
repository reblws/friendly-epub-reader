import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import UploadLayout from './layouts/UploadLayout';
import IndexLayout from './layouts/IndexLayout';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={IndexLayout} />
      <Route path="/upload" component={UploadLayout} />
    </Switch>
  </BrowserRouter>
);

export default Router;
