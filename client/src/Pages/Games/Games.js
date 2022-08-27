import { Switch, Route } from "react-router-dom";
import GameList from "../../Components/GameList/GameList";
import GameDetails from "../../Components/GamesDetails/GameDetails.js";
import './Games.scss'
import EditGame from '../../Components/EditGames/EditGame.js';
import PageHeader from '../../Components/Header/Header';
import AddGame from '../../Components/AddGames/AddGame';
import Footer from "../../Components/Footer/Footer";


function WarehousePage() {
  return (
    <>
      <PageHeader isActive='Warehouse' />
      <div className='component-wrapper'>
        <Switch>
          <Route path='/' exact component={GameList} />
          <Route path='/game' exact component={GameList} />
          <Route path='/game/add' component={AddGame} />
          <Route path='/game/edit/:id' component={EditGame} />
          <Route path='/game/:id' component={GameDetails} />
        </Switch>
        <Footer />

      </div>
    </>
  );
}

export default WarehousePage;
