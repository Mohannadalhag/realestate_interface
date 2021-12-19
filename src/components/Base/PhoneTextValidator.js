import React from 'react';
import BaseTextValidator from './BaseTextValidator';
function PhoneTextValidator({required, name, value, label, onChange}) {   
    return (
        <BaseTextValidator
            required={required}
            validators={['matchRegexp:^[+]?[0-9 ]{5,20}$']}
            errorMessages={['Enter Phone Number Ex:+965 50872287']}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default PhoneTextValidator;
