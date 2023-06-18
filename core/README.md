react-json-view
===

[![CI](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@uiw/react-json-view.svg)](https://www.npmjs.com/package/@uiw/react-json-view)

A React component for displaying and editing javascript arrays and JSON objects.

<!--rehype:ignore:start-->
<a href="https://uiwjs.github.io/react-json-view/" target="_blank">
  <img width="360" alt="react-json-view" src="https://github.com/uiwjs/react-json-view/assets/1680273/b8b8300b-2a43-4173-878b-73e50cfac19c" />
</a>
<a href="https://uiwjs.github.io/react-json-view/" target="_blank">
  <img width="360" alt="react-json-view" src="https://github.com/uiwjs/react-code-preview-layout/assets/1680273/da8e8499-6de3-4d4f-8316-8b2a3b616170" />
</a>

<!--rehype:ignore:end-->

## Features

📚 Use Typescript to write, better code hints.  
🎨 Support theme customization  
🌒 Support dark/light mode  

## Quick Start

```bash
npm install @uiw/react-json-view
```

```jsx
import JsonView from '@uiw/react-json-view';

const avatar = 'https://i.imgur.com/MK3eW3As.jpg';
const longArray = new Array(1000).fill(1);
const example = {
  avatar,
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  bigint: 10086n,
  null: null,
  undefined,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  array: [19, 100.86, 'test', NaN, Infinity],
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  longArray,
  string_number: '1234',
};

<JsonView value={example} />
```

## Theme

By default, the `lightTheme` light theme is used, and a `darkTheme` dark theme configuration is built in

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
}

export default function Demo() {
  return (
    <React.Fragment>
      <JsonView value={object} style={darkTheme} />
      <JsonView value={object} style={lightTheme} />
    </React.Fragment>
  )
}
```

Example of custom `vscode` theme styles: 

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
}
const customTheme = {
  '--w-rjv-font-family': 'monospace',
  '--w-rjv-color': '#9cdcfe',
  '--w-rjv-background-color': '#1e1e1e',
  '--w-rjv-border-left': '1px solid #323232',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#656565',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#268bd2',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#268bd2',
  '--w-rjv-type-boolean-color': '#559bd4',
  '--w-rjv-type-date-color': '#586e75',
  '--w-rjv-type-null-color': '#d33682',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#586e75',
};

export default function Demo() {
  return (
    <JsonView value={object} keyName="root" style={customTheme} />
  )
}
```

Online custom style example, please check in the [documentation website](https://uiwjs.github.io/react-json-view/)

```tsx mdx:preview
import React, { useState, useRef } from 'react';
import Colorful from '@uiw/react-color-colorful';
import JsonView from '@uiw/react-json-view';

const object = {
  avatar: 'https://i.imgur.com/MK3eW3As.jpg',
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  bigint: 10086n,
  null: null,
  undefined,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  array: [19, 100.86, 'test', NaN, Infinity],
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  string_number: '1234',
}
const customTheme = {
  '--w-rjv-color': '#9cdcfe',
  '--w-rjv-background-color': '#1e1e1e',
  '--w-rjv-border-left': '1px solid #323232',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#656565',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#268bd2',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#268bd2',
  '--w-rjv-type-boolean-color': '#559bd4',
  '--w-rjv-type-date-color': '#586e75',
  '--w-rjv-type-null-color': '#d33682',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#586e75',
};

export default function Demo() {
  const [cssvar, setCssvar] = useState('--w-rjv-background-color');
  const [hex, setHex] = useState("#1e1e1e");
  const [theme, setTheme] = useState(customTheme);
  const onChange = ({ hexa }) => {
    const value = cssvar === '--w-rjv-border-left' ? `1px solid ${hexa}` : hexa;
    setHex(hexa);
    setTheme({ ...theme, [cssvar]: value });
  };
  return (
    <React.Fragment>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <JsonView value={object} keyName="root" style={{ flex: 1, ...theme }} />
        <div>
          <Colorful color={hex} onChange={onChange} />
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {Object.keys(customTheme).map((varname, idx) => {
              const click = () => setCssvar(varname);
              const active = cssvar === varname ? '#a8a8a8' : '';
              return <button key={idx} style={{ background: active }} onClick={click}>{varname}</button>
            })}
          </div>
        </div>
      </div>
      Copy the theme configuration below into your project.
      <pre>
        {JSON.stringify(theme, null, 2)}
      </pre>
    </React.Fragment>
  )
}
```
## Render

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
}
export default function Demo() {
  return (
    <JsonView
      value={object}
      keyName="root"
      displayObjectSize={false}
      displayDataTypes={false}
      style={{
        '--w-rjv-background-color': '#ffffff',
        '--w-rjv-border-left': '0',
      }}
      components={{
        braces: () =>  <span />,
        ellipsis: () =>  <React.Fragment />,
        objectKey: ({ value, ...props}) => {
          if (props.children === '"integer"' && value > 40) {
            return <del {...props} />
          }
          return <span {...props} />
        }
      }}
    />
  )
}
```

## Modify Icon Style

Use built-in default icons.

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';
import { TriangleArrow } from '@uiw/react-json-view/triangle-arrow';
import { TriangleSolidArrow } from '@uiw/react-json-view/triangle-solid-arrow';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
}
export default function Demo() {
  return (
    <JsonView
      value={object}
      keyName="root"
      style={{
        '--w-rjv-background-color': '#ffffff',
        '--w-rjv-border-left': '1px dashed #ebebeb',
      }}
      components={{
        arrow: <TriangleSolidArrow />
      }}
    />
  )
}
```

Display of custom **svg** `icon` components

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
}

const Arrow = (props) => {
  const { style, 'data-expand': expand,  ...reset } = props;
  const defaultStyle = {
    cursor: 'pointer',
    height: '1em',
    width: '1em',
  };
  if (!expand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="var(--w-rjv-arrow-color, currentColor)"
        style={defaultStyle}
        {...reset}
      >
        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="var(--w-rjv-arrow-color, currentColor)"
      style={defaultStyle}
      {...reset}
    >
      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
    </svg>
  )
}

export default function Demo() {
  return (
    <JsonView
      value={object}
      keyName="root"
      style={{
        '--w-rjv-background-color': '#ffffff',
        '--w-rjv-border-left': '1px dashed #ebebeb',
      }}
      components={{
        arrow: <Arrow />
      }}
    />
  )
}
```

## Props

```ts
import React from 'react';
import { MetaProps, SemicolonProps, EllipsisProps, ValueViewProps } from '@uiw/react-json-view';
export interface JsonViewProps<T> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** This property contains your input JSON */
  value?: T;
  /** Set the indent-width for nested objects @default `15`*/
  indentWidth?: number;
  /** When set to `true`, data type labels prefix values @default `true` */
  displayDataTypes?: boolean;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default `true` */
  displayObjectSize?: boolean;
  /** Define the root node name. @default `undefined` */
  keyName?: string | number;
  components?: {
    braces?: MetaProps['render'];
    ellipsis?: EllipsisProps['render'];
    arrow?: JSX.Element;
    objectKey?: SemicolonProps['render'];
    value?: ValueViewProps<T>['renderValue'];
  };
}
declare const JsonView: React.ForwardRefExoticComponent<Omit<JsonViewProps<object>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default JsonView;
```

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-json-view/graphs/contributors">
  <img src="https://uiwjs.github.io/react-json-view/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
