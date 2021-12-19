import React,  { useState ,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import { deleteOffer } from '../../Redux/Offers/OffersActions';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import MobileStepper from '@material-ui/core/MobileStepper';
import BaseButton from '../Base/BaseButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
const clientOffer =require ('../../API/clientOffer');
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
            margin: theme.spacing(2),
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
    image:{
      maxWidth:'250px',
      maxHeight:'250px',
      borderRadius:'10px',
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
    }
  }));


function OfferDetails () {
    let history = useHistory();
    const theme = useTheme();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [Offer,setOffer] = useState();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(()=>{
        var str = location.search;
        var id = str.substring(1);
        const promise = clientOffer.getbyId(id);
        promise.then(res => {
            setOffer(res.result.offer);
        });

    },[location]);
        return <div  className={classes.root}>
            <Grid container spacing={1}>
            {Offer!==undefined?
            <React.Fragment>
                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={10}sm={8} md={6} lg={4}>
                <div>
                <div className={classes.card}>
                    <div>
                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} target="_blank" to={{ pathname: Offer.images[activeStep] }} >
                        <img
                        src={Offer.images[activeStep]}
                        alt="offer"
                        className={classes.image}
                        />
                    </Link>
                    <MobileStepper
                        steps={Offer.images.length}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === Offer.images.length - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                        }
                        backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                        }
                    />
                    </div>
                        <br></br>
                        {Offer.area!==0?<React.Fragment><div className={classes.labelDetails}>{Offer.area} :المساحة</div>
                        <br></br></React.Fragment>:<React.Fragment />}
                        {Offer.price!==0?<React.Fragment><div className={classes.labelDetails}>{Offer.price} :السعر</div>
                        <br></br></React.Fragment>:<React.Fragment />}
                        <div className={classes.labelDetails}>نوع العرض: {Offer.businessOffer.BusinessOfferArabicName}</div>
                        <br></br>
                        <div className={classes.labelDetails}>نوع العقار: {Offer.offerType.offerTypeArabicName}</div>
                        <br></br>
                        <div className={classes.labelDetails}>المحافظة: {Offer.region.province.provinceArabicName}</div>
                        <br></br>
                        <div className={classes.labelDetails}>المنطقة: {Offer.region.regionArabicName}</div>
                        <br></br>
                        <div className={classes.labelDetails}>الوصف: {Offer.description}</div>
                        <br></br>
                    </div> 
                    {Offer.userOfferStatus!=="myOffer"?<div></div>:
                        <div>
                            <BaseButton
                                startIcon={<DeleteIcon />}
                                value={Offer._id} 
                                size="small"
                                onClick={handleClickOpen}
                                content="Delete" />
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this Offer?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        No
                                    </Button>
                                    <Button 
                                    onClick={() => { 
                                        dispatch(deleteOffer(Offer._id));
                                        handleClose(); 
                                        history.push("/Offer");
                                        }} 
                                        color="primary" autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
                </div>
                </Grid>
                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
            </React.Fragment>
            :<div></div>}
            </Grid>
        </div>;
    }
    export default OfferDetails;