export const messageHandler = (res, message, success = true, statusCode = 200) => {
   // Log the message (optional)
   if (!success) {
      console.error(`Error: ${message}`); // Log error messages
   } else {
      console.log(`Success: ${message}`); // Log success messages
   }

   // Send response
   return res.status(statusCode).send({ message, success });
};
