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
  // search, filter and pagination feature
  const [pagination, setPagination] = useState(intPagination);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({} as DataPush);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // admin leads api call ========
  let {
    data: items,
    isLoading,
    isError,
  } = useList(debouncedQuery, filter, pagination);

  //  search and debounce for reduce api call =============
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

  //  reset fillter funtion =============

  let resetFilter = (resetForm: () => void) => {
    resetForm();
    setFilter({});
    setQuery("");
  };

  //  submit fillter funtion =============

  let onSubmit = async (values: FilterTypes) => {
    // in here i pass all the all property as requirment
    // pass id like array
    // comapred dates from to

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

  // pagintion per page select and jumto funtion
  const handlePagination = (event: ChangeEventType) => {
    setPagination((prev) => ({ ...prev, page: parseInt(event.target.value) }));
    queryClient.invalidateQueries(["Lead_list"]);
  };
  // pagintion skip and and navigation like backward and forrward funtion
  const handlePaginationButton = (
    current_page: number | null,
    last_page: number | null,
    pageLimit: number | null
  ) => {
    // @ts-ignore
    if (last_page && current_page <= last_page) {
      // @ts-ignore
      setPagination((prev) => ({ ...prev, page: prev.page + pageLimit }));
    }
    // @ts-ignore
    if (!last_page && current_page > pageLimit) {
      // @ts-ignore
      setPagination((prev) => ({ ...prev, page: prev.page - pageLimit }));
    }
    queryClient.invalidateQueries(["Lead_list"]);
  };

  // reset paginaion funtion
  const handleResetPagination = () => {
    setPagination(intPagination);
    queryClient.invalidateQueries(["Lead_list"]);
  };
  return (
    <>
      {/* search box area ======== */}
      <div className="py-4 px-4 bg-gray-100">
        <SearchArea query={query} handleSearch={handleSearch} />
      </div>
      <div className="overflow-hidden">
        <div className=" overflow-auto min-w-[20rem] pb-16">
          {/* filter input area using fromik react-select daterange  ======== */}
          <FilterArea resetFilter={resetFilter} onSubmit={onSubmit} />

          {/* data from leads admin api ========= */}
          <TableRow
            isLoading={isLoading}
            isError={isError}
            items={items?.data}
          />

          {/* pagination area with all funtionality ========= */}
          {isLoading || isError ? (
            ""
          ) : (
            <TablePagination
              items={items}
              handleResetPagination={handleResetPagination}
              handlePagination={handlePagination}
              pagination={pagination}
              handlePaginationButton={handlePaginationButton}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Table);
