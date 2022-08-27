import { Switch, Route } from "react-router-dom";
import PageHeader from "../../Components/Header/Header";
import InventoryList from "../../Components/Profile/Profile";
import './profile.scss'

function InventoryPage()  {

    return (
    <>
        <PageHeader isActive='Inventory' />
        <div className="component-wrapper">
                <Switch>
                    <Route path='/profile' exact component={InventoryList} />
                </Switch>
        </div>
    </>
    )
}

export default InventoryPage;