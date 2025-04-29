react-json-view
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![CI](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-json-view/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@uiw/react-json-view.svg)](https://www.npmjs.com/package/@uiw/react-json-view)
[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-json-view.svg?style=flat&label=)](https://www.npmjs.com/package/@uiw/react-json-view)
[![react@^18](https://shields.io/badge/react-^18-green?style=flat&logo=react)](https://github.com/facebook/react/releases)
[![Coverage Status](https://uiwjs.github.io/react-json-view/badges.svg)](https://uiwjs.github.io/react-json-view/lcov-report/)

A React component for displaying and editing javascript arrays and JSON objects. Preview of [**v1 documentation**](https://raw.githack.com/uiwjs/react-json-view/v1-docs/index.html) is available [here](https://raw.githack.com/uiwjs/react-json-view/v1-docs/index.html).

<!--rehype:ignore:start-->
<a href="https://uiwjs.github.io/react-json-view/" target="_blank">
  <img width="650" alt="react-json-view" src="https://github.com/uiwjs/react-json-view/assets/1680273/1c19bd72-f2ad-4d21-8708-cb30f3059cfd" />
</a>

<!--rehype:ignore:end-->

## Features

🚀 **Improved with TypeScript** – Better code hints for a smoother development experience.  
🎨 **Customizable Themes** – Supports theme customization & [`online editing`](https://uiwjs.github.io/react-json-view/#online-editing-theme).  
🌒 **Dark/Light Mode** – Seamless switching between themes.  
📦 **Zero Dependencies** – Lightweight and efficient.  
📋 **Clipboard Support** – Easily copy JSON data.  
✏️ **Editable & Extendable** – Supports editing and adding new properties.  
♻️ **Update Highlighting** – Option to highlight changes.  

The latest version [**v2**](https://uiwjs.github.io/react-json-view/) features a redesigned API for better maintainability, a more flexible component customization system, and fully customizable rendering, making it more aligned with React’s component model. 📖 Check out the [v2 documentation](https://uiwjs.github.io/react-json-view/) and [examples](https://uiwjs.github.io/react-json-view/).  

- [x] Fully implemented all v1 JSON display features.  
- [ ] Adding editing functionality to v2.  
- [x] Added comprehensive test cases for v2.  

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
import { basicTheme } from '@uiw/react-json-view/basic';

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
      <JsonView value={object} style={basicTheme} />
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
  '--w-rjv-key-number': '#268bd2',
  '--w-rjv-key-string': '#9cdcfe',
  '--w-rjv-background-color': '#1e1e1e',
  '--w-rjv-line-color': '#36334280',
  '--w-rjv-arrow-color': '#838383',
  '--w-rjv-edit-color': 'var(--w-rjv-color)',
  '--w-rjv-info-color': '#9c9c9c7a',
  '--w-rjv-update-color': '#9cdcfe',
  '--w-rjv-copied-color': '#9cdcfe',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-colon-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',
  '--w-rjv-ellipsis-color': '#cb4b16',
  '--w-rjv-quotes-color': 'var(--w-rjv-key-string)',
  '--w-rjv-quotes-string-color': 'var(--w-rjv-type-string-color)',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#b5cea8',
  '--w-rjv-type-float-color': '#b5cea8',
  '--w-rjv-type-bigint-color': '#b5cea8',
  '--w-rjv-type-boolean-color': '#569cd6',
  '--w-rjv-type-date-color': '#b5cea8',
  '--w-rjv-type-url-color': '#3b89cf',
  '--w-rjv-type-null-color': '#569cd6',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#569cd6',
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
  nan: NaN,
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
  '--w-rjv-key-number': '#268bd2',
  '--w-rjv-key-string': '#9cdcfe',
  '--w-rjv-background-color': '#1e1e1e',
  '--w-rjv-line-color': '#36334280',
  '--w-rjv-arrow-color': '#838383',
  '--w-rjv-edit-color': '#9cdcfe',
  '--w-rjv-info-color': '#9c9c9c7a',
  '--w-rjv-update-color': '#9cdcfe',
  '--w-rjv-copied-color': '#9cdcfe',
  '--w-rjv-copied-success-color': '#28a745',

  '--w-rjv-curlybraces-color': '#d4d4d4',
  '--w-rjv-colon-color': '#d4d4d4',
  '--w-rjv-brackets-color': '#d4d4d4',
  '--w-rjv-ellipsis-color': '#cb4b16',
  '--w-rjv-quotes-color': '#9cdcfe',
  '--w-rjv-quotes-string-color': '#ce9178',

  '--w-rjv-type-string-color': '#ce9178',
  '--w-rjv-type-int-color': '#b5cea8',
  '--w-rjv-type-float-color': '#b5cea8',
  '--w-rjv-type-bigint-color': '#b5cea8',
  '--w-rjv-type-boolean-color': '#569cd6',
  '--w-rjv-type-date-color': '#b5cea8',
  '--w-rjv-type-url-color': '#3b89cf',
  '--w-rjv-type-null-color': '#569cd6',
  '--w-rjv-type-nan-color': '#859900',
  '--w-rjv-type-undefined-color': '#569cd6',
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
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <JsonView
          // editable={editable}
          value={src}
          keyName="root"
          style={{ flex: 1, overflow: 'auto', ...theme }}
        />
        <div>
          <Colorful color={hex} onChange={onChange} />
          <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column', ...customTheme }}>
            {Object.keys(customTheme).map((varname, idx) => {
              const click = () => {
                setCssvar(varname);
                setHex(customTheme[varname]);
              };
              const active = cssvar === varname ? '#a8a8a8' : '';
              return (
                <button key={idx}
                  style={{ background: active, border: 0,boxShadow: 'inset 0px 0px 1px #000', display: 'flex', alignItems: 'center', gap: 5, padding: '1px 3px' }}
                  onClick={click}
                >
                  <span style={{ display: 'inline-block', width: 12, height: 12, background: `var(${varname})` }}></span>
                  {varname}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        Copy the theme configuration below into your project.
      </div>
      <pre style={{ padding: 10 }}>
        {JSON.stringify(theme, null, 2)}
      </pre>
    </React.Fragment>
  );
}
```

## Render

**`v2`** version allows flexible customization of each "part" by providing small sub-components for customization, including value and type components: `<Bigint />`, `<Date />`, `<False />`, `<Float />`, `<Int />`, `<Map />`, `<Nan />`, `<Null />`, `<Set />`, `<String />`, `<True />`, `<Undefined />`, `<Url />`, and symbol components: `<ValueQuote />`, `<Arrow />`, `<Colon />`, `<Quote />`, `<BraceLeft />`, `<BraceRight />`, `<BracketsLeft />`, `<BracketsRight />`.

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  avatar: 'https://i.imgur.com/MK3eW3As.jpg',
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
}

export default function Demo() {
  return (
    <JsonView
      value={object}
      keyName="root"
      displayObjectSize={false}
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
    >
      <JsonView.String
        render={({ children, ...reset }, { type, value, keyName }) => {
          const isImg = /^https?.*\.(jpg|png)$/i.test(value)
          if (type === 'type' && isImg) {
            return <span />
          }
          if (type === 'value' && isImg) {
            return <img {...reset} height="26" src={value} />
          }
        }}
      />
      <JsonView.Colon> -&gt; </JsonView.Colon>
    </JsonView>
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

Supports certain partial customizations such as: `<Copied />`, `<CountInfo />`, `<CountInfoExtra />`, `<Ellipsis />`, `<KeyName />`, `<Row />`

```tsx mdx:preview
import React, { Fragment } from 'react';
import JsonView, { ValueQuote } from '@uiw/react-json-view';

const Copied = JsonView.Copied;

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
    >
      <Copied
        render={({ 'data-copied': copied, style, onClick, ...props }, { value }) => {
          const styl = { whiteSpace: 'nowrap' }
          if (copied) {
            return <span style={{ ...style, ...styl }}>复制成功</span>
          }
          return <span style={{ ...style, ...styl }} onClick={onClick}>复制</span>
        }}
      />
      <JsonView.Url
        render={(props, { type, value }) => {
          if (type === 'type' && value instanceof URL) {
            return <span />
          }
          if (type === 'value' && value instanceof URL) {
            return (
              <Fragment>
                <a href={value.href} target="_blank" {...props}>
                  <ValueQuote />
                  {value.href}
                  <ValueQuote />
                </a>
                Open URL
              </Fragment>
            );
          }
        }}
      />
    </JsonView>
  )
}
```

More in-depth customization ([#19](https://github.com/uiwjs/react-json-view/issues/19))

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

const object = {
  _id: "ObjectId('13212hakjdhajksd')",
  uid: "test1",
  attival_time: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  __v: 0
}

export default function Demo() {
  return (
    <JsonView
      value={object}
      // keyName="root"
      displayObjectSize={false}
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
    >
      <JsonView.Quote render={() => <span />}/>
      <JsonView.String
        render={({ children, ...reset }, { type, value, keyName }) => {
          if (type === 'type') {
            return <span />
          }
          if (type === 'value' && /ObjectId\(['"](.*?)['"]\)/.test(value)) {
            return <span {...reset}>{children}</span>
          }
        }}
      />
      <JsonView.Date
        render={({ children, ...reset }, { type, value, keyName }) => {
          if (type === 'type') {
            return <span />
          }
        }}
      />
      <JsonView.Int
        render={({ children, ...reset }, { type, value, keyName }) => {
          if (type === 'type') {
            return <span />
          }
        }}
      />
    </JsonView>
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
  '--w-rjv-key-number': '#881391',
  '--w-rjv-key-string': '#881391',
};

const Quote = JsonView.Quote;
const BraceLeft = JsonView.BraceLeft;
const BraceRight = JsonView.BraceRight;
const CountInfo = JsonView.CountInfo;
const Ellipsis = JsonView.Ellipsis;
const CountInfoExtra = JsonView.CountInfoExtra;

export default function Demo() {
  return (
    <JsonView
      value={object}
      style={customTheme}
      enableClipboard={false}
      displayDataTypes={false}
    >
      <Ellipsis
        render={({ 'data-expanded': isExpanded, className, ...props }, { value }) => {
          if (Array.isArray(value) && isExpanded) {
            console.log('props:',value, isExpanded, props)
            return (
              <span className={className}>
                {Array.from({ length: value.length }, () => 'Object').join(', ')}
              </span>
            )
          }
          return <span />;
        }}
      />
      <Quote>
        <span />
      </Quote>
      <BraceLeft>
        <span />
      </BraceLeft>
      <BraceRight>
        <span />
      </BraceRight>
      <CountInfo
        render={({ 'data-length': length, ...props }, { value }) => {
          const isArray = Array.isArray(value);
          if (isArray) return <span />;
          return (
            <span {...props}>Object</span>
          );
        }}
      />
    </JsonView>
  );
}
```

Passing **as="tagName"** will automatically infer the type.

```tsx
<JsonView.CountInfo
  as="del"
  render={(props, { value, keyName }) => {
    if (keyName === 'integer' && typeof value === 'number' && value > 10) {
      console.log('value:',  value, props)
      return <del {...props}>{keyName}</del>;
    }
  }}
/>
```

Add a click event on the data row

```tsx mdx:preview
import React from 'react';
import JsonView from '@uiw/react-json-view';

export default function Demo() {
  return (
    <JsonView
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
      value={{
        name: 'John',
        age: 30,
        hobbies: ['reading', 'coding', 'swimming'],
        address: {
            street: '123 Main St',
            city: 'New York',
            country: {
                name: 'Main ',
                codex: '123'
            }
        }
      }}
    >
      <JsonView.Row
        as="div"
        render={(props, { keyName, value, parentValue }) => {
          return (
            <div
              {...props}
              onClick={() => {
                console.log("keyName", keyName)
                console.log("value", value)
                console.log("parentValue", parentValue)
              }}
            />
          )
        }}
      />
    </JsonView>
  )
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

## Do not display array index

```tsx mdx:preview
import React, { Fragment } from 'react';
import JsonView from '@uiw/react-json-view';

export default function Demo() {
  const value = { data: ["123", 23] }
  return (
    <JsonView value={value} style={{ '--w-rjv-background-color': '#ffffff' }}>
        <JsonView.Colon render={(props, { parentValue, value, keyName }) => {
            if (Array.isArray(parentValue) && props.children == ":") {
              return <span />
            }
            return <span {...props} />
        }}/>
        <JsonView.KeyName 
          render={({ ...props }, { type, parentValue, value, keyName }) => {
            if (Array.isArray(parentValue) && Number.isFinite( props.children)) {
              return <span />
            }
            return <span {...props} />
          }}
        />
    </JsonView>
  )
}
```

## Default Collapse/Expand

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
export default function Demo() {
  return (
    <JsonView
      value={object}
      collapsed={2}
      shouldExpandNodeInitially={(isExpanded, { value, keys, level }) => {
        if (keys.length > 0 && keys[0] == "object") {
          return true
        }
        return isExpanded
      }}
      style={{
        '--w-rjv-background-color': '#ffffff',
      }}
    >
    </JsonView>
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
    >
      <JsonView.Arrow>
        <TriangleSolidArrow />
      </JsonView.Arrow>
    </JsonView>
  )
}
```

Display of custom **svg** `icon` components

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
    >
      <JsonView.Arrow
        render={({ 'data-expanded': isExpanded, ...props }) => {
          const svgProps = {
            style: {
              cursor: 'pointer', height: '1em', width: '1em', marginRight: 5, userSelect: 'none'
            },
            fill: "var(--w-rjv-arrow-color, currentColor)"
          }
          if (!isExpanded) {
            return (
              <svg viewBox="0 0 24 24" {...svgProps}>
                <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
              </svg>
            );
          }
          return (
            <svg viewBox="0 0 24 24" {...svgProps}>
              <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
            </svg>
          );
        }}
      />
    </JsonView>
  );
}
```

## Props

Migrate from JSON View v1 to v2. The new v2 version has removed the ~~`quotes`~~ and ~~`components`~~ props.

```diff
export interface JsonViewProps<T extends object> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
-  quotes?: "'" | '"' | '';
-  components?: {};
}
```

```ts
export interface JsonViewProps<T extends object> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** This property contains your input JSON */
  value?: T;
  /** Define the root node name. @default undefined */
  keyName?: string | number;
  /** Whether sort keys through `String.prototype.localeCompare()` @default false */
  objectSortKeys?: boolean | ((keyA: string, keyB: string, valueA: T, valueB: T) => number);
  /** Set the indent-width for nested objects @default 15 */
  indentWidth?: number;
  /** When set to `true`, `objects` and `arrays` are labeled with size @default true */
  displayObjectSize?: boolean;
  /** When set to `true`, data type labels prefix values @default true */
  displayDataTypes?: boolean;
  /** The user can copy objects and arrays to clipboard by clicking on the clipboard icon. @default true */
  enableClipboard?: boolean;
  /** When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth. @default false */
  collapsed?: boolean | number;
  /** Determine whether the node should be expanded on the first render, or you can use collapsed to control the level of expansion (by default, the root is expanded). */
  shouldExpandNodeInitially?: (
    isExpanded: boolean,
    props: { value?: T; keys: (number | string)[]; level: number },
  ) => boolean;
  /** Whether to highlight updates. @default true */
  highlightUpdates?: boolean;
  /** Shorten long JSON strings, Set to `0` to disable this feature @default 30 */
  shortenTextAfterLength?: number;
  /** When the text exceeds the length, `...` will be displayed. Currently, this `...` can be customized. @default "..." */
  stringEllipsis?: number;
  /** Callback function for when a treeNode is expanded or collapsed */
  onExpand?: (props: { expand: boolean; value?: T; keyid: string; keyName?: string | number }) => void;
  /** Fires event when you copy */
  onCopied?: (text: string, value?: T) => void;
}
```

```ts
import { BraceLeft } from './symbol/BraceLeft';
import { BraceRight } from './symbol/BraceRight';
import { BracketsLeft } from './symbol/BracketsLeft';
import { BracketsRight } from './symbol/BracketsRight';
import { Arrow } from './symbol/Arrow';
import { Colon } from './symbol/Colon';
import { Quote } from './symbol/Quote';
import { ValueQuote } from './symbol/ValueQuote';

import { Bigint } from './types/Bigint';
import { Date } from './types/Date';
import { False } from './types/False';
import { Float } from './types/Float';
import { Int } from './types/Int';
import { Map } from './types/Map';
import { Nan } from './types/Nan';
import { Null } from './types/Null';
import { Set } from './types/Set';
import { StringText } from './types/String';
import { True } from './types/True';
import { Undefined } from './types/Undefined';
import { Url } from './types/Url';

import { Copied } from './section/Copied';
import { CountInfo } from './section/CountInfo';
import { CountInfoExtra } from './section/CountInfoExtra';
import { Ellipsis } from './section/Ellipsis';
import { KeyName } from './section/KeyName';
import { Row } from './section/Row';

type JsonViewComponent = React.FC<React.PropsWithRef<JsonViewProps<object>>> & {
  BraceLeft: typeof BraceLeft;
  BraceRight: typeof BraceRight;
  BracketsLeft: typeof BracketsLeft;
  BracketsRight: typeof BracketsRight;
  Arrow: typeof Arrow;
  Colon: typeof Colon;
  Quote: typeof Quote;
  ValueQuote: typeof ValueQuote;

  Bigint: typeof Bigint;
  Date: typeof Date;
  False: typeof False;
  Float: typeof Float;
  Int: typeof Int;
  Map: typeof Map;
  Nan: typeof Nan;
  Null: typeof Null;
  Set: typeof Set;
  String: typeof StringText;
  True: typeof True;
  Undefined: typeof Undefined;
  Url: typeof Url;

  Copied: typeof Copied;
  CountInfo: typeof CountInfo;
  CountInfoExtra: typeof CountInfoExtra;
  Ellipsis: typeof Ellipsis;
  KeyName: typeof KeyName;
  Row: typeof Row;
};
declare const JsonView: JsonViewComponent;
export default JsonView;
```

## Size and dependencies

Here is the size benchmark (using [bundlephobia.com](https://bundlephobia.com)) against similar React libraries (found by [`npmjs.com/search`](https://www.npmjs.com/search?q=react%20json&ranking=popularity)):

| Library | Bundle size (gzip) | Deps | Last commit | Download | Editable | Demo |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| **[@uiw/react-json-view](https://github.com/uiwjs/react-json-view)** | [![](https://img.shields.io/bundlephobia/min/@uiw/react-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view) [![](https://img.shields.io/bundlephobia/minzip/@uiw/react-json-view?color=6ead0a&label=gzip)](https://bundlephobia.com/result?p=@uiw/react-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/%40uiw%2Freact-json-view?color=6ead0a&label=)](https://bundlephobia.com/result?p=@uiw/react-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/uiwjs/react-json-view?style=flat&label=)](https://github.com/uiwjs/react-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-json-view.svg?style=flat&label=)](https://www.npmjs.com/package/@uiw/react-json-view) | ✅ | [demo](https://uiwjs.github.io/react-json-view/) |
| [react-json-view-lite](https://github.com/anyroad/react-json-view-lite) | [![](https://img.shields.io/bundlephobia/min/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite) [![](https://img.shields.io/bundlephobia/minzip/react-json-view-lite?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-view-lite) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view-lite?color=red&label=)](https://bundlephobia.com/result?p=react-json-view-lite) | [![GitHub last commit](https://img.shields.io/github/last-commit/AnyRoad/react-json-view-lite?style=flat&label=)](https://github.com/AnyRoad/react-json-view-lite/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-view-lite.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-view-lite) | ❌ | [demo](https://anyroad.github.io/react-json-view-lite/) |
| [react-json-pretty](https://github.com/chenckang/react-json-pretty) | [![](https://img.shields.io/bundlephobia/min/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty) [![](https://img.shields.io/bundlephobia/minzip/react-json-pretty?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-pretty) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-pretty?color=red&label=)](https://bundlephobia.com/result?p=react-json-pretty) | [![GitHub last commit](https://img.shields.io/github/last-commit/chenckang/react-json-pretty?style=flat&label=)](https://github.com/chenckang/react-json-pretty/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-pretty.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-pretty) | ❌ | - |
| [~~react-json-inspector~~](https://github.com/Lapple/react-json-inspector) | [![](https://img.shields.io/bundlephobia/min/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector) [![](https://img.shields.io/bundlephobia/minzip/react-json-inspector?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-inspector) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-json-inspector) | [![GitHub last commit](https://img.shields.io/github/last-commit/Lapple/react-json-inspector?style=flat&label=)](https://github.com/Lapple/react-json-inspector/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-inspector.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-inspector) | ❌ | [demo](https://lapple.github.io/react-json-inspector/)
| [react-json-tree](https://github.com/reduxjs/redux-devtools/tree/main/packages/react-json-tree) | [![](https://img.shields.io/bundlephobia/min/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree) [![](https://img.shields.io/bundlephobia/minzip/react-json-tree?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-tree) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-json-tree) | [![GitHub last commit](https://img.shields.io/github/last-commit/reduxjs/redux-devtools?style=flat&label=)](https://github.com/reduxjs/redux-devtools/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-tree.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-tree) | ❌ |
| ~~[react-json-view](https://github.com/mac-s-g/react-json-view)~~ | [![](https://img.shields.io/bundlephobia/min/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=react-json-view) [![](https://img.shields.io/bundlephobia/minzip/react-json-view?color=red&label=gzip)](https://bundlephobia.com/result?p=react-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/react-json-view?color=red&label=&t=123)](https://bundlephobia.com/result?p=react-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/mac-s-g/react-json-view?style=flat&label=)](https://github.com/mac-s-g/react-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-json-view.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-json-view) | ✅ | [demo](https://mac-s-g.github.io/react-json-view/demo/dist/) |
| [react-inspector](https://github.com/storybookjs/react-inspector) | [![](https://img.shields.io/bundlephobia/min/react-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-inspector) [![](https://img.shields.io/bundlephobia/minzip/react-inspector?color=red&label=gzip)](https://bundlephobia.com/result?p=react-inspector) | [![](https://badgen.net/bundlephobia/dependency-count/react-inspector?color=red&label=)](https://bundlephobia.com/result?p=react-inspector) | [![GitHub last commit](https://img.shields.io/github/last-commit/storybookjs/react-inspector?style=flat&label=)](https://github.com/storybookjs/react-inspector/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-inspector.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-inspector) | ❌ | [demo](https://react-inspector.netlify.app/) |
| [react-domify](https://github.com/JedWatson/react-domify) | [![](https://img.shields.io/bundlephobia/min/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify) [![](https://img.shields.io/bundlephobia/minzip/react-domify?color=red&label=gzip)](https://bundlephobia.com/result?p=react-domify) | [![](https://badgen.net/bundlephobia/dependency-count/react-domify?color=red&label=)](https://bundlephobia.com/result?p=react-domify) | [![GitHub last commit](https://img.shields.io/github/last-commit/JedWatson/react-domify?style=flat&label=)](https://github.com/JedWatson/react-domify/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-domify.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-domify) | ❌ | [demo](https://jedwatson.github.io/react-domify/) |
| [react18-json-view](https://github.com/YYsuni/react18-json-view) | [![](https://img.shields.io/bundlephobia/min/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view) [![](https://img.shields.io/bundlephobia/minzip/react18-json-view?color=red&label=gzip)](https://bundlephobia.com/result?p=react18-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/react18-json-view?color=red&label=)](https://bundlephobia.com/result?p=react18-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/YYsuni/react18-json-view?style=flat&label=)](https://github.com/YYsuni/react18-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react18-json-view.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react18-json-view) | ❌ | [demo](https://jv.yysuni.com/) |
| [@textea/json-viewer](https://github.com/TexteaInc/json-viewer) | [![](https://img.shields.io/bundlephobia/min/@textea/json-viewer?color=red&label=)](https://bundlephobia.com/result?p=@textea/json-viewer) [![](https://img.shields.io/bundlephobia/minzip/@textea/json-viewer?color=red&label=gzip)](https://bundlephobia.com/result?p=@textea/json-viewer) | [![](https://badgen.net/bundlephobia/dependency-count/%40textea%2Fjson-viewer?color=red&label=&t=vvv12213)](https://bundlephobia.com/result?p=@textea/json-viewer) | [![GitHub last commit](https://img.shields.io/github/last-commit/TexteaInc/json-viewer?style=flat&label=)](https://github.com/TexteaInc/json-viewer/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/@textea/json-viewer.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/@textea/json-viewer) | ✅ | [demo](https://stackblitz.com/edit/textea-json-viewer-v3-b4wgxq) |
| [react-editable-json-tree](https://github.com/oxyno-zeta/react-editable-json-tree) | [![](https://img.shields.io/bundlephobia/min/react-editable-json-tree?color=red&label=)](https://bundlephobia.com/result?p=react-editable-json-tree) [![](https://img.shields.io/bundlephobia/minzip/react-editable-json-tree?color=red&label=gzip)](https://bundlephobia.com/result?p=react-editable-json-tree) | [![](https://badgen.net/bundlephobia/dependency-count/%40textea%2Fjson-viewer?color=red&label=&t=vvv12213)](https://bundlephobia.com/result?p=react-editable-json-tree) | [![GitHub last commit](https://img.shields.io/github/last-commit/oxyno-zeta/react-editable-json-tree?style=flat&label=)](https://github.com/oxyno-zeta/react-editable-json-tree/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/react-editable-json-tree.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/react-editable-json-tree) | ✅ | [demo](https://oxyno-zeta.github.io/react-editable-json-tree/) |
| [react-json-view](https://github.com/HuolalaTech/react-json-view) | [![](https://img.shields.io/bundlephobia/min/@huolala-tech/react-json-view?color=red&label=)](https://bundlephobia.com/result?p=@huolala-tech/react-json-view) [![](https://img.shields.io/bundlephobia/minzip/@huolala-tech/react-json-view?color=red&label=gzip)](https://bundlephobia.com/result?p=@huolala-tech/react-json-view) | [![](https://badgen.net/bundlephobia/dependency-count/%40textea%2Fjson-viewer?color=red&label=&t=vvv12213)](https://bundlephobia.com/result?p=@huolala-tech/react-json-view) | [![GitHub last commit](https://img.shields.io/github/last-commit/TexteaInc/json-viewer?style=flat&label=)](https://github.com/HuolalaTech/react-json-view/commits) | [![NPM Downloads](https://img.shields.io/npm/dm/@huolala-tech/react-json-view.svg?style=flat&color=747474&label=)](https://www.npmjs.com/package/@huolala-tech/react-json-view) | ❌ | [demo](https://huolalatech.github.io/react-json-view/) |

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

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
