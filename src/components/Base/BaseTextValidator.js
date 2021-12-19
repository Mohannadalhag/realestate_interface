import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
    textValidator:{
        fontSize:"large",
        margin:"5px"
    }
}));


function BaseTextValidator({required, validators, errorMessages, value, name, label, onChange,fullWidth}) {   
    const classes = useStyles();
    
    return (
        <TextValidator
            multiline
            className={classes.textValidator}
            required={required}
            validators={validators}
            fullWidth={fullWidth}
            errorMessages={errorMessages}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default BaseTextValidator;
