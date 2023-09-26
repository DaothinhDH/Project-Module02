import React from 'react'
import { Button, Image, Table } from "antd";
import "./modalOder.css"

const columns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
      key: "image",
    render:()=><Image src=""></Image>
  },
  {
    title: "Đơn giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
];
const data = [
  {
    product_name: "1",
    image: "John Brown",
    price: "200",
    quantity: "10"
     
  },
];
export default function ModalOder({ handleClose }) {
  return (
    <div className="modal-oder">
      <div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <button onClick={ handleClose}>Ok</button>
      </div>
    </div>
  );
}
