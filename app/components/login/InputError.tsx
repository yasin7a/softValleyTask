import { ErrorMessage } from "formik";
import React from "react";

const InputError = ({ name }: { name: string }) => {
  return (
    <div className="block h-4 text-red-500 text-xs mt-1">
      <ErrorMessage name={name} />
    </div>
  );
};

export default InputError;
