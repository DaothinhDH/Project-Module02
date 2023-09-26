import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../../redux/productSlice/productSlice";
import axios from "axios";
import { getCartUser } from "../../../redux/cartSlice/cartSlice";
import { formatMoney } from "../../../utils/formatData";
import { notification } from "antd";

export default function Cart() {
  const cartUser = JSON.parse(localStorage.getItem("cartUser"));
  const dispatch = useDispatch();
  const productsDB = useSelector((state) => state.product.data);
  const cartUserDB = useSelector((state) => state.cart.data);
  const [note, setNote] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = async (id, status) => {
    let cart = [...cartUserDB.cart];
    let index = cart.findIndex((product) => product.idProduct == id);

    switch (status) {
      case 0:
        cart.splice(index, 1);
        break;
      case 1:
        cart[index] = {
          ...cart[index],
          quantity: cart[index].quantity + 1,
        };
        break;
      case 2:
        if (cart[index].quantity > 1)
          cart[index] = {
            ...cart[index],
            quantity: cart[index].quantity - 1,
          };
        break;
      default:
        break;
    }
    await axios.patch(`http://localhost:3000/carts/${cartUser.id}`, { cart });
    dispatch(getCartUser(cartUser.id));
  };

  const calTotal = async () => {
    const cart = cartUserDB.cart;
    const products = productsDB;
    let total = 0;
    if (cart?.length > 0 && products.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        const infoPro = products.find((pro) => pro.id == cart[i].idProduct);
        total += infoPro.price * cart[i].quantity;
      }
      setTotalPrice(total);
    }
  };

  const handleCheckout = async () => {
    const cart = cartUserDB.cart;
    const products = productsDB;

    if (cart.length < 1) {
      notification.error({
        message: "Không có sản phẩm",
      });
    }

    for (let i = 0; i < cart.length; i++) {
      const infoPro = products.find((pro) => pro.id == cart[i].idProduct);
      if (infoPro.quantity < cart[i].quantity) {
        notification.warning({
          message: `Sản phẩm ${i + 1} không đủ số lượng`,
        });
        return;
      }
    }

    for (let i = 0; i < cart.length; i++) {
      const infoPro = products.find((pro) => pro.id == cart[i].idProduct);
      await axios.patch(`http://localhost:3000/products/${infoPro.id}`, {
        quantity: infoPro.quantity - cart[i].quantity,
      });
    }

    await axios.post(`http://localhost:3000/orders`, {
      id: Date.now(),
      userId: cartUser.userId,
      cart,
      totalPrice: totalPrice,
      note: note,
      date: new Date().toLocaleString(),
      status: 0,
    });

    await axios.patch(`http://localhost:3000/carts/${cartUser.id}`, {
      cart: [],
    });

    dispatch(getCartUser(cartUser.id));
    setTotalPrice(0);
  };

  useEffect(() => {
    dispatch(getCartUser(cartUser.id));
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    calTotal();
  }, [cartUserDB, productsDB]);

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <Link to="/" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="row d-flex align-items-center">
                        <table
                          style={{ width: "100%" }}
                          className="table table-form"
                        >
                          <thead>
                            <tr>
                              <th
                                className="px-3"
                                style={{ textAlign: "center" }}
                              >
                                #
                              </th>
                              <th style={{ width: 110, textAlign: "center" }}>
                                Image
                              </th>
                              <th style={{ textAlign: "center" }}>Name</th>
                              <th style={{ width: 150, textAlign: "center" }}>
                                Price
                              </th>
                              <th style={{ width: 70, textAlign: "center" }}>
                                Quantity
                              </th>
                              <th style={{ width: 100, textAlign: "center" }}>
                                {" "}
                                Action{" "}
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {cartUserDB && cartUserDB?.cart?.length > 0 ? (
                              cartUserDB.cart.map((product) => {
                                const infoPro = productsDB.find(
                                  (pro) => pro.id == product.idProduct
                                );

                                return (
                                  <tr
                                    key={product.idProduct}
                                    style={{ textAlign: "center" }}
                                  >
                                    <td>{product.idProduct}</td>
                                    <td>
                                      <img
                                        src={infoPro?.image}
                                        alt="img"
                                        width={100}
                                      />
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      {infoPro?.product_name}
                                    </td>
                                    <td>{formatMoney(+infoPro?.price)}</td>
                                    <td style={{ textAlign: "center" }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          gap: "0 10px",
                                        }}
                                      >
                                        <button
                                          style={{ width: 30 }}
                                          onClick={() =>
                                            handleChange(product.idProduct, 1)
                                          }
                                        >
                                          +
                                        </button>
                                        <span>{product.quantity}</span>
                                        <button
                                          style={{ width: 30 }}
                                          onClick={() =>
                                            handleChange(product.idProduct, 2)
                                          }
                                        >
                                          -
                                        </button>
                                      </div>
                                    </td>
                                    <td>
                                      <button
                                        onClick={() =>
                                          handleChange(product.idProduct, 0)
                                        }
                                      >
                                        Xóa
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <hr className="my-4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Info user buy</h5>
                  </div>
                  <div className="card-body">
                    <textarea
                      rows="6"
                      style={{
                        width: "100%",
                        padding: 8,
                        outline: "none",
                        border: "1px solid #333",
                        resize: "none",
                      }}
                      placeholder="Enter note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Prepare the bill</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Tổng tiền:
                        <span>{formatMoney(totalPrice)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>0đ</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Thành tiền</strong>
                        </div>
                        <span>
                          <strong>{formatMoney(totalPrice)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      className="btn btn-dark btn-lg btn-block"
                      onClick={() => handleCheckout()}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <div className="container my-3 py-3">
          <hr />
        </div>
      </div>
    </>
  );
}
