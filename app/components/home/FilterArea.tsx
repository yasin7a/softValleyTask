import {  useGeFilters } from "@/apis/qurery_mutations";
import React, { memo } from "react";
import MultiSelelct from "../MultiSelelct";
import { Formik, Form } from "formik";
import DateRangePicker from "rsuite/DateRangePicker";
import { getCookie } from "cookies-next";

export type FilterTypes = {
  statuses?: any;
  sources?: any;
  assignees?: any;
  compareDate: any;
};
let intVal: FilterTypes = {
  statuses: [],
  sources: [],
  assignees: [],
  compareDate: [],
};

const FilterArea = ({
  onSubmit,
  resetFilter,
}: {
  onSubmit: (values: FilterTypes) => void;
  resetFilter: (resetForm: () => void) => void;
}) => {
  let { data: datastatus, isLoading: isloadStatus } = useGeFilters(
    `/base/lead-status`,
    ["status"]
  );
  let { data: dataSource, isLoading: isloadSource } = useGeFilters(
    `/base/source`,
    ["source"]
  );
  let { data: dataAssign, isLoading: isloadAssign } = useGeFilters(
    `/base/assignee`,
    ["assign"]
  );
  return (
    <Formik initialValues={intVal} onSubmit={onSubmit}>
      {({ resetForm, setFieldValue, setFieldTouched, values }) => (
        <Form>
          <div className="grid grid-col-1 md:grid-cols-5 gap-2 p-4">
            <div>
              <MultiSelelct
                placeholder={isloadStatus ? "Loading..." : "Statuses"}
                name="statuses"
                handleChange={setFieldValue}
                handleBlur={setFieldTouched}
                options={datastatus}
                value={values.statuses}
              />
            </div>
            <div>
              <MultiSelelct
                placeholder={isloadSource ? "Loading..." : "Sourses"}
                name="sources"
                handleChange={setFieldValue}
                handleBlur={setFieldTouched}
                options={dataSource}
                value={values.sources}
              />
            </div>{" "}
            <div>
              <MultiSelelct
                placeholder={isloadAssign ? "Loading..." : "Assignees"}
                name="assignees"
                handleChange={setFieldValue}
                handleBlur={setFieldTouched}
                options={dataAssign}
                value={values.assignees}
              />
            </div>
            <div>
              <DateRangePicker
                cleanable={false}
                showOneCalendar
                appearance="default"
                placeholder="Contacted date"
                className="w-full cursor-pointer"
                placement="bottomEnd"
                name="compareDate"
                value={values.compareDate}
                onChange={(value: any) => {
                  setFieldValue("compareDate", value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="submit"
                className=" text-white bg-gray-400 text-sm hover:bg-gray-500 rounded-md  px-1 py-2"
              >
                Filter
              </button>
              <button
                type="button"
                onClick={() => resetFilter(resetForm)}
                className=" text-gray-400 border border-gray-400 text-sm hover:border-gray-500 rounded-md truncate px-1 py-2"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default memo(FilterArea);
