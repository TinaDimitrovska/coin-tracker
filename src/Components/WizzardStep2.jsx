import React, { useContext } from "react";
import HeaderLogo from "./HeaderLogo";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { ListItemIcon } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { UserContext } from "../Context/UseContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    backgroundColor: "#651fff",
    width: "25%",
    "&:hover": {
      backgroundColor: "#651fff",
    },
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
}));

export default function WizzardStep2() {
  const { category } = useContext(UserContext);
  const { changeEnabled } = useContext(UserContext);

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex > -1) {
      newChecked.splice(currentIndex, 1);
      category[value].isEnabled = false;
      setIsDisabled(true);
    } else {
      newChecked.push(value);
      category[value].isEnabled = true;
      setIsDisabled(false);
    }
    setChecked(newChecked);
    changeEnabled(category[value].isEnabled);
    console.log(newChecked);
  };

  let history = useHistory();
  const routeChange = () => {
    let path = `/wizzardStep3`;
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
          Choose what incomes you receive monthly and what you spend money on
        </Typography>

        <List className={classes.root}>
          {category &&
            category.map((item, idx) => {
              return (
                <ListItem button key={item.id} color="black">
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.name} />

                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(idx)}
                      color="default"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>

        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={routeChange}
          disabled={isDisabled}
        >
          Done
        </Button>
      </div>
    </>
  );
}
