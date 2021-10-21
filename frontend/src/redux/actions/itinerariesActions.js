import axios from "axios";
const itinerariesActions = {
  getItineraries: (id) => {
    return async (dispatch, getState) => {
      let respuesta = await axios.get(
        ` http://localhost:4000/api/itineraries/${id}`
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
        let res = await axios.get(`http://localhost:4000/api/activities/${id}`);
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
          `http://localhost:4000/api/like/${id}`,
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
          `http://192.168.0.125:4000/api/comment/${id}`,
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
          `http://localhost:4000/api/comment-delete/${id}`,
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
