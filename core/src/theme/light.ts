import type * as CSS from 'csstype';

export const lightTheme = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#002b36',
  '--w-rjv-key-string': '#002b36',
  '--w-rjv-background-color': '#ffffff',
  '--w-rjv-line-color': '#ebebeb',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#0000004d',
  '--w-rjv-update-color': '#ebcb8b',
  '--w-rjv-copied-color': '#002b36',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#236a7c',
  '--w-rjv-colon-color': '#002b36',
  '--w-rjv-brackets-color': '#236a7c',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#cb4b16',
  '--w-rjv-type-int-color': '#268bd2',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#268bd2',
  '--w-rjv-type-boolean-color': '#2aa198',
  '--w-rjv-type-date-color': '#586e75',
  '--w-rjv-type-url-color': '#0969da',
  '--w-rjv-type-null-color': '#d33682',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#586e75',
} as CSS.Properties<string | number>;
