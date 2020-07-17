import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { AchievementAbility } from 'src/commons/achievement/AchievementTypes';

import { prettifyDeadline } from './DateHelper';

type AchievementDeadlineProps = {
  deadline?: Date;
  ability: AchievementAbility;
  now: Date;
};

function AchievementDeadline(props: AchievementDeadlineProps) {
  const { deadline, ability, now } = props;

  const one_day = 86400000;
  const deadlineColor =
    ability === AchievementAbility.CORE &&
    deadline !== undefined &&
    now < deadline &&
    deadline.getTime() - now.getTime() < 2 * one_day
      ? '#ff0000'
      : '#000000';

  return (
    <div className="deadline">
      <Icon icon={IconNames.STOPWATCH} color={deadlineColor} />
      <span style={{ color: deadlineColor }}>
        <p>{prettifyDeadline(deadline, now)}</p>
      </span>
    </div>
  );
}

export default AchievementDeadline;
