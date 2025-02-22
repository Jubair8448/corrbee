import React, { useEffect, useState } from "react";
// import React from 'react'

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
// import { TfiAlignJustify } from "react-icons/tfi";
// import { useLocation } from "react-router-dom";
export const Termsconditions = () => {

  return (
    <div>
      <Header />



      <div>
          {/* breadcrumb start */}
  <div className="breadcrumb-main marginfromtop" style={{backgroundColor:"#f9f9f9"}}>
    <div className="container m-0">
      <div className="row">
        <div className="col">
          <div className="breadcrumb-contain">
            <div>
              <ul>
                <li><a href="/home">home</a></li>
                <li><i className="fa fa-angle-double-right" /></li>
                <li><a href="javascript:void(0)">Terms and Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* breadcrumb End */}
        <section className="section-big-pt-space pb-2" style={{backgroundColor:"#f9f9f9"}}>
          <div className="col-lg-12 col-sm-12 col-xs-12 mt-lg-3 mt-xs-4 mb-5">
            <div className="container-fuild emp-profile">
              <div className="row profile2">
               

                <section className="tab-product-main-tab">
                  <div className="row mt-2">
                  <h2 className="policy-title">ARMAN HOSIERY CORRBEE - Terms and Conditions</h2>
  <p className="policy-text">
    <b>Please read our terms and conditions carefully:</b><br />
    <br />
    <b>1. Product Manufacturing:</b> ARMAN HOSIERY CORRBEE is an international manufacturer specializing in high-quality bras and panties. We follow the best industry practices to ensure that our products meet international standards for comfort, style, and durability.<br />
    <b>2. Quality Assurance:</b> All products undergo strict quality checks. Our manufacturing facilities ensure that every product is crafted with precision, offering the best fit and support.<br />
    <b>3. Delivery and Shipping:</b> We offer international delivery for our products. The delivery time may vary based on location and product availability. We ensure secure packaging to prevent any damage during transit.<br />
    <b>4. Returns and Refunds:</b> If you are not satisfied with the products, we have a return policy in place. Returns are accepted within a specific time frame from the date of delivery. Please refer to the return policy for further details.<br />
    <b>5. Customer Support:</b> Our dedicated customer support team is available to assist you with any queries or concerns related to your orders. We are committed to providing you with the best service.<br />
    <b>6. Privacy and Data Protection:</b> Your privacy is important to us. We do not share your personal data with third parties and use it only for business operations such as processing orders and shipping.<br />
    <br />
    <b>Note:</b> By using our services, you agree to our terms and conditions. We reserve the right to update or modify our terms at any time, and changes will be communicated accordingly.<br />
    <br />
    <b>Additional Terms:</b> Violation of these terms may result in the suspension of your account or services.
  </p>

                  </div>
                </section>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "30px" }}>
            <video style={{ maxWidth: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }} autoPlay muted loop playsInline>
              <source src="/videos/romantic-video8.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{ marginTop: "20px" }}>
              <video style={{ maxWidth: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }} autoPlay muted loop playsInline>
                <source src="/videos/romantic-video12.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          </div>
        </section>
        {/* <Footer /> */}
        {/* </div> */}

        <Footer /> 

        {/* footer start */}
     
      </div>
    </div>
  );
};
export default Termsconditions;