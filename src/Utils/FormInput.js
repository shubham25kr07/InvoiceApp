import React from 'react';

const FormInput = ({
    value,
    label,
    name,
    testId,
    type,
    onChange,
    onBlur,
    className,
    isDisabled = false,
}) => (
    <>
        <div>
            <label>{label}</label>
        </div>

        <input
            data-testid={testId}
            className={className || 'input'}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={isDisabled}
        />
    </>
);

export default FormInput;
