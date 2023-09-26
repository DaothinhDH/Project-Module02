import React from 'react'
import "./headerAdmin.css"
import { BellOutlined, MenuOutlined, MessageOutlined } from "@ant-design/icons";

export default function HeaderAdmin() {
  return (
    <>
      <div className="header-admin d-flex justify-content-between align-items-center p-3">
        <div>
          <MenuOutlined style={{ fontSize: 20 }} />
        </div>
        <div className="d-flex gap-3">
          <BellOutlined style={{ fontSize: 20 }} />
          <MessageOutlined style={{ fontSize: 20 }} />
        </div>
      </div>
    </>
  );
}
