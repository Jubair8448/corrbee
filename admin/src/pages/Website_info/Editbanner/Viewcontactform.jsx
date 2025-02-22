import React, { useRef, useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useGetSingleBannerQuery, usePatchBannerMutation } from "../../../store/api/bannerapi";
import { useContactsingleQuery } from "../../../store/api/webinfoapi";
import Loadercomp from "../../../components/Loadercomp";

const Editbannerform = ({ id }) => {
  // Fetch data for the given contact ID
  const { data, isLoading, error } = useContactsingleQuery(id);

  const [apiresponse, setApiResponse] = useState({});
  const imageInputRef = useRef(null);
  const nvg = useNavigate();

  const config = {
    height: "300px",
  };

  // Create patch banner mutation
  const [patchBanner] = usePatchBannerMutation();

  // Handle loading, error, and data availability
  if (isLoading) {
    return <Loadercomp size={100} />;
  }

  if (error) {
    return <div>Error loading contact: {error.message}</div>;
  }

  // Check if data exists before rendering the form
  if (!data || !data.data) {
    return <div>No contact data found for this ID.</div>;
  }

  const contact = data.data;

  return (
    <div className="container-fluid pb-4 pt-3 px-2 bg-white">
      <Formik
        initialValues={{
          firstname: contact.firstname,
          lastname: contact.lastname,
          email: contact.email,
          mobile: contact.mobile,
          message: contact.Message,
        }}
        // Submit function can be implemented if needed
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ values, errors, handleSubmit, touched, setFieldValue }) => (
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <div
              className="row bg-white pb-4 round"
              style={{
                border: "1px solid #E0E0E0",
                margin: "10px 0px",
                borderRadius: "3px",
                position: "relative",
              }}
            >
              {/* First Name */}
              <div className="col-md-6 px-2 pt-4">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="firstname" className="form-label">
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                      readOnly
                      value={values.firstname}
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.firstname && touched.firstname ? (
                      <p style={{ color: "red" }}>{errors.firstname}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Last Name */}
              <div className="col-md-6 px-2 pt-4">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="lastname" className="form-label">
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <input
                      name="lastname"
                      type="text"
                      readOnly
                      className="form-control"
                      value={values.lastname}
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.lastname && touched.lastname ? (
                      <p style={{ color: "red" }}>{errors.lastname}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6 px-2 pt-4">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="email" className="form-label">
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="email"
                      readOnly
                      className="form-control"
                      value={values.email}
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.email && touched.email ? (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="col-md-6 px-2 pt-4">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="mobile" className="form-label">
                      Mobile <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <input
                      name="mobile"
                      type="text"
                      readOnly
                      className="form-control"
                      value={values.mobile}
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.mobile && touched.mobile ? (
                      <p style={{ color: "red" }}>{errors.mobile}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="col-md-12 px-2 pt-4">
                <div className="row">
                  <div className="col-lg-12">
                    <label htmlFor="message" className="form-label">
                      Message <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      name="message"
                      className="form-control"
                      style={{ height: "170px" }}
                      readOnly
                      value={values.message}
                    ></textarea>
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.message && touched.message ? (
                      <p style={{ color: "red" }}>{errors.message}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12 py-5 px-4 d-flex justify-content-end" style={{ gap: "4px" }}>
                <button type="button" className="btn4" onClick={() => nvg(-1)}>
                  Cancel
                </button>
                <button type="submit" className="btn5" style={{ background: "#0e5da9" }}>
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Editbannerform;
