import React from 'react';
import BaseTextValidator from './BaseTextValidator';
function NameTextValidator({required, name, value, label, onChange}) {   
    return (
        <BaseTextValidator
            required={required}
            validators={['matchRegexp:^[a-z A-Z\u0621-\u064A]{2,20}$']}
            errorMessages={['Enter name between 2 -> 20 letters']}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default NameTextValidator;
