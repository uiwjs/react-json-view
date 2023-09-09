import { Fragment, useState, useEffect, useRef } from 'react';
import JsonView, { JsonViewProps, useHighlight, SemicolonProps } from '@uiw/react-json-view';
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
  // @ts-ignore
  bigint: 10086n,
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

const ObjectKey: SemicolonProps['render'] = ({ value, keyName, parentName, ...props }) => {
  const $edit = useRef<HTMLSpanElement & HTMLModElement>(null);
  useHighlight({ value, highlightUpdates: true, highlightContainer: $edit });
  if (keyName === 'integer' && typeof value === 'number' && value > 40) {
    return <del {...props} ref={$edit} />;
  }
  return <span {...props} ref={$edit} />;
};

export function Example() {
  const [indentWidth, setIndentWidth] = useState(15);
  const themeKeys = Object.keys(themesData) as Array<keyof typeof themesData>;
  const [theme, setTheme] = useState<React.CSSProperties>(themesData[themeKeys[0]]);
  const [displayDataTypes, setDisplayDataTypes] = useState(true);
  const [displayObjectSize, setDisplayObjectSize] = useState(true);
  const [highlightUpdates, setHighlightUpdates] = useState(true);
  const [objectSortKeys, setObjectSortKeys] = useState(false);
  const [clipboard, setClipboard] = useState(true);
  const [quotes, setQuotes] = useState<JsonViewProps<object>['quotes']>('"');
  const [collapsed, setCollapsed] = useState<JsonViewProps<object>['collapsed']>(true);

  const [src, setSrc] = useState({ ...example });
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
        indentWidth={indentWidth}
        displayObjectSize={displayObjectSize}
        displayDataTypes={displayDataTypes}
        highlightUpdates={highlightUpdates}
        quotes={quotes}
        objectSortKeys={objectSortKeys}
        enableClipboard={clipboard}
        style={{ ...theme, padding: 6, borderRadius: 6 }}
        collapsed={collapsed}
        components={{
          objectKey: ObjectKey,
        }}
      />
      <Options>
        <Label>
          <span>Theme:</span>
          <select
            onChange={(evn) => setTheme(themesData[evn.target.value as keyof typeof themesData] as React.CSSProperties)}
          >
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
            value={collapsed?.toString()}
            onChange={({ target: { value } }) => {
              const val = value === 'false' ? false : value === 'true' ? true : Number(value);
              setCollapsed(val);
            }}
          >
            <option value="false">false</option>
            <option value="true">true</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </Label>
        <Label>
          <span>Quotes:</span>
          <select
            value={quotes?.toString()}
            onChange={(evn) => setQuotes(evn.target.value as JsonViewProps<object>['quotes'])}
          >
            <option value="">enable quotes</option>
            <option value={`"`}>" double quotes</option>
            <option value={`'`}>' single quotes</option>
          </select>
        </Label>
        <Label>
          <span>Indent:</span>
          <input type="number" value={indentWidth} onChange={(evn) => setIndentWidth(Number(evn.target.value))} />
        </Label>
        <Label>
          <span>Enable Clipboard:</span>
          <input type="checkbox" checked={clipboard} onChange={(evn) => setClipboard(evn.target.checked)} />
        </Label>
        <Label>
          <span>Display Data Types:</span>
          <input
            type="checkbox"
            checked={displayDataTypes}
            onChange={(evn) => setDisplayDataTypes(evn.target.checked)}
          />
        </Label>
        <Label>
          <span>Display Object Size:</span>
          <input
            type="checkbox"
            checked={displayObjectSize}
            onChange={(evn) => setDisplayObjectSize(evn.target.checked)}
          />
        </Label>
        <Label>
          <span>Highlight Updates:</span>
          <input
            type="checkbox"
            checked={highlightUpdates}
            onChange={(evn) => setHighlightUpdates(evn.target.checked)}
          />
        </Label>
        <Label>
          <span>Sort Keys Through:</span>
          <input type="checkbox" checked={objectSortKeys} onChange={(evn) => setObjectSortKeys(evn.target.checked)} />
        </Label>
      </Options>
    </Fragment>
  );
}
