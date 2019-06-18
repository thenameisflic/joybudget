import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import './custom.scss';
import "typeface-merriweather-sans";
import "typeface-merriweather";
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import setupI18n from "./i18n";

setupI18n(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
