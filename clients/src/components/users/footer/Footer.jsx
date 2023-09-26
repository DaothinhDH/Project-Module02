import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container grid2">
          <div className="box">
            <h1 style={{ textAlign: "left" }}>
              <img style={{ width: 100 }} src="/images/logo.png" alt="" />
            </h1>
            <p style={{ textAlign: "left" }}>
              Vape Club là thương hiêu lâu đời, đi vào hoạt động vào năm 2015,
              thời điểm vape mới bắt đầu xuất hiện tại Việt Nam, Vape Club đã
              tiên phong đưa sản phẩm thuốc lá điện tử Vape về thị trường Việt
              Nam thịnh hành và phát triển như hiện tại. Tell/Zalo: 0981353920.
            </p>
          </div>

          <div className="box">
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="box">
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>
                Nhà 00b ngõ 896 đường 000, 000,000, Hà Nội{" "}
              </li>
              <li>Email: daohuuthinh010415@gmail.com</li>
              <li>Phone: +84 999 345 6789</li>
            </ul>
          </div>
        </div>
        <div className="icon flex justify-content-center gap-10">
          <div className="img d_flex">
            <i className="fa-brands fa-google-play"></i>
            <span>Google Play</span>
          </div>
          <div className="img d_flex">
            <i className="fa-brands fa-app-store-ios"></i>
            <span>App Store</span>
          </div>
        </div>
      </footer>
    </>
  );
}
