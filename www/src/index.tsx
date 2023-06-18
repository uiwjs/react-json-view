import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import '@wcj/dark-mode';
import App from './App';

export const GlobalStyle = createGlobalStyle`
  [data-color-mode*='dark'], [data-color-mode*='dark'] body {}
  [data-color-mode*='light'], [data-color-mode*='light'] body {
    background-color: #f2f2f2;
  }
  * {
    box-sizing: border-box;
  }
  .w-rjv {
    padding: 0.4rem;
    border-radius: 0.2rem;
  }
`;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.Fragment>
    <dark-mode
      permanent
      dark="Dark"
      light="Light"
      style={{ position: 'fixed', top: 8, left: 12, zIndex: 99, fontSize: 32 }}
    />
    <GlobalStyle />
    <App />
  </React.Fragment>,
);
