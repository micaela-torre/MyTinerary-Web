import { NavLink, Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer
      className='d-flex container-fluid'
      style={{ backgroundImage: "url('/assets/fonditoo.png')" }}>
      <div className='nav-footer'>
        <NavLink exact to='/'>
          HOME
        </NavLink>
        <NavLink to='/cities'>CITIES</NavLink>
        <Link to=''>
          <img src='/assets/user.png' width='25' alt='user' />
        </Link>
      </div>
      <h4>© MYTINERARY 2021 - ALL RIGHTS RESERVED</h4>
    </footer>
  );
};
export default Footer;
