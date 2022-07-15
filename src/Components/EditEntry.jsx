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

export default function EditEntry() {
  const {
    category,
    handleCloseModal,
    openModal,
    handleClose,
    addEntry,
    updateEntry,
    edit,
    entry,
    setEntry,
    reset,
  } = useContext(UserContext);

  const classes = useStyles();

  // date picker

  const [selectedDate, handleDateChange] = useState(new Date());
  const [valueOne, setValueOne] = useState(
    category.filter((item) => item.name === entry.category)
  );

  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle>{`${edit ? "Update" : "Add New"} Entry`}</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            edit ? updateEntry(entry) : addEntry(entry);
            handleCloseModal();
            reset();
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
                  setEntry({ ...entry, type: e.target.value });
                }}
                label="Type"
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
                options={category.filter((el) => el.isEnabled)}
                value={valueOne}
                onChange={(event, value) => {
                  setValueOne(value);
                  setEntry({
                    ...entry,
                    category: value[0].name,
                    icon: value[0].icon,
                    categoryId: value[0].id,
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
                value={entry.amount || ""}
                onChange={(e) => {
                  setEntry({ ...entry, amount: e.target.value });
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
                  value={entry.date}
                  onChange={(date) => {
                    handleDateChange(date);
                    setEntry({
                      ...entry,
                      date: date,
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
                  setEntry({ ...entry, desc: e.target.value });
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
              }}
            >
              {`${edit ? "Update" : "Add"}
               `}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
