import type * as CSS from 'csstype';

export const gruvboxTheme: CSS.Properties<string | number> = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#3c3836',
  '--w-rjv-key-string': '#3c3836',
  '--w-rjv-background-color': '#fbf1c7',
  '--w-rjv-line-color': '#ebdbb2',
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

  '--w-rjv-type-string-color': '#3c3836',
  '--w-rjv-type-int-color': '#8f3f71',
  '--w-rjv-type-float-color': '#8f3f71',
  '--w-rjv-type-bigint-color': '#8f3f71',
  '--w-rjv-type-boolean-color': '#8f3f71',
  '--w-rjv-type-date-color': '#076678',
  '--w-rjv-type-url-color': '#0969da',
  '--w-rjv-type-null-color': '#076678',
  '--w-rjv-type-nan-color': '#076678',
  '--w-rjv-type-undefined-color': '#076678',
} as CSS.Properties<string | number>;
