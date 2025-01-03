/************************* imports *************************/
import dotenv from "dotenv";
import colors from "colors";
// App Routing & Middleware
import app from './app/app.js';
// Database Connection
import connectDatabase from './config/configDatabase.js';


/************************* handling Uncaught exceptions *************************/
process.on('uncaughtException', err => {
   console.log(`ERROR: ${err.stack}`);
   console.log('Shutting down the server due to Uncaught Exception!');
   process.exit(1);
});

/************************* configure setup *************************/
dotenv.config({path: 'backend/config/config.env'});
colors.enabled = true;

/************************* variables *************************/
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_ENV || "/api/v1.0/";

/************************* connect database *************************/
connectDatabase();
/************************* app listening *************************/
const server = app.listen(PORT, () => {
   console.log(`The server is listening at - http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode!`.yellow);
});

/************************* handling unhandled promise rejection *************************/
process.on('unhandledRejection', err => {
   console.log(`ERROR: ${err.stack}`);
   console.log('Shutting down the server due to Unhandled Promise Rejection!');
   server.close(() => {
      process.exit(1);
   });
});