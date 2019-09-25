import React from 'react';
import ReactTable from 'react-table';

import myTeamStyles from './myTeam.module.scss';

function myTeam(props) {
  const { myTeam } = props;
  const columns = [{
    Header: ''
  }]

  return (
    <div className={myTeamStyles.containers}>
      <h2 className={myTeamStyles.title}>My Team</h2>
      <div className={myTeamStyles.playerList}>
        <div className={myTeamStyles.header}>
          <span>Name</span>
          <span>Pos</span>
          <span>Team</span>
          <span>Rank</span>
        </div>
        {myTeam && myTeam.map(player => {
          return (
            <li>
              <span className={myTeamStyles.name}>{player.name}</span>
              <span className={myTeamStyles.positon}>{player.pos}</span>
              <span className={myTeamStyles.team}>{player.team}</span>
              <span className={myTeamStyles.rank}>{player.rank}</span>
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default myTeam
