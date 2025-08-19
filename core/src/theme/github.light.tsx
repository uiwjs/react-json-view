import type * as CSS from 'csstype';

export const githubLightTheme: CSS.Properties<string | number> = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#6f42c1',
  '--w-rjv-key-string': '#6f42c1',
  '--w-rjv-background-color': '#ffffff',
  '--w-rjv-line-color': '#ddd',
  '--w-rjv-arrow-color': '#6e7781',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#0000004d',
  '--w-rjv-update-color': '#ebcb8b',
  '--w-rjv-copied-color': '#002b36',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#6a737d',
  '--w-rjv-colon-color': '#24292e',
  '--w-rjv-brackets-color': '#6a737d',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#032f62',
  '--w-rjv-type-int-color': '#005cc5',
  '--w-rjv-type-float-color': '#005cc5',
  '--w-rjv-type-bigint-color': '#005cc5',
  '--w-rjv-type-boolean-color': '#d73a49',
  '--w-rjv-type-date-color': '#005cc5',
  '--w-rjv-type-url-color': '#0969da',
  '--w-rjv-type-null-color': '#d73a49',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#005cc5',
} as CSS.Properties<string | number>;
