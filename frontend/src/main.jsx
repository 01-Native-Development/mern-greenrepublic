import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import './index.css'
import router from './router/router.jsx';
import 'remixicon/fonts/remixicon.css'
import {Provider} from 'react-redux';
import {store} from './redux/store.js';
import NotificationProvider from './context/notificationContext.jsx';

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <NotificationProvider>
         <RouterProvider router={router}/>
      </NotificationProvider>
   </Provider>
)