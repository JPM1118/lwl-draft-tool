import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

import myTeamStyles from './myTeam.module.scss';

function MyTeam(props) {
  const { myTeam } = props
  let columns;
  if (myTeam) {
    columns = [
      {
        Header: 'PLAYER',
        accessor: myTeam.PLAYER
      },
      {
        Header: 'Pos',
        accessor: myTeam.EPOS
      },
      {
        Header: 'TEAM',
        accessor: myTeam.TEAM
      },
      {
        Header: 'RANK',
        accessor: myTeam.LWLRANK
      }
    ]
  }
  return (
    <div className={myTeamStyles.containers}>
      <h2 className={myTeamStyles.title}>My Team</h2>
      {myTeam && <ReactTable
        data={myTeam}
        columns={columns}
        defaultPageSize={15}
      />}
    </div>
  )
}

export default MyTeam
