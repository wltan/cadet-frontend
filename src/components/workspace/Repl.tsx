import { Card } from '@blueprintjs/core';
import { parseError } from 'js-slang';
import { stringify } from 'js-slang/dist/interop';
import * as React from 'react';
import { HotKeys } from 'react-hotkeys';

import { InterpreterOutput } from '../../reducers/states';
import CanvasOutput from './CanvasOutput';
import ReplInput, { IReplInputProps } from './ReplInput';

export interface IReplProps {
  output: InterpreterOutput[];
  replValue: string;
  handleBrowseHistoryDown: () => void;
  handleBrowseHistoryUp: () => void;
  handleReplEval: () => void;
  handleReplValueChange: (newCode: string) => void;
  substVisualizer?: any;
}

export interface IOutputProps {
  output: InterpreterOutput;
  substVisualizer?: any;
}

class Repl extends React.PureComponent<IReplProps, {}> {

  public constructor(props : IReplProps) {
    super(props);
  }

  public render() {
    const cards = this.props.output.map((slice, index) => <Output output={slice} key={index} />);
    const inputProps: IReplInputProps = this.props as IReplInputProps;
    return (
      <div className="Repl">
        <div className="repl-output-parent">
          {cards}
          <HotKeys className="repl-input-parent row pt-card pt-elevation-0" handlers={handlers}>
            <ReplInput {...inputProps} />
          </HotKeys>
        </div>
      </div>
    );
  }
}

export const Output: React.SFC<IOutputProps> = props => {
  switch (props.output.type) {
    case 'code':
      return (
        <Card>
          <pre className="codeOutput">{props.output.value}</pre>
        </Card>
      );
    case 'running':
      return (
        <Card>
          <pre className="logOutput">{props.output.consoleLogs.join('\n')}</pre>
        </Card>
      );
    case 'result':
        if (props.output.value instanceof Array) {
          
          const theSubstTimeline = (window as any).SubstTimeline;

          if (theSubstTimeline) {
            theSubstTimeline.updateTrees(props.output.value);
          }

          return (
            <Card>
              {theSubstTimeline? theSubstTimeline.getFinalValue() : ""}
            </Card>
          );
        }
        else if (props.output.consoleLogs.length === 0) {
          return (
            <Card>
              {props.output.value}
              <pre className="resultOutput">{renderResult(props.output.value)}</pre>
            </Card>
          );
        }
        else {
          return (
            <Card>
              <pre className="logOutput">{props.output.consoleLogs.join('\n')}</pre>
              <pre className="resultOutput">{renderResult(props.output.value)}</pre>
            </Card>
          );
    }



    case 'errors':
      if (props.output.consoleLogs.length === 0) {
        return (
          <Card>
            <pre className="errorOutput">{parseError(props.output.errors)}</pre>
          </Card>
        );
      } else {
        return (
          <Card>
            <pre className="logOutput">{props.output.consoleLogs.join('\n')}</pre>
            <br />
            <pre className="errorOutput">{parseError(props.output.errors)}</pre>
          </Card>
        );
      }
    default:
      return <Card>''</Card>;
  }
};

const renderResult = (value: any) => {
  /** A class which is the output of the show() function */
  const ShapeDrawn = (window as any).ShapeDrawn;
  if (typeof ShapeDrawn !== 'undefined' && value instanceof ShapeDrawn) {
    return <CanvasOutput />;
  } else {
    return stringify(value);
  }
};

/* Override handler, so does not trigger when focus is in editor */
const handlers = {
  goGreen: () => {}
};

export default Repl;
