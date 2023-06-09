import React from 'react';
import ReactDOM from 'react-dom';
import 'react-image-lightbox/style.css';
import { Provider } from 'react-redux';
import store from '~/redux/store/store';
import '~/styles/app.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga';

const TRACKING_ID = "UA-12341234-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
