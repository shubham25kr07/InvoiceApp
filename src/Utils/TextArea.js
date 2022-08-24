const TextArea = ({
  className,
  id,
  placeholder,
  value,
  name,
  onChange,
  onBlur,
}) => {
  return (
    <textarea
      className={className}
      id={id}
      value={value}
      name={name}
      rows="4"
      cols="50"
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    ></textarea>
  );
};
export default TextArea;
