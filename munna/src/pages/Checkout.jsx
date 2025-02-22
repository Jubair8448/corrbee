
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Field, Form, Formik } from "formik";
import { checkoutvalidation } from "../Validation/Checkout";
import { useNavigate } from "react-router-dom";
import { useGetCartProductQuery } from "../store/api/cartapi";
import { useGetUserAddressQuery } from "../store/api/addressapi";
import Footer from '../components/Footer'

const Checkout = () => {
  const [showadd, setshowadd] = useState(false);
  const nvg = useNavigate();
  const [selectedid, setselectedid] = useState(null); // Initialize to null
  const [defaultaddress, setdefaultaddress] = useState({});

  const { data: cartdata, isLoading: cartloading } = useGetCartProductQuery();
  const { data: addressdata, isLoading: addressloading } = useGetUserAddressQuery();

  const checkoutform = async (values) => {
    const data = {
      total: cartdata?.total_Amount_with_discount, // Add optional chaining
      payment_types: "COD",
      country: values.country,
      first_name: values.first_name,
      last_name: values.last_name,
      address1: values.address1,
      address2: values.address2,
      phone_number: values.mobile,
      pincode: values.pincode,
      state: values.state,
      city: values.city,
      email: values.email,
    };
    nvg("/pay", {
      state: {
        checkoutdata: data,
      },
    });
  };

  const setnewaddress = async (type, data, setFieldValue) => {
    const addressToSet = type === "new" ? defaultaddress : data;
    if (!addressToSet) return; // Exit if no address to set

    setFieldValue("first_name", addressToSet.first_name || "");
    setFieldValue("last_name", addressToSet.last_name || "");
    setFieldValue("mobile", addressToSet.mobile || "");
    setFieldValue("address1", addressToSet.address1 || "");
    setFieldValue("address2", addressToSet.address2 || "");
    setFieldValue("city", addressToSet.city || "");
    setFieldValue("state", addressToSet.state || "");
    setFieldValue("pincode", addressToSet.pincode || "");
    setFieldValue("country", addressToSet.country || "");
    setFieldValue("email", addressToSet.email || ""); // Add if needed for "default"
  };

  useEffect(() => {
    if (!addressloading && addressdata?.data) {
      const df = addressdata.data.find(
        (val) => val.defaultaddress === true
      );
      setselectedid(df?._id || null);
      setdefaultaddress(df || {});
    }
  }, [addressdata, addressloading]);
  if (cartloading || addressloading) {
    return <></>;
  }
  return (
    <>
      <Header />
      {/* section start */}
      <section
        className="section-big-py-space b-g-light"
        style={{ marginTop: "65px" }}
      >
        <div className="custom-container">
          <div className="checkout-page contact-page">
            <div className="checkout-form">
              <Formik
                initialValues={{
                  first_name: defaultaddress?.first_name || "",
                  last_name: defaultaddress?.last_name || "",
                  email: defaultaddress?.email || "",
                  mobile: defaultaddress?.mobile || "",
                  address1: defaultaddress?.address1 || "",
                  address2: defaultaddress?.address2 || "",
                  country: defaultaddress?.country || "",
                  state: defaultaddress?.state || "",
                  city: defaultaddress?.city || "",
                  pincode: defaultaddress?.pincode || "",
                }}
                validationSchema={checkoutvalidation}
                onSubmit={checkoutform}
              >
                {({
                  values,
                  errors,
                  handleSubmit,
                  touched,
                  setFieldValue,
                  setFieldError,
                }) => (
                  <Form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-7 col-sm-12 col-xs-12">
                        {/* <div className="checkout-title">
                  <h3>Billing Details</h3></div> */}

                        <div className="theme-form">
                          <div className="row check-out ">
                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                              <label className="acounttitle m-0">
                                First Name
                              </label>
                              <Field
                                type="text"
                                name="first_name"
                                className="form-control"
                                style={{ fontSize: "12px" }}
                                placeholder="Enter Your First Name"
                              />
                              <div className="error">
                                {errors.first_name && touched.first_name ? (
                                  <p style={{ color: "red" }}>
                                    {errors.first_name}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                              <label className="acounttitle m-0">
                                Last Name
                              </label>
                              <Field
                                name="last_name"
                                type="text"
                                className="form-control"
                                style={{ fontSize: "12px" }}
                                placeholder="Enter Your Last Name"
                              />
                              <div className="error">
                                {errors.last_name && touched.last_name ? (
                                  <p style={{ color: "red" }}>
                                    {errors.last_name}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                              <label className="acounttitle field-label m-0">
                                Phone
                              </label>
                              <Field
                                name="mobile"
                                type="number"
                                style={{ fontSize: "12px" }}
                                className="form-control"
                                placeholder="Enter Your Mobile. No"
                              />
                              <div className="error">
                                {errors.mobile && touched.mobile ? (
                                  <p style={{ color: "red" }}>
                                    {errors.mobile}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="form-group col-md-6 col-sm-6 col-xs-12">
                              <label className="acounttitle field-label m-0">
                                Email Address
                              </label>
                              <Field
                                name="email"
                                type="email"
                                className="form-control"
                                style={{ fontSize: "12px" }}
                                placeholder="Enter Your Email Address"
                              />
                              <div className="error">
                                {errors.email && touched.email ? (
                                  <p style={{ color: "red" }}>
                                    {errors.email}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                              <label className="acounttitle field-label m-0">
                                Address
                              </label>
                              <Field
                                name="address1"
                                type="text"
                                style={{ fontSize: "12px" }}
                                className="form-control"
                                placeholder="House number and street name"
                              />
                              <div className="error">
                                {errors.address1 && touched.address1 ? (
                                  <p style={{ color: "red" }}>
                                    {errors.address1}
                                  </p>
                                ) : null}
                              </div>
                              <Field
                                name="address2"
                                type="text"
                                style={{ fontSize: "12px" }}
                                className="form-control mt-2"
                                placeholder="Apartment, suite, unit etc. (optional)"
                              />
                              <div className="error">
                                {errors.address2 && touched.address2 ? (
                                  <p style={{ color: "red" }}>
                                    {errors.address2}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                              <label className=" acounttitle field-label m-0">
                                Postal Code
                              </label>
                              <Field
                                name="pincode"
                                type="number"
                                style={{ fontSize: "12px" }}
                                className="form-control"
                                placeholder="Enter Your Pincode"
                                minLength={6}
                                maxLength={6}
                                onChange={(e) => {
                                  setFieldValue(
                                    "pincode",
                                    e.target.value.replace(/[^0-9\ ]/gi, "")
                                  );
                                }}
                              />
                              <div className="error">
                                {errors.pincode && touched.pincode ? (
                                  <p style={{ color: "red" }}>
                                    {errors.pincode}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="form-group col-md-12 col-sm-12 col-xs-12 cht">
                              <label className="acounttitle field-label m-0">
                                Country
                              </label>
                              <Field
                                name="country"
                                type="text"
                                style={{ fontSize: "12px" }}
                                className="form-control"
                                placeholder="Country"
                              />
                              <div className="error">
                                {errors.country && touched.country ? (
                                  <p style={{ color: "red" }}>
                                    {errors.country}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="form-group col-md-12 col-sm-12 col-xs-12 cht">
                              <label className="acounttitle field-label m-0">
                                State
                              </label>
                              <Field
                                name="state"
                                type="text"
                                style={{ fontSize: "12px" }}
                                className="form-control"
                                placeholder="Enter Your State"
                              />
                              <div className="error">
                                {errors.state && touched.state ? (
                                  <p style={{ color: "red" }}>
                                    {errors.state}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                            <div className="form-group col-md-12 col-sm-12 col-xs-12 cht">
                              <label className="acounttitle field-label m-0">
                                City
                              </label>
                              <Field
                                name="city"
                                type="text"
                                style={{ fontSize: "12px" }}
                                className="form-control"
                                placeholder="Enter Your City"
                              />
                              <div className="error">
                                {errors.city && touched.city ? (
                                  <p style={{ color: "red" }}>
                                    {errors.city}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              {addressdata?.data?.length > 0 ? (
                                <input
                                  style={{
                                    position: "relative",
                                    top: "2px",
                                    left: "-2px",
                                  }}
                                  type="checkbox"
                                  name="shipping-option"
                                  onClick={() => {
                                    setshowadd(!showadd);
                                    setnewaddress("new", {}, setFieldValue);
                                  }}
                                  id="account-option"
                                />
                              ) : (
                                ""
                              )}
                              <label
                                style={{ fontSize: "12px" }}
                                htmlFor="account-option"
                              >
                                SHIP TO A DIFFERENT ADDRESS?
                              </label>
                            </div>
                          </div>

                          <div
                            className="row details py-2 justify-content-start"
                            style={{
                              display: showadd === true ? "flex" : "none",
                            }}
                          >
                            {addressdata?.data?.map((item) =>
                              item.defaultaddress === true ? (
                                <div
                                  className="col-lg-6"
                                  style={{
                                    marginBottom: "9px",
                                    display: "block",
                                  }}
                                  key={item._id}
                                >
                                  <div className="card">
                                    <div className="card-body">
                                      <h5
                                        className="card-title acounttitle"
                                        style={{
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {item.first_name}&nbsp;
                                        {item.last_name}&nbsp;(Default)
                                      </h5>

                                      <div
                                        className="form-check"
                                        style={{ position: "relative" }}
                                      >
                                        <input
                                          type="radio"
                                          name="flexRadioDefault"
                                          onChange={() => {
                                            setnewaddress(
                                              "default",
                                              item,
                                              setFieldValue
                                            );
                                            setselectedid(item._id);
                                          }}
                                          style={{
                                            position: "absolute",
                                            top: "4px",
                                            left: "10px",
                                          }}
                                          checked={selectedid === item._id}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="flexRadioDefault1"
                                        >
                                          <h5 className="number acounttitle">
                                            Mobile:{" "}
                                            <span className="number2">
                                              {item.mobile}
                                            </span>
                                          </h5>
                                        </label>
                                      </div>
                                      <p className="small-text">
                                        <span style={{ textWrap: "nowrap" }}>
                                          {item.address1}
                                        </span>
                                        &nbsp;
                                        {item.address2}
                                        &nbsp;
                                        {item.country}
                                        &nbsp;
                                        {item.state}
                                        &nbsp;
                                        {item.city}-{item.pincode}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                            {addressdata?.data?.map((item) =>
                              item.defaultaddress === false ? (
                                <div
                                  className="col-lg-6"
                                  style={{
                                    marginBottom: "9px",
                                    display: "block",
                                  }}
                                  key={item._id}
                                >
                                  <div className="card">
                                    <div className="card-body">
                                      <h5
                                        className="card-title acounttitle"
                                        style={{
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {item.first_name}&nbsp;
                                        {item.last_name}&nbsp;
                                      </h5>

                                      <div
                                        className="form-check"
                                        style={{ position: "relative" }}
                                      >
                                        <input
                                          type="radio"
                                          name="flexRadioDefault"
                                          onChange={() => {
                                            setnewaddress(
                                              "default",
                                              item,
                                              setFieldValue
                                            );
                                            setselectedid(item._id);
                                          }}
                                          style={{
                                            position: "absolute",
                                            top: "4px",
                                            left: "10px",
                                          }}
                                          checked={selectedid === item._id}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="flexRadioDefault1"
                                        >
                                          <h5 className="number acounttitle">
                                            Mobile:{" "}
                                            <span className="number2">
                                              {item.mobile}
                                            </span>
                                          </h5>
                                        </label>
                                      </div>
                                      <p className="small-text">
                                        <span style={{ textWrap: "nowrap" }}>
                                          {item.address1}
                                        </span>
                                        &nbsp;
                                        {item.address2}
                                        &nbsp;
                                        {item.country}
                                        &nbsp;
                                        {item.state}
                                        &nbsp;
                                        {item.city}-{item.pincode}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-12 col-xs-12">
                        <div className="checkout-details theme-form ">
                          <div className="order-box">
                            <div className="title-box">
                              <div style={{ fontSize: "12px" }}>
                                Items <span>Total</span>
                              </div>
                            </div>
                            <ul className="qty">
                              {cartdata?.data && cartdata.data.length > 0 ? (
                                cartdata.data.map((item) => (
                                  <li
                                    key={
                                      item.product_id?._id ||
                                      item.product_variant_id?._id ||
                                      `unknown-${Math.random()}`
                                    }
                                    style={{ fontSize: "12px" }}
                                  >
                                    {(item.product_id === null ||
                                      !item.product_id) ? (
                                      item.product_variant_id.product_name
                                    ) : (
                                      item.product_id.product_name
                                    )}{" "}
                                    × {item.product_qty}{" "}
                                    <span style={{ fontSize: "12px" }}>
                                      ₹
                                      {(item.product_id === null ||
                                        !item.product_id) ? (
                                        item.product_variant_id
                                          .selling_price * item.product_qty
                                      ) : (
                                        item.product_id.selling_price *
                                        item.product_qty
                                      )}
                                    </span>
                                  </li>
                                ))
                              ) : (
                                ""
                              )}
                            </ul>
                            <ul className="sub-total">
                              <li style={{ fontSize: "12px" }}>
                                Subtotal{" "}
                                <span
                                  style={{ fontSize: "12px" }}
                                  className="count"
                                >
                                  ₹{cartdata?.total_Amount_with_discount_subtotal}
                                </span>
                              </li>
                              <li style={{ fontSize: "12px" }}>
                                Shipping{" "}
                                <span
                                  style={{ fontSize: "12px" }}
                                  className="count"
                                >
                                  ₹
                                  {cartdata?.shipping_charges == 0
                                    ? `0.00`
                                    : cartdata.shipping_charges}
                                </span>
                              </li>
                            </ul>
                            <ul className="total">
                              <li>
                                Total{" "}
                                <span
                                  style={{ fontSize: "12px" }}
                                  className="count"
                                >
                                  ₹{cartdata?.total_Amount_with_discount}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="payment-box">
                            <div className="text-right">
                              <button
                                type="submit"
                                style={{ fontSize: "12px" }}
                                className="btn-normal btn"
                              >
                                Proceed to Payment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <video
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="/videos/romantic-video5.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
      {/* section end */}
      <Footer />
    </>
  );
};
export default Checkout;