import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';
import {useSignUpUserMutation} from '../redux/features/users/userAPI.js';
import {useNotification} from '../hooks/notificationHook.jsx';
import {validateUserInfo} from '../utils/functionUtils.js';



export default function SignUpPage() {
   const [message, setMessage] = useState('');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');


   const {updateNotification} = useNotification();
   const navigate = useNavigate();
   const [signUpUser, {isLoading}] = useSignUpUserMutation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
         username,
         email,
         password
      }
      try {
         const {isValid, error} = validateUserInfo(username, email, password);
         if (!isValid) {
            return updateNotification("error", error);
         }
         await signUpUser(data).unwrap();

         updateNotification('success', 'Signed up successfully!');
         setTimeout(()=> {
            navigate('/sign-in');
         }, 5000);

      } catch(err) {
         return updateNotification("error", err.message);
      }
   }

   return (
      <section className='h-screen flex items-center justify-center'>
         <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2 className='text-2xl font-header text-center uppercase font-semibold pt-5'>Sign up</h2>
            <form onSubmit={handleSubmit}
                  className='space-y-5 max-w-sm mx-auto pt-8'>
               <input type="text" name="username" id="username"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='Full name'
                      className='w-full bg-gray-100 focus:outline-none px-5 py-3'
               />
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
                  message && <p className='text-red-500'>{message}</p>
               }
               <PasswordStrengthMeter password={password} />
               <button type='submit'
                       className='w-full mt-5 uppercase font-semibold bg-primary text-white hover:bg-red-600 py-3 rounded-md'
               >Sign up
               </button>
            </form>

            <p className='my-5 italic text-sm text-center'>Already have an account?&nbsp;
               <Link to="/sign-in" className='text-red-700 px-1 capitalize font-semibold underline'>Sign in</Link>.
            </p>
         </div>
      </section>

   );
}