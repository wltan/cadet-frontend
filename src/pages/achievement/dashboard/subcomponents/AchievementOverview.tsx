import { Button, Dialog } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import React, { useState } from 'react';

import AchievementLevel from './utils/AchievementLevel';
import { prettifyDate, prettifyWeek } from './utils/DateHelper';
import Inferencer from './utils/Inferencer';

type AchievementOverviewProps = {
  name?: string;
  studio?: string;
  inferencer: Inferencer;
  setNow: any;
};

function AchievementOverview(props: AchievementOverviewProps) {
  const { name, studio, inferencer, setNow } = props;
  const [isOpen, setOpen] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<Date>();

  const studentExp = inferencer.getStudentTotalExp();

  const now = inferencer.now;
  const week = prettifyWeek(now);
  const date = prettifyDate(now);

  return (
    <>
      <AchievementLevel studentExp={studentExp} />
      <h3>{name}</h3>
      <h3>{studio}</h3>
      <h3>{week}</h3>
      <Button
        outlined={true}
        style={{ fontWeight: 'bold', color: '#ffffff', border: 'solid' }}
        onClick={() => setOpen(!isOpen)}
      >
        {date}
      </Button>
      <Dialog
        style={{
          background: '#fff',
          borderRadius: '6px',
          padding: '1em',
          maxWidth: '20em'
        }}
        onClose={() => setOpen(!isOpen)}
        isOpen={isOpen}
        title={`Back to the Future!`}
      >
        <DatePicker
          timePickerProps={{ showArrowButtons: true }}
          highlightCurrentDay={true}
          onChange={date => setNewDate(date)}
        />
        <Button
          text={'Confirm'}
          disabled={newDate === undefined}
          onClick={() => {
            setNow(newDate);
            setOpen(!isOpen);
          }}
        />
      </Dialog>
    </>
  );
}

export default AchievementOverview;
