import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Space, Table } from "antd";
import ModalOder from "./ModalOder";
import axios from "axios";
import debounce from "lodash.debounce";

export default function Order() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [showListProduct, setShowListProduct] = useState(false);

  const loadData = async () => {
    const resOrders = await axios.get("http://localhost:3000/orders");
    const orders = resOrders.data;

    for (let i = 0; i < orders.length; i++) {
      const resUserPay = await axios.get(
        `http://localhost:3000/users/${orders[i].userId}`
      );

      const { image, email, address, user_name } = resUserPay.data;
      orders[i] = {
        ...orders[i],
        user_name,
        address,
        email,
        image,
      };
    }

    setOrders(orders);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeStatus = async (order, status) => {
    await axios.patch(`http://localhost:3000/orders/${order.id}`, { status });
    await loadData();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState({});
  const showModal = async (order) => {
    const cart = order.cart;

    for (let i = 0; i < cart.length; i++) {
      const resPro = await axios.get(
        `http://localhost:3000/products/${cart[i].idProduct}`
      );
      const { id, ...data } = resPro.data;
      cart[i] = {
        ...cart[i],
        ...data,
        key: cart[i].idProduct,
      };
    }

    await setDetailOrder(cart);
    await setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setDetailOrder({});
    setIsModalOpen(false);
  };

  const columnsDetail = [
    {
      title: "ID",
      dataIndex: "idProduct",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={50} src={image} alt="" />,
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người mua",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      key: "note",
    },

    {
      title: "Tổng giá tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>{status == 0 ? "Pending" : status == 1 ? "Accept" : "Deny"}</span>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Chi tiết",
      key: "detail",
      render: (_, order) => (
        <Button className="bg-slate-400" onClick={() => showModal(order)}>
          Chi Tiết
        </Button>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, order) => (
        <Space size="middle">
          {order.status == 0 ? (
            <>
              <Button
                className="bg-slate-400"
                onClick={() => handleChangeStatus(order, 1)}
              >
                Xác Nhận
              </Button>
              <Button
                className="bg-red-200"
                onClick={() => handleChangeStatus(order, 2)}
              >
                Từ Chối
              </Button>
            </>
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Table columns={columnsDetail} dataSource={detailOrder} />
      </Modal>

      <div className="mx-4">
        <Table columns={columns} dataSource={orders} />
      </div>
    </div>
  );
}
