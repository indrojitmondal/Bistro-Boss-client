import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    const axiosPublic= useAxiosPublic();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
       
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo={
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users',userInfo)
                        .then(res=>{
                            if(res.data.insertedId){

                                console.log('user added to the database');
                                reset();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "User created successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                       
                        
                        logOut()
                            .then(() => {
                                navigate('/login');
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => console.log(error))
            })
    };
    //console.log(watch("example"));
    return (
        <>
            <Helmet>
                <title>Bistro | Sign Up</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="your name" className="input input-bordered" />

                                {errors.name && <span className='text-red-600'>Name is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />

                                {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                                })} name='password' placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than or equal to 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase, one lowercase, one digit and one special character</p>}

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value={'Sign Up'} />

                            </div>
                        </form>
                        <p className='px-6'> <small>Already have and account <Link to={'/login'}>Login</Link> </small> </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;