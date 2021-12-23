import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav className="navigation-menu">
            <Link to="/submit">
                <button>Rent Out</button>
            </Link>
        </nav>
    )
}

export default NavigationBar