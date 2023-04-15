import React from "react";

const InputLabel = ({ htmlFor, label }: { htmlFor: string; label: string }) => {
  return (
    <label
      className="block text-gray-700 font-bold mb-2 capitalize"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
};

export default InputLabel;
