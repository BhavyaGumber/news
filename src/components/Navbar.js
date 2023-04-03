import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpIcon from '@mui/icons-material/Help';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",

  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  container:{
    display:"flex",
    justifyContent:"space-between",
    
    width:"100%",
  },
  
  link: {
    textDecoration: "none",
    color: "gray",
    fontSize: "17px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "black",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" style={{backgroundColor:"white", color:"black"}}>
      <CssBaseline />
      <Toolbar>
      
      <img src="https://www.shutterstock.com/image-illustration/pink-jelly-letter-isolated-on-260nw-65065048.jpg" style={{height:"60px",width:"60px", cursor:"pointer"}}/>
        
        {isMobile ? (
          <DrawerComponent />
          
        ) : (
          <div className={classes.container}>
          <div  className={classes.navlinks}>
            <Link to="/news" className={classes.link}>
              LEARN
            </Link>
            <Link to="/news" className={classes.link}>
              BLOG
            </Link>
            <Link to="/news" className={classes.link}>
              BOOKMARK
            </Link>
            <Link to="/news" className={classes.link}>
              UI KIT
            </Link>
            <Link to="/news" className={classes.link}>
              RESOURCES
            </Link>
            </div>
            <div>
            <Link to="/news" className={classes.link}>  <TwitterIcon/></Link>
          <Link to="/news" className={classes.link}>  <InstagramIcon/></Link>
          <Link to="/news" className={classes.link}>  <MailOutlineIcon/></Link>
          <Link to="/news" className={classes.link}>  <HelpIcon/></Link>
          </div>
                
            
          
          </div>
           
       
        
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
