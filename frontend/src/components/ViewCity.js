import { Link } from "react-router-dom";

const ViewCity = ({ city }) => {
  return (
    <Link to={`/city/${city._id}`} key={city._id}>
      <div
        className='card'
        style={{ backgroundImage: `url("${city.photo}")` }}>
        <div className='card-dos'>
          <div className='card-tres'>
            <h4> {city.name}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ViewCity;
