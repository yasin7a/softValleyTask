import React, { memo, useState } from "react";
import { DataPush, useList } from "@/apis/qurery_mutations";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import TableRow from "./TableRow";
import FilterArea, { FilterTypes } from "./FilterArea";
import SearchArea from "./SearchArea";
import TablePagination from "./TablePagination";

export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;
let intPagination = {
  limit: 10,
  page: 1,
};
let Table = () => {
  const [pagination, setPagination] = useState(intPagination);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({} as DataPush);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  let {
    data: items,
    isLoading,
    isError,
  } = useList(debouncedQuery, filter, pagination);

  function handleSearch(event: ChangeEventType) {
    setQuery(event.target.value);
  }
  useDebounce(
    () => {
      setDebouncedQuery(query);
      queryClient.invalidateQueries(["Lead_list"]);
    },
    1000,
    [query]
  );

  let resetFilter = (resetForm: () => void) => {
    resetForm();
    setFilter({});
    setQuery("");
  };
  let onSubmit = async (values: FilterTypes) => {
    let dateRangeObject = {};
    let lead_status_id = values.statuses.map((item: any) => item.id);
    let source_id = values.sources.map((item: any) => item.id);
    let user_id = values.assignees.map((item: any) => item.user_id);
    let dates = values?.compareDate;
    if (dates.length > 0) {
      dateRangeObject = {
        contacted_date_from: dates[0]?.toISOString(),
        contacted_date_to: dates[1]?.toISOString(),
      };
    }

    setQuery("");
    setFilter({
      lead_status_id,
      source_id,
      user_id,
      ...dateRangeObject,
    });
    queryClient.invalidateQueries(["Lead_list"]);
  };

  const handlePagination = (event: ChangeEventType) => {
    setPagination((prev) => ({ ...prev, page: parseInt(event.target.value) }));
    queryClient.invalidateQueries(["Lead_list"]);
  };
  const handleResetPagination = () => {
    setPagination(intPagination);
    queryClient.invalidateQueries(["Lead_list"]);
  };
  return (
    <>
      <div className="py-4 px-4 bg-gray-100">
        <SearchArea query={query} handleSearch={handleSearch} />
      </div>
      <div className="overflow-hidden">
        <div className=" overflow-auto min-w-[20rem]">
          <FilterArea resetFilter={resetFilter} onSubmit={onSubmit} />
          <TableRow
            isLoading={isLoading}
            isError={isError}
            items={items?.data}
          />
          {isLoading || isError ? (
            ""
          ) : (
            <TablePagination
              items={items}
              handleResetPagination={handleResetPagination}
              handlePagination={handlePagination}
              pagination={pagination}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Table);
