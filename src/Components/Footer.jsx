import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SvgIcon from "@material-ui/core/SvgIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShapes } from "@fortawesome/free-solid-svg-icons";
import { faStream } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router";
import { useState } from "react";
import AddButton from "./AddButton";
import { UserContext } from "../Context/UseContext";

const useStyles = makeStyles((theme) => ({
  row: {
    height: theme.spacing(9),
    backgroundColor: "#5200cc",
    color: "white",
    display: "flex",
    justifyContent: "space-around",
  },
  color: {
    color: "inherit",
    maxWidth: "50%",
  },
  fab: {
    backgroundColor: "#00ffff",
  },
  add: {
    position: "relative",
    bottom: "25px",
    right: "15px",
  },
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const history = useHistory();
  const { handleClickOpen } = useContext(UserContext);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        history.push(`/${newValue}`);
        setValue(newValue);
      }}
      className={classes.row}
      showLabels
      position="fixed-bottom"
    >
      <BottomNavigationAction
        label="Overview"
        icon={<HomeIcon />}
        className={classes.color}
        value="overview"
      />

      <BottomNavigationAction
        label="Categories"
        icon={<FontAwesomeIcon icon={faShapes} size="2x" />}
        className={classes.color}
        value="categories"
      />
      <BottomNavigationAction
        label="Statistics"
        icon={<FontAwesomeIcon icon={faStream} size="2x" rotation="270" />}
        className={classes.color}
        value="statistics"
      />

      <Tooltip
        title="Add"
        aria-label="add"
        className={classes.add}
        onClick={handleClickOpen}
      >
        <Fab className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <AddButton />
    </BottomNavigation>
  );
}
