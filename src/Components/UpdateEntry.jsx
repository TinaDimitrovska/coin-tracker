import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Dialog,
} from "@material-ui/core";
import React, { useContext, useState, Fragment } from "react";
import { UserContext } from "../Context/UseContext";
import Autocomplete from "@mui/material/Autocomplete";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
  },
  dialog: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: theme.palette.background,
    margin: "10px auto",
  },
}));

export default function UpdateEntry() {
  const {
    category,
    handleCloseModal,
    openModal,
    handleClose,
    updateEntry,
    setEdit,
    entries,
    entry,
    setEntry,
  } = useContext(UserContext);

  console.log(entry);

  const classes = useStyles();

  // date picker

  const [selectedDate, handleDateChange] = useState(new Date());
  const [valueOne, setValueOne] = useState(
    category.filter((item) => item.name === entry.category)[0]
  );

  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle>{"Edit Entry"}</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateEntry(entry);
            handleCloseModal();
          }}
        >
          <DialogContent>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
              required
            >
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                value={entry.type}
                onChange={(e) => {
                  setEntry({
                    ...entry,
                    type: entry.type,
                    idEntry: entries.length + 1,
                  });
                }}
                label="Type"
                id="filled-type"
              >
                <MenuItem value={"income"}>Income</MenuItem>
                <MenuItem value={"expense"}>Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
              required
            >
              <Autocomplete
                multiple
                options={category}
                value={valueOne}
                onChange={(event, value) => {
                  setValueOne(value);
                  setEntry({
                    ...entry,

                    idEntry: entries.length + 1,
                  });
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.icon}
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="outlined" />
                )}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
              required
            >
              <TextField
                label="Amount"
                variant="outlined"
                value={entry.amount}
                onChange={(e) => {
                  setEntry({
                    ...entry,
                    amount: e.target.value,
                    idEntry: entries.length + 1,
                  });
                }}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
              required
            >
              <Fragment>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="2018/10/10"
                  value={selectedDate}
                  onChange={(date) => {
                    handleDateChange(date);
                    setEntry({
                      ...entry,
                      date: date,
                      idEntry: entries.length + 1,
                    });
                  }}
                  format="dd.MM.yyyy"
                ></KeyboardDatePicker>
              </Fragment>
            </FormControl>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              fullWidth
            >
              <TextField
                label="Description (optinal)"
                variant="outlined"
                value={entry.desc}
                onChange={(e) => {
                  setEntry({
                    ...entry,
                    desc: e.target.value,
                    idEntry: entries.length + 1,
                  });
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => {
                handleCloseModal();
                handleClose();
              }}
              style={{ color: "#5200cc" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#5200cc", color: "white" }}
              autoFocus
              onClick={() => {
                handleClose();
                setEdit(false);
                handleCloseModal();
              }}
            >
              {"Edit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
