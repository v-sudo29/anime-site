import React from 'react';
import ReactDOM from 'react-dom/client';
import { DefaultDataProvider } from './context/defaultDataContext';
import MobileProvider from './context/mobileContext';
import App from './app';
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <MobileProvider>
    <DefaultDataProvider>
      {/* <React.StrictMode>  */}
        <App />      
      {/* </React.StrictMode>  */}
      </DefaultDataProvider>
  </MobileProvider>
);