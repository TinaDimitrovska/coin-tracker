import React, { useContext, useState } from "react";
import { Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../Context/UseContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";

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
  divider: {
    width: "75%",
    borderBottom: "1px solid grey",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ListEntries() {
  const classes = useStyles();

  const {
    entries,
    handleOpenModal,
    setEdit,
    entry,
    setEntry,
    reset,
    deleteEntry,
  } = useContext(UserContext);

  const [contextMenu, setContextMenu] = React.useState(null);

  const [currEntry, setCurrEntry] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
    setCurrEntry(item);
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  return (
    <>
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
          Entries
        </Typography>
        <List>
          {entries.map((item) => {
            const {
              idEntry,
              icon,
              category,
              amount,
              date,
              type,
              desc,
              categoryId,
            } = item;

            const colorClass =
              type === "income" ? classes.incomeStyle : classes.expenseStyle;

            return (
              <ListItem
                key={idEntry}
                id={idEntry}
                button
                onContextMenu={(e) => {
                  handleContextMenu(e, item);
                }}
                onClick={() => {
                  handleOpenModal(item);
                  setEdit(true);
                  setEntry({
                    ...entry,
                    type: type,
                    amount: amount,
                    desc: desc,
                    category: category,
                    date: date,
                    idEntry: idEntry,
                    categoryId: categoryId,
                    icon: icon,
                  });
                }}
                style={{ padding: "0px 10px", cursor: "context-menu" }}
              >
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={category}
                  secondary={date
                    .toISOString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                />

                <ListItemText
                  style={{ textAlign: "right" }}
                  primary={type === "income" ? "+" + amount : "-" + amount}
                  className={colorClass}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleOpenModal();
            setEntry(currEntry);
          }}
        >
          Duplicate
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleOpenModal();
            reset();
          }}
        >
          Create new
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            reset();
            handleClickOpenDialog();
          }}
          style={{ color: "red" }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog();
              deleteEntry(currEntry);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
