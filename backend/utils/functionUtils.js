import { messageHandler } from './messageHandlerUtils.js';

export function validateName(username, res) {
   const name_trimmed = username.trim();
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   if (name_trimmed.length === 0) {
      return messageHandler(res, 'Your first and last name is required!', false, 406);
   }

   if (!name_trimmed.match(name_pattern)) {
      return messageHandler(res, 'Enter your first and last name in a valid format!', false, 406);
   }

   return messageHandler(res, 'Username is accepted!', true, 200);
}
