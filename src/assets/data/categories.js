import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import MoneyIcon from "@material-ui/icons/Money";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import PeopleIcon from "@material-ui/icons/People";
import PaymentIcon from "@material-ui/icons/Payment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import CommuteIcon from "@material-ui/icons/Commute";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalMallIcon from "@material-ui/icons/LocalMall";

export const categoriesData = [
  {
    id: 1,
    type: "income",
    name: "Salary",
    budget: "0",
    icon: <LocalAtmIcon />,
    isEnabled: false,
  },
  {
    id: 2,
    type: "income",
    name: "Bonus",
    budget: "0",
    icon: <MoneyIcon />,
    isEnabled: false,
  },
  {
    id: 3,
    type: "income",
    name: "Gifts",
    budget: "0",
    icon: <CardGiftcardIcon />,
    isEnabled: false,
  },
  {
    id: 4,
    type: "income",
    name: "From Family",
    budget: "0",
    icon: <PeopleIcon />,
    isEnabled: false,
  },
  {
    id: 5,
    type: "expense",
    name: "Bills",
    budget: "0",
    icon: <PaymentIcon />,
    isEnabled: false,
  },
  {
    id: 6,
    type: "expense",
    name: "Food",
    budget: "0",
    icon: <FastfoodIcon />,
    isEnabled: false,
  },
  {
    id: 7,
    type: "expense",
    name: "Transport",
    budget: "0",
    icon: <CommuteIcon />,
    isEnabled: false,
  },
  {
    id: 8,
    type: "expense",
    name: "Fitness",
    budget: "0",
    icon: <FitnessCenterIcon />,
    isEnabled: false,
  },
  {
    id: 9,
    type: "expense",
    name: "Events",
    budget: "0",
    icon: <RestaurantIcon />,
    isEnabled: false,
  },
  {
    id: 10,
    type: "expense",
    name: "Clothes",
    budget: "0",
    icon: <LocalMallIcon />,
    isEnabled: false,
  },
];
