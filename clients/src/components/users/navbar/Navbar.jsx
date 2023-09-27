import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import axios from "axios";

export default function Navbar({ cartLength }) {
  const navigate = useNavigate();
  // sau khi danh nhap bang gg thanh cong, lay thong tin user da dang nhap
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userLogin) {
      const loadUserToGetCart = async () => {
        await axios
          .get(`http://localhost:3000/users/${userLogin.id}`)
          .then((response) => setUser(response.data))
          .catch((err) => console.log(err));
      };
      loadUserToGetCart();
    }
  }, []);

  const cartUser = user?.cart;

  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLogin");
    localStorage.removeItem("cartUser");
    // chuyen huong ve trang chu
    navigate("/");
  };
  //

  // ham xu li dang xuat
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      onOk() {
        handleLogout();
      },
      cancelText: "Hủy bỏ",
      okText: "Đăng xuất",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={"/profile"}>
          <UserAddOutlined className=" mr-2" />
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/change-password"}>
          <KeyOutlined className=" mr-2" />
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a  onClick={handleConfirmLogout}>
          <LogoutOutlined className=" mr-2" />
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <>
      <div className="w-full bg-slate-800 h-24 text-white flex items-center justify-between px-8">
        <div className="flex gap-4 items-center">
          <NavLink to={"/"}>
            <img style={{ width: 60 }} src="/images/logo.png" alt="" />
          </NavLink>
          <NavLink to={"/"}>Trang chủ</NavLink>
          <NavLink to={"/product_list"}>Sản phẩm</NavLink>
          <NavLink to={"/cart"}>
            <ShoppingCartOutlined className="text-2xl relative" />
            <span className="bg-white px-2 rounded-xl text-black absolute left-0"></span>
            <span>{cartLength}</span>
          </NavLink>
        </div>
        <div className="flex gap-4 items-center">
          <NavLink to={"/about"}>Giới thiệu</NavLink>
          <NavLink to={"/contact"}>Liên hệ</NavLink>

          {userLogin !== null && userLogin.role == 1 ? (
            <>
              <Dropdown
                className="-mt-3"
                menu={{
                  items,
                }}
                placement="bottom"
                arrow
              >
                <Button className="border-none shadow-none text-white hover:text-white">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full"
                      src={userLogin.image}
                      height={26}
                      width={26}
                      alt="avatar"
                    />
                    {userLogin.user_name}
                  </div>
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <NavLink to={"/register"}>Đăng kí</NavLink>
              <NavLink to={"/login"}>Đăng nhập</NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
