import React from "react";

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (name: string, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ id, value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id as string, e.target.value);
  };

  return <input id={id} value={value} onChange={handleChange} {...props} />;
};

export default TextInput;
