import { useId } from "react";
const InputText = ({ label, type, ...otherProps }) => {
  const id = useId();
  //const { label, type, ...otherProps } = props;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      />
    </div>
  );
};
export default InputText;
