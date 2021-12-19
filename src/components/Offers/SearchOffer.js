import React, { useEffect, useState } from "react";
import {
  Grid
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm } from "react-material-ui-form-validator";
import { searchOffers } from "../../Redux/Offers/OffersActions";
import BaseButton from "../Base/BaseButton"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import OffersTable from "./OffersTable";
const clientOffer = require("../../API/clientOffer");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/home.jpg'})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ced2d8",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    "& > *": {
      marginTop: theme.spacing(2),
    },
    flexGrow: 1,
  },
  card: {
    padding: "25px",
    borderRadius: "25px",
    backgroundColor: "rgb(255, 255, 255)",
    textAlign: "center",
  },
  labelProfile: {
    fontSize: "2em",
    fontWeight: "bold",
    fontFamily: "Hind Guntur, sans-serif",
    color: "#054231",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

function SearchOffer() {
  const classes = useStyles();
  const [offerTypes, setOfferTypes] = useState([]);
  const [businessOffer, setBusinessOffer] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [areaRanges, setAreaRanges] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [regions, setRegions] = useState([]);
  const [offer, setOffer] = useState({});
  useEffect(()=>{
    const promise = clientOffer.getOfferTypes();
    promise.then(res=>{
      setOfferTypes(res.result.offerTypes)
    })
    const promiseBusiness = clientOffer.getBusinessOffer();
    promiseBusiness.then(res=>{
      setBusinessOffer(res.result.businessOffer)
    })
    const promiseProvince = clientOffer.getProvince();
    promiseProvince.then(res=>{
      setProvinces(res.result.provinces)
    })
    const promiseAreaRanges = clientOffer.getAreaRanges();
    promiseAreaRanges.then(res=>{
      setAreaRanges(res.result.areaRanges)
    })
    const promisePriceRanges = clientOffer.getPriceRanges();
    promisePriceRanges.then(res=>{
      setPriceRanges(res.result.priceRanges)
    })
    
  },[])
  const dispatch = useDispatch();
  const searchClick = (page) => {
    dispatch(searchOffers({offer,page}));
  };

  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };
  const handleChangeProvince = (e) => {
      setOffer({ ...offer, [e.target.name]: e.target.value });
      const promiseRegion = clientOffer.getRegions(e.target.value);
      promiseRegion.then(res=>{
        setRegions(res.result.regions)
    })
  }
  return (
    <div>
          <ValidatorForm 
          className={classes.root}
            component="fieldset" 
            dir="rtl"
            onSubmit={()=>searchClick(1)}
            encType="multipart/form-data">
          <Grid container >
            <Grid item>
            <FormControl className={classes.formControl}>  
              <TextField 
                name="text"
                multiline
                value={offer.text} 
                onChange={e => handleChange(e)} 
                label="بحث عن عرض" />
            </FormControl>
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>  
              <InputLabel htmlFor="offerType">السعر</InputLabel>
              <Select 
                name="price"
                value={offer.price} 
                onChange={e => handleChange(e)}
                inputProps={{ 'aria-label': 'age' }}
                >
                <MenuItem value="">الكل</MenuItem>
              {priceRanges.length===0?<React.Fragment />:
                priceRanges.map(type =>(
                  <MenuItem value={type._id}>{type.from} to {type.to}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>  
              <InputLabel htmlFor="offerType">المساحة</InputLabel>
              <Select 
                name="area"
                value={offer.area} 
                onChange={e => handleChange(e)}>
                <MenuItem value="">الكل</MenuItem>
              {areaRanges.length===0?<React.Fragment />:
                areaRanges.map(type =>(
                  <MenuItem value={type._id}>{type.from} to {type.to}</MenuItem>
                ))
              }
              </Select>
            </FormControl>  
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="offerType">نوع العقار</InputLabel>
              <Select 
                name="offerType"
                value={offer.offerType} 
                onChange={e => handleChange(e)}>
                <MenuItem value="">الكل</MenuItem>
              {offerTypes.length===0?<React.Fragment />:
                offerTypes.map(type =>(
                  <MenuItem value={type._id}>{type.offerTypeArabicName}</MenuItem>
                ))
              }
              </Select>
            </FormControl>  
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="offerType">نوع العرض</InputLabel>
              <Select 
                name="businessOffer"
                value={offer.businessOffer} 
                onChange={e => handleChange(e)}>
                <MenuItem value="">الكل</MenuItem>
              {businessOffer.length===0?<React.Fragment />:
                businessOffer.map(business =>(
                  <MenuItem value={business._id}>{business.BusinessOfferArabicName}</MenuItem>
                ))
              }
              </Select>
            </FormControl>  
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="offerType">المحافظة</InputLabel>
              <Select 
                name="province"
                value={offer.province} 
                onChange={handleChangeProvince}>
                <MenuItem value="">الكل</MenuItem>
              {provinces.length===0?<React.Fragment />:
                provinces.map(province =>(
                  <MenuItem value={province._id}>{province.provinceArabicName}</MenuItem>
                ))
              }
              </Select>
            </FormControl>  
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="offerType">المنطقة</InputLabel>
              <Select
                  name="region"
                  value={offer.region} 
                  label="المنطقة"
                  onChange={e => handleChange(e)}>
                <MenuItem value="">الكل</MenuItem>
              {!regions?<MenuItem value="">الكل</MenuItem>:
                regions.map(region =>(
                  <MenuItem value={region._id}>{region.regionArabicName}</MenuItem>
                ))
              }
              </Select>
            </FormControl>  
            </Grid>
            <Grid item>
            <BaseButton type="submit" content="بحث"></BaseButton>
            </Grid>
          </Grid>
          </ValidatorForm>
          
          <div style={{ padding: "30px" }}>
            <OffersTable isSearch={true} offer={offer}/>
          </div>
        
    </div>
  );
}
export default SearchOffer;

