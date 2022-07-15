import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import Icon from "@material-ui/core/Icon";
import { UserContext } from "../Context/UseContext";
import { categoriesIcons } from "../assets/data/categoriesIcons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
  },
}));

export default function AddEditCategory({ handleClose, categories }) {
  const [item, setItem] = useState(
    categories || {
      type: "income",
      isEnabled: true,
      name: "",
      budget: 0,
      icon: categoriesIcons[0],
      id: new Date().valueOf(),
    }
  );
  console.log(item);

  // categories from context
  const { category, categoryUpdate, categoryAdd } = useContext(UserContext);

  const classes = useStyles();

  const isEditing = !!categories?.id;

  console.log(isEditing);

  const allUniqueIcons = [
    ...new Set(categoriesIcons.concat(category.map((c) => c.icon))),
  ];
  return (
    <>
      <DialogTitle>{`${isEditing ? "Edit" : "Add New"} Category`}</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? categoryUpdate(item) : categoryAdd(item);
          handleClose();
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
              value={item.type || "income"}
              onChange={(e) => {
                setItem({ ...item, type: e.target.value });
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
          >
            <TextField
              label="Name"
              variant="outlined"
              required
              value={item.name || ""}
              onChange={(e) => {
                setItem({ ...item, name: e.target.value });
              }}
            />
          </FormControl>

          <FormControl
            className={classes.formControl}
            variant="outlined"
            fullWidth
          >
            <InputLabel id="icon-label">Icon</InputLabel>
            <Select
              labelId="icon-label"
              value={item.icon || ""}
              onChange={(e) => {
                setItem({ ...item, icon: e.target.value });
              }}
              label="Icon"
            >
              {allUniqueIcons.map((icon) => (
                <MenuItem key={icon} value={icon}>
                  <Icon>{icon}</Icon>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            className={classes.formControl}
            variant="outlined"
            fullWidth
          >
            <TextField
              label="Budget"
              variant="outlined"
              value={item.budget || ""}
              onChange={(e) => {
                setItem({ ...item, budget: e.target.value });
              }}
            />
          </FormControl>

          <FormControl
            className={classes.formControl}
            style={{
              border: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              width: "99.5%",
            }}
          >
            <FormControlLabel
              value="start"
              label="Enabled"
              style={{
                height: "1.1876em",
                padding: "18.5px 0px",
                minWidth: "0",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
                marginRight: "0px",
              }}
              control={
                <Checkbox
                  color="grey"
                  checked={item.isEnabled}
                  onChange={(e) => {
                    setItem({ ...item, isEnabled: e.target.checked });
                  }}
                />
              }
              labelPlacement="start"
            />
          </FormControl>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose} style={{ color: "#5200cc" }}>
            Cancel
          </Button>
          <Button
            type={"submit"}
            style={{ backgroundColor: "#5200cc", color: "white" }}
            autoFocus
          >
            {`${isEditing ? "Update" : "Add"}`}
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
