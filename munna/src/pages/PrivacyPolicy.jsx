import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

// Smooth scrolling and video support for the page
export const PrivacyPolicy = () => {

  return (
    <div>
      <Header />
      
      {/* Breadcrumb */}
      <div className="breadcrumb-main marginfromtop" style={{ backgroundColor: "#f9f9f9", padding: "20px 0" }}>
        <div className="container m-0">
          <div className="row">
            <div className="col">
              <div className="breadcrumb-contain">
                <ul style={{ display: "flex", justifyContent: "center", fontSize: "16px", fontWeight: "bold" }}>
                  <li><a href="/" style={{ textDecoration: "none", color: "#333" }}>Home</a></li>
                  <li><i className="fa fa-angle-double-right" style={{ margin: "0 8px" }} /></li>
                  <li><a href="javascript:void(0)" style={{ textDecoration: "none", color: "#333" }}>Privacy Policy</a></li>
                </ul>
                <div style={{ marginTop: "20px" }}>
              <video style={{ maxWidth: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }} autoPlay muted loop playsInline>
                <source src="/videos/romantic-video10.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <section className="section-big-pt-space pb-2" style={{ backgroundColor: "#f9f9f9", padding: "50px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
            <h3 className="text-center mb-4" style={{ fontSize: "32px", fontWeight: "bold", color: "#007bff" }}>PRIVACY POLICY</h3>
<p className="text-center mb-4" style={{ fontSize: "18px", color: "#555", lineHeight: "1.6", textAlign: "justify" }}>
  <b style={{ color: "purple" }}>ARMAN HOSIERY CORRBEE TERMS AND CONDITIONS</b><br />
  <span style={{ color: "#1e90ff", fontWeight: "bold" }}>Terms and Conditions for Arman Hosiery E-Commerce Website</span>

  <br /><br />
  <span style={{ color: "#ff7f50" }}>Welcome to Arman Hosiery!</span> By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before making any purchase.

  <br /><br />
  <span style={{ color: "#228b22", fontWeight: "bold" }}>General Terms</span><br />
  By using our eCommerce platform, you agree to comply with all applicable laws and regulations. You must ensure the information you provide during registration or checkout is accurate and up to date. We reserve the right to refuse or cancel any order for any reason, including but not limited to pricing errors, availability issues, or suspected fraudulent activity.

  <br /><br />
  <span style={{ color: "#ff4500", fontWeight: "bold" }}>Product Information and Pricing</span><br />
  All product descriptions, prices, and availability are subject to change without notice. We do our best to ensure that the information displayed on our website is accurate. However, errors may occasionally occur. If we find a mistake in the pricing or description of an item in your order, we will notify you before completing the transaction.

  <br /><br />
  <span style={{ color: "#32cd32", fontWeight: "bold" }}>Order Acceptance and Payment</span><br />
  Once you place an order, it is considered an offer to purchase. We will notify you when your order has been accepted and shipped. All payments are processed securely, and we accept various methods of payment. We may require additional verification for certain payments to prevent fraud.

  <br /><br />
  <span style={{ color: "#9932cc", fontWeight: "bold" }}>Shipping and Delivery</span><br />
  We provide delivery services to selected regions. Estimated delivery times are provided at checkout, but we are not responsible for any delays caused by shipping carriers or external circumstances. You are responsible for providing accurate shipping information.

  <br /><br />
  <span style={{ color: "#8b0000", fontWeight: "bold" }}>Returns and Refunds</span><br />
  We offer a return and refund policy within 7 days of receiving your order, provided the items are unused and in their original condition. Some products may not be eligible for returns due to health and hygiene reasons.

  <br /><br />
  <span style={{ color: "#0000ff", fontWeight: "bold" }}>Privacy and Data Protection</span><br />
  We respect your privacy and are committed to protecting your personal information. The data you provide during registration or checkout is used solely for the purpose of processing your orders and improving your experience on our website. We will not sell, share, or rent your personal information to third parties, except as necessary to fulfill your order (e.g., shipping companies).

  <br /><br />
  <span style={{ color: "#ff1493", fontWeight: "bold" }}>Account Security</span><br />
  You are responsible for maintaining the confidentiality of your account and password and agree to notify us immediately of any unauthorized use. We are not responsible for any loss or damage resulting from unauthorized access to your account.

  <br /><br />
  <span style={{ color: "#ffd700", fontWeight: "bold" }}>Intellectual Property</span><br />
  All content on this website, including text, images, logos, and product designs, is the intellectual property of Arman Hosiery. Unauthorized use of any materials is prohibited.

  <br /><br />
  <span style={{ color: "#f08080", fontWeight: "bold" }}>Limitation of Liability</span><br />
  Arman Hosiery will not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or website. We are not responsible for any damages resulting from third-party services or external links on our site.

  <br /><br />
  <span style={{ color: "#ff6347", fontWeight: "bold" }}>Amendments to Terms</span><br />
  We may modify or update these Terms and Conditions from time to time. You are advised to review this page regularly to stay informed of any changes. Continued use of the website after changes are posted signifies your acceptance of those changes.

  <br /><br />
  <span style={{ color: "#20b2aa", fontWeight: "bold" }}>Governing Law</span><br />
  These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Arman Hosiery operates.
</p>

              <div className="accordion" id="policyAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Section 1: General Terms
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#policyAccordion">
                    <div className="accordion-body">
                    <span style={{ color: "#228b22", fontWeight: "bold" }}>General Terms</span><br />
By using our platform, you agree to comply with all applicable laws. We reserve the right to refuse or cancel orders due to errors, availability issues, or suspected fraud.

                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Section 2: Data Privacy
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#policyAccordion">
                    <div className="accordion-body">
                    <span style={{ color: "#0000ff", fontWeight: "bold" }}>Privacy and Data Protection</span><br />
We are committed to safeguarding your personal information. Your data is used solely for processing orders and enhancing your shopping experience. We do not share, sell, or rent your data to third parties except when necessary to complete your transactions (e.g., shipping services).

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "30px" }}>
            <video style={{ maxWidth: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }} autoPlay muted loop playsInline>
              <source src="/videos/romantic-video8.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{ marginTop: "20px" }}>
              <video style={{ maxWidth: "100%", height: "auto", borderRadius: "20px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }} autoPlay muted loop playsInline>
                <source src="/videos/romantic-video9.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
