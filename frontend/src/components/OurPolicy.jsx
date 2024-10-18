import { FaExchangeAlt, FaStar, FaHeadset } from 'react-icons/fa';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <FaExchangeAlt className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We Offer Trading Items for Sneakers </p>
        </div>
        <div>
            <FaStar className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We Offer Trading Items for Sneakers </p>
        </div>
        <div>
            <FaHeadset className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>24-hours customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy