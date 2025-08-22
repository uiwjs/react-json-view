import { useReducer } from 'react';
import JsonViewEditor from '@uiw/react-json-view/editor';
import { example, initialState, Label, Options, themesData } from './default';

const reducer = (state: typeof initialState, action: typeof initialState) => ({ ...state, ...action });
export function ExampleEditor() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const themeKeys = Object.keys(themesData) as Array<keyof typeof themesData>;

  return (
    <>
      <JsonViewEditor
        value={example}
        onEdit={({ value }) => {
          console.log(':value:', value);
        }}
        style={{ ...themesData[state.theme!], padding: 6, borderRadius: 6 }}
        displayObjectSize={state.displayObjectSize}
        displayDataTypes={state.displayDataTypes}
        enableClipboard={state.enableClipboard}
        highlightUpdates={state.highlightUpdates}
        indentWidth={state.indentWidth}
        shortenTextAfterLength={state.shortenTextAfterLength}
        collapsed={state.collapsed}
        objectSortKeys={state.objectSortKeys} >


      </JsonViewEditor>
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
      </Options>
    </>
  );
}
