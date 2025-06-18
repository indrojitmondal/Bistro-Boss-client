import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu,,refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem = (item) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await axiosSecure.delete(`/menu/${item._id}`);
              console.log("Delete response:", res.data);
      
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${item.name} has been deleted`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Failed",
                  text: res.data.message || "Delete failed. You might not be admin.",
                });
              }
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error",
                text:
                  error.response?.data?.message || "Something went wrong. Try again!",
              });
            }
          }
        });
      };
    return (
        <div>
            <SectionTitle heading={'Manage all Items'} subheading={'Hurry up'}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>

                            {menu.map((item, index) =>
                                <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}

                                    </td>
                                    <td className='text-right'> ${item.price}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-lg bg-orange-500">
                                            <FaEdit className='text-white '></FaEdit>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className='text-red-600'></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            )}



                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;