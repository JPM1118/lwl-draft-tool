import React, { useEffect, useState } from "react";

import Table from "./Table";
import LoadingIcon from "../elements/LoadingIcon";

function SkaterTable(props) {
  const { availableGoalies, isLoading } = props;
  const [programs, setPrograms] = useState([]);

  function SelectColumnFilter({
    column: { Header, filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });

      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        id="filter"
        name="filter"
        value={filterValue}
        style={{ maxWidth: "100%" }}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        className="mt-1 block w-full pl-3 pr-8 py-0.5 text-sm border-transparent focus:outline-none focus:ring-igpblue focus:border-igp-blue sm:text-xs rounded-sm"
      >
        <option value="">{`${Header}...`}</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  // Define a default UI for filtering
  function InputColumnFilter({
    column: { Header, filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;
    return (
      <input
        id="search"
        className={`form-input block w-full mt-1 pl-2 border-gray-800 rounded-sm py-1 sm:text-xs  `}
        placeholder={`${Header}...`}
        onChange={(e) => setFilter(e.target.value || undefined)}
        value={filterValue || ""}
      />
    );
  }

  const customSort = (rowA, rowB, columnID, bool) => {
    if (rowA.values[columnID] < rowB.values[columnID]) {
      return -1;
    } else {
      return 1;
    }
  };

  const objectSort = (property) => (rowA, rowB, columnID, bool) => {
    if (rowA.values[columnID][property] < rowB.values[columnID][property]) {
      return -1;
    } else {
      return 1;
    }
  };

  const columns = React.useMemo(
    () =>
      Object.keys(availableGoalies[0]).map((key) => {
        // debugger;
        return {
          Header: key,
          accessor: key,
          disableFilters: true,
        };
      }),
    [availableGoalies]
  );
  const defaultColumn = {
    canFilter: false,
  };
  return (
    <div>
      {isLoading !== true ? (
        <>
          <Table
            data={availableGoalies}
            columns={columns}
            defaultColumn={defaultColumn}
            //eventHandlers={{ handleModalChange }}
          />
        </>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}

export default SkaterTable;
