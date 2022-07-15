import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 15px",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#651fff",
    "&:hover": {
      backgroundColor: "#651fff",
    },
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [btn, setBtn] = useState(true);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (values.email !== "" && values.password.length >= 8) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [values.email, values.password]);

  let history = useHistory();
  const routeChange = () => {
    let path = `/overview`;
    history.push(path);
  };

  return (
    <>
      <HeaderLogo />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          SIGN IN
        </Typography>
        <form>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              type="email"
              multiple
              onChange={handleChange("email")}
              required
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              required
              value={values.password}
              onChange={handleChange("password")}
              autoComplete="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={btn}
            onClick={routeChange}
          >
            Sign In
          </Button>
          <Box>{"Don't have an account yet?"}</Box>
          <Box>
            <Link href="/signup" variant="body2" color="initial">
              {"Sign up now, it is free!"}
            </Link>
          </Box>
        </form>
      </div>
    </>
  );
}
