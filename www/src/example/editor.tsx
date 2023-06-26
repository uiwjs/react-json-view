import { Fragment, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import JsonViewEditor from '@uiw/react-json-view/editor';
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
  emptyArray: [],
  nestedArray: [
    [1, 2],
    [3, 4],
    { a: 1}
  ],
  object3: {},
  object2: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
    a: { b: 1 },
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

const Options = styled.div`
  display: grid;
  grid-template-columns: 50% 60%;
`;

export function ExampleEditor() {
  const [theme, setTheme] = useState<React.CSSProperties>(lightTheme as React.CSSProperties);
  const [src, setSrc] = useState({ ...example });

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
    <Fragment>
      <JsonViewEditor
        value={src}
        onEdit={(opts) => {
          console.log('opts:', opts)
        }}
        style={{ ...theme, padding: 6, borderRadius: 6 }}
        components={{
          objectKey: ({ value, keyName, parentName, ...props}) => {
            if (keyName === 'integer' && typeof value === 'number' && value > 40) {
              return <del {...props} />
            }
            return <span {...props}  />
          }
        }}
      />
      <Options>
        <Label>
          <span>Theme:</span>
          <select
            onChange={(evn) => setTheme(themesData[evn.target.value as keyof typeof themesData] as React.CSSProperties)}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </Label>
      </Options>
    </Fragment>
  );
}
