import React from 'react'
import availableStyles from './availablePlayers.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

function AvailablePlayers(props) {
  const { players, takenPlayers } = props;
  let columns, availablePlayers;
  if (players) {
    if (takenPlayers.length > 0) {
      availablePlayers = players.filter(player => {
        return !takenPlayers.some(tPlayer => {
          return player.PLAYER == tPlayer.PLAYER
        })
      })
    } else {
      availablePlayers = [...players]
    }
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
        data={availablePlayers}
        columns={columns}
        defaultPageSize={15}
      />
      }
    </div>
  )
}

export default AvailablePlayers
