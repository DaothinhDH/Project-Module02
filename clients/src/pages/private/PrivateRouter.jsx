import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sibar/Sidebar";
import NavbarAdmin from "../../components/admin/Navbar_admin/NavbarAdmin";

export default function PrivateRouter() {
  const isLogin = JSON.parse(localStorage.getItem("userLogin"));

  return (
    <>
      <div className=" d-flex">
        <Sidebar />
        <div className="w-full">
          <NavbarAdmin />
          {isLogin && isLogin.role === 0 ? (
            <Outlet />
          ) : (
            <Navigate to={"/login"} />
          )}
        </div>
      </div>
    </>
  );
}
