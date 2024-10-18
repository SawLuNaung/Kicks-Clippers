import { useState } from 'react';
import Modal from './Modal';  // Import the modal component

const servicesData = {
  haircut: [
    { title: 'ADULT CUT (Age 18 & above)', duration: '30 mins', price: '$40' },
    { title: 'FRESHMAN (Age 17 & below)', duration: '30 mins', price: '$30' },
    { title: 'YOUNG MEN (Age 5-10)', duration: '30 mins', price: '$20' }
  ],
  beard: [
    { title: 'SHAVE IT OFF', duration: '45 mins', price: '$35' },
    { title: 'SHAPE UP', duration: '30 mins', price: '$30' }
  ],
  addons: [
    { title: 'HAIR TATTOO', duration: '10 mins', price: 'from $10' },
    { title: 'EYEBROW TRIM', duration: '5 mins', price: '$5' }
  ]
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('haircut');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBookClick = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Services</h1>
         <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'haircut' ? 'bg-black text-white' : 'border'}`}
          onClick={() => handleTabClick('haircut')}
        >
          Haircut
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'beard' ? 'bg-black text-white' : 'border'}`}
          onClick={() => handleTabClick('beard')}
        >
          Beard
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'addons' ? 'bg-black text-white' : 'border'}`}
          onClick={() => handleTabClick('addons')}
        >
          Add Ons
        </button>
      </div>
      <div className="space-y-4">
        {servicesData[activeTab].map((service, index) => (
          <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h2 className="font-semibold text-lg">{service.title}</h2>
              <p className="text-gray-500">{service.duration}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{service.price}</p>
              <button
                className="px-4 py-2 mt-4 bg-gray-100 border rounded-lg hover:bg-gray-200"
                onClick={() => handleBookClick(service)}
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for booking */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default Services;


