import AceEditor from 'react-ace';

// Ref: https://github.com/ajaxorg/ace/blob/6933ab5202ca90b07b1d58a6b016c70f13d310eb/lib/ace/mouse/mouse_event.js#L40
export interface AceMouseEvent {
  domEvent: React.MouseEvent<HTMLDivElement>;
  editor: AceEditor["editor"]; // apparently this gets the type o.o
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  $pos: any;
  $inSelection: any;
  propagationStopped: boolean;
  defaultPrevented: any;

  // methods:
  stopPropagation: () => void;
  preventDefault: () => void;
  stop: () => void;
  getDocumentPosition: () => { row: number; column: number };
  inSelection: () => boolean; // Determines if the mouse position is selected.
  getButton: () => number; // 0 for leftmouse, 1 for middlemouse, 2 for rightmouse
}
