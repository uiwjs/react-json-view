import type * as CSS from 'csstype';

export const basicTheme: CSS.Properties<string | number> = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#b5bd68',
  '--w-rjv-key-number': '#002b36',
  '--w-rjv-key-string': '#b5bd68',
  '--w-rjv-background-color': '#2E3235',
  '--w-rjv-line-color': '#292d30',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#d8d8d84d',
  '--w-rjv-update-color': '#b5bd68',
  '--w-rjv-copied-color': '#b5bd68',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#cc99cc',
  '--w-rjv-colon-color': '#bababa',
  '--w-rjv-brackets-color': '#808080',
  '--w-rjv-ellipsis-color': '#cb4b16',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#b5bd68',
  '--w-rjv-type-int-color': '#fda331',
  '--w-rjv-type-float-color': '#fda331',
  '--w-rjv-type-bigint-color': '#fda331',
  '--w-rjv-type-boolean-color': '#fda331',
  '--w-rjv-type-date-color': '#8abeb7',
  '--w-rjv-type-url-color': '#5a89c0',
  '--w-rjv-type-null-color': '#8abeb7',
  '--w-rjv-type-nan-color': '#8abeb7',
  '--w-rjv-type-undefined-color': '#8abeb7',
} as CSS.Properties<string | number>;
