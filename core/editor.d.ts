/// <reference types="react" />

declare module '@uiw/react-json-view/editor' {
  import { JsonViewProps } from '@uiw/react-json-view';
  type Option = {
      value: string;
      prevValue: string;
      keyName: string | number;
  };

  export interface JsonViewEditorProps<T extends object> extends JsonViewProps<T> {
    onEdit?: (option: Option) => void;
  }
  const JsonViewEditor: import("react").ForwardRefExoticComponent<Omit<JsonViewEditorProps<object>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
  export default JsonViewEditor;
}
