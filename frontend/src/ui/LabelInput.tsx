const LabelInput = ({
  name,
  type,
  label,
  placeholder,
  disabled,
  defaultValue,
}: {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}) => {
  return (
    <>
      <label htmlFor={name} className="text-sm mt-3">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full mt-1 p-1 px-3 border border-gray-300 rounded disabled:opacity-75"
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default LabelInput;
