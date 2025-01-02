import React from 'react';
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
   const criteria = [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
      { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
      { label: "Contains a number", met: /\d/.test(password) },
      { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
   ];

   return (
      <div className='mt-2 space-y-1 tracking-wider'>
         {criteria.map((item) => (
            <div key={item.label} className='flex items-center text-xs'>
               {item.met ? (
                  <Check className='size-4 text-gray-900 mr-2' />
               ) : (
                  <X className='size-4 text-gray-900 mr-2' />
               )}
               <span className={item.met ? "text-gray-700" : "text-neutral-500"}>{item.label}</span>
            </div>
         ))}
      </div>
   );
};



export default function PasswordStrengthMeter({password}) {
   const getStrength = (pass) => {
      let strength = 0;
      if (pass.length >= 8) strength++;
      if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
      if (pass.match(/\d/)) strength++;
      if (pass.match(/[^a-zA-Z\d]/)) strength++;
      return strength;
   };
   const strength = getStrength(password);

   const getColor = (strength) => {
      if (strength === 0) return "bg-semantic-a-200";
      if (strength === 1) return "bg-semantic-a-400";
      if (strength === 2) return "bg-semantic-w-400";
      if (strength === 3) return "bg-semantic-s-100";
      return "bg-semantic-s-400";
   };

   const getStrengthText = (strength) => {
      if (strength === 0) return "Very Weak";
      if (strength === 1) return "Weak";
      if (strength === 2) return "Fair";
      if (strength === 3) return "Good";
      return "Strong";
   };

   return (
      <div className='mt-2'>
         <div className='flex justify-between items-center mb-1'>
            <span className='text-xs text-gray-900 font-semibold tracking-wider'>Password Strength</span>
            <span
               className='text-xs text-gray-700 font-semibold tracking-wider'>{getStrengthText(strength)}</span>
         </div>

         <div className='flex space-x-1'>
            {[...Array(4)].map((_, index) => (
               <div
                  key={index}
                  className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getColor(strength) : "bg-gray-600"}
              `}
               />
            ))}
         </div>
         <PasswordCriteria password={password}/>
      </div>

   );
}