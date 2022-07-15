import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ListEntries from "./Lists/ListEntries";
import ListExpenses from "./Lists/ListExpenses";
import ListIncome from "./Lists/ListIncome";

export default function Overview() {
  return (
    <div>
      <Header />
      <ListIncome />
      <ListExpenses/>
      <ListEntries />
      <Footer />
    </div>
  );
}
