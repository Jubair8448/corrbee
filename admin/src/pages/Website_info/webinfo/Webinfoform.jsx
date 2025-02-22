import React, { useRef, useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Field, Form, Formik } from "formik";
import {
  useGetWebinfoQuery,
  usePatchWebinfoMutation,
} from "../../../store/api/webinfoapi";
import { Webinfovalidation } from "../Validation/Webinfovalidation";

const Webinfoform = () => {
  const { data, isLoading, error } = useGetWebinfoQuery();
  const imageInputRef = useRef(null);
  const [showStatus, setShowStatus] = useState(false);

  const [patchWebinfo] = usePatchWebinfoMutation();

  const WebinfoForm = async (value) => {
    try {
      const response = await patchWebinfo({ data: value });
      console.log("Response:", response);

      if (!response.error && response.data?.status === "successfully update") {
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 5000);
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  // ✅ Proper Loading and Error Handling
  if (isLoading) {
    return <div className="text-center py-5">⏳ Loading Website Info...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">❌ Failed to Load Data!</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center py-5">⚠️ No Website Info Available!</div>;
  }

  return (
    <div className="container-fluid pb-4 pt-3 px-2 bg-white">
      {showStatus && (
        <div className="col-12 alert alert-success mt-3 ml-2" role="alert">
          <h5 className="m-0">Successfully Updated</h5>
        </div>
      )}

      <Formik
        initialValues={{
          website_name: data.data[0]?.website_name || "",
          mobile_no: data.data[0]?.mobile_no || "",
          address: data.data[0]?.address || "",
          email: data.data[0]?.email || "",
          facebook: data.data[0]?.facebook || "",
          instagram: data.data[0]?.instagram || "",
          twitter: data.data[0]?.twitter || "",
          youtube: data.data[0]?.youtube || "",
          pinterest: data.data[0]?.pinterest || "",
          gstno: data.data[0]?.gstno || "",
          logo: data.data[0]?.logo || null,
        }}
        validationSchema={Webinfovalidation}
        onSubmit={(values) => {
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            if (key === "logo" && values.logo instanceof File) {
              formData.append("logo", values.logo);
            } else {
              formData.append(key, values[key]);
            }
          });
          WebinfoForm(formData);
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <div
              className="row bg-white pb-4 rounded"
              style={{ border: "1px solid #E0E0E0", margin: "10px 0px" }}
            >
              {/* Website Name Field */}
              <div className="col-md-6 px-2 pt-4">
                <label className="form-label">Website Name *</label>
                <Field type="text" name="website_name" className="form-control" placeholder="Website Name" />
                {errors.website_name && touched.website_name && (
                  <p className="text-danger">{errors.website_name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="col-md-6 px-2 pt-4">
                <label className="form-label">Email *</label>
                <Field type="email" name="email" className="form-control" placeholder="Email" />
                {errors.email && touched.email && (
                  <p className="text-danger">{errors.email}</p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div className="col-md-6 px-2 pt-3">
                <label className="form-label">Mobile No *</label>
                <Field type="number" name="mobile_no" className="form-control" placeholder="Mobile No" />
                {errors.mobile_no && touched.mobile_no && (
                  <p className="text-danger">{errors.mobile_no}</p>
                )}
              </div>

              {/* Logo Upload Field */}
              <div className="col-12 pt-3">
                <label className="form-label">Logo *</label>
                <div className="border d-flex justify-content-center">
                  <button type="button" style={{ border: "none", outline: "none" }}>
                    <input
                      type="file"
                      name="logo"
                      style={{ display: "none" }}
                      ref={imageInputRef}
                      accept="image/*"
                      onChange={(event) => setFieldValue("logo", event.currentTarget.files[0])}
                    />
                    <img
                      src={
                        values.logo instanceof File
                          ? URL.createObjectURL(values.logo)
                          : `${process.env.REACT_APP_API_URL}/uploads/images/${data.data[0].logo}`
                      }
                      alt="Logo"
                      width="100%"
                      height="200px"
                      onClick={() => imageInputRef.current.click()}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                </div>
                {errors.logo && touched.logo && (
                  <p className="text-danger">{errors.logo}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-12 py-5 px-4 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Webinfoform;
