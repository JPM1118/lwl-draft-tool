import React from 'react'
import skaterToggleStyles from './skaterToggle.module.scss';


function skaterToggle(props) {
  return (
    <div className={skaterToggleStyles.container}>
      <button
        className={skaterToggleStyles.btn}
        style={props.isSkaters ? { color: '#17252A' } : { color: '#def2f1' }}
        onClick={() => props.setIsSkaters(true)}
      >
        Skaters
      </button>
      /
    <button
        className={skaterToggleStyles.btn}
        style={!props.isSkaters ? { color: '#17252A' } : { color: '#def2f1' }}
        onClick={() => props.setIsSkaters(false)}
      >
        Goalies
    </button>
    </div >
  )
}

export default skaterToggle
