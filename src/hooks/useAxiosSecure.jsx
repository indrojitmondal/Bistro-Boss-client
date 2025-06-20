import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
 const axiosSecure= axios.create({
    baseURL: 'https://bistro-res-server.vercel.app',
})
const useAxiosSecure = () => {
   const navigate= useNavigate();
   const {logOut}=useAuth();
   // request interceptors to add authorization headers for every secure call to the api
   axiosSecure.interceptors.request.use(function (config) {
      
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`;
      console.log('request stopped by interceptors', token);
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
   //  intercepts 401 and 403 status 
   axiosSecure.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, async(error)=> {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const status= error.response.status;
      console.log('status error in the interceptor', status);
      if(status===401 || status===403){
         await logOut();
         navigate('/login');
      }
      return Promise.reject(error);
    });
   return axiosSecure;
};

export default useAxiosSecure;