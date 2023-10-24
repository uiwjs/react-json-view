import React, { useReducer } from 'react';
// import { styled } from 'styled-components';
import JsonViewEditor, { JsonViewEditorProps } from '@uiw/react-json-view/editor';
import { themesData } from './default';

export const example = {
  string: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
  // integer: 42,
  // float: 114.514,
  // bigint: BigInt(10086),
  // nan: NaN,
  // null: null,
  // undefined,
  // boolean: true,
  // timer: 0,
  array: [19, 100.86, 'test', NaN, Infinity],
  object2: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
};
const initialState: Partial<
  JsonViewEditorProps<object> & {
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
export default function Demo() {
  const [state] = useReducer(reducer, initialState);
  return (
    <JsonViewEditor
      value={example}
      keyName="root"
      onEdit={({ value }) => {
        console.log(':value:', value);
      }}
      style={{ ...themesData[state.theme!], padding: 6, borderRadius: 6 }}
    />
  );
}
