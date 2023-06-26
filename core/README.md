react-json-view
===

[![CI](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@uiw/react-json-view.svg)](https://www.npmjs.com/package/@uiw/react-json-view)
[![react@^18](https://shields.io/badge/react-^18-green?style=flat&logo=react)](https://github.com/facebook/react/releases)
[![Coverage Status](https://uiwjs.github.io/react-json-view/badges.svg)](https://uiwjs.github.io/react-json-view/lcov-report/)

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
🎨 Support theme customization & [`online editing`](https://uiwjs.github.io/react-json-view/#online-editing-theme) theme  
🌒 Support dark/light mode  
📦 Zero dependencies  
♻️ Whether to highlight updates.

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
  '--w-rjv-line-color': '#323232',
  '--w-rjv-arrow-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#656565',
  '--w-rjv-update-color': '#ebcb8b',
  '--w-rjv-copied-color': '#9cdcfe',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#268bd2',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#268bd2',
  '--w-rjv-type-boolean-color': '#559bd4',
  '--w-rjv-type-date-color': '#586e75',
  '--w-rjv-type-url-color': '#649bd8',
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

## Online Editing Theme

Online custom style example, please check in the [documentation website](https://uiwjs.github.io/react-json-view/)

```tsx mdx:preview:&title=Online Editing Theme
import React, { useState, useEffect, useRef } from 'react';
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
  url: new URL('https://example.com'),
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
  '--w-rjv-line-color': '#323232',
  '--w-rjv-arrow-color': '#9cdcfe',
  '--w-rjv-info-color': '#656565',
  '--w-rjv-update-color': '#ebcb8b',
  '--w-rjv-copied-color': '#0184a6',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#268bd2',
  '--w-rjv-type-float-color': '#859900',
  '--w-rjv-type-bigint-color': '#268bd2',
  '--w-rjv-type-boolean-color': '#559bd4',
  '--w-rjv-type-date-color': '#586e75',
  '--w-rjv-type-url-color': '#0969da',
  '--w-rjv-type-null-color': '#d33682',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#586e75',
};

export default function Demo() {
  const [cssvar, setCssvar] = useState('--w-rjv-background-color');
  const [hex, setHex] = useState("#1e1e1e");
  const [theme, setTheme] = useState(customTheme);
  const onChange = ({ hexa }) => {
    setHex(hexa);
    setTheme({ ...theme, [cssvar]: hexa });
  };

  const [src, setSrc] = useState({ ...object })
  useEffect(() => {
    const loop = () => {
      setSrc(src => ({
        ...src,
        timer: src.timer + 1
      }))
    }
    const id = setInterval(loop, 1000)
    return () => clearInterval(id)
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <JsonView value={src} keyName="root" style={{ flex: 1, ...theme }} />
        <div>
          <Colorful color={hex} onChange={onChange} />
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {Object.keys(customTheme).map((varname, idx) => {
              const click = () => {
                setCssvar(varname);
                setHex(customTheme[varname]);
              };
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
      quotes=""
      displayObjectSize={false}
      displayDataTypes={false}
      style={{
        '--w-rjv-background-color': '#ffffff',
        '--w-rjv-border-left-width': '0',
      }}
      components={{
        braces: () => <span />,
        ellipsis: () => <React.Fragment />,
        objectKey: ({ value, keyName, parentName, ...props}) => {
          if (keyName === 'integer' && typeof value === 'number' && value > 40) {
            return <del {...props} />
          }
          return <span {...props}  />
        }
      }}
    />
  )
}
```

**Preview Picture**

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  avatar: 'https://i.imgur.com/MK3eW3As.jpg',
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
}

function value({ type, children, keyName, visible, ...props }) {
  if (type === 'string' && /\.(jpg)$/.test(children)) {
    return (
      <span {...props}>
        <img src={children} height="36" />
      </span>
    );
  }
}

export default function Demo() {
  return (
    <JsonView
      value={object}
      keyName="root"
      // quotes=""
      displayObjectSize={false}
      displayDataTypes={false}
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
      components={{ value }}
    />
  )
}
```

**Support for the URL(opens in a new tab) API.**

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

export default function Demo() {
  return (
    <JsonView
      value={{
        url: new URL('https://example.com?t=12'),
        urlStr: "https://example.com",
        github: "https://example.com",
      }}
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
    />
  )
}
```

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

function value({ type, children, visible, keyName, value, ...props }) {
  if (value instanceof URL) {
    return (
      <span {...props}>
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
        &nbsp;Open URL
        {visible && <del>Button</del>}
      </span>
    );
  }
}

export default function Demo() {
  return (
    <JsonView
      value={{
        url: new URL('https://example.com?t=12'),
        urlStr: "https://example.com",
        github: "https://example.com",
      }}
      components={{ value }}
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
    />
  )
}
```

## Editor JSON

```tsx mdx:preview
import React from 'react';
import JsonViewEditor from '@uiw/react-json-view/editor';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
    'child': {
      'first': true,
      'second': false,
      'last': null,
    },
  },
  nestedArray: [ [1, 2], [3, 4], { a: 1} ],
}

const ObjectKey = ({ value, keyName, parentName, ...reset }) => {
  if (keyName === 'integer' && typeof value === 'number' && value > 40) {
    return <del {...reset} />
  }
  return <span {...reset} />
};

export default function Demo() {
  return (
    <JsonViewEditor
      value={object}
      keyName="root"
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
      onEdit={(opts) => {
        console.log('opts:', opts)
      }}
      components={{
        objectKey: ObjectKey
      }}
    />
  );
}
```

## Highlight Updates

```tsx mdx:preview
import React, { useState, useEffect } from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  timer: 0,
  object: { 'first-child': true, 'second-child': false, 'last-child': null },
}
export default function Demo() {
  const [src, setSrc] = useState({ ...object })
  useEffect(() => {
    const loop = () => {
      setSrc(src => ({
        ...src,
        timer: src.timer + 1
      }))
    }
    const id = setInterval(loop, 1000)
    return () => clearInterval(id)
  }, []);

  return (
    <JsonView
      value={src}
      keyName="root"
      style={{
        '--w-rjv-background-color': '#ffffff',
        '--w-rjv-border-left': '1px dashed #ebebeb',
        // ✅ Change default update background color ✅
        '--w-rjv-update-color': '#ff6ffd',
      }}
    />
  )
}
```

This feature can be disabled with `highlightUpdates={false}`, and the default color can be changed with `--w-rjv-update-color`.

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
  const { style, 'data-expand': expand, ...reset } = props;
  const svgProps = {
    style: { cursor: 'pointer', height: '1em', width: '1em' },
    viewBox: '0 0 24 24',
    fill: 'var(--w-rjv-arrow-color, currentColor)',
    ...reset
  }
  if (!expand) {
    return (
      <svg {...svgProps}>
        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
    </svg>
  );
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
  /** Set the indent-width for nested objects @default 15 */
  indentWidth?: number;
  /** When set to `true`, data type labels prefix values @default true */
  displayDataTypes?: boolean;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default true */
  displayObjectSize?: boolean;
  /** Define the root node name. @default undefined */
  keyName?: string | number;
  /** The user can copy objects and arrays to clipboard by clicking on the clipboard icon. @default true */
  enableClipboard?: boolean;
  /** Whether to highlight updates. @default true */
  highlightUpdates?: boolean;
  /** Whether sort keys through `String.prototype.localeCompare()` @default false */
  objectSortKeys?: boolean | ((a: string, b: string) => number);
  /** Display for quotes in object-key @default " */
  quotes?: "'" | '"' | '';
  /** When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth. @default false */
  collapsed?: boolean | number;
  /** Callback function for when a treeNode is expanded or collapsed */
  onExpand?: (props: {
    expand: boolean;
    value: T;
    keyid: string;
    keyName?: string | number;
  }) => void;
  /** Fires event when you copy */
  onCopied?: CopiedProps<T>['onCopied'];
  /** Redefine interface elements to re-render. */
  components?: {
    braces?: MetaProps['render'];
    ellipsis?: EllipsisProps['render'];
    arrow?: JSX.Element;
    objectKey?: SemicolonProps['render'];
    value?: ValueViewProps<T>['renderValue'];
    copied?: CopiedProps<T>['render'];
  };
}
declare const JsonView: React.ForwardRefExoticComponent<Omit<JsonViewProps<object>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default JsonView;
```

## Size and dependencies

Here is the size benchmark (using [bundlephobia.com](https://bundlephobia.com)) against similar React libraries (found by [`npmjs.com/search`](https://www.npmjs.com/search?q=react%20json&ranking=popularity)):

| Library | Bundle size | Bundle size (gzip) | Deps | Last commit |
| ------- | ------- | ------- | ------- | ------- |
| **@uiw/react-json-view** | [![](https://img.shields.io/bundlephobia/min/@uiw/react-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view)  | [![](https://img.shields.io/bundlephobia/minzip/@uiw/react-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view)  | [![](https://badgen.net/bundlephobia/dependency-count/%40uiw%2Freact-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view)  | [![GitHub last commit](https://img.shields.io/github/last-commit/uiwjs/react-json-view?style=flat&label=last)](https://github.com/uiwjs/react-json-view/commits) |
| react-json-view-lite | [![](https://img.shields.io/bundlephobia/min/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://img.shields.io/bundlephobia/minzip/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite)  | [![GitHub last commit](https://img.shields.io/github/last-commit/AnyRoad/react-json-view-lite?style=flat&label=last)](https://github.com/AnyRoad/react-json-view-lite/commits) |
| react-json-pretty | [![](https://img.shields.io/bundlephobia/min/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)  | [![](https://img.shields.io/bundlephobia/minzip/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty)  | [![GitHub last commit](https://img.shields.io/github/last-commit/chenckang/react-json-pretty?style=flat&label=last)](https://github.com/chenckang/react-json-pretty/commits) |
| react-json-inspector | [![](https://img.shields.io/bundlephobia/min/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)  | [![](https://img.shields.io/bundlephobia/minzip/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector)  | [![GitHub last commit](https://img.shields.io/github/last-commit/Lapple/react-json-inspector?style=flat&label=last)](https://github.com/Lapple/react-json-inspector/commits) |
| react-json-tree | [![](https://img.shields.io/bundlephobia/min/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)  | [![](https://img.shields.io/bundlephobia/minzip/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree)  | [![GitHub last commit](https://img.shields.io/github/last-commit/reduxjs/redux-devtools?style=flat&label=last)](https://github.com/reduxjs/redux-devtools/commits) |
| react-json-view | [![](https://img.shields.io/bundlephobia/min/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)  | [![](https://img.shields.io/bundlephobia/minzip/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view?color=red&label=&t=123)](https://bundlephobia.com/result?p=react-json-view)  | [![GitHub last commit](https://img.shields.io/github/last-commit/mac-s-g/react-json-view?style=flat&label=last)](https://github.com/mac-s-g/react-json-view/commits) |
| react-json-tree-viewer | [![](https://img.shields.io/bundlephobia/min/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer)  | [![](https://img.shields.io/bundlephobia/minzip/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer)  | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree-viewer?color=red&label=&t=123)](https://bundlephobia.com/result?p=react-json-tree-viewer)  | [![GitHub last commit](https://img.shields.io/github/last-commit/nsisodiya/react-json-viewer?style=flat&label=last)](https://github.com/nsisodiya/react-json-viewer/commits) |
| react-domify | [![](https://img.shields.io/bundlephobia/min/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify)  | [![](https://img.shields.io/bundlephobia/minzip/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify)  | [![](https://badgen.net/bundlephobia/dependency-count/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify)  | [![GitHub last commit](https://img.shields.io/github/last-commit/JedWatson/react-domify?style=flat&label=last)](https://github.com/JedWatson/react-domify/commits) |
| react18-json-view | [![](https://img.shields.io/bundlephobia/min/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view)  | [![](https://img.shields.io/bundlephobia/minzip/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view)  | [![](https://badgen.net/bundlephobia/dependency-count/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view)  | [![GitHub last commit](https://img.shields.io/github/last-commit/YYsuni/react18-json-view?style=flat&label=last)](https://github.com/YYsuni/react18-json-view/commits) |
| @textea/json-viewer | [![](https://img.shields.io/bundlephobia/min/@textea/json-viewer?color=red&label=)](https://bundlephobia.com/result?p=@textea/json-viewer)  | [![](https://img.shields.io/bundlephobia/minzip/@textea/json-viewer?color=red&label=)](https://bundlephobia.com/result?p=@textea/json-viewer)  | [![](https://badgen.net/bundlephobia/dependency-count/%40textea%2Fjson-viewer?color=red&label=&t=vvv12213)](https://bundlephobia.com/result?p=@textea/json-viewer)  | [![GitHub last commit](https://img.shields.io/github/last-commit/TexteaInc/json-viewer?style=flat&label=last)](https://github.com/TexteaInc/json-viewer/commits) |

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
