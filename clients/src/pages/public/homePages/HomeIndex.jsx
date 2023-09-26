import React from "react";
import ProductList from "../productLists/ProductList";
import Slide from "./../../../components/users/slides/Slide";

export default function HomeIndex({ setIsLoad }) {
  return (
    <>
      <Slide />
      <ProductList setIsLoad={setIsLoad} />
    </>
  );
}
