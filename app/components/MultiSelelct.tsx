import React, { ReactNode } from "react";

import Select, { components } from "react-select";

const ValueContainer = ({ children, ...props }: any) => {
  const { getValue, hasValue } = props;
  const nbValues = getValue().length;
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }
  return (
    <components.ValueContainer {...props}>
      {`${nbValues} selected`}
    </components.ValueContainer>
  );
};
// @ts-ignore
const getOptionValue = (option) => option.id;
// @ts-ignore
const getOptionLabel = (option) => option.name;
const MultiSelelct = ({
  options,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur,
}: {
  placeholder: string | ReactNode;
  name: string;
  options: Array<any>;
  value: any;
  handleChange: (value: any, name: string) => any;
  handleBlur: (name: string, value: any) => any;
}) => {
  const components = { ValueContainer };
  return (
    <Select
      isMulti
      hideSelectedOptions={false}
      isClearable={false}
      components={components}
      options={options}
      blurInputOnSelect={false}
      isSearchable={true}
      placeholder={placeholder}
      id="my-react-select"
      name={name}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      classNamePrefix="my-react-select"
      className="my-react-select-container"
      onChange={(val: any) => {
        handleChange(name, val);
      }}
      onBlur={() => {
        handleBlur(name, true);
      }}
      value={value}
    />
  );
};

export default MultiSelelct;
