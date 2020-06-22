import React from 'react';

import { Card } from '@blueprintjs/core';
import { AchievementModalItem } from '../../../../commons/achievements/AchievementTypes';
import AchievementModalDescription from './modal/AchievementModalDescription';
import AchievementModalGoal from './modal/AchievementModalGoal';
import AchievementModalCompletion from './modal/AchievementModalCompletion';
import AchievementExp from './utils/AchievementExp';

type AchievementModalProps = {
  modalID: number;
  achievementModalDict: { [id: number]: AchievementModalItem };
};

function AchievementModal(props: AchievementModalProps) {
  const { modalID, achievementModalDict } = props;

  const modal = achievementModalDict[modalID];
  if (modal === undefined) return null;
  const { title, modalImageUrl, description, exp, goalText, completionText } = modal;

  return (
    <div className="modal">
      <Card className="modal-container">
        <h1>{title}</h1>

        <div>
          <img src={modalImageUrl} alt={title} />
        </div>
        <AchievementExp exp={exp} />
        <AchievementModalDescription description={description} />
        <AchievementModalGoal goalText={goalText} />
        <AchievementModalCompletion completionText={completionText} />
      </Card>
    </div>
  );
}

export default AchievementModal;