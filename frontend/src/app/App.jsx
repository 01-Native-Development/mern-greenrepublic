import { Outlet } from 'react-router-dom';
import './App.css'
import NavbarLayout from '../layouts/NavbarLayout.jsx';
import FooterLayout from '../layouts/FooterLayout.jsx'



export default function App() {
   return (
      <>
         <NavbarLayout />
         <Outlet/>
         <FooterLayout/>
      </>

   )
}