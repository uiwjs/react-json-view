import { FC, PropsWithChildren, createContext, useContext, useReducer } from 'react';

type InitialState = {
  /**
   * When a callback function is passed in, edit functionality is enabled. The callback is invoked before edits are completed.
   * @returns {boolean}  Returning false from onEdit will prevent the change from being made.
   */
  onEdit?: (option: {
    value: unknown;
    oldValue: unknown;
    keyName?: string | number;
    parentName?: string | number;
    type?: 'value' | 'key';
  }) => boolean;
};
type Dispatch = React.Dispatch<InitialState>;

const initialState: InitialState = {};
export const Context = createContext<InitialState>(initialState);

const reducer = (state: InitialState, action: InitialState) => ({
  ...state,
  ...action,
});

export const Dispatch = createContext<Dispatch>(() => {});
Dispatch.displayName = 'JVR.Editor.Dispatch';

export const useStore = () => {
  return useContext(Context);
};

export function useStoreReducer(initialState: InitialState) {
  return useReducer(reducer, initialState);
}
