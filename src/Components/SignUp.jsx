import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
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
    margin: "0 15px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [btnState, setBtnState] = React.useState(true);

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
    if (values.password.length >= 8 && values.password.length < 32) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }, [values.password]);

  let history = useHistory();

  const routeChange = (e) => {
    e.preventDefault();
    let path = `/wizzard`;
    history.push(path);
  };

  return (
    <>
      <HeaderLogo />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          SIGN UP
        </Typography>
        <form>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            fullWidth
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              type="email"
              multiple
              onChange={handleChange("email")}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              required
              autoComplete="password"
              onChange={handleChange("password")}
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
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={routeChange}
            disabled={btnState}
          >
            Sign Up
          </Button>

          <Box color="gray">{"Already have an account?"}</Box>
          <Link href="/" variant="body2" color="initial">
            Sign in please
          </Link>
        </form>
      </div>
    </>
  );
}
