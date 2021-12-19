import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch,useSelector } from 'react-redux';
//import { logout } from '../actions/LoginActions';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { logout } from "../Redux/Users/UsersActions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#13424C',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavMenu() {
  const user = useSelector(state => state.User);
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorProfile, setanchorProfile] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const openProfile = Boolean(anchorProfile);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleprofile = (event) => {
    setanchorProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseProfile = () => {
    setanchorProfile(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup></FormGroup>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={handleMenu}
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right" 
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/Offers"}>
                <MenuItem onClick={handleClose}>العروض</MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/SavedOffers"}>
                <MenuItem onClick={handleClose}>العروض المحفوظة</MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/RecommendedOffers"}>
                <MenuItem onClick={handleClose}>العروض المقترحة</MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/MyOffers"}>
                <MenuItem onClick={handleClose}>عروضي</MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/addOffer"}>
                <MenuItem onClick={handleClose}>أضافة عرض</MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/searchOffer"}>
                <MenuItem onClick={handleClose}>بحث عن عرض</MenuItem>
              </Link>
            </Menu>
          </div>
          <img src='/logo192.png' width="60px" alt="logo"/>
          <Typography variant="h6" className={classes.title}>
            Syrian Real Estate
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleprofile}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar-profile"
              anchorEl={anchorProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={openProfile}
              onClose={handleCloseProfile}
            >

              {!user.user.role?
              <div>
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/login"}>
                  <MenuItem onClick={handleCloseProfile}>تسجيل الدخول</MenuItem>
                </Link>
              </div>:
              <div>
                <MenuItem onClick={()=>{
                    handleCloseProfile();
                    history.push("/profile");
                  }}>الصفحة الشخصية</MenuItem>
                <MenuItem onClick={()=>{
                  dispatch(logout())
                  }}>تسجيل الخروج</MenuItem>
              </div>
            }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
