import { Fragment, useState, useReducer, useEffect } from 'react';
import JsonView, { JsonViewProps } from '@uiw/react-json-view';
import { styled } from 'styled-components';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import { nordTheme } from '@uiw/react-json-view/nord';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { gruvboxTheme } from '@uiw/react-json-view/gruvbox';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { basicTheme } from '@uiw/react-json-view/basic';

export const themesData = {
  nord: nordTheme,
  light: lightTheme,
  dark: darkTheme,
  basic: basicTheme,
  vscode: vscodeTheme,
  githubLight: githubLightTheme,
  githubDark: githubDarkTheme,
  gruvbox: gruvboxTheme,
  monokai: monokaiTheme,
};
const mySet = new Set();
mySet.add(1); // Set(1) { 1 }
mySet.add(5); // Set(2) { 1, 5 }
mySet.add(5); // Set(2) { 1, 5 }
mySet.add('some text'); // Set(3) { 1, 5, 'some text' }

const myMap = new Map();
myMap.set('www', 'foo');
myMap.set(1, 'bar');

const avatar = 'https://i.imgur.com/1bX5QH6.jpg';
// const longArray = new Array(1000).fill(1);
function aPlusB(a: number, b: number) {
  return a + b;
}
export const example = {
  avatar,
  string: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
  integer: 42,
  float: 114.514,
  bigint: BigInt(10086),
  nan: NaN,
  null: null,
  undefined,
  boolean: true,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  array: [19, 100.86, 'test', NaN, Infinity],
  emptyArray: [],
  nestedArray: [[1, 2], [3, 4], { a: 1 }],
  object3: {},
  object2: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  url: new URL('https://wangchujiang.com/'),
  fn: aPlusB,
  // // longArray,
  string_number: '1234',
  string_empty: '',
  mySet,
  myMap,
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

const initialState: Partial<
  JsonViewProps<object> & {
    quote: string;
    theme: keyof typeof themesData;
  }
> = {
  displayObjectSize: true,
  displayDataTypes: true,
  enableClipboard: true,
  highlightUpdates: true,
  objectSortKeys: false,
  indentWidth: 15,
  collapsed: 2,
  quote: '"',
  shortenTextAfterLength: 50,
  theme: 'nord',
};

const reducer = (state: typeof initialState, action: typeof initialState) => ({ ...state, ...action });

export function Example() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [src, setSrc] = useState({ ...example });
  const themeKeys = Object.keys(themesData) as Array<keyof typeof themesData>;

  useEffect(() => {
    const loop = () => {
      setSrc((src) => ({
        ...src,
        timer: src.timer + 1,
      }));
    };
    const id = setInterval(loop, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Fragment>
      <JsonView
        value={src}
        style={{ ...themesData[state.theme!], padding: 6, borderRadius: 6 }}
        displayObjectSize={state.displayObjectSize}
        displayDataTypes={state.displayDataTypes}
        enableClipboard={state.enableClipboard}
        highlightUpdates={state.highlightUpdates}
        indentWidth={state.indentWidth}
        shortenTextAfterLength={state.shortenTextAfterLength}
        collapsed={state.collapsed}
        objectSortKeys={state.objectSortKeys}
      >
        <JsonView.KeyName
          render={(props, { value, keyName }) => {
            if (keyName === 'integer' && typeof value === 'number' && value > 10) {
              return <del {...props}>{keyName}</del>;
            }
          }}
        />
        <JsonView.Quote>{state.quote}</JsonView.Quote>
        <JsonView.ValueQuote
          render={(props) => {
            if (!state.quote?.trim()) return <span />;
            return <span {...props}>{state.quote}</span>;
          }}
        />
      </JsonView>
      <Options>
        <Label>
          <span>Theme:</span>
          <select onChange={(evn) => dispatch({ theme: evn.target.value as keyof typeof themesData })}>
            {themeKeys.map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
        </Label>
        <Label>
          <span>Collapsed:</span>
          <select
            value={state.collapsed?.toString()}
            onChange={({ target: { value } }) => {
              const val = value === 'false' ? false : value === 'true' ? true : Number(value);
              dispatch({ collapsed: val });
            }}
          >
            <option value="false">false</option>
            <option value="true">true</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </Label>
        <Label>
          <span>Indent:</span>
          <input
            type="number"
            value={state.indentWidth}
            onChange={(evn) =>
              dispatch({
                indentWidth: Number(evn.target.value),
              })
            }
          />
        </Label>
        <Label>
          <span>Quotes:</span>
          <select
            value={state.quote}
            onChange={(evn) =>
              dispatch({
                quote: evn.target.value,
              })
            }
          >
            <option value=" ">enable quotes</option>
            <option value={`"`}>" double quotes</option>
            <option value={`'`}>' single quotes</option>
          </select>
        </Label>
        <Label>
          <span>Enable Clipboard:</span>
          <input
            type="checkbox"
            checked={state.enableClipboard}
            onChange={(evn) =>
              dispatch({
                enableClipboard: evn.target.checked,
              })
            }
          />
        </Label>
        <Label>
          <span>Display Data Types:</span>
          <input
            type="checkbox"
            checked={state.displayDataTypes}
            onChange={(evn) =>
              dispatch({
                displayDataTypes: evn.target.checked,
              })
            }
          />
        </Label>
        <Label>
          <span>Display Object Size:</span>
          <input
            type="checkbox"
            checked={state.displayObjectSize}
            onChange={(evn) =>
              dispatch({
                displayObjectSize: evn.target.checked,
              })
            }
          />
        </Label>
        <Label>
          <span>Display Highlight Updates:</span>
          <input
            type="checkbox"
            checked={state.highlightUpdates}
            onChange={(evn) =>
              dispatch({
                highlightUpdates: evn.target.checked,
              })
            }
          />
        </Label>
        <Label>
          <span>Sort Keys Through:</span>
          <input
            type="checkbox"
            checked={state.objectSortKeys as boolean}
            onChange={(evn) =>
              dispatch({
                objectSortKeys: evn.target.checked,
              })
            }
          />
        </Label>
        <Label>
          <div>Shorten Text After Length({state.shortenTextAfterLength})</div>
          <input
            type="range"
            value={state.shortenTextAfterLength}
            onChange={(evn) =>
              dispatch({
                shortenTextAfterLength: Number(evn.target.value),
              })
            }
          />
        </Label>
      </Options>
    </Fragment>
  );
}
