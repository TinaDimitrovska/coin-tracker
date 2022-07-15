import { Dialog, Paper, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UseContext";
import Footer from "./Footer";
import Header from "./Header";
import AddIcon from "@material-ui/icons/Add";
import AddEditCategory from "./AddEditCategory";

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
    color: theme.palette.secondary.main,
  },
  incomeStyle: {
    color: "#00ffff",
  },
  disabledStyle: {
    color: "grey",
  },
  dialog: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: theme.palette.background,
    margin: "10px auto",
  },
}));

export default function Categories() {
  const classes = useStyles();
  const { category } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  const handleClick = (_item) => {
    setOpen(true);
    setItem(_item);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header />
      <Paper className={classes.root}>
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
          Categories
        </Typography>
        <List>
          <ListItem
            button
            onClick={() => {
              handleClick();
            }}
            style={{ padding: "0px 10px" }}
          >
            <ListItemIcon>{<AddIcon />}</ListItemIcon>
            <ListItemText primary={"Add new category"} />
          </ListItem>

          {category.map((item) => {
            const { id, icon, name, type, budget, isEnabled } = item;

            const hasBudget = budget !== 0;
            const colorClass =
              type === "income" ? classes.incomeStyle : classes.expenseStyle;

            const greyClass =
              isEnabled === false ? classes.disabledStyle : colorClass;

            return (
              <ListItem
                className={(colorClass, greyClass)}
                key={id}
                button
                onClick={() => {
                  handleClick(item);
                }}
                style={{ padding: "0px 10px" }}
              >
                <ListItemIcon>
                  <Icon className={(colorClass, greyClass)}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={name} />
                <ListItemText
                  style={{ textAlign: "right" }}
                  primary={hasBudget ? budget : ""}
                  secondary={
                    !hasBudget ? "" : type === "income" ? "planned" : "budget"
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <AddEditCategory handleClose={handleClose} categories={item} />
      </Dialog>

      <Footer />
    </>
  );
}
