import React from "react";
import { filterMyFsi } from "../helpers";

function FsiTotals({ draftedPlayers, availableSkaters, availableGoalies }) {
  const [isSkaters, setIsSkaters] = React.useState(true);
  const [mySkaters, setMySkaters] = React.useState(
    filterMyFsi(draftedPlayers, availableSkaters)
  );
  const [myGoalies, setMyGoalies] = React.useState(
    filterMyFsi(draftedPlayers, availableGoalies)
  );
  React.useEffect(() => {
    (() => {
      setMySkaters(filterMyFsi(draftedPlayers, availableSkaters));
      setMyGoalies(filterMyFsi(draftedPlayers, availableGoalies));
    })();
  }, [draftedPlayers]);
  const findFsiTotal = (position, type) => {
    if (position === "skater") {
      return mySkaters.reduce((acc, cur) => {
        return acc + Math.round(cur[type]);
      }, 0);
    } else if (position === "goalie") {
      return myGoalies.reduce((acc, cur) => {
        return acc + Math.round(cur[type]);
      }, 0);
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-no-wrap">
        <div
          className={`${isSkaters && "underline"} cursor-pointer`}
          onClick={() => setIsSkaters(true)}
        >
          Skaters
        </div>
        <div>/</div>
        <div
          className={`${!isSkaters && "underline"} cursor-pointer`}
          onClick={() => setIsSkaters(false)}
        >
          Goalies
        </div>
      </div>
      {isSkaters ? (
        <div className="w-full px-4 py-2">
          <h2 className="text-lg text-center uppercase underline font-semibold">
            Skaters
          </h2>
          <div className="mt-2 ">
            <div className="flex flex-no-wrap justify-center text-base ">
              <div className="px-2 mr-2 w-20 text-center underline">GFSI</div>
              <div className="px-2 mr-2 w-20 text-center underline">AFSI</div>
              <div className="px-2 mr-2 w-20 text-center underline">PIMFSI</div>
              <div className="px-2 mr-2 w-20 text-center underline">PPPFSI</div>
              <div className="px-2 w-20 text-center underline">SOGFSI</div>
            </div>
            <div className="flex flex-no-wrap justify-center text-base">
              <div className="px-2 mr-2 w-20 text-center">
                {findFsiTotal("skater", "GFSI")}
              </div>
              <div className="px-2 mr-2 w-20 text-center">
                {findFsiTotal("skater", "AFSI")}
              </div>
              <div className="px-2 mr-2 w-20 text-center">
                {findFsiTotal("skater", "PIMFSI")}
              </div>
              <div className="px-2 mr-2 w-20 text-center">
                {findFsiTotal("skater", "PPPFSI")}
              </div>
              <div className="px-2 w-20 text-center">
                {findFsiTotal("skater", "SOGFSI")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 py-2">
          <h2 className="text-lg text-center uppercase underline font-semibold">
            Goalies
          </h2>
          <div className="mt-2 ">
            <div className="flex flex-no-wrap justify-center text-base ">
              <div className="px-2 mr-2 w-20 text-center underline">WFSI</div>
              <div className="px-2 mr-2 w-20 text-center underline">GAAFSI</div>
              <div className="px-2 mr-2 w-20 text-center underline">SVFSI</div>
              <div className="px-2 mr-2 w-20 text-center underline">
                SVPCTFSI
              </div>
              <div className="px-2 w-20 text-center underline">SHOFSI</div>
            </div>
            <div className="flex flex-no-wrap justify-center text-base">
              <div className="px-2 mr-2 w-20 text-center">
                {" "}
                {findFsiTotal("goalie", "WFSI")}
              </div>
              <div className="px-2 mr-2 w-20 text-center">
                {" "}
                {findFsiTotal("goalie", "GAAFSI")}
              </div>
              <div className="px-2 mr-2 w-20 text-center">
                {" "}
                {findFsiTotal("goalie", "SVFSI")}
              </div>
              <div className="px-2 mr-2 w-20 text-center">
                {" "}
                {findFsiTotal("goalie", "SVPCTFSI")}
              </div>
              <div className="px-2 w-20 text-center">
                {" "}
                {findFsiTotal("goalie", "SHOFSI")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FsiTotals;
