import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productlist.css";
import { Button, Image, Pagination, notification } from "antd";
import { formatMoney } from "../../../utils/formatData";
import { Link } from 'react-router-dom';

export default function ProductList({ setIsLoad }) {
  const [products, setProducts] = useState([]);
  const cartUser = JSON.parse(localStorage.getItem("cartUser"));

  //gọi API products tất cả sản phẩm
  const loadDataProduct = () => {
    axios
      .get(`http://localhost:3000/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadDataProduct();
  }, []);

  const handleAddToCart = async (id) => {
    console.log(id);
    const resCartUser = await axios.get(
      `http://localhost:3000/carts/${cartUser.id}`
    );
    const cart = resCartUser.data.cart;
    const index = cart.findIndex((pro) => pro.idProduct === id);
    if (index > -1) {
      // console.log("da co");
      cart[index].quantity += 1;
    } else {
      // console.log("chua co");
      cart.push({
        idProduct: id,
        quantity: 1,
      });
    }
    await axios.patch(`http://localhost:3000/carts/${cartUser.id}`, {
      cart: cart,
    });
    notification.success({
      message: "Thành công",
      description: "Đã thêm sản phẩm vào giỏ hàng !",
    });
    setIsLoad((pre) => !pre);
  };

  return (
    <>
      <div className="p-4 gap-8">
        <div
          className="buttons text-center py-2 bg-slate-300"
          style={{ height: "100%" }}
        >
          <h1 className="text-2xl font-bold py-2">SẢN PHẨM MỚI</h1>
          <span className="text-base">Hương vị sảng khoái - mát lạnh</span>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-6 justify-center ">
            {products.slice(10, 18).map((product) => (
              <div
                key={product.id}
                className="w-1/5 border p-2 h-fit list-product"
              >
                <Image src={product.image} alt="" />
                <div className="cart">
                  <Link to={`/product-detail/${product.id}`}>
                    <h3 className="text-center py-1" style={{ height: 60 }}>
                      {product.product_name}
                    </h3>
                  </Link>
                  <div className="text-center">
                    <span style={{ color: "red", fontSize: "17px" }}>
                      {formatMoney(+product.price)}
                    </span>
                    <div className="text-center py-2">
                      <Button
                        type="primary "
                        className="q-btn-primary"
                        style={{ backgroundColor: "blue" }}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 gap-8">
        <div
          className="buttons text-center py-2 bg-slate-300"
          style={{ height: "100%" }}
        >
          <h1 className="text-2xl font-bold py-2">SẢN PHẨM BÁN CHẠY</h1>
          <span className="text-base">Hương vị sảng khoái - mát lạnh</span>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-6 justify-center ">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="w-1/5 border p-2 h-fit list-product"
              >
                <Image src={product.image} alt="" />
                <div className="cart">
                  <Link to={`/product-detail/${product.id}`}>
                    <h3 className="text-center py-1" style={{ height: 60 }}>
                      {product.product_name}
                    </h3>
                  </Link>
                  <div className="text-center">
                    <span style={{ color: "red", fontSize: "17px" }}>
                      {formatMoney(+product.price)}
                    </span>
                    <div className="text-center py-2">
                      <Button
                        type="primary "
                        className="q-btn-primary"
                        style={{ backgroundColor: "blue" }}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
