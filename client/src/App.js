import "./Styles/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GamePage from "./Pages/Games/Games";
import ProfilePage from "./Pages/profile/profile";
import LoginScreen from "./Pages/auth/login";
import RegisterScreen from "./Pages/auth/register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={GamePage} />
        <Route path='/game' component={GamePage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/signup' component={RegisterScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
