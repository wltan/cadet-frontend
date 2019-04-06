import { generate } from 'astring';
import * as es from 'estree';
import { Context } from 'js-slang/dist/types';
import * as React from 'react';

export class SubstTimeline extends React.PureComponent<ISubstTimelineProps, ISubstTimelineState> {

  private trees? : Array<[es.Node, Context]>;
  private mounted = false;
  private $parent: HTMLElement | null;

  constructor(props : ISubstTimelineProps) {
    super(props);
    this.trees = props.trees;
    this.sliderChanged = this.sliderChanged.bind(this);
    this.updateTrees = this.updateTrees.bind(this);
  }

  public componentDidMount() {
    this.mounted = true;
    if (this.$parent) {
      (window as any).SubstTimeline.init(this.$parent);
    }
  }

  public render() {

    const value = (this.state && this.state.value) ? this.state.value : 0;

    return (
      <div>
        <div>
          {this.trees
            ? this.generateFromTree(this.trees[value][0])
            : "Start writing some code on the left, then drag the slider below to see it's evaluation."
          }
        </div>
        <input id="substSlider" type="range" min="0" max={this.trees? this.trees.length-1 : 0} defaultValue="0" onChange={this.sliderChanged}/>
      </div>
    );
  }


  public updateTrees(newTrees : Array<[es.Node, Context]>){
    
    this.trees = newTrees;
    
    if (this.mounted) {
      this.trees = newTrees;
      this.setState({trees: this.trees});
    }
    else {
      alert("unmounted");
    }
  }

  private sliderChanged(event : React.ChangeEvent<HTMLInputElement>) {

    const sliderValue = parseInt(event.target.value, 10);
    this.setState({value: sliderValue, trees: this.state.trees});
  }

  private generateFromTree(tree : es.Node) : string {
    return generate(tree);
  }
}

export interface ISubstTimelineState {
  value : number;
  trees : Array<[es.Node, Context]>;
}

export interface ISubstTimelineProps {
  trees? : Array<[es.Node, Context]>; 
}

export default SubstTimeline;
