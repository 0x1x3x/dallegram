import React from "react";

const FormFields = ({
  name,
  type,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div className="flex items-center justify-between gap-1 w-full lg:w-auto">
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="text-3xl mr-1"
        >
          🤯
        </button>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-gray-900 focus:border-gray-900 outline-none block w-full lg:w-[310px] px-3 py-2.5"
      />
    </div>
  );
};

export default FormFields;
