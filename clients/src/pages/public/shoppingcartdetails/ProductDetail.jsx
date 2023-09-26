import React, { useEffect, useState } from "react";
import "./cartDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image, notification } from "antd";
import { formatMoney } from "./../../../utils/formatData";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  const cartUser = JSON.parse(localStorage.getItem("cartUser"));

  const [count, setCount] = useState(1);

  const handleChangeQuantity = (type, productId) => {
    if (type === "Increament") {
      setCount(count + 1);
    } else if (type === "Decreament" && count > 1) {
      setCount(count - 1);
    }
  };

  const getProduct = async () => {
    await axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProduct();
  }, [count]);
  console.log(product);

  //  thêm vào giỏ
  const handleAddToCart = async (id) => {
    console.log(id);
    const resCartUser = await axios.get(
      `http://localhost:3000/carts/${cartUser.id}`
    );
    const cart = resCartUser.data.cart;
    const index = cart.findIndex((pro) => pro.idProduct === id);
    if (index > -1) {
      // console.log("da co");
      cart[index].quantity += count;
    } else {
      // console.log("chua co");
      cart.push({
        idProduct: id,
        quantity: count,
      });
    }
    await axios.patch(`http://localhost:3000/carts/${cartUser.id}`, {
      cart: cart,
    });
    notification.success({
      message: "Thành công",
      description: "Đã thêm sản phẩm vào giỏ hàng !",
    });
  };

  return (
    <>
      <div className="mt-5">
        <div className="cart-main d-flex gap-2 flex justify-center">
          <div className="cart-image  product-detail mx-3">
            <Image src={product.image} alt="" />
          </div>
          <div className="cart-info">
            <h3>{product.product_name}</h3>
            <span style={{ color: "red", fontSize: 20 }}>
              Giá: {formatMoney(+product.price)}{" "}
            </span>
            <span>Tình trạng trang kho: {product.quantity}</span>
            <p style={{ width: 400 }}>{product.description}</p>
            <div className=" d-flex gap-2">
              <button
                onClick={() => handleChangeQuantity("Increament", product.id)}
                className="bg-gray-400"
                style={{ fontSize: 15, width: 30 }}
              >
                +
              </button>
              <input
                style={{ width: 50, paddingLeft: "6px" }}
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              <button
                onClick={() => handleChangeQuantity("Decreament", product.id)}
                className="bg-gray-400"
                style={{ fontSize: 15, width: 30 }}
              >
                -
              </button>
            </div>
            <button
              className="btn-them mt-4"
              onClick={() => handleAddToCart(product.id)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
