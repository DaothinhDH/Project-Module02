import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { Button, Upload, message, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

import { ValidateEmail, validatePassword } from "./../../../utils/validateData";
import { resourceForm } from "../../../resources/resourcesVN";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_name: "",
    dateOfBirth: "",
    email: "",
    address: "",
    password: "",
    role: 1,
    active: true,
    confirmPassword: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateData(name, value);
    setUser({ ...user, [name]: value });
  };

  const [imageURL, setImageURL] = useState(null);

  console.log("imageURL", imageURL);

  //   // Tạo một them chiếu đến thư mục chưa kho ảnh trên firebase
  const imageListRef = ref(storage, "users/");

  // Props của Upload
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
        const downloadURL = info.file.response.url;
        // Lưu đường dẫn vào trong một state
        setImageURL(downloadURL);
        // Hiển
        message.success("Tải lên hình ảnh thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải lên hình ảnh thất bại.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Tạo một tham chiếu đến kho ảnh trên firebase
        const imageRef = ref(imageListRef, file.name);

        // Tải ảnh lên firebase
        await uploadBytes(imageRef, file);

        // Lấy url từ firebase về sau khi upload thành công
        const downloadURL = await getDownloadURL(imageRef);

        onSuccess({ url: downloadURL });
      } catch (error) {
        onError(error);
      }
    },
  };

  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "user_name":
        if (!valueInput) {
          setUsernameError("Tên không được để trống");
          return;
        } else {
          setUsernameError("");
        }
        break;
      case "email":
        if (!valueInput) {
          setEmailError("Email không được để trống");
        } else if (!ValidateEmail(valueInput)) {
          setEmailError("Email không đúng định dạng");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError("Mật khẩu không được để trống");
        } else if (!validatePassword(valueInput)) {
          setPasswordError("Mật khẩu bao gồm chữ, số và lớn hơn 8 kí tự");
        } else {
          setPasswordError("");
        }
        break;
      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Mật khẩu không được để trống");
        } else if (valueInput !== user.password) {
          setConfirmPasswordError("Mật khẩu không khớp");
        } else {
          setConfirmPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateData("user_name", user.user_name);
    validateData("email", user.email);
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);

    if (user.user_name && user.email && user.password && user.confirmPassword) {
      const newUser = {
        user_name: user.user_name,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        address: user.address,
        password: user.password,
        image: imageURL,
        role: 1,
        active: true,
      };
      axios
        .post("http://localhost:3000/users", newUser)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            // hien thi thong bao
            notification.success({
              message: "Thành công",
              description: "Thêm mới người dùng thành công",
            });
            navigate("/login");
            loadData();
          }
        })
        .catch((error) => {
          if (error.response.data === "Email already exists") {
            notification.error({
              message: "Cảnh báo",
              description: "Email đã tồn tại trong hệ thống",
            });
          } else {
            notification.error({
              message: "Cảnh báo",
              description: "Lỗi hệ thống",
            });
          }
        });
    }
  };
  return (
    <>
      <div className="backgroud">
        <div className="container-register">
          <form className="form-register" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2 className="text-2xl">{resourceForm.headingRegister}</h2>
              <NavLink to={"/login"} className="btn btn-close"></NavLink>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="form-group my-2 ">
                  <label className="form-label" htmlFor="user_name">
                    Tên đăng ký <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control ${
                      usernameError && "border-danger"
                    }`}
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="Nhập tên đăng ký"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                  />
                  {usernameError && (
                    <div className="text-err mt-1">{usernameError}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="email">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control ${emailError && "border-danger"}`}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Nhập email"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                  />
                  {usernameError && (
                    <div className="text-err mt-1">{emailError}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="font-semibold" htmlFor="name">
                    Hình ảnh
                  </label>
                  <div className="text-start mt-2">
                    <Upload {...props}>
                      <Button className="btn bg-white" icon={<UploadOutlined />}>Upload hình ảnh</Button>
                    </Upload>
                  </div>
                </div>
              </div>

              <div>
                <div className="form-group py-2">
                  <label className="form-label" htmlFor="dateOfBirth">
                    Ngày sinh
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="Nhập ngày sinh"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="address">
                    Địa chỉ
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Nhập địa chỉ"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control ${
                      passwordError && "border-danger"
                    }`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                  />
                  {passwordError && (
                    <div className="text-err mt-1">{passwordError}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="confirmPassword">
                    Xác nhận mật khẩu <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control ${
                      confirmPasswordError && "border-danger"
                    }`}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Nhập mật khẩu"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                  />
                  {confirmPasswordError && (
                    <div className="text-err mt-1">{confirmPasswordError}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-2 mt-4">
              <button className="btn btn-primary w-100">
                {resourceForm.headingRegister}
              </button>
            </div>
            <p className="p-2 text-center">
              {resourceForm.confirmLogin}
              <NavLink to={"/login"} className="cursor-pointer text-blue-600">
                {" "}
                {resourceForm.headingLogin}
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
