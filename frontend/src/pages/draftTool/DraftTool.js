import React from 'react'
import draftToolStyles from './draftTool.module.scss';

const DraftTool = () => {
  return (
    <div className={draftToolStyles.container}>
      <div className={draftToolStyles.header}></div>
      <div className={draftToolStyles.myTeam}></div>
      <div className={draftToolStyles.availablePlayers}></div>
    </div>
  )
}

export default DraftTool
