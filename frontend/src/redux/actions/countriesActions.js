import axios from "axios";
const countriesActions = {
  getCountries: () => {
    return async (dispatch, getState) => {
      let res = await axios.get("https://restcountries.eu/rest/v2/#");
      dispatch({ type: "GET_COUNTRIES", payload: res.data });
    };
  },
};

export default countriesActions;
