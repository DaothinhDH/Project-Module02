import React from "react";
import Navbar from "../../../components/users/navbar/Navbar";

import Footer from "../../../components/users/footer/Footer";
import { Outlet } from "react-router-dom";
import Wrapper from "./../../../components/users/wrapper/Wrapper";

export default function Home({ cartLength }) {
  return (
    <div>
      <Navbar className="position-fixed" cartLength={cartLength} />
      <Outlet />
      <Wrapper />
      <Footer />
    </div>
  );
}
