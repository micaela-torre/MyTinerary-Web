import Footer from "../components/Footer";
import Header from "../components/Header";
import ViewCity from "../components/ViewCity";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Cities = (props) => {
  useEffect(() => {
    async function getCities() {
      try {
        await props.getCities(props.token);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: "Oops...We have a problem. 😥 Try later!",
          text: "In moments you will be redirected to Home.",
        });
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      }
    }
    getCities();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.token]);
  var allCities = props.citiesFilter.map((city) => (
    <ViewCity key={city._id} city={city} />
  ));
  const cityNotFound = (
    <div
      className='ups'
      style={{ backgroundImage: 'url("/assets/ups.png")' }}></div>
  );

  var allCitiesFinally =
    props.citiesFilter.length !== 0 ? allCities : cityNotFound;
  return (
    <div
      className='container-fluid container-cities p-0'
      style={{ backgroundImage: "url('/assets/fondo.png')" }}>
      <Header
        photo='https://i.postimg.cc/pT8hRRQp/Dise-o-sin-t-tulo-42.png'
        title='FIND YOUR ADVENTURE!'
        subtitle='You came to the right place..🤍'
      />
      <div className='div-search'>
        <h2>Choose your next destination:</h2>
        <input
          type='text'
          placeholder='Search..'
          style={{ backgroundImage: "url('/assets/lupa.png')" }}
          onChange={(e) => props.filterCity(e.target.value.toLowerCase())}
        />
      </div>
      <main className='d-flex'>
        <div className='cities'>{allCitiesFinally}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    citiesFilter: state.cities.filterCities,
    token: state.users.token,
  };
};
const mapDispatchToProps = {
  getCities: citiesActions.getAllCities,
  filterCity: citiesActions.filterCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
