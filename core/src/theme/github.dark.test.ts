import { githubDarkTheme } from './github.dark';

it('githubDarkTheme test case', () => {
  expect(githubDarkTheme).toHaveProperty('--w-rjv-font-family', 'monospace');
  expect(Object.keys(githubDarkTheme)).toMatchObject([
    '--w-rjv-font-family',
    '--w-rjv-color',
    '--w-rjv-key-string',
    '--w-rjv-background-color',
    '--w-rjv-line-color',
    '--w-rjv-arrow-color',
    '--w-rjv-edit-color',
    '--w-rjv-info-color',
    '--w-rjv-update-color',
    '--w-rjv-copied-color',
    '--w-rjv-copied-success-color',
    '--w-rjv-curlybraces-color',
    '--w-rjv-colon-color',
    '--w-rjv-brackets-color',
    '--w-rjv-quotes-color',
    '--w-rjv-quotes-string-color',
    '--w-rjv-type-string-color',
    '--w-rjv-type-int-color',
    '--w-rjv-type-float-color',
    '--w-rjv-type-bigint-color',
    '--w-rjv-type-boolean-color',
    '--w-rjv-type-date-color',
    '--w-rjv-type-url-color',
    '--w-rjv-type-null-color',
    '--w-rjv-type-nan-color',
    '--w-rjv-type-undefined-color',
  ]);
});
