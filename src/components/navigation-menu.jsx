import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import firebase from "../util/firebase";
import {deleteHouse} from "../redux/actions/actions";

const NavigationBar = () => {

    const dispatch = useDispatch()

    const deleteAllHouses = () => {
        dispatch(deleteHouse())
        firebase.database().ref("apartment-list").remove();
    }

    return (
        <nav className="navigation-menu">
            <Link to="/Rent-Out-Application/submit">
                <button>Rent Out</button>
            </Link>
            <button onClick={deleteAllHouses}>Remove all Houses</button>
        </nav>
    )
}

export default NavigationBar