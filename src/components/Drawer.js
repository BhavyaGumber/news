import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
 makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "black",
        fontSize: "20px",
        outline:"none"
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
         <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/news">LEARN</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/news">BLOCK</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/news">BOOKMARK</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/news">UI KIT</Link>
            </ListItemText>
            </ListItem>
            <ListItem>
            <ListItemText>
              <Link to="/news">RESOURCES</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <div style={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon/>
      </IconButton>
      </div>
    </>
  );
}
export default DrawerComponent;
