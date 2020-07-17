import { Variant } from 'js-slang/dist/types';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import DashboardContainer from 'src/pages/achievement/dashboard/DashboardContainer';

import NavigationBar from '../navigationBar/NavigationBar';
import { Role } from './ApplicationTypes';
import { ExternalLibraryName } from './types/ExternalTypes';
export type ApplicationProps = DispatchProps & StateProps & RouteComponentProps<{}>;

export type DispatchProps = {
  handleClearContext: (
    chapter: number,
    variant: Variant,
    externalLibraryName: ExternalLibraryName
  ) => void;
  handleEditorValueChange: (val: string) => void;
  handleEditorUpdateBreakpoints: (breakpoints: string[]) => void;
  handleEnsureLibrariesLoaded: () => void;
  handleLogOut: () => void;
  handleExternalLibrarySelect: (external: ExternalLibraryName) => void;
  handleSetExecTime: (execTime: string) => void;
};

export type StateProps = {
  accessToken?: string;
  currentPlaygroundChapter: number;
  currentPlaygroundVariant: Variant;
  role?: Role;
  title: string;
  name?: string;
  currentExternalLibrary: ExternalLibraryName;
};

class Application extends React.Component<ApplicationProps, {}> {
  public render() {
    return (
      <div className="Application">
        <NavigationBar
          handleLogOut={this.props.handleLogOut}
          role={this.props.role}
          name={this.props.name}
          title={this.props.title}
        />
        <div className="Application__main">
          <Switch>
            <Route exact={true} path="/achievement" component={DashboardContainer} />
            <Route render={this.redirectToAchievement} />
          </Switch>
        </div>
      </div>
    );
  }

  private redirectToAchievement = () => <Redirect to="/achievement" />;
}

export default Application;
