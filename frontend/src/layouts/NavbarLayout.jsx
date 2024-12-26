/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartModal from '../components/shop/ShoppingCartModal.jsx';

import { useSignOutUserMutation } from '../redux/features/users/userAPI.js';
import { signOut } from '../redux/features/users/userSlice.js';
import avatarImage from './../assets/avatar.png';
import { useNotification } from '../hooks/notificationHook.jsx';


export default function NavbarLayout() {
   /************************* variables *************************/
   const products = useSelector((state) => state.cart.products);
   const [isCartOpen, setIsCartOpen] = useState(false);

   /************************* if user signed in *************************/
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { updateNotification } = useNotification();
   const { user } = useSelector((state) => state.users)
   const [isDropDownOpen, setIsDropDownOpen] = useState(false);
   const [signOutUser] = useSignOutUserMutation();

   /************************* admin dropDown menus *************************/
   const adminDropDownMenus = [
      { label: "Dashboard", path: "/dashboard/admin" },
      { label: "All Products", path: "/dashboard/all-products" },
      { label: "All Orders", path: "/dashboard/all-orders" },
      { label: "Add Product", path: "/dashboard/add-product" },
   ]

   /************************* user dropDown menus *************************/
   const userDropDownMenus = [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Profile", path: "/dashboard/profile" },
      { label: "Payments", path: "/dashboard/payments" },
      { label: "Orders", path: "/dashboard/orders" },
   ]

   const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

   /************************* functions *************************/
   const handleCartMenu = () => {
      setIsCartOpen(!isCartOpen)
   }

   const handleDropDownMenu = () => {
      setIsDropDownOpen(!isDropDownOpen);
   }

   const handleSignOutUser = async () => {
      try {
         await signOutUser().unwrap();
         dispatch(signOut());
         updateNotification('success', 'Successfully Signed Out!');
         setTimeout(() => {
            navigate('/');
         }, 5000)

      } catch (err) {
         let message = err.message;
         return updateNotification('error', err.message);

      }
   }

   return (
      <header className="fixed-nav-bar w-nav">
         <nav className='flex justify-between items-center mx-auto px-4 max-w-screen-2xl'>
            <ul className='nav__links'>
               <li className='link'><Link to="/">Home</Link></li>
               <li className='link'><Link to="/about">About</Link></li>
               <li className='link'><Link to="/shop">Shop</Link></li>
               {/* <li className='link'><Link to="/">Blog</Link></li> */}
               <li className='link'><Link to="/contact">Contact</Link></li>
            </ul>
            {/* logo */}
            <div className='nav__logo'>
               <Link to="/">The Green Rep<span>.</span></Link>
            </div>
            {/* nav icons */}
            <div className='relative nav__icons'>
               <span>
                  <Link to="/search">
                     <i className="ri-search-line"></i>
                  </Link>
               </span>
               <span>
                  <button onClick={handleCartMenu} className='hover:text-primary'>
                     <i className="ri-shopping-bag-line"></i>
                     <sup className='inline-block bg-primary px-1.5 rounded-full text-center text-sm text-white'>
                        {products.length}
                     </sup>
                  </button>
               </span>
               <span>
                  {
                     user && user ?
                        (
                           <>
                              <img
                                 onClick={handleDropDownMenu}
                                 src={user?.profileImage || avatarImage} alt="user avatar"
                                 className="rounded-full cursor-pointer size-6" />
                              {
                                 isDropDownOpen && (
                                    <div className='right-0 z-50 absolute border-gray-200 bg-white shadow-lg mt-3 p-4 border rounded-md w-48'>
                                       <ul className='space-y-4 p-2 font-medium'>
                                          {dropdownMenus.map((menu, index) => (
                                             <li key={index}>
                                                <Link
                                                   onClick={() => setIsDropDownOpen(false)}
                                                   className='tracking-wider dropdown-items' to={menu.path}>{menu.label}</Link>
                                             </li>
                                          ))}
                                          <li><Link onClick={handleSignOutUser} className='dropdown-items'>Sign Out</Link></li>
                                       </ul>
                                    </div>
                                 )
                              }
                           </>
                        ) :
                        (
                           <Link to="sign-in">
                              <i className="ri-user-line"></i>
                           </Link>
                        )
                  }
               </span>
            </div>
         </nav>
         {isCartOpen && <ShoppingCartModal products={products} isOpen={isCartOpen} onClose={handleCartMenu} />}
      </header>

   );
}//end of NavbarLayout Function