import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodCard = ({item}) => {
    const {name,image,price,recipe,_id}=item;
    const {user}= useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleAddToCart = food=>{
       if( user && user.email){
         const cartItem={
            menuId: _id,
            email: user.email,
            name,
            image,
            price
         }
         axios.post('http://localhost:5000/carts', cartItem)
         .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
         })
       }
       else{
        Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log in!"
          }).then((result) => {
            if (result.isConfirmed) {
             //send to the login page 
                navigate('/login', {state: {from: location}}
               );
            //    state={{from: location}}
               
            }
          });
       }
    }
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <p className='bg-slate-900 text-white mr-4 mt-4 px-4 absolute right-0'>${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={()=> handleAddToCart(item)}
                         className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400">Add to Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;