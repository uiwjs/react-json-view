import type * as CSS from 'csstype';

export const monokaiTheme: CSS.Properties<string | number> = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#E6DB74',
  '--w-rjv-key-string': '#E6DB74',
  '--w-rjv-background-color': '#272822',
  '--w-rjv-line-color': '#3e3d32',
  '--w-rjv-arrow-color': '#f8f8f2',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#cecece4d',
  '--w-rjv-update-color': '#5f5600',
  '--w-rjv-copied-color': '#E6DB74',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#f8f8f2',
  '--w-rjv-colon-color': '#f8f8f2',
  '--w-rjv-brackets-color': '#f8f8f2',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#E6DB74',
  '--w-rjv-type-int-color': '#AE81FF',
  '--w-rjv-type-float-color': '#AE81FF',
  '--w-rjv-type-bigint-color': '#AE81FF',
  '--w-rjv-type-boolean-color': '#AE81FF',
  '--w-rjv-type-date-color': '#fd9720c7',
  '--w-rjv-type-url-color': '#55a3ff',
  '--w-rjv-type-null-color': '#FA2672',
  '--w-rjv-type-nan-color': '#FD971F',
  '--w-rjv-type-undefined-color': '#FD971F',
} as CSS.Properties<string | number>;
