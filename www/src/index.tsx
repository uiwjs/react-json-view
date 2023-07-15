import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import data from '@uiw/react-json-view/README.md';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import App from './App';

export const GlobalStyle = createGlobalStyle`
  [data-color-mode*='dark'], [data-color-mode*='dark'] body {
    --tabs-bg: #5f5f5f;
  }
  [data-color-mode*='light'], [data-color-mode*='light'] body {
    background-color: #f2f2f2;
    --tabs-bg: #bce0ff;
  }
  * {
    box-sizing: border-box;
  }
  .w-rjv {
    padding: 0.4rem;
    border-radius: 0.2rem;
  }
`;

const Github = MarkdownPreviewExample.Github;
const Example = MarkdownPreviewExample.Example;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    title="JSON View for React"
    description="A React component for displaying and editing javascript arrays and JSON objects."
    version={`v${VERSION}`}
  >
    <Github href="https://github.com/uiwjs/react-markdown-preview-example" />
    <Example>
      <App />
    </Example>
  </MarkdownPreviewExample>,
);
