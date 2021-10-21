import "./App.css";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import City from "./pages/City";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { connect } from "react-redux";
import usersActions from "./redux/actions/usersActions";
import { useEffect } from "react";
const App = (props) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.logIn(localStorage.getItem("token"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cities' component={Cities} />
        <Route path='/city/:id' component={City} />
        {!props.token && <Route path='/signUp' component={SignUp} />}
        {!props.token && <Route path='/signIn' component={SignIn} />}
        <Route path='/notFound' component={NotFound} />
        {props.token ? <Redirect to='/' /> : <Redirect to='/notFound' />}
      </Switch>
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.users.token,
  };
};
const mapDispatchToProps = {
  logIn: usersActions.logInLS,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
