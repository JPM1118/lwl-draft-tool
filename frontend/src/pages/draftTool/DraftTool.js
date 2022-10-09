import React, { useState, useEffect } from "react";
import draftToolStyles from "./draftTool.module.scss";
import socketIOClient from "socket.io-client";

import DraftToolHeader from "../../components/draftToolHeader/draftToolHeader";
import MyTeam from "../../components/myTeam/myTeam";
import AvailablePlayers from "../../components/availablePlayers/availablePlayers";
import UploadLwlList from "../uploadLwlList/uploadLwlList";
import Spinner from "../../components/Spinner/Spinner";

const DraftTool = () => {
  const socket = socketIOClient("https://api.lwldrafttool.com");
  const [isLoading, setIsLoading] = useState(true);
  const [isSkaters, setIsSkaters] = useState(true);
  const [players, setPlayers] = useState({ skaters: [], goalies: [] });
  const [takenPlayers, setTakenPlayers] = useState({
    skaters: [],
    goalies: [],
  });
  const [myPlayers, setMyPlayers] = useState({ skaters: [], goalies: [] });
  const [showMyPlayers, setShowMyPlayers] = useState(false);

  const fetchPlayerList = async () => {
    let response = await fetch(
      "https://api.lwldrafttool.com/players/getPlayerList",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    response = await response.json();
    setPlayers(response.players);
    setTakenPlayers(response.takenPlayers);
    setMyPlayers(response.myPlayers);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPlayerList();

    socket.on("sendTakenPlayers", (data) => {
      setTakenPlayers(data.data);
    });
    return () => {
      socket.off("sendTakenPlayers");
    };
  }, []);
  const myTeamPositionTotals = {
    C: 0,
    L: 0,
    R: 0,
    D: 0,
    G: 0,
  };
  myPlayers.skaters.forEach((skater) => {
    myTeamPositionTotals[skater.NHLPOS] += 1;
  });
  myTeamPositionTotals.G = myPlayers.goalies.length;
  return (
    <>
      {isLoading ? (
        <Spinner marginTop={"20rem"} />
      ) : (
        <>
          {players.skaters.length > 0 ? (
            <div>
              <div className={draftToolStyles.header}>
                <DraftToolHeader
                  isSkaters={isSkaters}
                  setIsSkaters={setIsSkaters}
                  myPlayers={myPlayers}
                />
              </div>
              <div className={draftToolStyles.container}>
                <div className={draftToolStyles.myTeam}>
                  <h3
                    className={draftToolStyles.myTeamTitle}
                    onClick={() => setShowMyPlayers(true)}
                  >
                    MY TEAM
                  </h3>
                  <div className={draftToolStyles.totalPlayers}>
                    <div>C: {myTeamPositionTotals.C}</div>
                    <div>LW: {myTeamPositionTotals.L}</div>
                    <div>RW: {myTeamPositionTotals.R}</div>
                    <div>D: {myTeamPositionTotals.D}</div>
                    <div>G: {myTeamPositionTotals.G}</div>
                  </div>
                </div>
                <div className={draftToolStyles.availablePlayers}>
                  <AvailablePlayers
                    players={isSkaters ? players.skaters : players.goalies}
                    takenPlayers={
                      isSkaters ? takenPlayers.skaters : takenPlayers.goalies
                    }
                    isSkaters={isSkaters}
                  />
                </div>
              </div>
              {showMyPlayers && (
                <MyTeam
                  myPlayers={isSkaters ? myPlayers.skaters : myPlayers.goalies}
                  close={() => setShowMyPlayers(false)}
                />
              )}
            </div>
          ) : (
            <UploadLwlList />
          )}
        </>
      )}
    </>
  );
};

export default DraftTool;
