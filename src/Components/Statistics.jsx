import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../Context/UseContext";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    margin: "15px auto",
  },
}));

export default function Statistics() {
  const classes = useStyles();

  const { category, entries } = useContext(UserContext);

  // chart for income

  let label = category
    .filter((item) => item.type === "income")
    .filter((item) => item.isEnabled)
    .map((el) => el.name);

  let number = entries
    .filter((item) => item.type === "income")
    .map((el) => el.amount);

  const data = {
    labels: label,
    datasets: [
      {
        label: "Amount",
        data: number,
        backgroundColor: ["#00ffff"],
        borderColor: ["#00ffff"],
        borderWidth: 1,
      },
    ],
  };

  // chart for expenses

  let labelExpense = category
    .filter((item) => item.type === "expense")
    .filter((item) => item.isEnabled)
    .map((el) => el.name);

  let numberExp = entries
    .filter((item) => item.type === "expense")
    .map((el) => el.amount);
  const dataExpense = {
    labels: labelExpense,
    datasets: [
      {
        label: "Amount",
        data: numberExp,
        backgroundColor: ["#ff9999"],
        borderColor: ["#ff9999"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "y",

    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // chart for income & expenses

  const dates = entries.map((el) => el.date.getDay());

  const dataIncExp = {
    labels: dates,
    datasets: [
      {
        label: "Amount Expense",
        data: numberExp,
        fill: false,
        backgroundColor: "#00ffff",
        borderColor: "#00ffff",
        yAxisID: "y-axis-2",
      },
      {
        label: "Amount",
        data: number,
        fill: false,
        backgroundColor: "#ff9999",
        borderColor: "#ff9999",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const optionsExpInc = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
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
          Income
        </Typography>
        <Bar data={data} options={options} />
      </Paper>
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
          Expense
        </Typography>
        <Bar data={dataExpense} options={options} />
      </Paper>
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
          Expenses and Income
        </Typography>
        <Line data={dataIncExp} options={optionsExpInc} />
      </Paper>
      <Footer />
    </>
  );
}
