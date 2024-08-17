import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  options: RadioOption[];
  value: string;
  onChange: (name: string, value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  options,
  value,
  onChange,
  required,
  className,
}) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`${id}-${option.value}`}
            name={id}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(id, e.target.value)}
            required={required}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label
            htmlFor={`${id}-${option.value}`}
            className="ml-3 block text-sm font-medium text-base-content"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
