import {messageHandler} from './messageHandlerUtils.js';
import res from 'express/lib/response.js';


export function getFirstName(fullName) {
   let name = [];
   name = fullName.split(' ');

   return name[0];
}

export function getLastName(fullName) {
        let name = [];
        name = fullName.split(' ');
        if (name.length <= 2) {
            return name[name.length - 1];
        } else {
            name = name[1];
            name = name.replace(',', '');
            return name;
        }
    }

export function validateName(username) {
   let name_trimmed = username.trim();
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   if (name_trimmed.length === 0) {
      // return {isValid: false, error: 'Your first and last name is required!'};
      // return messageHandler(res, 'Your first and last name is required!', false, 406);
      return false;
   }
   if (!name_trimmed.match(name_pattern)) {
      // return {isValid: false, error: 'Enter your first and last name!'};
      // return messageHandler(res, 'Enter your first and last name!', false, 406);
      return false;
   }

   // return {isValid: true};
   // return messageHandler(res, 'Username is accepted!', true, 200);
   return true;
}