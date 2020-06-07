// The exec command:
// can either be a: a string, or a function.

export const defaultKeyBindings = [
  {
    name: 'evaluate',
    bindKey: {
      win: 'Shift-Enter',
      mac: 'Shift-Enter'
    },
    exec: 'handleEditorEval'
  },
  {
    name: 'navigate',
    bindKey: {
      win: 'Ctrl-B',
      mac: 'Command-B'
    },
    exec: 'handleNavigate'
  },
  {
    name: 'refactor',
    bindKey: {
      win: 'Ctrl-M',
      mac: 'Command-M'
    },
    exec: 'handleRefactor'
  },
  {
    name: 'highlightScope',
    bindKey: {
      win: 'Ctrl-Shift-H',
      mac: 'Command-Shift-H'
    },
    exec: 'handleHighlightScope'
  },
  {
    name: 'TypeInferenceDisplay',
    bindKey: {
      win: 'Ctrl-Shift-M',
      mac: 'Command-Shift-M'
    },
    exec: 'handleTypeInferenceDisplay'
  }
];
