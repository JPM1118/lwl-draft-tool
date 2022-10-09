import React from "react";
import io from "socket.io-client";
import { debounce } from "lodash";

import FsiTotals from "./components/FsiTotals";
import PlayerTables from "./components/PlayerTables";
import Sidebar from "./components/Sidebar";
import LoadingIcon from "./elements/LoadingIcon";
import { filterAvailablePlayers } from "./helpers";

function App() {
  const [draftedPlayers, setDraftedPlayers] = React.useState([]);
  const [availableSkaters, setAvailableSkaters] = React.useState(null);
  const [availableGoalies, setAvailableGoalies] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const socket = io("http://localhost:3001", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  const debounceDrafted = React.useCallback(
    debounce((value) => {
      setDraftedPlayers(value);
    }, 2000),
    []
  );

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      let skaterResponse = await fetch(
        "http://localhost:3001/players/skaters",
        {
          method: "GET",
        }
      );
      skaterResponse = await skaterResponse.json();
      let goalieResponse = await fetch(
        "http://localhost:3001/players/goalies",
        {
          method: "GET",
        }
      );
      goalieResponse = await goalieResponse.json();
      setAvailableSkaters(skaterResponse);
      setAvailableGoalies(goalieResponse);
      setIsLoading(false);
    })();
  }, []);
  React.useEffect(() => {
    socket.on("sendTakenPlayers", (data) => {
      debounceDrafted(data.data.data);
      console.log("debounced");
    });
    return () => {
      socket.off("sendTakenPlayers");
    };
  }, []);
  if (!availableGoalies || !availableSkaters) {
    return <LoadingIcon />;
  }
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 w-full">
      {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 h-screen">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            {/* Sidebar */}
            <Sidebar
              draftedPlayers={draftedPlayers}
              availableGoalies={availableGoalies}
              availableSkaters={availableSkaters}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex  bg-white shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <FsiTotals
                draftedPlayers={draftedPlayers}
                availableGoalies={availableGoalies}
                availableSkaters={availableSkaters}
              />
            </div>
          </div>
        </div>

        <main
          className="flex-1 relative overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              {/* table  */}
              {/* /End replace */}
              <PlayerTables
                availableSkaters={filterAvailablePlayers(
                  draftedPlayers,
                  availableSkaters
                )}
                availableGoalies={filterAvailablePlayers(
                  draftedPlayers,
                  availableGoalies
                )}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
