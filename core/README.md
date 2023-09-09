react-json-view
===

[![CI](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@uiw/react-json-view.svg)](https://www.npmjs.com/package/@uiw/react-json-view)
[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-json-view.svg?style=flat&label=)](https://www.npmjs.com/package/@uiw/react-json-view)
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
📋 Copy to Clipboard  
✏️ Support editing and adding features  
♻️ Whether to highlight updates.

## Quick Start

```bash
npm install @uiw/react-json-view
```

```jsx
import JsonView from '@uiw/react-json-view';
import JsonViewEditor from '@uiw/react-json-view/editor';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import { TriangleArrow } from '@uiw/react-json-view/triangle-arrow';
import { TriangleSolidArrow } from '@uiw/react-json-view/triangle-solid-arrow';
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
import { nordTheme } from '@uiw/react-json-view/nord';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { gruvboxTheme } from '@uiw/react-json-view/gruvbox';
import { monokaiTheme } from '@uiw/react-json-view/monokai';

const object = {
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  boolean: true,
  null: null,
  nan: NaN,
  url: new URL('https://example.com'),
}

const style = { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' };

export default function Demo() {
  return (
    <div style={style}>
      <JsonView value={object} style={darkTheme} />
      <JsonView value={object} style={lightTheme} />
      <JsonView value={object} style={nordTheme} />
      <JsonView value={object} style={githubLightTheme} />
      <JsonView value={object} style={githubDarkTheme} />
      <JsonView value={object} style={gruvboxTheme} />
      <JsonView value={object} style={vscodeTheme} />
      <JsonView value={object} style={monokaiTheme} />
    </div>
  );
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
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-add-color': 'var(--w-rjv-color)',
  '--w-rjv-delete-color': '#dc3545',
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
import React, { useState, useEffect } from 'react';
import Colorful from '@uiw/react-color-colorful';
import JsonView from '@uiw/react-json-view/editor';

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
  '--w-rjv-edit-color': '#0184a6',
  '--w-rjv-add-color': '#0184a6',
  '--w-rjv-delete-color': '#dc3545',
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
  const [editable, setEditable] = useState(false);
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

  const changeEditable = (evn) => setEditable(evn.target.checked);
  return (
    <React.Fragment>
      <label>
        <input type="checkbox" checked={editable} onChange={changeEditable} /> Editable
      </label>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <JsonView
          editable={editable}
          value={src}
          keyName="root"
          onAdd={(keyOrValue, newValue, value, isAdd) => {
            return isAdd;
          }}
          onEdit={(opts) => {
            return true;
          }}
          style={{ flex: 1, overflow: 'auto', ...theme }}
        />
        <div>
          <Colorful color={hex} onChange={onChange} />
          <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
            {Object.keys(customTheme).map((varname, idx) => {
              const click = () => {
                setCssvar(varname);
                setHex(customTheme[varname]);
              };
              const active = cssvar === varname ? '#a8a8a8' : '';
              return <button key={idx} style={{ background: active, border: 0,boxShadow: 'inset 0px 0px 1px #000', textAlign: 'left' }} onClick={click}>{varname}</button>
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

**Preview Picture**

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  avatar: 'https://i.imgur.com/MK3eW3As.jpg',
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
}

function value({ type, children, value, setValue, keyName, parentValue, visible, ...props }) {
  if (type === 'string' && /\.(jpg)$/.test(value)) {
    return (
      <span {...props}>
        <img src={value} height="36" />
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

function value({ type, children, visible, keyName, parentValue, value, setValue, ...props }) {
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

Inspector

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = [
  {
    "_id": "56dcf573b09c217d39fd7621",
    "name": "Howard Christensen",
    "email": "howardchristensen@gmail.com",
    "phone": "+1 (830) 529-3176",
    "address": "511 Royce Street, Hilltop, Tennessee, 9712"
  },
  {
    "_id": "56dcf57323630b06251e93cd",
    "name": "Eleanor Lynn",
    "email": "eleanorlynn@gmail.com",
    "phone": "+1 (911) 576-2345",
    "address": "547 Dearborn Court, Trona, California, 8629"
  },
  {
    "_id": "56dcf5738279cac6b081e512",
    "name": "Baxter Mooney",
    "email": "baxtermooney@gmail.com",
    "phone": "+1 (954) 456-3456",
    "address": "349 Cumberland Walk, Washington, Alaska, 3154"
  },
  {
    "_id": "56dcf57303accabd43740957",
    "name": "Calhoun Tyson",
    "email": "calhountyson@gmail.com",
    "phone": "+1 (818) 456-2529",
    "address": "367 Lyme Avenue, Ladera, Louisiana, 6292"
  },
]

const customTheme = {
  '--w-rjv-background-color': '#fff',
  '--w-rjv-border-left-width': 0,
  '--w-rjv-color': '#881391',
  '--w-rjv-type-int-color': '#881391',
};

export default function Demo() {
  return (
    <JsonView
      value={object}
      style={customTheme}
      quotes=""
      enableClipboard={false}
      displayDataTypes={false}
      components={{
        braces: ({ level }) => level !== 1 && <span />,
        countInfo: ({ level, count, visible }) => {
          if (level === 1) {
            return <span />;
            //return visible ? <span>{Array.from({ length: 3 }, () => 'Object').join(', ')}</span> : <span />
          }
          return <span style={{ color: '#222' }}>Object</span>;
        },
        ellipsis: ({ level, count }) => {
          if (level === 1) {
            return <span>{Array.from({ length: 3 }, () => 'Object').join(', ')}</span>;
          }
          return <span />;
        },
      }}
    />
  );
}
```

## Editor JSON

```tsx mdx:preview
import React, { useRef } from 'react';
import JsonViewEditor from '@uiw/react-json-view/editor';
import { type SemicolonProps, useHighlight } from '@uiw/react-json-view';

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

const ObjectKey: SemicolonProps['render'] = ({ value, keyName, parentName, ...props }) => {
  const $edit = useRef<HTMLSpanElement & HTMLModElement>(null);
  useHighlight({ value, highlightUpdates: true, highlightContainer: $edit });
  if (keyName === 'integer' && typeof value === 'number' && value > 40) {
    return <del {...props} ref={$edit} />;
  }
  return <span {...props} ref={$edit} />;
}

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
        // opts.namespace: ['object', 'child', 'last']
        // opts.oldValue: null
        // opts.type: "value"
        // opts.value: "NULL3"
        return true;
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

### JsonView Props

```ts
import React from 'react';
import { MetaProps, SemicolonProps, EllipsisProps, ValueViewProps } from '@uiw/react-json-view';
import type { CountInfoExtraProps } from '@uiw/react-json-view/cjs/editor/countInfoExtra';
export interface JsonViewProps<T> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** This property contains your input JSON */
  value?: T;
  /** Set the indent-width for nested objects @default 15 */
  indentWidth?: number;
  /** When set to `true`, data type labels prefix values @default true */
  displayDataTypes?: boolean;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default true */
  displayObjectSize?: boolean;
  /** Shorten long JSON strings, Set to `0` to disable this feature @default 20 */
  shortenTextAfterLength?: number;
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
    value?: (props: RenderValueProps<T>) => JSX.Element;
    copied?: CopiedProps<T>['render'];
    countInfo?: (props: CountInfoProps) => JSX.Element;
    countInfoExtra?: (props: Omit<CountInfoExtraProps<T>, 'editable'>) => JSX.Element;
  };
}
interface RenderValueProps<T extends object> extends React.HTMLAttributes<HTMLSpanElement> {
  type: TypeProps['type'];
  value?: unknown;
  parentValue?: T;
  data?: T;
  visible?: boolean;
  quotes?: JsonViewProps<T>['quotes'];
  namespace?: Array<string | number>;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  keyName?: ValueViewProps<T>['keyName'];
}
declare const JsonView: React.ForwardRefExoticComponent<Omit<JsonViewProps<object>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default JsonView;
export interface CountInfoProps {
  count: number;
  level: number;
  visible: boolean;
}
```

### JsonView Editor Props

```ts
import { JsonViewProps } from '@uiw/react-json-view';
import type { CountInfoExtraProps } from '@uiw/react-json-view/cjs/editor/countInfoExtra';
export interface JsonViewEditorProps<T extends object> extends Omit<JsonViewProps<T>, 'shortenTextAfterLength'> {
  /**
   * When a callback function is passed in, edit functionality is enabled. The callback is invoked before edits are completed.
   * @returns {boolean}  Returning false from onEdit will prevent the change from being made.
   */
  onEdit?: (option: {
    value: unknown;
    oldValue: unknown;
    keyName?: string | number;
    parentName?: string | number;
    namespace?: Array<string | number>;
    type?: 'value' | 'key';
  }) => boolean;
  /**
   * When a callback function is passed in, add functionality is enabled. The callback is invoked before additions are completed.
   * @returns {boolean} Returning false from onAdd will prevent the change from being made.
   */
  onAdd?: CountInfoExtraProps<T>['onAdd'];
  /**
   * When a callback function is passed in, delete functionality is enabled. The callback is invoked before deletions are completed.
   * @returns Returning false from onDelete will prevent the change from being made.
   */
  onDelete?: CountInfoExtraProps<T>['onDelete'];
  /** Whether enable edit feature. @default true */
  editable?: boolean;
}
declare const JsonViewEditor: import("react").ForwardRefExoticComponent<Omit<JsonViewEditorProps<object>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default JsonViewEditor;
```

## Size and dependencies

Here is the size benchmark (using [bundlephobia.com](https://bundlephobia.com)) against similar React libraries (found by [`npmjs.com/search`](https://www.npmjs.com/search?q=react%20json&ranking=popularity)):

| Library | Bundle size (gzip) | Deps | Last commit | Download | Editable |
| ------- | ------- | ------- | ------- | ------- | ------- |
| **@uiw/react-json-view** | [![](https://img.shields.io/bundlephobia/min/@uiw/react-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view) [![](https://img.shields.io/bundlephobia/minzip/@uiw/react-json-view?color=6ead0a&label=gzip)](https://bundlephobia.com/result?p=@uiw/react-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/%40uiw%2Freact-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/uiwjs/react-json-view?style=flat&label=)](https://github.com/uiwjs/react-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-json-view.svg?style=flat&label=)](https://www.npmjs.com/package/@uiw/react-json-view) | ✅ |
| react-json-view-lite | [![](https://img.shields.io/bundlephobia/min/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite) [![](https://img.shields.io/bundlephobia/minzip/react-json-view-lite?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-view-lite) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite) | [![GitHub last commit](https://img.shields.io/github/last-commit/AnyRoad/react-json-view-lite?style=flat&label=)](https://github.com/AnyRoad/react-json-view-lite/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-view-lite.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-view-lite) | ❌ |
| react-json-pretty | [![](https://img.shields.io/bundlephobia/min/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty) [![](https://img.shields.io/bundlephobia/minzip/react-json-pretty?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-pretty) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty) | [![GitHub last commit](https://img.shields.io/github/last-commit/chenckang/react-json-pretty?style=flat&label=)](https://github.com/chenckang/react-json-pretty/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-pretty.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-pretty) | ❌ |
| react-json-inspector | [![](https://img.shields.io/bundlephobia/min/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector) [![](https://img.shields.io/bundlephobia/minzip/react-json-inspector?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-inspector) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector) | [![GitHub last commit](https://img.shields.io/github/last-commit/Lapple/react-json-inspector?style=flat&label=)](https://github.com/Lapple/react-json-inspector/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-inspector.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-inspector) | ❌ |
| react-json-tree | [![](https://img.shields.io/bundlephobia/min/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree) [![](https://img.shields.io/bundlephobia/minzip/react-json-tree?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-tree) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree) | [![GitHub last commit](https://img.shields.io/github/last-commit/reduxjs/redux-devtools?style=flat&label=)](https://github.com/reduxjs/redux-devtools/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-tree.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-tree) | ❌ |
| ~~react-json-view~~ | [![](https://img.shields.io/bundlephobia/min/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view) [![](https://img.shields.io/bundlephobia/minzip/react-json-view?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view?color=red&label=&t=123)](https://bundlephobia.com/result?p=react-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/mac-s-g/react-json-view?style=flat&label=)](https://github.com/mac-s-g/react-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-view.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-view) | ✅ |
| ~~react-json-tree-viewer~~ | [![](https://img.shields.io/bundlephobia/min/react-json-tree-viewer?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree-viewer) [![](https://img.shields.io/bundlephobia/minzip/react-json-tree-viewer?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree-viewer?color=red&label=&t=123)](https://bundlephobia.com/result?p=react-json-tree-viewer) | [![GitHub last commit](https://img.shields.io/github/last-commit/nsisodiya/react-json-viewer?style=flat&label=)](https://github.com/nsisodiya/react-json-viewer/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-tree-viewer.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-tree-viewer) | ❌ |
| react-inspector | [![](https://img.shields.io/bundlephobia/min/react-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-inspector) [![](https://img.shields.io/bundlephobia/minzip/react-inspector?color=red&label=gzip)](https://bundlephobia.com/result?p=react-inspector) | [![](https://badgen.net/bundlephobia/dependency-count/react-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-inspector) | [![GitHub last commit](https://img.shields.io/github/last-commit/storybookjs/react-inspector?style=flat&label=)](https://github.com/storybookjs/react-inspector/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-inspector.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-inspector) | ❌ |
| react-domify | [![](https://img.shields.io/bundlephobia/min/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify) [![](https://img.shields.io/bundlephobia/minzip/react-domify?color=red&label=gzip)](https://bundlephobia.com/result?p=react-domify) | [![](https://badgen.net/bundlephobia/dependency-count/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify) | [![GitHub last commit](https://img.shields.io/github/last-commit/JedWatson/react-domify?style=flat&label=)](https://github.com/JedWatson/react-domify/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-domify.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-domify) | ❌ |
| react18-json-view | [![](https://img.shields.io/bundlephobia/min/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view) [![](https://img.shields.io/bundlephobia/minzip/react18-json-view?color=red&label=gzip)](https://bundlephobia.com/result?p=react18-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/YYsuni/react18-json-view?style=flat&label=)](https://github.com/YYsuni/react18-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react18-json-view.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react18-json-view) | ❌ |
| @textea/json-viewer | [![](https://img.shields.io/bundlephobia/min/@textea/json-viewer?color=red&label=)](https://bundlephobia.com/result?p=@textea/json-viewer) [![](https://img.shields.io/bundlephobia/minzip/@textea/json-viewer?color=red&label=gzip)](https://bundlephobia.com/result?p=@textea/json-viewer) | [![](https://badgen.net/bundlephobia/dependency-count/%40textea%2Fjson-viewer?color=red&label=&t=vvv12213)](https://bundlephobia.com/result?p=@textea/json-viewer) | [![GitHub last commit](https://img.shields.io/github/last-commit/TexteaInc/json-viewer?style=flat&label=)](https://github.com/TexteaInc/json-viewer/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/@textea/json-viewer.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/@textea/json-viewer) | ✅ |

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
