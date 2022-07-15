import React, { useContext } from "react";
import { Paper, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../Context/UseContext";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: "15px 20px",
  },
  header: {
    textAlign: "left",
    background: theme.palette.grey[200],
    padding: theme.spacing(2),
  },
  expenseStyle: {
    backgroundColor: "red!important",
    "&.css-eglki6-MuiLinearProgress-root .css-5xe99f-MuiLinearProgress-bar1": {
      backgroundColor: "red!important",
    },
  },

  dialog: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: theme.palette.background,
    margin: "10px auto",
  },

  linear: {
    backgroundColor: "#e6ffff!important",
    "&.css-eglki6-MuiLinearProgress-root .css-5xe99f-MuiLinearProgress-bar1": {
      backgroundColor: "#00ffff!important",
    },
  },
}));

export default function ListExpenses() {
  const classes = useStyles();

  const { entries, category } = useContext(UserContext);

  const totalFn = (categ) => {
    let arr = entries
      .filter((item) => item.category === categ.name)
      .filter((el) => el.type === categ.type)
      .map((transaction) => transaction.amount);

    let sum = arr.reduce((acc, item) => (acc += parseInt(item)), 0);

    return sum;
  };

  return (
    <>
      <Paper className={classes.root}>
        <List style={{ marginBottom: "10px" }}>
          <Typography
            variant="h6"
            style={{
              textAlign: "left",
              padding: "8px",
              fontSize: "16px",
              backgroundColor: "lightgrey",
              color: "grey",
            }}
          >
            Expenses
          </Typography>

          {category.map((item) => {
            const { type, icon, budget, name, id, isEnabled } = item;

            console.log(item);

            const colorClass =
              totalFn(item) > budget ? classes.expenseStyle : classes.linear;

            return (
              isEnabled === true &&
              type === "expense" && (
                <>
                  <ListItem key={id} button style={{ padding: "10px 10px" }}>
                    <ListItemIcon>
                      <Icon>{icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={name} />

                    <ListItemText style={{ textAlign: "right" }} />
                    <Typography>{`${totalFn(item)}/${budget}`}</Typography>
                  </ListItem>
                  {budget > 0 && (
                    <Box sx={{ width: "75%", marginLeft: "60px" }}>
                      <LinearProgress
                        className={colorClass}
                        variant="determinate"
                        value={(totalFn(item) / budget) * 100}
                      />
                    </Box>
                  )}
                </>
              )
            );
          })}
        </List>
      </Paper>
    </>
  );
}
