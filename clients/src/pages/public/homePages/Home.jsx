import React from "react";
import Navbar from "../../../components/users/navbar/Navbar";

import Footer from "../../../components/users/footer/Footer";
import { Outlet } from "react-router-dom";
import Wrapper from "./../../../components/users/wrapper/Wrapper";
import { BackTop } from "antd";

export default function Home({ cartLength }) {
  return (
    <div>
      <Navbar className="position-fixed" cartLength={cartLength} />
      <Outlet />
      <Wrapper />
      <Footer />
      <BackTop className="right-7 bottom-7" />
    </div>
  );
}
