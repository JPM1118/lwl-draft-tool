import React, { useState, useEffect } from 'react'
import draftToolStyles from './draftTool.module.scss';


const DraftTool = () => {
  const source = new EventSource('http://localhost:3000/stream', { withCredentials: true })
  const [myTeam, setMyTeam] = useState(null)
  const [takenPlayers, setTakenPlayers] = useState(null)
  const [availablePlayers, setAvailablePlayers] = useState(null)

  const fetchPlayerList = async () => {
    if (myTeam === null) {
      let response = await fetch('http://localhost:3000/players/getPlayerList', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      response = await response.json()
      // const data = response.body.data
      setMyTeam(response)
    }
  }
  useEffect(() => {
    fetchPlayerList()
    source.onmessage = (e) => {
      console.log(e)
    }
    // setMyTeam(data.myTeam)
  }, [])

  return (
    <div className={draftToolStyles.container}>
      <div className={draftToolStyles.header}></div>
      <div className={draftToolStyles.myTeam}></div>
      <div className={draftToolStyles.availablePlayers}></div>
    </div>
  )
}

export default DraftTool
