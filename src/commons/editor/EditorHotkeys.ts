// The exec command:
// can either be a: a string, or a function.

import { EditorHooks } from './Editor';

// User facing KeyBinding to prevent infinite typescript loops
export interface KeyBinding {
  name: keyof Required<NonNullable<EditorHooks['hotkeys']>>;
  bindKey: { win: string; mac: string };
}

export const defaultKeyBindings: KeyBinding[] = [
  {
    name: 'evaluate',
    bindKey: {
      win: 'Shift-Enter',
      mac: 'Shift-Enter'
    }
  },
  // {
  //   name: 'navigate',
  //   bindKey: {
  //     win: 'Ctrl-B',
  //     mac: 'Command-B'
  //   },
  //   exec: 'handleNavigate'
  // },
  // {
  //   name: 'refactor',
  //   bindKey: {
  //     win: 'Ctrl-M',
  //     mac: 'Command-M'
  //   },
  //   exec: 'handleRefactor'
  // },
  {
    name: 'highlightScope',
    bindKey: {
      win: 'Ctrl-Shift-H',
      mac: 'Command-Shift-H'
    }
  }
  // {
  //   name: 'TypeInferenceDisplay',
  //   bindKey: {
  //     win: 'Ctrl-Shift-M',
  //     mac: 'Command-Shift-M'
  //   },
  //   exec: 'handleTypeInferenceDisplay'
  // }
];
