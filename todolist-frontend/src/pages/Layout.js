import { Outlet } from "react-router-dom";
import '../assets/css/Layout.css';

const Layout = () => {
  return (
    <>
    <div className="header">
      <p className='header-text'>TODO LIST</p>
    </div>

      <Outlet />
    </>
  )
};

export default Layout;