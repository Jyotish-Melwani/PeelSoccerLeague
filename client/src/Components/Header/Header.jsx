import logo from '../../Assets/Logo/PeelSoccer-Logo.jpeg'
import { Link, useHistory } from 'react-router-dom'
import './Header.scss'
import Cookie from 'js-cookie'

const PageHeader = (props) => {
    const { isActive } = props;
    const history = useHistory()
    const userInfo = Cookie.get("userInfo")
        ? JSON.parse(Cookie.get("userInfo"))
        : null

    const logout = () => {
        Cookie.remove("userInfo")
        history.push('/login')
    }

    return (
        <nav className="page-header">
            <div className="page-header__logo-wrapper">
                <Link to="/">
                    <img className="page-header__logo-img" src={logo} alt="instock logo" />
                </Link>
            </div>
            <div className="page-header__wrapper">
                <Link
                    className={isActive === "Warehouse" ? "page-header__link page-header__link--active" : "page-header__link"}
                    to="/">
                    Games
                </Link>
                {userInfo ?
                    <>
                        <Link
                            className={isActive === "Inventory" ? "page-header__link  page-header__link--active" : "page-header__link"}
                            to="/profile">
                            Profile
                        </Link>

                        <Link
                            className={isActive === "Inventory" ? "page-header__link  page-header__link--active" : "page-header__link"}
                            onClick={() => logout()} >
                            logout
                        </Link>

                    </>
                    :
                    <Link
                        className={isActive === "Inventory" ? "page-header__link  page-header__link--active" : "page-header__link"}
                        to="/login">
                        Login
                    </Link>
                }

            </div>
        </nav>
    )
}

export default PageHeader