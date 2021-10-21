import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
//creo el store
import { Provider } from "react-redux";
//voy a proveer con el store a toda mi app, por eso envulevo a app que es el padre de mi aplicación
import rootReducer from "../src/redux/reducers/rootReducer";
import thunk from "redux-thunk";
const myStore = createStore(rootReducer, applyMiddleware(thunk));

// mystore tiene un objecto con propiedad y valor, te va a modificar rootReducer

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  //los proveo con el store, por eso envuelvo a app con la etiqueta Provider
  document.getElementById("root")
);
