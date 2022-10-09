import React from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import { useEffect } from "react";
import { Transition } from "@headlessui/react";

function Table(props) {
  const {
    data,
    columns,
    tableProps,
    pagination = true,
    sort = true,
    defaultColumn = {},
    eventHandlers = [],
    extraData = [],
  } = ({} = props);

  const filterTypes = {
    text: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id];
        if (rowValue === undefined) {
          return true;
        }
        if (typeof rowValue === "string" || typeof rowValue === "number") {
          return String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase());
        }
        if (typeof rowValue === "object") {
          for (const property in rowValue) {
            if (
              String(rowValue[property])
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            ) {
              return true;
            }
          }
        }
      });
    },
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      defaultCanFilter: false,
      filterTypes,
      initialState: {
        sortBy: [
          {
            id: "EADP",
            desc: false,
          },
        ],
      },
      disableSortRemove: true,
      ...eventHandlers,
      ...extraData,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  // somehow the data is on initial rendering empty
  useEffect(() => {
    if (data.length) setPageSize(data.length);
  }, [data]);
  return (
    <div className="w-full relative">
      <table
        className="border-separate  min-w-full  w-full overflow-x-auto"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index, array) => {
                return (
                  <th
                    className={`${index === 0 && "rounded-l-md"} ${
                      index === array.length - 1 && "rounded-r-md"
                    } sticky top-0 bg-gray-400 px-3 pt-4 pb-8 text-left leading-4 font-semibold align-top z-10`}
                    style={{ minWidth: "100px" }}
                  >
                    <div
                      className="flex flex-no-wrap uppercase"
                      style={{ fontSize: "10px" }}
                    >
                      {column.render("Header")}
                    </div>

                    <div
                      style={{ width: "100%" }}
                      className="flex flex-no-wrap justify-between items-center"
                    >
                      <span className="w-full">
                        {column.canFilter ? column.render("Filter") : null}
                      </span>
                      <span
                        className="pl-1"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.canSort ? (
                          <div
                            className={`mt-1 flex flex-no-wrap items-center text-gray-500`}
                            style={{ height: "25px" }}
                          >
                            <svg
                              className={`fill-current ${
                                column.isSortedDesc && "text-black"
                              } h-3`}
                              x="0px"
                              y="0px"
                              viewBox="0 0 54 54"
                            >
                              <path d="M10,31c-0.9-1.1-0.7-2.6,0.3-3.5s2.6-0.7,3.5,0.3l10.6,12.8V6.5C24.5,5.1,25.6,4,27,4s2.5,1.1,2.5,2.5v34.1l10.6-12.8  c0.9-1.1,2.5-1.2,3.5-0.3c1.1,0.9,1.2,2.5,0.3,3.5L28.9,49.1C28.5,49.7,27.7,50,27,50s-1.5-0.3-1.9-0.9L10,31z"></path>
                            </svg>

                            <svg
                              className={`fill-current ${
                                column.isSorted &&
                                !column.isSortedDesc &&
                                "text-black"
                              } h-3`}
                              x="0px"
                              y="0px"
                              viewBox="0 0 54 54"
                            >
                              <path d="M10.3,28.5C9.3,27.6,9.1,26.1,10,25L25.1,6.8c1-1.1,2.9-1.1,3.8,0L44,25c0.9,1.1,0.7,2.6-0.3,3.5c-0.5,0.4-1,0.6-1.6,0.6  c-0.7,0-1.4-0.3-1.9-0.9L29.5,15.4v34.1c0,1.4-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5V15.4L13.9,28.2C13,29.3,11.4,29.4,10.3,28.5z"></path>
                            </svg>
                          </div>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-100"
                } relative hover:bg-blue-200`}
              >
                {row.cells.map((cell, index, array) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${index === 0 && "rounded-l-md"} ${
                        index === array.length - 1 && "rounded-r-md"
                      } align-top px-3 py-4 relative text-sm leading-5 text-gray-900`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
