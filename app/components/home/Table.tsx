import React, { memo, useState } from "react";
import { DataPush, useList } from "@/apis/qurery_mutations";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import TableRow from "./TableRow";
import FilterArea, { FilterTypes } from "./FIlterArea";
import SearchArea from "./SearchArea";
import TablePagination from "./TablePagination";

let Table = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({} as DataPush);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  let { data: items, isLoading, isError } = useList(debouncedQuery, filter);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
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
    let lead_status_id = values.statuses.map((item: any) => item.id);
    let source_id = values.sources.map((item: any) => item.id);
    let user_id = values.assignees.map((item: any) => item.user_id);
    console.log(values);

    setQuery("");
    setFilter({
      lead_status_id,
      source_id,
      user_id,
      ...values.compareDate,
    });
    queryClient.invalidateQueries(["Lead_list"]);
  };
  return (
    <>
      <div className="py-4 px-4 bg-gray-100">
        <SearchArea query={query} handleSearch={handleSearch} />
      </div>
      <div className=" overflow-auto min-w-[50rem]">
        <FilterArea resetFilter={resetFilter} onSubmit={onSubmit} />
        <TableRow isLoading={isLoading} isError={isError} items={items} />
        <TablePagination />
      </div>
    </>
  );
};

export default memo(Table);
