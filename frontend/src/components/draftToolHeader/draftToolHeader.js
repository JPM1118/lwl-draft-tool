import React from 'react'
import draftToolHeaderStyles from './draftToolHeader.module.scss';

import SkaterToggle from './skaterToggle/skaterToggle';
import TotalFSI from './totalFSI/totalFSI';

function draftToolHeader(props) {
  return (
    <div className={draftToolHeaderStyles.container}>
      <SkaterToggle isSkaters={props.isSkaters} setIsSkaters={props.setIsSkaters} />
      <TotalFSI />
    </div>
  )
}

export default draftToolHeader
