import React from 'react';
import BaseTextValidator from './BaseTextValidator';
function NumberTextValidator({required, name, value, label, onChange}) {   
    return (
        <BaseTextValidator
            required={required}
            validators={['matchRegexp:^[0-9]{1,30}$']}
            errorMessages={['Enter Number']}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default NumberTextValidator;
