"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProbs {
  placeHolder: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProbs> = ({
  placeHolder,
  id,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeHolder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus-outline-none"
      ></input>
    </div>
  );
};

export default MessageInput;
