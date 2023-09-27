import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input, Table } from "antd";
import { changeActiveUser, getUser } from "../../../redux/userSlice/userSlice";
import { formatDate } from "../../../utils/formatData";

export default function User() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoadingChange);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getUser(searchText));
  }, [isLoading]);

  useEffect(() => {
    dispatch(getUser(searchText));
  }, [searchText]);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "5vw",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      width: "15vw",
    },
    {
      title: "Avatar",
      dataIndex: "image",
      key: "image",
      width: "10vw",
      render: (link) => <Image width={70} src={link} alt="image" />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15vw",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "15vw",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth ",
      width: "10vw",
      render: (_, dateOfBirth) => (
        <span>{formatDate(dateOfBirth.dateOfBirth)}</span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "5vw",
      render: (_, user) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {user.role != 0 ? (
            <Button danger onClick={() => dispatch(changeActiveUser(user))} className="bg-red-400 text-white">
              {user.active ? "Khóa" : "Mở"}
            </Button>
          ) : (
            <></>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-end mb-3 mt-4 mr-5">
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Mời nhập tên tìm kiếm"
          className="w-96"
        ></Input>
      </div>
      <div className="mx-5">
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.id}
        />
      </div>
    </>
  );
}
