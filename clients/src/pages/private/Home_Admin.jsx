import { Progress, Space, Tooltip } from "antd";
import React from "react";
import "./homeAdmin.css";

export default function Home_Admin() {
  return (
    <>
      <div className="space">
        <Space wrap>
          <Tooltip title="75%">
            <Progress type="circle" percent={75} strokeColor="#ff0000" />
          </Tooltip>
          <Tooltip title="70%">
            <Progress
              type="circle"
              percent={70}
              strokeColor="#00ff00"
              status="exception"
            />
          </Tooltip>
          <Tooltip title="100%">
            <Progress type="circle" percent={100} strokeColor="#0000ff" />
          </Tooltip>
        </Space>
      </div>

      <div className="my-custom-classname">
        <div className="percent" style={{ width: "100%" }}>
          <div className="progress-wrapper">
            <Progress percent={30} strokeColor="#ff0000" />
          </div>
          <div className="progress-wrapper">
            <Progress percent={50} strokeColor="#00ff00" status="active" />
          </div>
          <div className="progress-wrapper">
            <Progress percent={70} strokeColor="#0000ff" status="exception" />
          </div>
          <div className="progress-wrapper">
            <Progress percent={100} strokeColor="#ffa500" />
          </div>
          <div className="progress-wrapper">
            <Progress percent={50} showInfo={false} strokeColor="#ff00ff" />
          </div>
        </div>
      </div>
    </>
  );
}
