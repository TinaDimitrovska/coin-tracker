import "./App.css";
import Container from "@material-ui/core/Container";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "./Context/UseContext";
import Overview from "./Components/Overview";
import WizzardStep1 from "./Components/WizzardStep1";
import WizzardStep2 from "./Components/WizzardStep2";
import WizzardStep3 from "./Components/WizzardStep3";
import Categories from "./Components/Categories";
import Statistics from "./Components/Statistics";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Provider>
          <Container component="main" maxWidth="xl" style={{ padding: 0 }}>
            <Router>
              <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/overview" component={Overview} />
                <Route path="/wizzard" component={WizzardStep1} />
                <Route path="/wizzardStep2" component={WizzardStep2} />
                <Route path="/wizzardStep3" component={WizzardStep3} />
                <Route path="/categories" component={Categories} />
                <Route path="/statistics" component={Statistics} />
              </Switch>
            </Router>
          </Container>
        </Provider>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
