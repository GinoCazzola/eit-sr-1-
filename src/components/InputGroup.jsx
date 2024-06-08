import React, { useState } from 'react';

function InputGroup({
    id,
    inputLabel,
    inputType = "text",
    onChange = () => {},
    validation = () => "",
    values,
    ...props
}) {
    const [error, setError] = useState("");

    const validatedOnChange = e => {
        setError(validation(e.target.value));
        onChange(e);
    };

    return (
        <div className={`input-group__container${inputType === "checkbox" ? " input-group__checkbox" : ""}`}>
            <label htmlFor={id}>{inputLabel}</label>
            {
                inputType === "textarea" ? (
                    <textarea
                        id={id}
                        name={id}
                        onChange={validatedOnChange}
                        value={values[id]}
                        className={`input-group__input${error ? " error" : ""}`}
                        {...props}
                    />
                ) : (
                    <input
                        id={id}
                        name={id}
                        type={inputType}
                        onChange={validatedOnChange}
                        value={inputType !== "file" ? values[id] : ""}
                        className={`input-group__input${error ? " error" : ""}`}
                        {...props}
                    />
                )
            }
            <span className='input-group__text-error'>{error}</span>
        </div>
    );
}

export default InputGroup;
