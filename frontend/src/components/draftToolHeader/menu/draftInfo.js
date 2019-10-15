import React, { useState, useEffect } from 'react'
import draftInfoStyles from './draftInfo.module.scss';
import editIcon from './editIcon.png';
import Modal from '../../modal/modal';

const DraftInfo = () => {
  const [myPick, setMyPick] = useState(null);
  const [teams, setTeams] = useState(null);
  const [resetClick, setResetClick] = useState(false)
  const [editClick, setEditClick] = useState(false)
  const requestDraftInfo = async () => {
    const response = await fetch('https://api.lwldrafttool.com/draftInfo', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })
    const data = await response.json()
    setMyPick(data.myPick)
    setTeams(data.totalTeams)
  }
  useEffect(() => {
    requestDraftInfo()
  }, [])
  useEffect(() => {
    if (myPick === 0) {
      setEditClick(true)
    }
  }, [myPick])
  const handleClick = () => {
    return fetch('https://api.lwldrafttool.com/reset',
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
  }
  const handleChange = (e) => {
    e.target.id === 'myPick' ?
      setMyPick(e.target.value) :
      setTeams(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('https://api.lwldrafttool.com/draftInfo',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ myPick, teams })
      })
    setEditClick(false)
  }
  return (
    <div className={draftInfoStyles.container}>
      {editClick && <Modal closeModal={() => setEditClick(false)}>
        <form
          className={draftInfoStyles.upload}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="Draft Position">DRAFT POSITION</label>
          <input className={draftInfoStyles.inputField} id='myPick' type="number" min={1} max={20} value={myPick} onChange={(e) => handleChange(e)} />
          <label htmlFor="No. of Teams">NO. OF TEAMS</label>
          <input className={draftInfoStyles.inputField} id='teams' type="number" min={1} max={20} value={teams} onChange={(e) => handleChange(e)} />
          <input className={draftInfoStyles.submit} type="submit" value={'Submit'} />
        </form>
      </Modal>}
      <div className={draftInfoStyles.currentInfo}>
        <div className={draftInfoStyles.label}>DRAFT POSITION</div>
        <div className={draftInfoStyles.data}>{myPick}</div>
        <div className={draftInfoStyles.label}>No. of TEAMS</div>
        <div className={draftInfoStyles.data}>{teams}</div>
        <img className={draftInfoStyles.edit} src={editIcon} alt="edit Icon" onClick={() => setEditClick(true)} />
      </div>
      <button className={draftInfoStyles.reset} onClick={() => setResetClick(true)}>RESET</button>
      {resetClick && <Modal closeModal={() => setResetClick(false)}>
        <p>Are you sure you want to reset your draft?</p>
        <button className={draftInfoStyles.childBtn} onClick={() => { handleClick(); setResetClick(false) }}>YES</button>
      </Modal>}
    </div>
  )
}

export default DraftInfo
