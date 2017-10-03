import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
