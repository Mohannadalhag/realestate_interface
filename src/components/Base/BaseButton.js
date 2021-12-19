import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button1: {
      backgroundImage: `url(https://kic-kw.com/assets/img/svg-mask.svg) !important`,
      
      backgroundColor:'#C2A377',
      borderColor:'#c38b3c',
      color:'#183861',

      padding:'19.5px 28.5px',
      borderRadius:'50px',
      backgroundSize:'100% 100%',
      fontWeight: 'bold',
      //margin:'16px 4px 0',
      lineHeight:'1',
      letterSpacing:'1.5px',
      position:'relative',
      overflow:'hidden',
        margin:'10px',
        borderWidth:'2px',
      fontSize:'16px',
      fontFamily:'philosopher',
      textAlign:'center',
      whiteSpace:'nowrap',
      border:'1px solid transparent',
      
      "&:hover": {
        borderColor:'#183861',
        backgroundColor:'#183861',
        color:'#C2A377',
      }
    },
    buttonUpload: {
      width:'200px',
      height:'200px',
      borderRadius:'100px'
    }
}));


function BaseButton({content, type, onClick, startIcon, size, value, onMouseEnter, onMouseLeave}) {   
    const classes = useStyles();
    return (
        <Button type={type} startIcon={startIcon} size={size} value={value} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} onClick={onClick} variant="contained" className={classes.button1}>{content}</Button>
    );
}
export default BaseButton;
