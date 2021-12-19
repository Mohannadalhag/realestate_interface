import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { deleteOffer, likeOffer, myOffers, recommendedOffers, savedOffers, saveOffer, searchOffers } from '../../Redux/Offers/OffersActions';
import { Link, useLocation } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { getOffers } from "../../Redux/Offers/OffersActions";
import BasicPagination from "../Base/BasicPagination";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FormLabel } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
const useStyles = makeStyles((theme) => ({
    root: {
    backgroundColor: "#ced2d8",
    },
    mobileStepper:{
        backgroundColor: "#eee",
    },
    card: {
    backgroundColor: "#eee",
    '& > *': {
        marginTop: theme.spacing(2),
    },    
    flexGrow: 1,
    maxWidth: 350,
    minWidth:250,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }    
  }));
function OffersTable ({isSearch, offer, SavedOffers, MyOffers, RecommendedOffers}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [currPage , setCurrPage ] = useState(1)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [ItemIdDelete, setItemIdDelete] = React.useState(false);
    useEffect(()=>{
        var str = location.search;
        let page = new URLSearchParams(str).get("page")
        if(!page || page<= 0 ) page =1
        if(MyOffers)
            dispatch(myOffers(page))
        else if(SavedOffers)
            dispatch(savedOffers())
        else if(RecommendedOffers)
            dispatch(recommendedOffers(page))
        else if(isSearch)
            dispatch(searchOffers({offer,page}))
        else dispatch(getOffers(page));
        setCurrPage(parseInt(page))
    },[location,dispatch,MyOffers,SavedOffers,isSearch, RecommendedOffers])
    const setOffersByPage = (page) => {
        setCurrPage(parseInt(page))
        if(MyOffers)
            dispatch(myOffers(page))
        else if(SavedOffers)
            dispatch(savedOffers())
        else if(RecommendedOffers)
            dispatch(recommendedOffers(page))
        else if(isSearch)
            dispatch(searchOffers({offer,page}))
        else dispatch(getOffers(page));
        setActiveStep([0,0,0,0,0,0,0,0,0,0,0,0])
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getLink=(id)=> {
        return '?' + id;
    }
    const Offers = useSelector(state => state.Offers);
    const [activeStep, setActiveStep] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
    const theme = useTheme();
    const handleNext = (requestedIndex) => {
        setActiveStep(activeStep.map((element,index)=>index===requestedIndex?element+1:element));
    };
  
    const handleBack = (requestedIndex) => {
        setActiveStep(activeStep.map((element,index)=>index===requestedIndex?element-1:element));
    };

    const handleLikeOffer = (index) => {
        dispatch(likeOffer(index))
    }
    const handleSaveOffer = (index) => {
        dispatch(saveOffer(index,SavedOffers?true:false))
    }
    return (
        <div>

            <Grid container spacing={1}>
            {!Offers && Offers.offers.length <= 0 ?<div>{!Offers?<div><h2>Loading...</h2></div>:<div></div>}</div>:
                <React.Fragment>
                    
                {Offers.offers.map((item,index) => (
                    <Grid item lg={4} sm={6} xs={12} md ={4}>
                        <Card  className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="offer photo"
                                    height="200"
                                    image={item.images.length!==0?item.images[activeStep[index]]:'/logo512.png'}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <MobileStepper
                                    steps={item.images.length}
                                    position="static"
                                    variant="text"
                                    className={classes.mobileStepper}
                                    activeStep={activeStep[index]}
                                    nextButton={
                                    <Button size="small" onClick={()=>handleNext(index)} disabled={activeStep[index] === item.images.length - 1}>
                                        Next
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                    </Button>
                                    }
                                    backButton={
                                    <Button size="small" onClick={()=>handleBack(index)} disabled={activeStep[index] === 0}>
                                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                        Back
                                    </Button>
                                    }
                                />
                                
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.businessOffer.BusinessOfferArabicName+" "+item.offerType.offerTypeArabicName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.region.province.provinceArabicName +" - "+ item.region.regionArabicName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Grid container spacing={1}>
                            {item.userOfferStatus!=="myOffer"?<Grid item lg={4} sm={4} xs={4} md ={4} />:
                            <React.Fragment>
                                <Grid item lg={2} sm={2} xs={2} md ={2}>
                                <Button 
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    value={item._id} 
                                    size="small"
                                    onClick={() => { 
                                        setItemIdDelete(item._id);
                                        handleClickOpen(); }}>
                                    حذف
                                </Button>
                                </Grid>
                                <Grid item lg={2} sm={2} xs={2} md ={2}>
                                <Link 
                                    style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                    to={'/editOffer'+getLink(item._id)}>
                                    <Button size="small" value={item._id} color="primary">
                                        تعديل</Button>
                                </Link>
                                </Grid>
                            </React.Fragment>
                            }
                            <Grid item lg={2} sm={2} xs={2} md ={2}>
                            <Link 
                                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                to={'/detailsOffer'+getLink(item._id)}>
                                <Button size="small" value={item._id} color="primary">تفاصيل</Button>
                            </Link>
                            </Grid>
                            <Grid item lg={2} sm={2} xs={2} md ={2} style={{ marginTop:'6px'}} dir="rtl">
                            <FormLabel>{item.numberOfLikes}</FormLabel>   
                            </Grid>
                            {item.userOfferStatus==="notRegistered"?<Grid item lg={3} sm={3} xs={3} md ={3} />:
                                <React.Fragment>
                                    <Grid item lg={2} sm={2} xs={2} md ={2}>
                                    <Button
                                        color="secondary"
                                        style={{ marginBottom:'8px', maxWidth:'5px'}}
                                        startIcon={item.isLiked?<FavoriteIcon />:<FavoriteBorderIcon />}
                                        size="large"
                                        onClick={() => { handleLikeOffer(item._id) }}>
                                    </Button>
                                    </Grid>
                                    <Grid item lg={2} sm={2} xs={2} md ={2}>
                                    <Button
                                        color="secondary"
                                        style={{ marginBottom:'8px'}}
                                        startIcon={item.isSaved?<BookmarkIcon />:<BookmarkBorderIcon />}
                                        size="large"
                                        onClick={() => { handleSaveOffer(item._id) }}>
                                    </Button>
                                    </Grid>
                                </React.Fragment>
                            }
                            </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                </React.Fragment>
            }
            </Grid>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
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
                        dispatch(deleteOffer(ItemIdDelete));
                        handleClose(); 
                        }} 
                        color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                {!Offers || Offers.offers.length <= 0 ?<div></div>:<div className={classes.card}>
                    <BasicPagination count={Offers.pageCount} page={currPage} setPage={setOffersByPage} />
                    </div>
                }
            </div>
        </div>);
    }
        export default OffersTable;