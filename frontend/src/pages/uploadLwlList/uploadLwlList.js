import React, { useState } from 'react'
import uploadStyles from './uploadLwlList.module.scss';
import DropZone from '../../components/dropZone/dropZone'
import removeIcon from './removeIcon.png'
import parse from 'csv-parse'
import xlsx from 'xlsx';


function UploadLwlList() {
  const [skaterList, setSkaterList] = useState(null)
  const [goalieList, setGoalieList] = useState(null)

  const setList = (type, list) => {
    type === 'skaters' ?
      setSkaterList(list[0]) :
      setGoalieList(list[0])
  }
  const clearList = (type) => {
    type === 'skaters' ?
      setSkaterList(null) :
      setGoalieList(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsBinaryString(file);
      })
    }
    function parseCsvAsync(file, options) {
      return new Promise((resolve, reject) => {
        let parser = parse(file,
          options,
          (err, data) => {
            if (err) { reject(err) }
            resolve(data)
          })
        return parser
      })
    }
    function parseXlsx(file, type) {
      const workbook = xlsx.read(file, { type })
      const projections = workbook.Sheets.Projections
      const jsonProjections = xlsx.utils.sheet_to_json(projections)
      return jsonProjections
    }



    const skaterXlsx = await readFileAsync(skaterList);
    const parsedSkaterXlsx = parseXlsx(skaterXlsx, 'binary')
    const goalieCsv = await readFileAsync(goalieList)
    const parsedgoalieCsv = await parseCsvAsync(goalieCsv, { columns: true })

    const jsonData = JSON.stringify({
      skaters: parsedSkaterXlsx,
      goalies: parsedgoalieCsv
    })

    return fetch('https://api.lwldrafttool.com/addDraftKit', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData
    })
      .catch(e => console.error(e))
  }

  return (
    <div className={uploadStyles.container}>
      <h2 className={uploadStyles.title}>LWL Spreadsheet Upload</h2>
      <div className={uploadStyles.dropBox}>
        <h3>Skaters</h3>
        <DropZone
          disabled={skaterList ? true : false}
          setList={setList.bind(null, 'skaters')}
        >
          Drag 'n' drop your LWL <strong >SKATER</strong> list here or click to select files
        </DropZone>
        <span>Uploaded: <i>{skaterList ? skaterList.name : 'Empty'}</i></span>
        {skaterList && <img className={uploadStyles.remove} onClick={clearList.bind(null, 'skaters')} src={removeIcon} />}
      </div>
      <div className={uploadStyles.dropBox}>
        <h3>Goalies</h3>
        <DropZone
          disabled={goalieList ? true : false}
          setList={setList.bind(null, 'goalies')}
        >
          Drag 'n' drop your LWL <strong>GOALIE</strong> list here or click to select files
        </DropZone>
        <span>Uploaded: <i>{goalieList ? goalieList.name : 'Empty'}</i></span>
        {goalieList && <img className={uploadStyles.remove} onClick={clearList.bind(null, 'goalies')} src={removeIcon} />}
      </div>
      <button
        className={skaterList && goalieList ? uploadStyles.submit : uploadStyles.submitDisabled}
        disabled={!(skaterList && goalieList)}
        onClick={(e) => onSubmit(e)}>Submit</button>
    </div>
  )
}

export default UploadLwlList
