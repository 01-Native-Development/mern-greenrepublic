/************************* imports *************************/
import {MailtrapClient} from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config({path: 'backend/config/config.env'});

export const mailtrapClient = new MailtrapClient({
   token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
   email: 'hello@demomailtrap.com',
   name: 'MERN Multi Vendors',
};