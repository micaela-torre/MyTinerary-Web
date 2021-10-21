import { combineReducers } from "redux";
import citiesReducer from "../citiesReducer";
import itinerariesReducer from "../reducers/itinerariesReducers";
import countriesReducer from "./countriesReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  countries: countriesReducer,
  users: usersReducer,
});
export default rootReducer;
