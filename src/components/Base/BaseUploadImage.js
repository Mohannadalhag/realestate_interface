import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonUpload: {
    width:'20px',
    margin:'10px',
    height:'20px',
    borderRadius:'10px'
  },
  imgProfile:{
    width:'60px',
    height:'60px',
    margin:'10px 20px',
    borderRadius:'10px',
},
  
}));


function BaseUploadImage({srcImage, alt, onMouseEnter, onMouseLeave, onChange}) {   
    const classes = useStyles();
    return (
      <React.Fragment>
      <Button
        variant="contained"
        component="label"
        className={classes.buttonUpload}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <img 
          alt="Employee" 
          className={classes.imgProfile} 
          src={srcImage}
          />
        <input
            type="file" 
            inputprops={{ accept: 'image/*' }}
            name="image" 
            multiple
            onChange={onChange}
            hidden/>
      </Button>
      </React.Fragment>
    );
}
export default BaseUploadImage;
