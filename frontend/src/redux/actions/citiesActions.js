import axios from "axios";

const citiesActions = {
  getAllCities: (token) => {
    return async (dispatch, getState) => {
      let respuesta = await axios.get("https://mytinerary-web.herokuapp.com/api/cities");
      let info = respuesta.data.response;
      if (!respuesta.data.success) {
        throw new Error();
      }
      dispatch({ type: "GET_ALL_CITIES", payload: info });
    };
  },
  filterCity: (choose) => {
    return (dispatch) => {
      dispatch({ type: "FILTER_CITY", payload: choose });
    };
  },
};
export default citiesActions;
