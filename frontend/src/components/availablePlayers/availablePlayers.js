import React from 'react'
import availableStyles from './availablePlayers.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

function availablePlayers(props) {
  const { players } = props;
  let columns;
  if (props.players) {
    const objKeys = Object.keys(players[0])
    columns = objKeys.map(key => {
      return {
        Header: key,
        accessor: key
      }
    })
  }
  return (
    <div className={availableStyles.container}>
      <h2 className={availableStyles.title}>Available Players</h2>
      {players && <ReactTable
        data={players}
        columns={columns}
        defaultPageSize={15}
      />
      }
    </div>
  )
}

export default availablePlayers
