import * as React from 'react';
import { useSelector } from 'react-redux';
import { OverallState } from 'src/commons/application/ApplicationTypes';
import { mockAchievements, mockGoals } from 'src/commons/mocks/AchievementMocks';
import { saveData } from 'src/features/game/save/GameSaveRequests';
import { FullSaveState } from 'src/features/game/save/GameSaveTypes';
import SourceAcademyGame, {
  AccountInfo,
  createSourceAcademyGame
} from 'src/features/game/SourceAcademyGame';

function Game() {
  const session = useSelector((state: OverallState) => state.session);

  // TODO: Replace with actual achievements and goals
  // const achievements = useSelector((state: OverallState) => state.achievement.achievements);
  // const goals = useSelector((state: OverallState) => state.achievement.goals);
  const achievements = mockAchievements;
  const goals = mockGoals;

  const [isTestStudent, setIsTestStudent] = React.useState(false);
  const [isUsingMock, setIsUsingMock] = React.useState(false);

  React.useEffect(() => {
    const game = createSourceAcademyGame();
    return () => {
      game.isMounted = false;
      game.stopAllSounds();
      game.destroy(true);
    };
  }, []);

  React.useEffect(() => {
    SourceAcademyGame.getInstance().setAccountInfo(session as AccountInfo);
    SourceAcademyGame.getInstance().setAchievements(achievements);
    SourceAcademyGame.getInstance().setGoals(goals);

    if (process.env.NODE_ENV === 'development') {
      setIsTestStudent(true);
      setIsUsingMock(true);
      SourceAcademyGame.getInstance().toggleUsingMock();
    }
  }, [achievements, goals, session]);

  return (
    <>
      <div id="game-display"></div>
      {isTestStudent && (
        <div className="Horizontal">
          <button
            onClick={async () => {
              await saveData({} as FullSaveState);
              alert('Game cleared! Please refresh');
            }}
          >
            Clear data
          </button>
          <button
            onClick={() => {
              setIsUsingMock(!isUsingMock);
              SourceAcademyGame.getInstance().toggleUsingMock();
            }}
          >
            {isUsingMock ? 'Use Game Chapters' : 'Use Mock Chapters'}
          </button>
        </div>
      )}
    </>
  );
}

export default Game;
