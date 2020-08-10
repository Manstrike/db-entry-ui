import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app.component.jsx';

import { BrowserRouter } from "react-router-dom";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App history={history}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
