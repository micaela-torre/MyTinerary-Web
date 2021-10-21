import { Link } from "react-router-dom";
import countriesActions from "../redux/actions/countriesActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import usersActions from "../redux/actions/usersActions";
import GoogleLogin from "react-google-login";

const Form = (props) => {
  console.log(props);
  useEffect(() => {
    async function getCountries() {
      try {
        await props.getCountries();
      } catch (e) {
        console.log(e);
      }
    }
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    url: "",
    country: "",
  });
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

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(user).some((property) => user[property] === "")) {
      Toast.fire({
        icon: "warning",
        title: "Oops! Fields cannot be empty!",
      });
      return false;
    }
    if (!user.email.includes("@")) {
      Toast.fire({
        icon: "warning",
        title: "Oops! email format entered is incorrect!",
      });
      return false;
    }
    try {
      let res = await props.signUp(user);
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
          title: "Account Created successfully!",
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "warning",
        title: "Oops...We have a problem. 😥 Try later!",
        text: "In moments you will be redirected to Home.",
      });
      setTimeout(() => {
        props.history.push("/");
      }, 3000);
    }
  };

  const responseGoogle = async (response) => {
    let userGoogle = {
      name: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      url: response.profileObj.imageUrl,
      country: "Argentina",
      google: true,
    };
    try {
      let res = await props.signUp(userGoogle);
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
          title: "Account Created successfully!",
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
    <div className='div-form'>
      <form className=' row'>
        <div className='col-md-4 '>
          <input
            className='form-control'
            type='text'
            name='name'
            placeholder='First name'
            value={user.name}
            onChange={inputHandler}
            required={{ value: true }}
          />
        </div>
        <div className='col-md-4'>
          <input
            className='form-control'
            type='text'
            name='lastname'
            placeholder='Last name'
            value={user.lastname}
            onChange={inputHandler}
            required
          />
        </div>
        <div id='emailHelp' className=' col-md-4 '>
          <input
            className='form-control'
            type='email'
            name='email'
            placeholder='Email'
            value={user.email}
            onChange={inputHandler}
            required
          />
        </div>
        <div id='exampleInputPassword1' className='col-md-4 '>
          <input
            className='form-control'
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            onChange={inputHandler}
            required
          />
        </div>
        <div className='col-md-4'>
          <input
            className='form-control'
            type='text'
            name='url'
            placeholder='URL of your picture'
            value={user.url}
            onChange={inputHandler}
            required
          />
        </div>
        <div className='caja col-md-4 '>
          <select
            className='form-select'
            name='country'
            aria-label='Default select example'
            onChange={inputHandler}>
            <option>Choose your country</option>
            {props.countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className='buttons'>
          <button
            type='button'
            className='btn btn-dark col-md-2 m-2'
            onClick={formSubmit}>
            Sign Up
          </button>

          <GoogleLogin
            className='btn btn-dark col-md-2 m-2'
            type='button'
            clientId='51461104755-rc63mundpq3i34ujiubmuo9o314gr1bg.apps.googleusercontent.com'
            buttonText=' Sign Up whit Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
      <p className='form'>
        Already have an account?
        <Link to='/signIn'>Sign In here!</Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    countries: state.countries.countries,
  };
};
const mapDispatchToProps = {
  getCountries: countriesActions.getCountries,
  signUp: usersActions.signUp,
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
