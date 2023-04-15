import { Field } from "formik";
import React from "react";

const InputField = ({ ...props }) => {
  return (
    <Field
      {...props}
      className="border border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
    />
  );
};

export default InputField;
