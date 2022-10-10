import React from "react";

function Sidebar({ myPlayers }) {
  function isForward(POS) {
    const forwardArray = ["C", "RW", "LW", "C/LW", "C/RW", "LW/RW"];

    return forwardArray.some((_) => _ === POS);
  }

  const findPositionTotal = (position) => {
    if (position === "F") {
      return myPlayers.reduce((acc, cur) => {
        if (isForward(cur.POS)) {
          return acc + 1;
        } else return acc;
      }, 0);
    }
    return myPlayers.reduce((acc, cur) => {
      if (cur.POS === position) {
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
      {/* <hr /> */}
      <div>
        <div className="pl-2 font-semibold mt-4 uppercase text-gray-400">
          Forwards
        </div>
        {myPlayers &&
          myPlayers.map((player) => {
            if (isForward(player.POS)) {
              return (
                <div
                  key={player.total_projection_id}
                  className="flex flex-no-wrap justify-between items-start text-sm px-4 py-2"
                >
                  <div className="">
                    <div className="font-semibold">{player.NAME}</div>
                    <div className="uppercase">{player.TEAM}</div>
                  </div>
                  <div>{player.POS}</div>
                </div>
              );
            }
          })}

        <hr />
      </div>
      <div>
        <div className="pl-2 uppercase font-semibold mt-4  text-gray-400">
          Defensemen
        </div>
        {myPlayers &&
          myPlayers.map((player) => {
            if (player.POS === "D") {
              return (
                <div
                  key={player.total_projection_id}
                  className="flex flex-no-wrap justify-between items-start text-sm px-4 py-2"
                >
                  <div className="">
                    <div className="font-semibold">{player.NAME}</div>
                    <div className="uppercase">{player.TEAM}</div>
                  </div>
                  <div>{player.POS}</div>
                </div>
              );
            }
          })}
        <hr />
      </div>
      <div>
        <div className="pl-2 uppercase font-semibold  mt-4 text-gray-400">
          Goalies
        </div>
        {myPlayers &&
          myPlayers.map((player) => {
            if (player.POS === "G") {
              return (
                <div
                  key={player.total_projection_id}
                  className="flex flex-no-wrap justify-between items-start text-sm px-4 py-2"
                >
                  <div className="">
                    <div className="font-semibold">{player.NAME}</div>
                    <div className="uppercase">{player.TEAM}</div>
                  </div>
                  <div>{player.POS}</div>
                </div>
              );
            }
          })}
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
