import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mobile_no: "",
    emailID: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const API_URL = `${process.env.REACT_APP_API_URL}/contactus`;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response:", response.data);
      alert("Message sent successfully");
      setFormData({ fname: "", lname: "", mobile_no: "", emailID: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error.message);
      alert(`Failed to send message: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <>
      <Header />

      {/* Breadcrumb Section */}
      <div className="breadcrumb-main marginfromtop">
        <div className="container m-0">
          <div className="row">
            <div className="col">
              <div className="breadcrumb-contain">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><i className="fa fa-angle-double-right" /></li>
                  <li><a href="#">Contact</a></li>
                  <marquee><h1 style={{ color: "purple" }}>corrbee international</h1></marquee>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="contact-page section-big-py-space b-g-light">
        <div className="custom-container">
          <div className="row section-big-pb-space">
            <div className="col-xl-6 offset-xl-3">
              <h3 className="text-center mb-3">Need Assistance? Contact Us </h3>
              <form className="theme-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="fname"><FaUser /> First Name</label>
                      <input type="text" className="form-control" id="fname" name="fname" placeholder="Enter Your name" value={formData.fname} required onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lname"><FaUser /> Last Name</label>
                      <input type="text" className="form-control" id="lname" name="lname" placeholder="Last Name" value={formData.lname} required onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mobile_no"><FaPhoneAlt /> Phone number</label>
                      <input type="text" className="form-control" id="mobile_no" name="mobile_no" placeholder="Enter your number" value={formData.mobile_no} required onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="emailID"><FaEnvelope /> Email</label>
                      <input type="email" className="form-control" id="emailID" name="emailID" placeholder="Email" value={formData.emailID} required onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-12 message">
                    <div>
                      <label htmlFor="message">Write Your Message</label>
                      <textarea className="form-control" id="message" name="message" placeholder="Write Your Message" rows={2} value={formData.message} required onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button className="btn btn-normal bg-green " type="submit">Send Your Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Video Section */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "10px" }}>
            <video style={{ maxWidth: "100%", height: "auto", borderRadius: "30px" }} autoPlay muted loop playsInline>
              <source src="/videos/romantic-video7.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
