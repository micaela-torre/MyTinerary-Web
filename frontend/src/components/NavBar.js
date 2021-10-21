import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import usersActions from "../redux/actions/usersActions";
const NavBar = (props) => {
  return (
    <>
      <nav className='navbar navbar-expand-sm navbar-light p-0'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink exact to='/' className='nav-link'>
                  HOME
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/cities' className='nav-link'>
                  CITIES
                </NavLink>
              </li>

              <li className='nav-item'>
                {!props.token && (
                  <NavLink to='/signIn' className='nav-link'>
                    SIGN IN
                  </NavLink>
                )}
              </li>
              <li className='nav-item'>
                {!props.token && (
                  <NavLink to='/signUp' className='nav-link'>
                    SIGN UP
                  </NavLink>
                )}
              </li>

              <li className='nav-link'>
                {props.token && (
                  <h4 className='welcome'>Welcome , {props.name}!</h4>
                )}
              </li>

              <li className='nav-item dropdown'>
                {!props.token ? (
                  <Link
                    to=''
                    className='nav-link dropdown-toggle'
                    id='navbarDropdownMenuLink'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <img
                      className='logo'
                      src='/assets/user.png'
                      alt='logo-user'
                      width='30'
                    />
                  </Link>
                ) : (
                  <Link
                    to=''
                    className='nav-link dropdown-toggle'
                    id='navbarDropdownMenuLink'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <img
                      className='logo'
                      src={props.url}
                      alt='logo-user'
                      width='30'
                    />
                  </Link>
                )}
                {!props.token ? (
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdownMenuLink'>
                    <li>
                      <Link to='signIn' className='dropdown-item'>
                        SIGN IN
                      </Link>
                    </li>
                    <li>
                      <Link to='signUp' className='dropdown-item'>
                        SIGN UP
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdownMenuLink'>
                    <li>
                      <h5 className='logOut'>SETTINGS</h5>
                    </li>
                    <li>
                      <h5 className='logOut' onClick={() => props.logOut()}>
                        LOG OUT
                      </h5>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    name: state.users.name,
    url: state.users.url,
  };
};
const mapDispatchToProps = {
  logOut: usersActions.logOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
