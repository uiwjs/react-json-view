import type * as CSS from 'csstype';

export const darkTheme: CSS.Properties<string | number> = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#0184a6',
  '--w-rjv-key-string': '#0184a6',
  '--w-rjv-background-color': '#202020',
  '--w-rjv-line-color': '#323232',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#656565',
  '--w-rjv-update-color': '#ebcb8b',
  '--w-rjv-copied-color': '#0184a6',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#1896b6',
  '--w-rjv-brackets-color': '#1896b6',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#cb4b16',
  '--w-rjv-type-int-color': '#268bd2',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#268bd2',
  '--w-rjv-type-boolean-color': '#2aa198',
  '--w-rjv-type-date-color': '#586e75',
  '--w-rjv-type-url-color': '#649bd8',
  '--w-rjv-type-null-color': '#d33682',
  '--w-rjv-type-nan-color': '#076678',
  '--w-rjv-type-undefined-color': '#586e75',
} as CSS.Properties<string | number>;
