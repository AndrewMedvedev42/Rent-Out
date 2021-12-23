import { Link } from "react-router-dom";

export const NavigationMenuBack = () => {
    return (
        <nav className="navigation-menu">
            <Link to="/">
                <button>Back</button>
            </Link>
        </nav>
    )
}