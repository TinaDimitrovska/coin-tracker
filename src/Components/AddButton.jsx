import { Button } from "@material-ui/core";
import EditEntry from "./EditEntry";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { UserContext } from "../Context/UseContext";

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: "#00ffff",
  },
  add: {
    position: "relative",
    bottom: "25px",
    right: "15px",
  },
  modal: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    height: "80%",
    position: "relative",
  },

  btns: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    top: "90%",
  },
  btn: {
    color: "white",
    backgroundColor: "#5200cc",
    marginBottom: "15px",
    "&:hover": {
      backgroundColor: "#5200cc",
    },
  },
  dialog: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: theme.palette.background,
    margin: "10px auto",
  },
}));

export default function AddButton() {
  const {
    handleClose,
    open,
    openModal,
    setOpenModel,
    setEdit,

    entry,
    setEntry,
  } = useContext(UserContext);

  const classes = useStyles();

  const bodyFab = (
    <div className={classes.btns}>
      <Button
        className={classes.btn}
        onClick={() => {
          setOpenModel(true);
          setEdit(false);
          setEntry({
            ...entry,
            type: "expense",
          });
        }}
      >
        Add Expense
      </Button>

      <Button
        className={classes.btn}
        onClick={() => {
          setOpenModel(true);
          setEdit(false);
          setEntry({ ...entry, type: "income" });
        }}
      >
        Add Income
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        onClose={handleClose}
      >
        {bodyFab}
      </Modal>
      <div>{openModal ? <EditEntry handleClose={handleClose} /> : null}</div>
    </div>
  );
}
