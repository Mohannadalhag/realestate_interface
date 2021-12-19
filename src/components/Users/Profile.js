import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import BaseButton from '../Base/BaseButton';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
       // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/home.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:'#ced2d8',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        '& > *': {
            marginTop: theme.spacing(2),
        },    
        flexGrow: 1,
    },
    card: {
      padding:"25px",
      //marginTop:"0px",
      maxWidth:'500px',
      borderRadius:'25px',
      backgroundColor:'rgb(255, 255, 255)',
      textAlign:'center'
    },
    imgProfile:{
      width:'200px',
      height:'200px',
      margin:'10px 20px',
      borderRadius:'100px',
    },
    labelProfile:{
      fontSize:'2em',
      fontWeight:'bold',
      fontFamily:'Hind Guntur, sans-serif',
      color:'#054231'
    },
    labelDetails:{
      fontSize:'1em',
      fontFamily:'Hind Guntur, sans-serif',
      color:'#054231'
    },
    modal:{
        borderRadius:'100px',
    },
    hideText:{
        color:'white',
        border:'0px',
        height:'0.5px',
        width:'0.5px',
        margin:'0px',
        padding:'0px'
    },
}));

function Offers() {
    const user = useSelector(state => state.User);
    const classes = useStyles();
    const [srcImage,] = useState();
    let history = useHistory();
    return (<div  className={classes.root}>
        {!user.user.role?<div></div>:
        <div>
        <div className={classes.card}>
        <div className={classes.labelProfile}>الصفحة الشخصية</div>
            {srcImage?<img alt="Employee" className={classes.imgProfile} src={srcImage}/>:<div></div>}
            <div>
                <div className={classes.labelDetails}><br />{user.user.firstName} {user.user.lastName}</div>
                {user.user.position?
                <div className={classes.labelDetails}><br />{user.user.position}</div>
                :<div></div>}
                {user.user.phone?
                <div className={classes.labelDetails}><br />{user.user.phone}</div>
                :<div></div>}
                {user.user.email?
                <div className={classes.labelDetails}><br />{user.user.email}</div>
                :<div></div>}
                {user.user.region?
                <div>
                    <div className={classes.labelDetails}><br />المحافظة: {user.user.region.province.provinceArabicName}</div>
                    <div className={classes.labelDetails}><br />المنطقة: {user.user.region.regionArabicName}</div>
                </div>
                :<div></div>}
            </div>
        </div>
        <div>
            <BaseButton
                size="small"
                onClick={()=>{history.push("/reset_email");}}
                content="تعديل الإيميل"/>
            <BaseButton
                size="small"
                onClick={()=>{history.push("/reset_pass");}}
                content="تعديل كلمة المرور"/>
        </div>
        </div>
        }
        </div>);
    }
export default Offers;
