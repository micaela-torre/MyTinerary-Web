import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='notFound'>
      <div className='mars'></div>
      <img
        src='https://assets.codepen.io/1538474/404.svg'
        className='logo-404'
        alt='logo'
      />
      <img
        src='https://assets.codepen.io/1538474/meteor.svg'
        className='meteor'
        alt='meteor'
      />
      <p className='title2'>OH NO!!!</p>
      <p className='subtitle'>
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </p>
      <div align='center'>
        <Link to='/' className='btn-back'>
          BACK TO HOME
        </Link>
      </div>
      <img
        src='https://assets.codepen.io/1538474/astronaut.svg'
        className='astronaut'
        alt='astronaut'
      />
      <img
        src='https://assets.codepen.io/1538474/spaceship.svg'
        className='spaceship'
        alt='spaceship'
      />
    </div>
  );
};
export default NotFound;
