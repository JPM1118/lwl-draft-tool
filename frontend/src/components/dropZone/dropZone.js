import React from 'react'
import { useDropzone } from 'react-dropzone';
import dropZoneStyles from './dropZone.module.scss'
const DropZone = (props) => {
  const { disabled } = props;
  const onDrop = availablePlayers => {
    props.setList(availablePlayers)
  }
  const disabledStyles = disabled ?
    {
      color: 'whitesmoke',
      border: '2px dotted whitesmoke'
    } :
    null
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, disabled, multiple: true })
  return (
    <>
      <div {...getRootProps()} className={dropZoneStyles.container} style={disabledStyles}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here...</p> :
            <p>{props.children}</p>
        }
      </div>
    </>
  )
}

export default DropZone
