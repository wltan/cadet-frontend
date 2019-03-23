import { generate } from 'astring';
import * as es from 'estree';
import * as React from 'react';

export class SubstTimeline extends React.PureComponent<ISubstTimelineProps, ISubstTimelineState> {

  private trees? : es.Program[];

  constructor(props : ISubstTimelineProps) {
    super(props);
    this.trees = props.trees;
    this.sliderChanged = this.sliderChanged.bind(this);
    this.state = {value: 0};
  }

  public render() {
    return (
      <div>
        <div>
          {this.trees
            ? this.generateFromTree(this.trees[this.state.value]) // this.state.value
            : "Start writing some code on the left, then drag the slider below to see it's evaluation."
          }
        </div>
        <input type="range" min="0" max="100" defaultValue="0" onChange={this.sliderChanged}/>
      </div>
    );
  }

  private sliderChanged() {

    
  }

  private generateFromTree(tree : es.Program) : string {
    return generate(tree);
  }
}

interface ISubstTimelineState {
  value : number;
}

export interface ISubstTimelineProps {
  trees? : es.Program[]; // todo
}

export default SubstTimeline;
