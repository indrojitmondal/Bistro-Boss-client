import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic= useAxiosPublic();
    const onSubmit =  async(data) => {
        console.log(data);
        // image upload to imagebb then get an url 
        const imageFile= {image: data.image[0]}
         const res= await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {'content-type': 'multipart/form-data'}
         })
         const imageUrl= res.data.data.display_url;

         console.log(res.data);
         console.log('Image url', imageUrl);

        
    };
    return (
        <div>
            <SectionTitle heading={'add an item'} subheading={"what's new"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full my-5 ">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>

                        </div>
                        <input type="text" placeholder="Recipe Name" {...register('name',{required: true})} required className="input input-bordered w-full " />

                    </div>
                    <div className='flex gap-6'>
                        {/* category */}
                        <div className="form-control w-full my-5 ">
                            <div className="label">
                                <span className="label-text">Category*</span>

                            </div>
                            <select defaultValue={'default'} {...register('category',{required: true})} className="select select-bordered w-full ">
                                <option disabled value={'default'}>Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>

                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-5 ">
                            <div className="label">
                                <span className="label-text">Price*</span>

                            </div>
                            <input type="number" placeholder="Price" {...register('price',{required: true})} className="input input-bordered w-full " />

                        </div>
                    </div>
                    {/* Recipe Details */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Details</legend>
                        <textarea {...register('recipe',{required: true})} className="textarea h-24" placeholder="recipe details"></textarea>
                        
                    </fieldset>
                    <div className='form-control w-full my-5'>
                        <input {...register('image',{required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className='btn'> Add Item <FaUtensils className='ml-4'></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;