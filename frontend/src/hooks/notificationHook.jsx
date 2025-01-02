import {useContext} from "react";
import {NotificationContext} from '../context/notificationContext.jsx';

export const useNotification = () => useContext(NotificationContext);