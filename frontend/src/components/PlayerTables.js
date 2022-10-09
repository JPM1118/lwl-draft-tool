import React from "react";
import SkaterTable from "./SkaterTable";
import GoalieTable from "./GoalieTable";

function PlayerTables({ availableSkaters, availableGoalies, isLoading }) {
  const [isSkaters, setIsSkaters] = React.useState(true);
  return (
    <div>
      <div className="flex flex-no-wrap">
        <a
          href="#"
          className={`${isSkaters && "underline"} cursor-pointer`}
          onClick={() => setIsSkaters(true)}
        >
          Skaters
        </a>
        <span>/</span>
        <a
          href="#"
          className={`${!isSkaters && "underline"} cursor-pointer`}
          onClick={() => setIsSkaters(false)}
        >
          Goalies
        </a>
      </div>
      <div>
        {isSkaters ? (
          <SkaterTable
            availableSkaters={availableSkaters}
            isLoading={isLoading}
          />
        ) : (
          <GoalieTable
            availableGoalies={availableGoalies}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default PlayerTables;
