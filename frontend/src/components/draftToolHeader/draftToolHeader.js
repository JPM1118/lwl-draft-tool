import React, { useState } from 'react'
import draftToolHeaderStyles from './draftToolHeader.module.scss';

import SkaterToggle from './skaterToggle/skaterToggle';
import TotalFSI from './totalFSI/totalFSI';
import DraftInfo from './menu/draftInfo';

function DraftToolHeader(props) {
  const { isSkaters, setIsSkaters, myPlayers } = props
  return (
    <div className={draftToolHeaderStyles.container}>
      <SkaterToggle isSkaters={isSkaters} setIsSkaters={setIsSkaters} />
      <TotalFSI myPlayers={isSkaters ? myPlayers.skaters : myPlayers.goalies} />
      <DraftInfo />
    </div>
  )
}

export default DraftToolHeader
