import React, { useState } from 'react'
import draftToolHeaderStyles from './draftToolHeader.module.scss';

import SkaterToggle from './skaterToggle/skaterToggle';
import TotalFSI from './totalFSI/totalFSI';

function DraftToolHeader(props) {
  const [value, setValue] = useState(0)
  const handleClick = () => {
    console.log('clicked')
    return fetch('http://localhost:3000/reset',
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
  }
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSumbit = (e) => {
    e.preventDefault()
    console.log('click submit')
    return fetch('http://localhost:3000/draftPick',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ value: value })
      })
  }
  return (
    <div className={draftToolHeaderStyles.container}>
      <SkaterToggle isSkaters={props.isSkaters} setIsSkaters={props.setIsSkaters} />
      <button style={{ position: 'absolute', right: '10px' }} onClick={() => handleClick()}>Reset Draft</button>
      <form
        style={{ position: 'absolute', right: '10px', top: '20px' }}
        onSubmit={(e) => handleSumbit(e)}>
        <input type="number" min={0} max={10} value={value} onChange={(e) => handleChange(e)} />
        <input type="submit" value='Submit' />
      </form>
      <TotalFSI />
    </div>
  )
}

export default DraftToolHeader
