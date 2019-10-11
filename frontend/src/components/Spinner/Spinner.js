import React from 'react'

import './Spinner.scss'

const Spinner = (props) => {
  return (
    <div className="spinner" style={{ marginTop: props.marginTop }}>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Spinner
