import React, { useContext, useEffect } from "react";
import HeaderLogo from "./HeaderLogo";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { UserContext } from "../Context/UseContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function WizzardStep1() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
    filled: {
      width: "100%",
    },
    form: {
      width: "70%",
      marginTop: theme.spacing(2),
      color: "#651fff",
      fontWeight: "bold",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
    },
    margin: {
      backgroundColor: "#651fff",
      width: "25%",
      position: "absolute",
      top: "280px",
      left: "50%",
      transform: "translateX(-50%)",
      "&:hover": {
        backgroundColor: "#651fff",
      },
    },
  }));
  const classes = useStyles();
  const theme = createTheme({
    direction: "rtl",
  });

  const [addAmount, setAddAmount] = useState("");
  const { amountValue } = useContext(UserContext);

  const [btn, setBtn] = useState(true);

  useEffect(() => {
    if (addAmount > 0 && addAmount !== "") {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [addAmount]);

  let history = useHistory();
  const routeChange = () => {
    let path = `/wizzardStep2`;
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
          How much money you have at the moment?
        </Typography>
        <ThemeProvider theme={theme}>
          <form autoComplete="off" className={classes.form} dir="rtl">
            <TextField
              className={classes.filled}
              id="filled-basic"
              label="Amount"
              variant="filled"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={() => {
                amountValue(addAmount);
                routeChange();
              }}
              disabled={btn}
            >
              Add
            </Button>
          </form>
        </ThemeProvider>
      </div>
    </>
  );
}
