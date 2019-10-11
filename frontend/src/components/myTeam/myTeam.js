import React from 'react';
import Paper from '@material-ui/core/Paper'
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import myTeamStyles from './myTeam.module.scss';

const myTeam = (props) => {
  const columns = [
    {
      title: 'PLAYER',
      name: 'PLAYER'
    },
    {
      title: 'POS',
      name: 'EPOS'
    },
    {
      title: 'TEAM',
      name: 'TEAM'
    },
    {
      title: 'RANK',
      name: 'LWLRANK'
    }
  ]
  const rows = props.myPlayers
  return (
    <div className={myTeamStyles.container}>
      <span className={myTeamStyles.exit} onClick={props.close}>X</span>
      <h2 className={myTeamStyles.title}>My Team</h2>
      {rows && <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{ columnName: 'EPOS', direction: 'asc' }]}
          />
          <IntegratedSorting />
          <Table />
          <TableHeaderRow showSortingControls />
        </Grid>
      </Paper>}
    </div>
  )
}

export default myTeam

