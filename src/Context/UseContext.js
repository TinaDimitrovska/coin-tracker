import React, { createContext, useState, useEffect } from "react";
import { categoriesData } from "../assets/data/categories";

export const UserContext = createContext();

export const Provider = (props) => {
  const [apiData, setData] = useState([]);

  const [amount, setAmount] = useState([]);

  const [open, setOpen] = useState(false);

  const [openModal, setOpenModel] = useState(false);

  const [category, setCategories] = useState(categoriesData, () => {
    const localData = localStorage.getItem("category");
    return localData ? JSON.parse(localData) : [];
  });

  const [entries, setEntries] = useState([], () => {
    const localData = localStorage.getItem("entries");
    return localData ? JSON.parse(localData) : [];
  });
  const [entry, setEntry] = useState({
    type: "income" || "expense",
    category: "",
    categoryId: "",
    amount: 0,
    date: new Date(),
    desc: "",
    idEntry: 0,
    icon: "",
  });
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(apiData);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenModal = () => {
    setOpenModel(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseModal = () => {
    setOpenModel(false);
  };

  console.log(entries);

  //add new entry

  const addEntry = (entry) => {
    let el = entry;
    el = { ...el, idEntry: entries.length + 1 };
    entries.push(el);
    setEntries(entries);

    localStorage.setItem("entries", JSON.stringify(el));
  };

  //update entry

  const updateEntry = (entry) => {
    let arrUpdate = entries;
    let currIdx = entry.idEntry - 1;
    arrUpdate.splice(currIdx, 1, entry);

    setEntries(arrUpdate);

    localStorage.setItem("entries", JSON.stringify(arrUpdate));
  };

  //reset values in modal

  const reset = () => {
    setEntry({
      category: "",
      amount: "",
      desc: "",
    });
  };

  // delete entry

  const deleteEntry = (item) => {
    let idto = entries;
    let idx = item.idEntry - 1;

    idto.splice(idx, 1);

    for (let index = 0; index < idto.length; index++) {
      idto[index] = { ...idto[index], idEntry: index + 1 };
    }

    setEntries(idto);

    localStorage.setItem("entries", JSON.stringify(idto));
  };

  const amountValue = (addAmount) => {
    setAmount([...amount, addAmount]);
  };

  //add checked category

  const addCategory = (categories) => {
    setCategories([categories, ...category]);

    localStorage.setItem("category", JSON.stringify([categories, ...category]));
  };
  const changeEnabled = () => {
    let arrayToChange = category;
    arrayToChange.splice(category.id - 1, category);
    setCategories(arrayToChange);

    localStorage.setItem("category", JSON.stringify(arrayToChange));
  };

  //add new category

  const categoryAdd = (categories) => {
    setCategories([{ ...categories, id: new Date().valueOf() }, ...category]);
    localStorage.setItem(
      "category",
      JSON.stringify([{ ...categories, id: new Date().valueOf() }, ...category])
    );
  };

  // update category

  const categoryUpdate = (categories) => {
    const updated = category.map((c) => {
      if (c.id === categories.id) {
        return categories;
      } else {
        return c;
      }
    });

    setCategories(updated);

    localStorage.setItem("category", JSON.stringify(updated));
  };

  const userPhoto = {
    apiData,
    setData,
    amount,
    amountValue,
    category,
    addCategory,
    changeEnabled,
    categoryUpdate,
    categoryAdd,
    open,
    handleClickOpen,
    handleClose,
    openModal,
    handleOpenModal,
    setOpenModel,
    handleCloseModal,
    addEntry,
    entries,
    entry,
    setEntry,
    updateEntry,
    edit,
    setEdit,
    reset,
    deleteEntry,
  };

  return (
    <UserContext.Provider value={userPhoto}>
      {props.children}
    </UserContext.Provider>
  );
};
