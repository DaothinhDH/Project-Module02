import React, { useEffect,  } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";

export default function NavbarAdmin() {
 const navigate = useNavigate();
 const userLogin = JSON.parse(localStorage.getItem("userLogin"));

 useEffect(() => {
   if (userLogin == null || userLogin.role !== 0) {
     navigate("/login");
   }
 }, []);
  
  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLogin");
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
        <a onClick={handleConfirmLogout}>
          <LogoutOutlined className=" mt-2" />
          Đăng xuất
        </a>
      ),
    },
  ];
  console.log(userLogin);

  return (
    <>
      <div className="w-full bg-red-400 h-24 text-white flex items-center justify-between px-8">
        <div className="flex gap-4 items-center">
          <NavLink to={"/"}>
            <img style={{ width: 60 }} src="/images/logo.png" alt="" />
          </NavLink>
         
        </div>
        <div className="flex gap-4 items-center">

          {userLogin !== null && userLogin.role == 0 ? (
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
