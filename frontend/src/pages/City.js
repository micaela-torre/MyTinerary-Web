import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import citiesActions from "../redux/actions/citiesActions";
import { useEffect } from "react";
import Itinerary from "../components/Itinerary";
import Swal from "sweetalert2";
const City = (props) => {
  useEffect(() => {
    async function getItineraries() {
      try {
        await props.getItineraries(props.match.params.id);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: "Oops...We have a problem. 😥 Try later!",
          text: "In moments you will be redirected to Home.",
        });
        setTimeout(() => {
          props.history.push("/");
        }, 2000);
      }
    }
    getItineraries();
    if (!props.infoCities.length) {
      return props.getCities();
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!props.infoCities.length) {
    return <Preloader />;
  }

  var city = props.infoCities.find(
    (city2) => city2._id === props.match.params.id
  );

  if (!city) {
    return (
      Swal.fire({
        icon: "warning",
        title: "Oops...We have a problem. 😥 Try later!",
        text: "In moments you will be redirected to Home.",
      }),
      setTimeout(() => {
        props.history.push("/cities");
      }, 1000)
    );
  }

  var headerCity = (
    <div className='only-city'>
      <Header
        photo={city.photo}
        title={city.name}
        subtitle='Welcome!'
        button={
          <div className='info-extra'>
            <div className='extra'>
              <div
                className='one'
                style={{
                  backgroundImage: "url('/assets/moneda.png')",
                }}></div>
              <p>{city.money}</p>
            </div>
            <div className='extra'>
              <div
                className='one'
                style={{
                  backgroundImage: "url('/assets/idioma.png')",
                }}></div>
              <p>{city.language}</p>
            </div>
            <div className='extra'>
              <div
                className='one'
                style={{
                  backgroundImage: "url('/assets/nroUno.png')",
                }}></div>
              <p>{city.theBest}</p>
            </div>
          </div>
        }
      />
    </div>
  );

  var filterItinerary = props.itineraries.map((itinerary) => (
    <Itinerary itinerary={itinerary} key={itinerary._id} {...props} />
  ));

  const itineraryNotFound = (
    <div
      className='not'
      style={{ backgroundImage: 'url("/assets/notItinerary.png")' }}></div>
  );

  var itineraryFinally = !filterItinerary.length
    ? itineraryNotFound
    : filterItinerary;

  return (
    <>
      {headerCity}
      <h2 className='itineraryh2 '>
        The adventure you were looking for awaits you💜
      </h2>
      <div className='box-itinerary'>{itineraryFinally}</div>
      <div
        className='recomendaciones'
        style={{ backgroundImage: 'url("/assets/recomendacion.png")' }}>
        <h3>Recommendations for traveling to {city.country}</h3>
        <p>{city.recommendation}</p>
      </div>

      <Footer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    infoCities: state.cities.cities,
    itineraries: state.itineraries.itineraries,
  };
};
const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
  getCities: citiesActions.getAllCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(City);
