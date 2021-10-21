import NavBar from "./NavBar";

const Header = (props) => {
  return (
    <header
      id='hero'
      style={{ backgroundImage: `url('${props.photo}')` }}>
      <NavBar />
      <div className='hero-titulo'>
        <h1 className='fw-bold'>{props.title} </h1>
        <h3> {props.subtitle}</h3>
        {props.button}
      </div>
    </header>
  );
};
export default Header;
