import { Link } from "react-router-dom";
import { useState } from "react"
import firebase from "../util/firebase";

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