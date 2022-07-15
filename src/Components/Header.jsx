import React, { useContext } from "react";
import { UserContext } from "../Context/UseContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logo from "../../src/logo.png";
import { Avatar } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  title: {
    flexGrow: 1,
    color: "white",
    display: "flex",
    justifyContent: "center",
    fontSize: "25px",
  },
  row: {
    height: theme.spacing(10),
    backgroundColor: "#5200cc",
  },
  menu: {
    padding: "0px 10px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function Header() {
  const { apiData } = useContext(UserContext);
  const classes = useStyles();

  let location = useLocation();

  return (
    <>
      <div className={classes.paper}>
        <AppBar position="static" className={classes.row}>
          <Toolbar className={classes.menu}>
            <img src={Logo} alt="" width="10%" style={{ marginTop: "25px" }} />
            <Typography variant="h6" className={classes.title}>
              {location.pathname === "/overview"
                ? "Overview"
                : location.pathname === "/categories"
                ? "Categories"
                : location.pathname === "/statistics"
                ? "Statistics"
                : ""}
            </Typography>
            <Avatar
              alt=""
              src={"results" in apiData && apiData.results[0].picture.thumbnail}
              className={classes.large}
            />
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
