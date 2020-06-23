import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { OverallState } from '../../../commons/application/ApplicationTypes';
import AchievementControl, { DispatchProps, StateProps } from './AchievementControl';
import { getAchievements, editAchievements } from 'src/commons/achievements/AchievementActions';

const mapStateToProps: MapStateToProps<StateProps, {}, OverallState> = state => ({});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch) =>
  bindActionCreators({
    handleAchievementsFetch: getAchievements,
    handleAchievementsUpdate: editAchievements
  }, dispatch);

const AchievementControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementControl);

export default AchievementControlContainer;
