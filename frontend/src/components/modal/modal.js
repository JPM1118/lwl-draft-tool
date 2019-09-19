import React from 'react'
import modalStyles from './modal.module.scss'

function Modal(props) {

  return (
    <div className={modalStyles.content}>
      <div className={modalStyles.body}>
        <span className={modalStyles.exitBtn} onClick={props.closeModal}>X</span>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
