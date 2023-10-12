"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InpouProbes {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InpouProbes> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        className="
    block
    text-sm
    font-medium
    leading-6
    text-gray-900
    "
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 foucs:ring-2 fouus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors[id] && "foucs:ring-ross-500",
            disabled && "opacity-50 cursor-default"
          )}
        ></input>
      </div>
    </div>
  );
};

export default Input;
