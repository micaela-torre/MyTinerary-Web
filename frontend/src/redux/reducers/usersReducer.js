const usersReducer = (
  state = { token: null, name: null, url: null, lastname: null, _id: null },
  action
) => {
  switch (action.type) {
    case "LOG_INTO_SYSTEM":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("url", action.payload.url);
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        lastname: action.payload.lastname,
        url: action.payload.url,
        _id: action.payload._id,
      };
    case "LOG_OUT":
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("url");
      return {
        ...state,
        token: null,
        name: null,
        url: null,
        lastname: null,
        _id: null,
      };
    default:
  }
  return state;
};
export default usersReducer;
