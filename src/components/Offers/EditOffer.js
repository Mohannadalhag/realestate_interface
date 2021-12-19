import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { FormLabel,
         Grid} from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//import {idle, success, fail, wait} from '../../actions/EmployeeSuccessActions'
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm} from 'react-material-ui-form-validator';
import BaseButton from '../Base/BaseButton';
import { editOffer } from "../../Redux/Offers/OffersActions";
import BaseUploadImage from "../Base/BaseUploadImage"
import BaseTextValidator from "../Base/BaseTextValidator"
import NumberTextValidator from "../Base/NumberTextValidator"
import {  } from "react-router-dom";
const path = require("path");
const clientOffer = require("../../API/clientOffer");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
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
  }
}));

function EditOffer() {
  const classes = useStyles();
  const history = useHistory();
  const [maxSize] = useState(1 * 1024 * 1024);
  const [srcImage, setSrcImage] = useState("/assets/upload.png");////
  const [imageError, setImageError] = useState("");
  const user = useSelector(state => state.User);
  const [offerTypes, setOfferTypes] = useState([]);
  const [businessOffer, setBusinessOffer] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState([]);
  const Offers = useSelector(state => state.Offers);
  const [regions, setRegions] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const [offer, setOffer] = useState({
    price: "",
    description:"",
    region: "",
    offerType: "",
    businessOffer: "",
    area: "",
    images: [],
  });



    
    useEffect(()=>{
      var str = location.search;
      var id = str.substring(1);
      const promiseOffer = clientOffer.getbyId(id);
      promiseOffer.then(offerRes => {
          setOffer(offerRes.result.offer);
          setOffer({
            price: offerRes.result.offer.price,
            description:offerRes.result.offer.description,
            region: offerRes.result.offer.region._id,
            offerType: offerRes.result.offer.offerType._id,
            businessOffer: offerRes.result.offer.businessOffer._id,
            area: offerRes.result.offer.area,
            images: offerRes.result.offer.images,
          });
          
        const promiseProvince = clientOffer.getProvince();
        promiseProvince.then(provinceRes=>{
        setProvinces(provinceRes.result.provinces)
          const promiseRegion = clientOffer.getRegions(offerRes.result.offer.region.province._id);
              promiseRegion.then(res=>{
                setRegions(res.result.regions)
                setProvince(offerRes.result.offer.region.province._id)
          })
        })
        });
      const promise = clientOffer.getOfferTypes();
      promise.then(res=>{
      setOfferTypes(res.result.offerTypes)
      })
      const promiseBusiness = clientOffer.getBusinessOffer();
      promiseBusiness.then(res=>{
      setBusinessOffer(res.result.businessOffer)
      })
    },[location]);
    


    const EditClick = () => {
        //var str = location.pathname;
        //var pos = str.substring(11);
        var str = location.search;
        var pos = str.substring(1);
        
        dispatch(editOffer({body:offer,id:pos}));
    }

    const UploadImage = (imagesToUpload) => {
      if (imagesToUpload === undefined) {
        return;
      }
      setImageError("Wait please");
      setSrcImage("/assets/waiting.jpg");
      const data = new FormData();
  
      for (const file of imagesToUpload) {
        data.append('images', file, file.name);
        const extension = path.extname(file.name);
        if (extension !== ".jpeg" && extension !== ".png" && extension !== ".jpg") {
          setImageError("This extension is not allowed\nchoose(jpeg,jpg,png)");
          return;
        }
        if (file.size > maxSize) {
          setImageError(
            "This Image is not allowed\nImage size limit is 1 MegaByte"
          );
          setImageError("Wait please");
          setSrcImage("/assets/waiting.jpg");
          return;
        }
      }
      const promise = clientOffer.uploadImage(data);
      promise.then((res) => {
        //setImages(images.concat(res.result.names));
        setOffer({...offer,images:offer.images.concat(res.result.names)})
      })
      .catch(() => {
        setImageError("Try again please");
        setSrcImage("/assets/upload.png");////
      });
      setImageError("Success");
    };
    
  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };
  const handleChangeProvince = (e) => {
    const promiseRegion = clientOffer.getRegions(e.target.value);
      promiseRegion.then(res=>{
      setRegions(res.result.regions)
    })
  }
    return (
      <div className={classes.root}>
      {!user.user.role ? <div>{history.push("login")}</div>:
        <Grid container direction="row" justify="center" alignItems="stretch">
          {Offers.error==="edited"?history.goBack():<div></div>}
        {console.log("jjjjj",offer)}
        <Grid item xs={10} sm={9} md={8} lg={6}>
        <div className={classes.card}>
            <div className={classes.labelProfile}>تعديل عرض</div>
            <ValidatorForm 
              component="fieldset" 
              onSubmit={EditClick}
              encType="multipart/form-data">
                
              <BaseTextValidator
                  required={true}
                  name="description"
                  value={offer.description} 
                  label="الوصف" 
                  onChange={e => handleChange(e)} />
              <NumberTextValidator
                  required={true}
                  name="price"
                  value={offer.price} 
                  label="السعر" 
                  onChange={e => handleChange(e)} />
              <NumberTextValidator 
                  required={true}
                  name="area"
                  value={offer.area} 
                  onChange={e => handleChange(e)} 
                  label="المساحة" />
              <br/>
              <FormLabel htmlFor="offerType">نوع العقار</FormLabel>
              <br />
              <br />

              <Select 
                required
                name="offerType"
                value={offer.offerType} 
                onChange={e => handleChange(e)}>
              {offerTypes.length===0?<React.Fragment />:
                offerTypes.map(type =>(
                  <MenuItem value={type._id}>{type.offerTypeArabicName}</MenuItem>
                ))
              }
              </Select>
              <br/>
              <br/>
              <FormLabel htmlFor="offerType">نوع العرض</FormLabel>
              <br />
              <br />
              <Select 
                required
                name="businessOffer"
                value={offer.businessOffer} 
                onChange={e => handleChange(e)}>
              {businessOffer.length===0?<React.Fragment />:
                businessOffer.map(business =>(
                  <MenuItem value={business._id}>{business.BusinessOfferArabicName}</MenuItem>
                ))
              }
              </Select>

              <br />
              <br />
              
              <FormLabel htmlFor="offerType">المحافظة</FormLabel>
              <br />
              <br />
              <Select 
                required
                onChange={handleChangeProvince}
                value={province}>
              {provinces.length===0?<React.Fragment />:
                provinces.map(province =>(
                  <MenuItem value={province._id}>{province.provinceArabicName}</MenuItem>
                ))
              }
              </Select>

              <br />
              <br />
              
              <FormLabel htmlFor="offerType">المنطقة</FormLabel>
              <br />
              <br />
              <Select
                  name="region"
                  required
                  value={offer.region} 
                  onChange={e => handleChange(e)}>
              {regions.length===0?<React.Fragment />:
                regions.map(region =>(
                  <MenuItem value={region._id}>{region.regionArabicName}</MenuItem>
                ))
              }
              </Select>

              <br />
              <br />
              <FormLabel htmlFor="offerType">اضافة صور</FormLabel>
              <br />
              <br />

              <BaseUploadImage
                alt="Employee"
                srcImage={srcImage}
                onChange={e => UploadImage(e.target.files)}
                onMouseEnter={()=>{
                  if(imageError!=='Wait please'){
                    setSrcImage('/assets/upload.png');
                  }
                }}
                onMouseLeave={()=>{
                  if(imageError!=='Wait please'){
                    setSrcImage('/assets/upload.png');
                  }
              }}/>
              <br />
              <br />
              {imageError!=='Success' && imageError!=='Wait please'?<span style={{color: "red"}}>{imageError}</span>:<div>تمت اضافة الصور بنجاح</div>}

              <br />
                
                <BaseButton type="submit" content="تعديل عرض"></BaseButton>
            </ValidatorForm>
        </div>
        </Grid>
    
        </Grid>
        
      }
    </div>
          
    );
}


export default EditOffer;
