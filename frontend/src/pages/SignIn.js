import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import GoogleLogin from "react-google-login";
const SignIn = (props) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const formSubmit = (e) => {
    if (Object.keys(user).some((property) => user[property] === "")) {
      Toast.fire({
        icon: "warning",
        title: "Oops! Fields cannot be empty!",
      });
      return false;
    }
    async function signIn() {
      try {
        let res = await props.signIn(user);
        if (!res.data.success) {
          if (res.data.response[0].message) {
            Toast.fire({
              icon: "warning",
              title: res.data.response[0].message,
            });
          } else {
            Toast.fire({
              icon: "warning",
              title: res.data.response,
            });
          }
        } else {
          Toast.fire({
            icon: "success",
            title: "Welcome back !",
          });
        }
      } catch (e) {
        Swal.fire({
          icon: "warning",
          title: "Oops...We have a problem. 😥 Try later!",
          text: "In moments you will be redirected to Home.",
        });
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
        console.log(e);
      }
    }
    signIn();
  };
  const responseGoogle = async (response) => {
    let userGoogle = {
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      flagGoogle: true,
    };
    try {
      let res = await props.signIn(userGoogle);
      if (!res.data.success) {
        if (res.data.response[0].message) {
          Toast.fire({
            icon: "warning",
            title: res.data.response[0].message,
          });
        } else {
          Toast.fire({
            icon: "warning",
            title: res.data.response,
          });
        }
      } else {
        Toast.fire({
          icon: "success",
          title: "Welcome back !",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "warning",
        title: "Oops...We have a problem. 😥 Try later!",
        text: "In moments you will be redirected to Home.",
      });
      setTimeout(() => {
        props.history.push("/");
      }, 3000);
      console.log(e);
    }
  };
  return (
    <>
      <Header
        photo='fondoForm.png'
        title='Welcome back !'
        subtitle="Log in to discover and connect with MYtinerary's global community!"
        button={
          <div className='div-form'>
            <form className='row'>
              <div id='emailHelp' className='form-text col-md-4 m-1 '>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={inputHandler}
                />
              </div>
              <div id='exampleInputPassword1' className='col-md-4 '>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={inputHandler}
                />
              </div>
              <div className='buttons'>
                <button
                  onClick={formSubmit}
                  type='button'
                  className='btn btn-dark col-md-2 m-2'>
                  Sign In
                </button>
                <GoogleLogin
                  type='button'
                  className='btn btn-dark col-md-2 m-2'
                  clientId='51461104755-rc63mundpq3i34ujiubmuo9o314gr1bg.apps.googleusercontent.com'
                  buttonText='Sign In with Google'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <p className='form'>
                Don't have an account? <Link to='/signUp'>Sign up here!</Link>
              </p>
            </form>
          </div>
        }
      />
      <Footer />
    </>
  );
};
const mapDispatchToProps = {
  signIn: usersActions.signIn,
};
export default connect(null, mapDispatchToProps)(SignIn);
