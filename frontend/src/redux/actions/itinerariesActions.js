import axios from "axios";
const itinerariesActions = {
  getItineraries: (id) => {
    return async (dispatch, getState) => {
      let respuesta = await axios.get(
        ` https://mytinerary-web.herokuapp.com/api/itineraries/${id}`
      );
      let info = respuesta.data.response;
      if (!respuesta.data.success) {
        throw new Error();
      }
      dispatch({ type: "GET_ITINERARIES", payload: info });
    };
  },
  getActivitiesByItinerary: (id) => {
    return async () => {
      try {
        let res = await axios.get(`https://mytinerary-web.herokuapp.com/api/activities/${id}`);
        return res;
      } catch (e) {
        console.log(e);
      }
    };
  },
  putLike: (id, token) => {
    return async () => {
      try {
        let res = await axios.put(
          `https://mytinerary-web.herokuapp.com/api/like/${id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        return res.data;
      } catch (e) {
        console.log(e);
      }
    };
  },
  createComment: (id,comment,token) => {
    return async () => {
      try {
  
        let res = await axios.put(
          `https://mytinerary-web.herokuapp.com/api/comment/${id}`,
          {...comment },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        
        return res.data
      } catch (e) {
        console.log(e);
      }
    };
  },
  deleteComment: (id, token) => {
    return async () => {
      try {
        let res = await axios.delete(
          `https://mytinerary-web.herokuapp.com/api/comment-delete/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(res.data)
        return res.data;
      } catch (e) {
        console.log(e);
      }
    };
  },
};
export default itinerariesActions;
