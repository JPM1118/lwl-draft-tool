import React from "react";
import { filterMyPlayers } from "../helpers";

function Sidebar({ draftedPlayers }) {
  const [myPlayers, setMyPlayers] = React.useState(() =>
    filterMyPlayers(draftedPlayers)
  );
  React.useEffect(() => {
    (() => {
      setMyPlayers(filterMyPlayers(draftedPlayers));
    })();
  }, [draftedPlayers]);
  const findPositionTotal = (position) => {
    return myPlayers.reduce((acc, cur) => {
      if (cur.position === position) {
        return acc + 1;
      } else return acc;
    }, 0);
  };
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-center">My Team</h2>
      <div className="my-4 py-2 bg-gray-300 flex flex-no-wrap justify-center text-sm">
        <div className="mr-2">{`F:${findPositionTotal("F")}`}</div>
        <div className="mr-2">{`D:${findPositionTotal("D")}`}</div>
        <div>{`G:${findPositionTotal("G")}`}</div>
      </div>
      <div className="text-center font-semibold mb-4">Forwards</div>
      {myPlayers &&
        myPlayers.map((player) => {
          if (player.position === "F") {
            return (
              <div
                key={player.pick}
                className="flex flex-no-wrap justify-between items-start text-sm border-t px-4 py-2"
              >
                <div className="">
                  <div className="font-semibold">{player.name}</div>
                  <div className="uppercase">{player.team}</div>
                </div>
                <div>{player.position}</div>
              </div>
            );
          }
        })}
      <div className="text-center font-semibold mb-4">Defensemen</div>
      {myPlayers &&
        myPlayers.map((player) => {
          if (player.position === "D") {
            return (
              <div
                key={player.pick}
                className="flex flex-no-wrap justify-between items-start text-sm border-t px-4 py-2"
              >
                <div className="">
                  <div className="font-semibold">{player.name}</div>
                  <div className="uppercase">{player.team}</div>
                </div>
                <div>{player.position}</div>
              </div>
            );
          }
        })}
      <div className="text-center font-semibold mb-4">Goalies</div>
      {myPlayers &&
        myPlayers.map((player) => {
          if (player.position === "G") {
            return (
              <div
                key={player.pick}
                className="flex flex-no-wrap justify-between items-start text-sm border-t px-4 py-2"
              >
                <div className="">
                  <div className="font-semibold">{player.name}</div>
                  <div className="uppercase">{player.team}</div>
                </div>
                <div>{player.position}</div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default Sidebar;
