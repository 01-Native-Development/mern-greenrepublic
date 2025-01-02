import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useSignInUserMutation} from '../redux/features/users/userAPI.js';
import {useNotification} from '../hooks/notificationHook.jsx';
import {setUser} from '../redux/features/users/userSlice.js';
import {validateEmailPassword} from '../utils/functionUtils.js';

export default function SignInPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   const {updateNotification} = useNotification();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [signInUser, {isLoading: signInLoading}] = useSignInUserMutation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
         email,
         password
      }

      try {
         const {isValid, error} = await validateEmailPassword(email, password);
         if (!isValid) {
            return updateNotification('error', error);
         }

         const response = await signInUser(data).unwrap();

         console.log(response);
         const {token, user} = response;
         console.log(user)
         dispatch(setUser({user}));

         updateNotification('success', 'Signed in successfully!');
         setTimeout(()=> {
            navigate('/');
         }, 5000);

      } catch(err) {
        updateNotification('error', 'Invalid email or password!');
      }
   }


   return (
      <section className="h-screen bg-neutral-100 flex items-center justify-center">
         <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2
               className='text-2xl font-header text-center uppercase font-semibold pt-5'>Sign
               In</h2>
            <form onSubmit={handleSubmit} className='space-y-5 max-w-sm mx-auto pt-8'>
               <input type="text" name="email" id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email'
                      className='w-full bg-gray-100 focus:outline-none px-5 py-3'
               />
               <input type="password" name="password" id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password'
                      className='w-full bg-gray-100 focus:outline-none px-5 py-3'
               />
               {
                  message && <p className='text-semantic-a-400'>{message}</p>
               }

               <button type='submit'
                       className='w-full mt-5 uppercase font-semibold bg-primary text-white hover:bg-red-600 py-3 rounded-md'
               >Sign in
               </button>
            </form>

            <p className='my-5 italic text-sm text-center'>Don't have an account?
               <Link to="/sign-up"
                     className='text-red-700 px-1 capitalize font-semibold underline'>Sign up</Link> here.
            </p>
         </div>
      </section>

   );
}