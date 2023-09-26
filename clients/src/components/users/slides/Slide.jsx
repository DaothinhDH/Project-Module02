import React from "react";
import { Carousel } from "antd";

export default function Slide() {
  const contentStyle = {
    height: "calc(110vh - 140px)",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: "#364d79",
    
  };
  return (
    <>
      <Carousel autoplay autoplaySpeed={1500}>
        <div>
          <div style={contentStyle}>
            <img src="/images/slide.png.jpg" alt="" />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img src="/images/slide02.jpg" alt="" />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img src="/images/slide2.png.jpg" alt="" />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img src="/images/slide002.jpg" alt="" />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img src="/images/slide5.jpg" alt="" />
          </div>
        </div>
      </Carousel>

      <div className="d-flex gap-4 py-2 mx-32 ">
        <div>
          <img
            src="https://vapeclub.vn/image/cache/catalog/dich_vu_noi_bat/4-0x0.png"
            alt=""
          />
        </div>

        <div>
          <img
            src="https://vapeclub.vn/image/cache/catalog/dich_vu_noi_bat/3-0x0.png"
            alt=""
          />
        </div>

        <div>
          <img
            src="https://vapeclub.vn/image/cache/catalog/dich_vu_noi_bat/2-0x0.png"
            alt=""
            
          />
        </div>

        <div>
          <img
            src="https://vapeclub.vn/image/cache/catalog/dich_vu_noi_bat/1-0x0.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
