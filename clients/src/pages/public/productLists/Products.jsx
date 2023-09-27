import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productlist.css";
import { Button, Image, Pagination, notification } from "antd";
import { formatMoney } from "../../../utils/formatData";
import { Link } from "react-router-dom";

export default function Products({ setIsLoad }) {
  const [products, setProducts] = useState([]);
  const cartUser = JSON.parse(localStorage.getItem("cartUser"));
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // gọi API lấy thông tin tất cả danh mục
  const loadDataCategory = async () => {
    await axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadDataCategory();
  }, []);

  //lấy ra id của category
  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  //gọi API products tất cả sản phẩm
  const loadDataProduct = () => {
    axios
      .get(`http://localhost:3000/products`)
      .then((response) => {
        if (categoryId === 0) {
          setProducts(response.data);
        } else {
          const listProducts = response.data.filter(
            (product) => product.category_id === categoryId
          );
          setProducts(listProducts);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);

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

  //tính toán chỉ mục sản phẩm bắt đầu và chỉ mục sản phẩm kết thúc
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedProduct = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="p-4 gap-8">
        <div
          className="buttons text-center py-2 bg-slate-300"
          style={{ height: "100%" }}
        >
          <h1 className="text-2xl font-bold py-2">DANH SÁCH SẢN PHẨM</h1>

          <div className="d-flex justify-center gap-5">
            <div onClick={() => getCategoryId(0)} className="box f_flex">
              <span style={{ cursor: "pointer" }}>ALL</span>
            </div>
            {category.map((value) => (
              <div
                onClick={() => getCategoryId(value.id)}
                style={
                  categoryId === value.id
                    ? { backgroundColor: "#cfcfcf", color: "#000" }
                    : {}
                }
                className="box f_flex"
                key={value.id}
              >
                <span style={{ cursor: "pointer" }}>{value.category_name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-6 justify-center ">
            {displayedProduct.map((product) => (
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
                        className="bg-blue-600"
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
          <div className="text-center mt-4 ">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
