import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import CarouselSection from "../components/CarouselSection";

const Home = () => {
  window.scrollTo(0, 0);
  return (
    <div
      className=' container-fluid p-0 m-0'
      id='start'
      style={{ backgroundImage: "url('/assets/fondo.png')" }}>
      <Header
        photo='https://i.postimg.cc/rmkq7CDv/fondoC.jpg'
        title='MYTINERARY'
        subtitle='Find your perfect trip, designed by insiders who know and love their
          cities!'
        button={
          <Link to='/cities'>
            <button type='button' className='btn btn-primary'>
              CLICK HERE!
            </button>
          </Link>
        }
      />
      <CarouselSection />
      <Footer fondo='fondoF.png' />
    </div>
  );
};
export default Home;
