import React from 'react'
import totalFSIStyles from './totalFSI.module.scss';

function totalFSI(props) {
  const { myPlayers } = props;
  const data = []
  if (myPlayers.length > 0) {
    const objEntries = Object.entries(myPlayers[0])

    objEntries.forEach(entry => {
      if (entry[0].includes('FSI')) {
        if (entry[1] > 0) {
          data.push({ name: entry[0], value: 0 })
        }
      }
    })

    myPlayers.forEach(player => {
      data.forEach(element => {
        element.value += Math.round(player[element.name])
      })
    })
  }
  return (
    <div className={totalFSIStyles.container}>
      <h1 className={totalFSIStyles.title}>Total FSI</h1>
      <table className={totalFSIStyles.table} cellSpacing="0">
        <tbody>
          <tr>
            {data.map(entry => {
              return <th key={entry.name}>{entry.name}</th>
            })}
          </tr>
          <tr>
            {data.map(entry => {
              return <td key={entry.name}>{entry.value}</td>
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default totalFSI
