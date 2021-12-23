import {combineReducers} from "redux"
import { houseReducer } from "./houseReducer";

const rootReducers = combineReducers({
    house: houseReducer
})

export default rootReducers