import React from 'react';
import Paper from '@material-ui/core/Paper'
import { SortingState, IntegratedSorting, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, VirtualTable, TableHeaderRow, TableFixedColumns, TableColumnResizing, PagingPanel } from '@devexpress/dx-react-grid-material-ui'

import availableStyles from './availablePlayers.module.scss';


function AvailablePlayers(props) {
  const { players, takenPlayers, isSkaters } = props;
  let columns,
    availablePlayers,
    defaultColumnWidths = [];

  if (players.length > 0) {
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
      if (key === 'PLAYER') {
        return {
          title: key,
          name: key,
          fixed: 'left'
        }
      } else {
        return {
          title: key,
          name: key
        }
      }
    })
    defaultColumnWidths = objKeys.map(key => {
      if (key === 'PLAYER' || key === 'LWLRANK') {
        return {
          columnName: key,
          width: 150
        }
      } else {
        return {
          columnName: key,
          width: 100
        }
      }
    })
  }

  return (
    <div className={availableStyles.container}>
      <h2 className={availableStyles.title}>Available Players</h2>
      {players.length > 0
        ? <Paper>
          <Grid
            rows={availablePlayers}
            columns={columns}
          >
            <SortingState
              defaultSorting={[{ columnName: 'LWLRANK', direction: 'asc' }]}
            />
            <PagingState
              defaultCurrentPage={0}
              pageSize={20}
            />
            <IntegratedSorting />
            <IntegratedPaging />
            <VirtualTable />
            <TableColumnResizing
              columnWidths={defaultColumnWidths}
            />
            <TableHeaderRow showSortingControls />
            <TableFixedColumns
              leftColumns={isSkaters ? ['PLAYER', 'YPOS'] : ['PLAYER']}
            />
            <PagingPanel />
          </Grid>
        </Paper>
        :
        <div>Oops! Something went wrong. Please refresh.</div>
      }
    </div>
  )
}

export default AvailablePlayers
