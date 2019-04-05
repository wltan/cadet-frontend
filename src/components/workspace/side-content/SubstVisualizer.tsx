// import { parse } from 'acorn'; // remove this
import { Node } from 'estree';  // remove this
import { Context } from 'js-slang';
import * as React from 'react';
import { ISubstTimelineProps, ISubstTimelineState, SubstTimeline } from './../../SubstTimeline';

class SubstVisualizer extends React.Component<ISubstTimelineProps, ISubstTimelineState> {

  // private tre : Program[]; // remove this
  private timeline : SubstTimeline | null;
  private $parent: HTMLElement | null;

  constructor(props : ISubstTimelineProps) {
    super(props);

    // const n = parse("function f(x) {return x + 1;} f(5);");

    // this.tre = [(n as any) as Program, (n as any) as Program];

    // this.state = {trees: undefined};
  }

  public componentDidMount() {
    if (this.$parent) {
      (window as any).SubstVisualizer.init(this.$parent);
    }
    if (this.timeline) {
      (window as any).SubstTimeline = this.timeline;
      // (window as any).SubstTimeline.init(this.timeline);
    }
  }

  public updateTrees(newTrees : Array<[Node, Context]>) {
    if (this.timeline) {
      this.timeline.updateTrees(newTrees);
    }
  }

  public render() {
    return <div> <SubstTimeline ref={x => this.timeline = x}/></div>;
  }
}

export default SubstVisualizer;
