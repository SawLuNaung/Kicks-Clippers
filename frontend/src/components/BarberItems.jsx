import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BarberItems = ({ name, id, price, image }) => {
  return (
    <div className='border p-4 shadow-md hover:shadow-lg'>
      <Link to={`/barber/${id}`}>
        <img src={image} alt={name} className='w-full h-48 object-cover' />
        <h3 className='text-lg mt-2'>{name}</h3>
        <p className='text-gray-600'>${price}</p>
      </Link>
    </div>
  );
}

BarberItems.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default BarberItems;
