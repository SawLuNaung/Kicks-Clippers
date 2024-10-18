import { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../config'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


const Add = ({token}) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Nike");
    const [subCategory, setSubCategory] = useState("Sneaker");
    const [bestseller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);
    
    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try {

            const formData = new FormData()

            formData.append("name",name)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("subcategory",subCategory)
            formData.append("bestseller",bestseller)
            formData.append("sizes",JSON.stringify(sizes))

            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

            if(response.data.success){
                toast.success(response.data.message)
                setName('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-2'>Upload Image</p>
            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20' 
                    src={!image1 ? assets.upload : 
                    URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                </label>
                <label htmlFor="image2">
                    <img className='w-20' 
                    src={!image2 ? assets.upload : 
                    URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                </label>
                <label htmlFor="image3">
                    <img className='w-20' 
                    src={!image3 ? assets.upload : 
                    URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
                </label>
                <label htmlFor="image4">
                    <img className='w-20' 
                    src={!image4 ? assets.upload : 
                    URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
                </label>
            </div>
        </div>

        <div className='w-full'>
            <p className='mb-2'>Product Name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} 
            className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Product Category</p>
                <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
                    <option value="Nike">Nike</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Puma">Puma</option>
                    <option value="Supreme">Supreme</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Cactus Jack">Cactus Jack</option>
                    <option value="Stussy">Stussy</option>
                </select>
            </div>
            <div>
                <p className='mb-2'>Sub Category</p>
                <select onChange={(e)=>setSubCategory(e.target.value)}  className='w-full px-3 py-2'>
                    <option value="Sneakers">Sneaker</option>
                    <option value="Streetwear">Streetwear</option>
                </select>
            </div>
            <div>
                <p className='mb-2'>Product Price</p>
                <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='250' />
            </div>
        </div>
        <div>
            <p className='mb-2'>Sneaker Sizes</p>
            <div className='flex gap-3'>
                <div onClick={()=>setSizes(prev => prev.includes("US7") ? 
                    prev.filter(item => item !== "US7") : [...prev, "US7"] )}>
                    <p className={`${sizes.includes("US7") ? "bg-black text-white":"bg-slate-200"} px-3 py-1 cursor-pointer`}>US7</p>
                </div>
                <div onClick={()=>setSizes(prev => prev.includes("US8") ? 
                    prev.filter(item => item !== "US8") : [...prev, "US8"] )}>
                    <p className={`${sizes.includes("US8") ? "bg-black text-white":"bg-slate-200"} px-3 py-1 cursor-pointer`}>US8</p>
                </div>
                <div onClick={()=>setSizes(prev => prev.includes("US9") ? 
                    prev.filter(item => item !== "US9") : [...prev, "US9"] )}>
                    <p className={`${sizes.includes("US9") ? "bg-black text-white":"bg-slate-200"} px-3 py-1 cursor-pointer`}>
                        US9
                    </p>
                </div>
            </div>
        </div>
        <div>
            <p className='mb-2'>Streetwear Sizes</p>
            <div className='flex gap-3'>
            <div onClick={()=>setSizes(prev => prev.includes("S") ? 
                    prev.filter(item => item !== "S") : [...prev, "S"] )}>
                    <p className={`${sizes.includes("S") ? "bg-black text-white":"bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                </div>
                <div onClick={()=>setSizes(prev => prev.includes("M") ? 
                    prev.filter(item => item !== "M") : [...prev, "M"] )}>
                    <p className={`${sizes.includes("M") ? "bg-black text-white":"bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                </div>
                <div onClick={()=>setSizes(prev => prev.includes("L") ? 
                    prev.filter(item => item !== "L") : [...prev, "L"] )}>
                    <p className={`${sizes.includes("L") ? "bg-black text-white":"bg-slate-200"} px-3 py-1 cursor-pointer`}>
                        L
                    </p>
                </div>
            </div>
        </div>
        <div className='flex gap-2 mt-2'>
            <input onChange={()=>setBestSeller(prev => !prev)} 
            checked={bestseller} 
            type="checkbox" id='bestseller' />
            <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
        </div>
        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

Add.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Add