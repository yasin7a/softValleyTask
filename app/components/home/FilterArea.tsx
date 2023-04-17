import {
  useGetAssign,
  useGetSource,
  useGetStatus,
} from "@/apis/qurery_mutations";
import React, { memo } from "react";
import MultiSelelct from "../MultiSelelct";
import { Formik, Form } from "formik";
import DateRangePicker from "rsuite/DateRangePicker";

export type FilterTypes = {
  statuses?: any;
  sources?: any;
  assignees?: any;
  compareDate: object;
};
let intVal: FilterTypes = {
  statuses:[],
  sources:[],
  assignees:[],
  compareDate: {},
};
const FilterArea = ({
  onSubmit,
  resetFilter,
}: {
  onSubmit: (values: FilterTypes) => void;
  resetFilter: (resetForm: () => void) => void;
}) => {
  let { data: datastatus, isLoading: isloadStatus } = useGetStatus();
  let { data: dataSource, isLoading: isloadSource } = useGetSource();
  let { data: dataAssign, isLoading: isloadAssign } = useGetAssign();
  return (
    <Formik initialValues={intVal} onSubmit={onSubmit}>
      {({ resetForm, setFieldValue, setFieldTouched, values }) => (
        <Form>
          <div className="grid grid-cols-5 gap-2 p-4">
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
                appearance="default"
                placeholder="Contacted date"
                className="w-full cursor-pointer"
                placement="bottomEnd"
                onChange={(datesArray: any) => {
                  if (datesArray?.length > 0) {
                    const fromDate = datesArray[0]?.toISOString();
                    const toDate = datesArray[1]?.toISOString();
                    const dateRangeObject = {
                      contacted_date_from: fromDate,
                      contacted_date_to: toDate,
                    };
                    setFieldValue("compareDate", dateRangeObject);
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="submit"
                className=" text-white bg-gray-400 text-sm hover:bg-gray-500 rounded-md  px-1 "
              >
                Filter
              </button>
              <button
                type="button"
                onClick={() => resetFilter(resetForm)}
                className=" text-gray-400 border border-gray-400 text-sm hover:border-gray-500 rounded-md truncate px-1"
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
