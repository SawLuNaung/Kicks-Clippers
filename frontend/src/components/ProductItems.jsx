import PropTypes from 'prop-types';
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom";

const ProductItems = ({id,name,image,price}) => {

    const {currency} = useContext(ShopContext);
    const productImage = Array.isArray(image) && image.length > 0 ? image[0] : './hero.jpg';

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/products/${id}`}>
        <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={productImage} alt={name} />
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </div>
    </Link>
  )
}

ProductItems.propTypes = {
    id: PropTypes.string.isRequired,      // ID is a required string
    name: PropTypes.string.isRequired,    // Name is a required string
    image: PropTypes.oneOfType([
        PropTypes.string,     // Allow a single string
        PropTypes.arrayOf(PropTypes.string) // Allow an array of strings
      ]).isRequired,
    price: PropTypes.number.isRequired,   // Price is a required number
  };

export default ProductItems