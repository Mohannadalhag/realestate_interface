import React from 'react';
import BaseTextValidator from './BaseTextValidator';
function EmailTextValidator({required, name, value, label, onChange}) {   
    return (
        <BaseTextValidator
            required={required}
            validators={['isEmail']}
            errorMessages={['Enter Email']}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default EmailTextValidator;
