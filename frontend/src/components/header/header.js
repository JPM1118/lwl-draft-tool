import React, { useState } from 'react';
import headerStyles from './header.module.scss';

import Modal from '../modal/modal';
import infoIcon from './icons/infoIcon.png';

const Header = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={headerStyles.content}>
      <h1 className={headerStyles.title}>LWL DRAFT TOOL</h1>
      <span className={headerStyles.infoBtn} onClick={() => toggleShowInfo()}>
        <img src={infoIcon} alt="Info Button" />
      </span>
      <button
        className={headerStyles.logoutBtn}
        onClick={props.logout}
        style={props.loggedIn ? { display: 'inline' } : { display: 'none' }}>
        LOGOUT
      </button>
      {showInfo && <Modal closeModal={toggleShowInfo}>
        <h2 style={{ textAlign: 'center' }}>Instructions</h2>
        <ul>
          <li style={{ marginBottom: '1rem' }}>Login through Facebook or Google.</li>
          <li style={{ marginBottom: '1rem' }}>Install the accompanying Chrome Extension from here.</li>
          <li style={{ marginBottom: '1rem' }}>In another tab, make sure you navigate to your live draft.</li>
          <li style={{ marginBottom: '1rem' }}>LWL Draft Tools will keep you updated on who is available and who has been taken in your draft.</li>
          <li style={{ marginBottom: '1rem' }}>Your Team's total FSI will be listed.</li>
          <li style={{ marginBottom: '1rem' }}>Each available player's ADP and FSI will be listed.</li>
          <li style={{ marginBottom: '1rem' }}>Use the appropriately marked buttons to navigate between goalies and skaters.</li>
          <li style={{ marginBottom: '1rem' }}>In top right hand corner, fill in your draft position and number of teams in your league.</li>
        </ul>
      </Modal>}
    </div>
  )
}

export default Header
