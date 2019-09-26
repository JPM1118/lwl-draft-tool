import React, { useState, useEffect } from 'react'
import draftToolStyles from './draftTool.module.scss';

import DraftToolHeader from '../../components/draftToolHeader/draftToolHeader';
import MyTeam from '../../components/myTeam/myTeam';
import AvailablePlayers from '../../components/availablePlayers/availablePlayers';

const DraftTool = () => {
  const source = new EventSource('http://localhost:3000/stream', { withCredentials: true })

  const [isSkaters, setIsSkaters] = useState(true)
  const [myTeam, setMyTeam] = useState(null)
  const [takenPlayers, setTakenPlayers] = useState(null)
  const [availablePlayers, setAvailablePlayers] = useState({})

  const fetchPlayerList = async () => {
    if (myTeam === null) {
      let response = await fetch('http://localhost:3000/players/getPlayerList', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      response = await response.json()
      // const data = response.body.data
      setAvailablePlayers(response)
    }
  }
  useEffect(() => {
    fetchPlayerList()
    source.addEventListener('myTeamUpdate', e =>
      console.log(e.data)
    )
    source.addEventListener('takenUpdate', e =>
      console.log(e.data)
    )
    source.addEventListener("test", e => {
      console.log(e.data)
    }
    )
    // setMyTeam(data.myTeam)
  }, [])
  return (
    <div className={draftToolStyles.container}>
      <div className={draftToolStyles.header}>
        <DraftToolHeader
          isSkaters={isSkaters}
          setIsSkaters={setIsSkaters}
        />
      </div>
      <div className={draftToolStyles.myTeam}>
        <MyTeam myTeam={myTeam} />
      </div>
      <div className={draftToolStyles.availablePlayers}>
        <AvailablePlayers players={availablePlayers && isSkaters ? availablePlayers.skaters : availablePlayers.goalies} />
      </div>
    </div>
  )
}

export default DraftTool
