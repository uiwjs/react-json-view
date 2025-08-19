import type * as CSS from 'csstype';

export const nordTheme: CSS.Properties<string | number> = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#88c0d0',
  '--w-rjv-key-string': '#88c0d0',
  '--w-rjv-background-color': '#2e3440',
  '--w-rjv-line-color': '#4c566a',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#c7c7c74d',
  '--w-rjv-update-color': '#88c0cf75',
  '--w-rjv-copied-color': '#119cc0',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#8fbcbb',
  '--w-rjv-colon-color': '#6d9fac',
  '--w-rjv-brackets-color': '#8fbcbb',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#a3be8c',
  '--w-rjv-type-int-color': '#b48ead',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#b48ead',
  '--w-rjv-type-boolean-color': '#d08770',
  '--w-rjv-type-date-color': '#41a2c2',
  '--w-rjv-type-url-color': '#5e81ac',
  '--w-rjv-type-null-color': '#5e81ac',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#586e75',
} as CSS.Properties<string | number>;
