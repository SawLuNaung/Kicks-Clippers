import { useContext, useState, useEffect } from "react";
import { BarberContext } from "../context/BarberContext"; // BarberContext
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { Link } from "react-router-dom"; // To link to BarberDetail page
import Title from "../components/Title";  // Title component

const BarberCollection = () => {
  const { barbers, search, showSearch } = useContext(BarberContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterBarbers, setFilterBarbers] = useState([]);
  const [expertiseFilter, setExpertiseFilter] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle expertise filter
  const toggleExpertise = (e) => {
    if (expertiseFilter.includes(e.target.value)) {
      setExpertiseFilter(prev => prev.filter(item => item !== e.target.value));
    } else {
      setExpertiseFilter(prev => [...prev, e.target.value]);
    }
  };

  // Apply filters based on expertise and search
  const applyFilter = () => {
    let barbersCopy = barbers.slice();

    if (showSearch && search) {
      barbersCopy = barbersCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (expertiseFilter.length > 0) {
      barbersCopy = barbersCopy.filter(item => expertiseFilter.includes(item.expertise));
    }

    setFilterBarbers(barbersCopy);
  };

  // Sort barbers
  const sortBarbers = () => {
    let sortedBarbers = filterBarbers.slice();

    switch (sortType) {
      case 'low-high':
        setFilterBarbers(sortedBarbers.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterBarbers(sortedBarbers.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [expertiseFilter, search, showSearch, barbers]);

  useEffect(() => {
    sortBarbers();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Section */}
      <div className='min-w-[200px]'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS <FaChevronDown className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* Filter by expertise */}
        <div className={`border border-gray-300 rounded-lg pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-gray-700'>EXPERTISE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Haircut'} onChange={toggleExpertise} /> Haircut
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Beard Trim'} onChange={toggleExpertise} /> Beard Trim
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Shave'} onChange={toggleExpertise} /> Shave
            </p>
          </div>
        </div>
      </div>

      {/* Barber Cards Section */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL '} text2={'BARBERS'} />
          {/* Barbers Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 rounded-lg text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Barbers */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {
            filterBarbers.map((barber, index) => (
              <div 
                key={index} 
                className="relative group border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white hover:bg-gray-100"
              >
                {/* <Link to={`/barbers/${barber._id}`} className="no-underline text-gray-900"> */}
                  <div className="flex flex-col items-center">
                    <img className="w-24 h-24 mb-4 rounded-full border-2 border-gray-300" src={barber.image || '/default-barber.png'} alt={barber.name} />
                    <h2 className="font-semibold text-lg text-center">{barber.name}</h2>
                    <p className="text-center text-sm text-gray-500 mt-1">${barber.price}</p>
                    <p className="text-sm mt-2 text-center text-gray-600">Experience: {barber.experience || 5} years</p>
                  </div>

                  {/* Hover effect content */}
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <p className="text-center">Expertise: {barber.expertise || 'General'}</p>
                    <p className="mt-2 text-center">Working Hours: {barber.workingHours || '9 AM - 6 PM'}</p>
                    <div className='flex justify-center items-center gap-1 mt-2'>
                      {Array(5).fill().map((_, idx) => (
                        <FaStar key={idx} className='text-yellow-400' />
                      ))}
                    </div>
                  </div>
                {/* </Link> */}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BarberCollection;
