import React, { useContext } from "react";
import HeaderLogo from "./HeaderLogo";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { ListItemIcon } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { UserContext } from "../Context/UseContext";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    width: "75%",
    borderBottom: "1px solid grey",
    display: "flex",
    justifyContent: "flex-end",
  },
  margin: {
    backgroundColor: "#651fff",
    width: "25%",
    "&:hover": {
      backgroundColor: "#651fff",
    },
    marginTop: "100px",
  },
  text: {
    letterSpacing: "3px",
    textTransform: "uppercase",
    fontSize: "28px",
  },
  paragraph: {
    marginTop: "25px",
    fontSize: "19.8px",
  },
  right: {
    width: "45%",
  },
}));

export default function WizzardStep3() {
  const { category } = useContext(UserContext);

  const classes = useStyles();

  let history = useHistory();
  const routeChange = () => {
    let path = `/overview`;
    history.push(path);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <HeaderLogo />
        <Typography component="h1" variant="h5" className={classes.text}>
          Welcome
        </Typography>
        <Typography variant="subtitle2" className={classes.paragraph}>
          Type how much money you have planned to receive and spend monthly
        </Typography>

        <List className={classes.root}>
          {category.map((item) => {
            return (
              item.isEnabled === true && (
                <ListItem button key={item.id} color="black">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className={classes.divider}>
                    <InputBase
                      className={classes.right}
                      onChange={(e) => (item.budget = e.target.value)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            );
          })}
        </List>
        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={routeChange}
        >
          Complete
        </Button>
      </div>
    </>
  );
}
