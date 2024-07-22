import { useState, useEffect } from 'react';
import { Input, Select, InputNumber } from 'antd';

const FloatInput = props => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState(props.value || '');

    const { label, placeholder, type, required, children, ...restProps } = props;

    const isOccupied = focus || (value && value.length !== 0);
    const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';
    const requiredMark = required ? <span className='text-danger'>*</span> : null;

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
    }, [props.value]);

    const handleChange = e => {
        let newValue;
        if (type === 'number' || type === 'select') {
            newValue = e;
        } else if (e && e.target) {
            newValue = e.target.value;
        } else {
            newValue = e;
        }
        setValue(newValue);
        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);

    const inputClass = isOccupied ? 'input-occupied' : '';

    return (
        <div className={`float-label ${inputClass}`}>
            {type === 'textarea' ? (
                <Input.TextArea
                    {...restProps}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            ) : type === 'select' ? (
                <Select
                    {...restProps}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`ant-select-custom ${inputClass}`}>
                    {children}
                </Select>
            ) : type === 'number' ? (
                <InputNumber
                    {...restProps}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ width: '100%' }}
                />
            ) : (
                <Input {...restProps} value={value} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
            )}
            <label className={labelClass}>
                {isOccupied ? label : placeholder} {requiredMark}
            </label>
        </div>
    );
};

export default FloatInput;
