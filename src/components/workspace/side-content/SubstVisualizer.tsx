import * as React from 'react';
import { SubstTimeline } from './../../SubstTimeline';

class SubstVisualizer extends React.Component<{}, {}> {
  // private $parent: HTMLElement | null;
/*
  public componentDidMount() {
    if (this.$parent) {
      (window as any).ListVisualizer.init(this.$parent);
    }
  }*/

  public render() {
    // return <div ref={r => (this.$parent = r)} className="sa-subst-visualizer" />;
    return <SubstTimeline />;
  }
}

export default SubstVisualizer;
