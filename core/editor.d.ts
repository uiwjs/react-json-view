/// <reference types="react" />

declare module '@uiw/react-json-view/editor' {
  import { JsonViewProps } from '@uiw/react-json-view';
  // import type { CountInfoExtraProps } from '@uiw/react-json-view/cjs/editor/countInfoExtra';
  type Option = {
    value: string;
    prevValue: string;
    keyName: string | number;
  };

  export interface JsonViewEditorProps<T extends object> extends JsonViewProps<T> {
    /** Callback when value edit functionality */
    onEdit?: (option: {
      value: unknown;
      oldValue: unknown;
      keyName?: string | number;
      parentName?: string | number;
      type?: 'value' | 'key';
    }) => void;
    // /**
    //  * When a callback function is passed in, add functionality is enabled. The callback is invoked before additions are completed.
    //  * @returns {boolean} Returning false from onAdd will prevent the change from being made.
    //  */
    // onAdd?: CountInfoExtraProps<T>['onAdd'];
    // /**
    //  * When a callback function is passed in, delete functionality is enabled. The callback is invoked before deletions are completed.
    //  * @returns Returning false from onDelete will prevent the change from being made.
    //  */
    // onDelete?: CountInfoExtraProps<T>['onDelete'];
    /** Whether enable edit feature. @default true */
    editable?: boolean;
  }
  const JsonViewEditor: import('react').ForwardRefExoticComponent<
    Omit<JsonViewEditorProps<object>, 'ref'> & import('react').RefAttributes<HTMLDivElement>
  >;
  export default JsonViewEditor;
}
