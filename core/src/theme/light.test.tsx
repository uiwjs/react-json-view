import { lightTheme } from './light';

it('lightTheme test case', () => {
  expect(lightTheme).toHaveProperty('--w-rjv-font-family', 'monospace');
  expect(Object.keys(lightTheme)).toMatchObject(['--w-rjv-font-family',
    '--w-rjv-color',
    '--w-rjv-background-color',
    '--w-rjv-line-color',
    '--w-rjv-arrow-color',
    '--w-rjv-info-color',
    '--w-rjv-update-color',
    '--w-rjv-copied-color',
    '--w-rjv-copied-success-color',
    '--w-rjv-curlybraces-color',
    '--w-rjv-brackets-color',
    '--w-rjv-type-string-color',
    '--w-rjv-type-int-color',
    '--w-rjv-type-float-color',
    '--w-rjv-type-bigint-color',
    '--w-rjv-type-boolean-color',
    '--w-rjv-type-date-color',
    '--w-rjv-type-null-color',
    '--w-rjv-type-nan-color',
    '--w-rjv-type-undefined-color',
  ]);
});