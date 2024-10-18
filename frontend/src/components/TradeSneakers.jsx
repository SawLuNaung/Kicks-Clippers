import { useState } from 'react';
import { toast } from 'react-toastify'; // For notifications

const TradeSneakers = () => {
  const [image, setImage] = useState(null); // To hold the uploaded image
  const [imagePreview, setImagePreview] = useState(''); // To display the image preview
  const [sneakerName, setSneakerName] = useState('');
  const [sneakerSize, setSneakerSize] = useState('');
  const [condition, setCondition] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any form validation here if needed

    const tradeRequest = {
      name: sneakerName,
      size: sneakerSize,
      condition: condition,
      buyPrice: buyPrice,
      image: image, // Store image in the sneaker object
    };

    console.log("Trade request submitted:", tradeRequest);
    
    // Show notification
    toast.success('Request submitted successfully. It will take 1-3 working days.');

    // Clear form fields after submission
    setSneakerName('');
    setSneakerSize('');
    setCondition('');
    setBuyPrice('');
    setImage(null);
    setImagePreview('');
  };

  // Handle the file input change event
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Trade Your Items</h2>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <input 
          type="text" 
          name="sneakerName" 
          value={sneakerName}
          onChange={(e) => setSneakerName(e.target.value)}
          placeholder="Item Name" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        <input 
          type="text" 
          name="sneakerSize" 
          value={sneakerSize}
          onChange={(e) => setSneakerSize(e.target.value)}
          placeholder="Size" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        <input 
          type="text" 
          name="condition" 
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="Condition (New/Used)" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />

        {/* Buy Price Input */}
        <input 
          type="number" 
          name="buyPrice" 
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Price (in SGD)" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />

        {/* Image Upload */}
        <input 
          type="file" 
          name="sneakerImage" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />

        {/* Preview the uploaded image */}
        {imagePreview && (
          <div className="mt-4">
            <p>Preview:</p>
            <img src={imagePreview} alt="Sneaker Preview" className="w-32 h-32 object-cover mt-2 rounded-md"/>
          </div>
        )}

        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md w-full"
        >
          Submit for Trade
        </button>
      </form>
    </div>
  );
};

export default TradeSneakers;
