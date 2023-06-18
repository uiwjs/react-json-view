import { Fragment, useState } from 'react';
import { styled } from 'styled-components';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';

const themesData = {
  dark: darkTheme,
  light: lightTheme,
};

const avatar = 'https://i.imgur.com/1bX5QH6.jpg';
// const longArray = new Array(1000).fill(1);
function aPlusB(a: number, b: number) {
  return a + b;
}
const example = {
  avatar,
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  // @ts-ignore
  bigint: 10086n,
  null: null,
  undefined,
  boolean: true,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  array: [19, 100.86, 'test', NaN, Infinity],
  nestedArray: [
    [1, 2],
    [3, 4],
  ],
  object3: {},
  object2: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  fn: aPlusB,
  // longArray,
  string_number: '1234',
  string_empty: '',
};

const Label = styled.label`
  margin-top: 0.83rem;
  display: block;
  span {
    padding-right: 6px;
  }
`;

export function Example() {
  const [indentWidth, setIndentWidth] = useState(15);
  const [theme, setTheme] = useState<React.CSSProperties>(lightTheme as React.CSSProperties);
  const [displayDataTypes, setDisplayDataTypes] = useState(true);
  const [displayObjectSize, setDisplayObjectSize] = useState(true);
  return (
    <Fragment>
      <JsonView
        value={example}
        indentWidth={indentWidth}
        displayObjectSize={displayObjectSize}
        displayDataTypes={displayDataTypes}
        style={theme}
      />
      <Label>
        <span>Theme:</span>
        <select
          onChange={(evn) => setTheme(themesData[evn.target.value as keyof typeof themesData] as React.CSSProperties)}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </Label>
      <Label>
        <span>Indent:</span>
        <input type="number" value={indentWidth} onChange={(evn) => setIndentWidth(Number(evn.target.value))} />
      </Label>
      <Label>
        <span>Display Data Types:</span>
        <input type="checkbox" checked={displayDataTypes} onChange={(evn) => setDisplayDataTypes(evn.target.checked)} />
      </Label>
      <Label>
        <span>Display Object Size:</span>
        <input
          type="checkbox"
          checked={displayObjectSize}
          onChange={(evn) => setDisplayObjectSize(evn.target.checked)}
        />
      </Label>
    </Fragment>
  );
}
