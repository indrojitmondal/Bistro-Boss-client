import React from 'react';
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin(); // TODO: get from DB

  // ✅ Custom navClass function
  const navClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-400 text-white rounded-md'
      : '';

  return (
    <div className="flex" data-theme="light">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4 space-y-1">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome" className={navClass}>
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems" className={navClass}>
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mangeItems" className={navClass}>
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className={navClass}>
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" className={navClass}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className={navClass}>
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation" className={navClass}>
                  <FaCalendar /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart" className={navClass}>
                  <FaShoppingCart /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review" className={navClass}>
                  <FaAd /> Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className={navClass}>
                  <FaList /> My Bookings
                </NavLink>
              </li>
            </>
          )}
          {/* Shared links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/" className={navClass}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className={navClass}>
              <FaSearch /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact" className={navClass}>
              <FaEnvelope /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
