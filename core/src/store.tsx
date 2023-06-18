import { useSyncExternalStore } from 'react';

let expands: Record<string, boolean> = {};
let listeners: Function[] = [];

export const store = {
  collapse(id: string) {
    expands = { ...expands, [id]: false };
    emitChange();
  },
  expand(id: string) {
    expands = { ...expands, [id]: true };
    emitChange();
  },
};

function getSnapshot() {
  return expands;
}

function subscribe(listener: Function) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export function useExpandsStatus() {
  const expands = useSyncExternalStore(subscribe, getSnapshot);
  return expands;
}
