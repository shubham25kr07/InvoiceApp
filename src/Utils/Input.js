const Input = ({
    value,
    name,
    type,
    onChange,
    onBlur,
    className,
    id,
    isDisabled = false,
}) => {
    return (
        <input
            className={className || 'input'}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            disabled={isDisabled}
        />
    );
};

export default Input;
