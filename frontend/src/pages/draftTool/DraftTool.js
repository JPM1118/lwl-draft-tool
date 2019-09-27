import React, { useState, useEffect } from 'react'
import draftToolStyles from './draftTool.module.scss';
import socketIOClient from 'socket.io-client';

import DraftToolHeader from '../../components/draftToolHeader/draftToolHeader';
import MyTeam from '../../components/myTeam/myTeam';
import AvailablePlayers from '../../components/availablePlayers/availablePlayers';

const DraftTool = () => {
  const socket = socketIOClient('http://localhost:3000');
  const [isSkaters, setIsSkaters] = useState(true)
  const [availablePlayers, setAvailablePlayers] = useState({})
  const [takenPlayers, setTakenPlayers] = useState([])
  const [myPlayers, setMyPlayers] = useState([])

  const fetchPlayerList = async () => {
    if (availablePlayers) {
      let response = await fetch('http://localhost:3000/players/getPlayerList', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      response = await response.json()
      setAvailablePlayers(response.players)
      setTakenPlayers(response.takenPlayers)
      setMyPlayers(response.myPlayers)
    }
  }
  useEffect(() => {
    fetchPlayerList()
    socket.on('sendTakenPlayers', data => {
      console.log(data.data)
      setTakenPlayers(data)
    })
    socket.on('sendMyPlayers', data => {
      console.log(data)
      setMyPlayers(data)
    })
    return () => {
      socket.off('sendTakenPlayers')
      socket.off('sendMyPlayers')
    }
  }, [])
  useEffect(() => {

  })
  return (
    <div className={draftToolStyles.container}>
      <div className={draftToolStyles.header}>
        <DraftToolHeader
          isSkaters={isSkaters}
          setIsSkaters={setIsSkaters}
        />
      </div>
      <div className={draftToolStyles.myTeam}>
        <MyTeam myPlayers={myPlayers} />
      </div>
      <div className={draftToolStyles.availablePlayers}>
        <AvailablePlayers
          players={availablePlayers && isSkaters ? availablePlayers.skaters : availablePlayers.goalies}
          takenPlayers={takenPlayers}
        />
      </div>
    </div>
  )
}

export default DraftTool
