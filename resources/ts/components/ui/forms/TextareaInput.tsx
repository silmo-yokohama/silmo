import React from "react";

interface TextareaInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (name: string, value: string) => void;
}

const TextareaInput: React.FC<TextareaInputProps> = ({ id, value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(id as string, e.target.value);
  };

  return <textarea id={id} value={value} onChange={handleChange} {...props} />;
};

export default TextareaInput;
