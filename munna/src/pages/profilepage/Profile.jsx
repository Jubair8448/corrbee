import React, { useEffect, useState, useCallback } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../Localstorage/Store";
import AddressformComp from "./AddressformComp";
import EditressformComp from "./EditressformComp";
import {
  useGetUserInfoQuery,
  usePatchUserMutation,
} from "../../store/api/userapi";
import {
  useDeleteAddressMutation,
  useGetUserAddressQuery,
} from "../../store/api/addressapi";
import { useGetOrderByUserQuery } from "../../store/api/orderapi";
import Footer from "../../components/Footer";

// Constants for tab names
const TAB_PROFILE = "tab-1";
const TAB_ADDRESSES = "tab-3";
const TAB_ORDERS = "tab-4";
const TAB_EDIT_PROFILE = "tab-5";

const Profile = () => {
  const {
    data: userInfo,
    isLoading: userLoading,
    refetch: refetchUserInfo,
  } = useGetUserInfoQuery();
  const [patchUser] = usePatchUserMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const [activeTab, setActiveTab] = useState(TAB_PROFILE);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 730);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [createAddressStatus, setCreateAddressStatus] = useState(false);
  const [createAddressMsg, setCreateAddressMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressToDeleteId, setAddressToDeleteId] = useState(0);
  const [isError, setIsError] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Use useCallback to memoize the logout function
  const logout = useCallback(() => {
    removeToken();
    navigate("/");
  }, [navigate]);

  // Update user info when it changes
  useEffect(() => {
    if (!userLoading && userInfo?.data) {
      setFirstName(userInfo.data.first_name);
      setLastName(userInfo.data.last_name);
      setEmail(userInfo.data.email);
      setMobileNumber(userInfo.data.mobile);
      const userDob = new Date(userInfo.data.createdAt);
      setDateOfBirth(userDob.toISOString().split("T")[0]);
    }
  }, [userInfo, userLoading]);

  // Open create address form
  const openCreateAddressForm = () => {
    setIsEditMode(false);
    setIsAddressFormVisible(true);
  };

  // Close address form
  const closeAddressForm = () => {
    setIsEditMode(false);
    setIsAddressFormVisible(false);
  };

  // Open edit address form
  const openEditAddressForm = (address) => {
    setSelectedAddress(address);
    setIsEditMode(true);
    setIsAddressFormVisible(true);
  };

  // Edit user profile
  const editUserProfile = async () => {
    if (
      firstName === "" ||
      email === "" ||
      lastName === "" ||
      mobileNumber === ""
    ) {
      setIsError(true);
      setFirstNameError(firstName === "" ? "Please Enter First Name" : "");
      setLastNameError(lastName === "" ? "Please Enter Last Name" : "");
      setEmailError(email === "" ? "Please Enter Email" : "");
      setMobileError(mobileNumber === "" ? "Please Enter Mobile Number" : "");
      return;
    }

    const formData = {
      email,
      first_name: firstName,
      last_name: lastName,
      mobile_no: mobileNumber,
      dob: dateOfBirth,
    };

    setIsLoading(true);
    try {
      await patchUser(formData);
      await refetchUserInfo();
      setActiveTab(TAB_PROFILE);
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch order list and address data
  const { data: orderList, isLoading: orderListLoading } =
    useGetOrderByUserQuery();
  const {
    data: addressData,
    isLoading: addressLoading,
    refetch: refetchAddress,
  } = useGetUserAddressQuery();

  // Delete address
  const deleteAddressHandler = async () => {
    try {
      const res = await deleteAddress(addressToDeleteId);
      if (res.data) {
        await refetchAddress();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      // Handle error (e.g., show error message)
    }
  };

  // Update active tab based on location state
  useEffect(() => {
    if (location.state?.id === 1) {
      setActiveTab(TAB_PROFILE);
    } else if (location.state?.id === 2) {
      setActiveTab(TAB_ORDERS);
    } else if (location.state?.id === 3) {
      setActiveTab(TAB_ADDRESSES);
    } else {
      setActiveTab(TAB_ORDERS);
    }
  }, [location.state]);

  // Update mobile view state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 730);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabContent = {
    [TAB_PROFILE]: (
      <div
        id={TAB_PROFILE}
        style={{ display: activeTab === TAB_PROFILE ? "block" : "none" }}
        className={
          activeTab === TAB_PROFILE
            ? "tab-content active default product-block3"
            : "tab-content product-block3"
        }
      >
        {userLoading ? (
          ""
        ) : (
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div
                  className="col-12 d-flex justify-content-between"
                  style={{ marginBottom: "17px" }}
                >
                  <h5 className="mb-3 acounttitle">Personal-Information</h5>
                  <input
                    style={{
                      outline: "none",
                      padding: "5px 9px",
                      fontSize: "11px",
                    }}
                    type="button"
                    onClick={() => setActiveTab(TAB_EDIT_PROFILE)}
                    className="profile-edit-btn"
                    name="btnAddMore"
                    value="Edit Profile"
                  />
                </div>
                <div className="col-lg-12 ">
                  <div className="profile-head">
                    <div className="form-group d-flex justify-content-between">
                      <label
                        className="profilelabel"
                        style={{ fontWeight: "500" }}
                        htmlFor="name"
                      >
                        First Name
                      </label>
                      <p className="profilelabel" style={{ color: "#abb1b7" }}>
                        {userInfo?.data?.first_name}
                      </p>
                    </div>

                    <div className="form-group d-flex justify-content-between">
                      <label
                        className="profilelabel"
                        style={{ fontWeight: "500" }}
                        htmlFor="name"
                      >
                        Last Name
                      </label>
                      <p className="profilelabel" style={{ color: "#abb1b7" }}>
                        {userInfo?.data?.last_name}
                      </p>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                      <label
                        className="profilelabel"
                        style={{ fontWeight: "500" }}
                        htmlFor="review"
                      >
                        Mobile Number
                      </label>
                      <p className="profilelabel" style={{ color: "#abb1b7" }}>
                        {userInfo?.data?.mobile}
                      </p>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                      <label
                        className="profilelabel"
                        style={{ fontWeight: "500" }}
                        htmlFor="review"
                      >
                        Email ID
                      </label>
                      <p className="profilelabel" style={{ color: "#abb1b7" }}>
                        {userInfo?.data?.email}
                      </p>
                    </div>

                    <div className="form-group d-flex justify-content-between">
                      <label
                        className="profilelabel"
                        style={{ fontWeight: "500" }}
                        htmlFor="dob"
                      >
                        Date of Birth
                      </label>
                      <p className="profilelabel" style={{ color: "#abb1b7" }}>
                        {new Date(
                          userInfo?.data?.createdAt?.split("Time")[0]
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-12 "
                  style={{ position: "relative", top: "-32px" }}
                >
                  <div className="profile-head">
                    <div
                      className="herobtn"
                      style={{ marginBottom: "20px", textAlign: "left" }}
                    >
                      <input
                        style={{
                          outline: "none",
                          padding: "5px 9px",
                          fontSize: "12px",
                        }}
                        type="button"
                        onClick={logout}
                        className="profile-edit-btn"
                        name="btnAddMore"
                        value="Logout"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    [TAB_EDIT_PROFILE]: (
      <div
        id={TAB_EDIT_PROFILE}
        style={{ display: activeTab === TAB_EDIT_PROFILE ? "block" : "none" }}
        className={
          activeTab === TAB_EDIT_PROFILE
            ? "tab-content active default product-block3"
            : "tab-content product-block3"
        }
      >
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="row">
              <div className="col-12 ">
                <h5 className="mb-3">Personal-Information</h5>
              </div>
              <div className="col-lg-6 ">
                <div className="profile-head">
                  <div className="form-group ">
                    <label
                      style={{
                        fontWeight: "500",
                        margin: "0px",
                        fontSize: "12px",
                      }}
                      htmlFor="name"
                    >
                      First Name
                    </label>
                    <input
                      style={{ outline: "none", fontSize: "12px" }}
                      type="text"
                      className="form-control"
                      id="name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <div className="error">
                      {isError && (
                        <p style={{ color: "red" }}>{firstNameError}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label
                      style={{
                        fontWeight: "500",
                        margin: "0px",
                        fontSize: "12px",
                      }}
                      htmlFor="review"
                    >
                      Mobile Number
                    </label>
                    <input
                      style={{ outline: "none", fontSize: "12px" }}
                      type="text"
                      className="form-control"
                      id="review"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                      }}
                    />
                    <div className="error">
                      {isError && (
                        <p style={{ color: "red" }}>{mobileError}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group ">
                    <label
                      style={{
                        fontWeight: "500",
                        margin: "0px",
                        fontSize: "12px",
                      }}
                      htmlFor="dob"
                    >
                      Date of Birth
                    </label>
                    <input
                      style={{ outline: "none", fontSize: "12px" }}
                      type="date"
                      className="form-control"
                      id="review"
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="profile-head">
                  <div className="form-group ">
                    <label
                      style={{
                        fontWeight: "500",
                        margin: "0px",
                        fontSize: "12px",
                      }}
                      htmlFor="name"
                    >
                      Last Name
                    </label>
                    <input
                      style={{ outline: "none", fontSize: "12px" }}
                      type="text"
                      className="form-control"
                      id="name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                    <div className="error">
                      {isError && (
                        <p style={{ color: "red" }}>{lastNameError}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label
                      style={{
                        fontWeight: "500",
                        margin: "0px",
                        fontSize: "12px",
                      }}
                      htmlFor="review"
                    >
                      Email ID
                    </label>
                    <input
                      style={{ outline: "none", fontSize: "12px" }}
                      type="Email"
                      className="form-control"
                      id="review"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <div className="error">
                      {isError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                    </div>
                  </div>

                  <div className="herobtn" style={{ marginBottom: "20px" }}>
                    <input
                      style={{
                        outline: "none",
                        padding: "5px 9px",
                        fontSize: "12px",
                      }}
                      type="button"
                      onClick={editUserProfile}
                      className="profile-edit-btn"
                      name="btnAddMore"
                      value="Save"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [TAB_ADDRESSES]: (
      <div
        id={TAB_ADDRESSES}
        style={{ display: activeTab === TAB_ADDRESSES ? "block" : "none" }}
        className={
          activeTab === TAB_ADDRESSES
            ? "tab-content active default product-block3"
            : "tab-content product-block3"
        }
      >
        {createAddressStatus && (
          <div className="col-12 px-4 d-flex">
            <div
              className="col-12 col-offset-2 alert alert-success mt-2 ms-1"
              role="alert"
            >
              <h5 style={{ padding: "0px", margin: "0px", color: "#0a3622" }}>
                {createAddressMsg}
              </h5>
            </div>
          </div>
        )}
        <div style={{ justifyContent: "space-between" }} className="d-flex">
          <h4
            style={{ color: "#2B2A29", font: "Inter", padding: "0px" }}
            className="Manageadd acounttitle"
          >
            Manage Addresses
          </h4>
          <h4
            className="acounttitle"
            style={{ color: "purple", cursor: "pointer" }}
            onClick={openCreateAddressForm}
          >
            + Add Address
          </h4>
        </div>
        <div className="row">
          {isEditMode ? (
            <EditressformComp
              addaddress={isAddressFormVisible}
              item={selectedAddress}
              reload={refetchAddress}
              closefun={closeAddressForm}
              editmode={isEditMode}
            />
          ) : (
            <AddressformComp
              addaddress={isAddressFormVisible}
              closefun={closeAddressForm}
              reload={refetchAddress}
              editmode={isEditMode}
            />
          )}

          <div className="">
            <div className="row details py-2 justify-content-center">
              {addressData?.data?.map((item, index) => (
                <div className="col-lg-6" style={{ marginBottom: "9px" }} key={item._id}>
                  <div className="card" style={{ padding: "0px 8px" }}>
                    <div className="card-body">
                      <h5
                        className="card-title acounttitle d-flex justify-content-between"
                        style={{
                          textTransform: "capitalize",
                          paddingLeft: "9px",
                        }}
                      >
                        <span>
                          {item.first_name}&nbsp;{item.last_name}
                        </span>

                        <span className="hello">
                          <div className="dropdown">
                            <button
                              className="dot-dot secondary dropdown-toggle"
                              style={{ border: "none", background: "white" }}
                              type="three dots"
                              id="dropdownMenu"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdownMenu lateststyle  ">
                              <li>
                                <button
                                  type="button"
                                  style={{ fontSize: "12px" }}
                                  onClick={() => {
                                    openEditAddressForm(item);
                                  }}
                                  className="dropdown-item"
                                >
                                  <i className="fa fa-pen-to-square "></i>
                                  &nbsp;Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  style={{ fontSize: "12px" }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal1400000"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setAddressToDeleteId(item._id);
                                  }}
                                >
                                  <i className="fa fa-trash-can "></i>
                                  &nbsp;Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </span>
                      </h5>

                      <div
                        className="form-check"
                        style={{ paddingLeft: "9px" }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />

                        <label
                          className="label m-0"
                          htmlFor="flexRadioDefault1"
                        >
                          <h6 className=" acounttitle pb-2">
                            Mobile:{" "}
                            <span className="number2">{item.mobile}</span>
                          </h6>
                          <h6 className=" acounttitle pb-2">
                            Email ID:{" "}
                            <span className="number2">{item.email}</span>
                          </h6>
                        </label>
                      </div>
                      <p className="small-text" style={{ paddingLeft: "9px" }}>
                        {item.address1}&nbsp;{item.address2}&nbsp;
                        {item.country}&nbsp;{item.state}&nbsp;{item.city}-
                        {item.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    [TAB_ORDERS]: (
      <div
        id={TAB_ORDERS}
        style={{ display: activeTab === TAB_ORDERS ? "block" : "none" }}
        className={
          activeTab === TAB_ORDERS
            ? "tab-content active default product-block3"
            : "tab-content product-block3"
        }
      >
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th>Order Id</th>
                  <th>Order Date</th>
                  <th>Total Quantity</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orderList?.orderlist?.map((item, index) => (
                  <tr key={item.order_id}>
                    <td>{item.order_id}</td>
                    <td>
                      {" "}
                      {new Date(
                        item.order_date.split("Time")[0]
                      ).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      Apparels : {item.totalItems} Item
                    </td>
                    <td>₹{item.grand_total_amount}</td>
                    <td>
                      <p style={{ width: "118px" }}>
                        {" "}
                        <span>
                          <img
                            src={
                              item.order_status === "Pending"
                                ? "./images/icon/success.png"
                                : item.order_status === "Dilevered"
                                ? "./images/icon/onway.png"
                                : item.order_status === "Shipped"
                                ? "./images/icon/delete.png"
                                : "./images/icon/danger.png"
                            }
                            alt="404"
                          />
                        </span>{" "}
                        &nbsp; {item.order_status}{" "}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <>
      {(addressLoading || orderListLoading) && <></>}
      <div>
        <Header />

        <div>
          {/* breadcrumb start */}
          <div
            className="breadcrumb-main marginfromtop"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <div className="container m-0">
              <div className="row">
                <div className="col">
                  <div className="breadcrumb-contain">
                    <div>
                      <ul>
                        <li>
                          <a href="/">home</a>
                        </li>
                        <li>
                          <i className="fa fa-angle-double-right" />
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            {activeTab === TAB_PROFILE
                              ? "Profile"
                              : activeTab === TAB_ORDERS
                              ? "Order History"
                              : activeTab === TAB_ADDRESSES
                              ? "Addresses List"
                              : activeTab === TAB_ORDERS
                              ? "Order List"
                              : activeTab === TAB_EDIT_PROFILE
                              ? "Edit Profile"
                              : ""}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* breadcrumb End */}
          <section
            className="section-big-pt-space pb-2"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <div className="col-lg-12 col-sm-12 col-xs-12 mt-lg-3  mb-5">
              <div className="container-fuild emp-profile d-flex justify-content-center">
                <div
                  className="row profile px-4"
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <section className="tab-product-main-tab">
                    <div className="tab2-product d-flex justify-content-center main-tab2 newscroll">
                      <ul className="abc justify-content-center">
                        <li
                          className={
                            activeTab === TAB_PROFILE ? "current" : ""
                          }
                        >
                          <a
                            href="javascript:void(0)"
                            className="size21 extradesign"
                            onClick={() => setActiveTab(TAB_PROFILE)}
                          >
                            <img
                              src="./images/icon/11.png"
                              className="sizeimg1"
                              alt="404"
                            />{" "}
                            &nbsp; Profile
                          </a>
                        </li>
                        <li
                          className={
                            activeTab === TAB_ADDRESSES ? "current" : ""
                          }
                        >
                          <a
                            href="javascript:void(0)"
                            className="size22"
                            onClick={() => setActiveTab(TAB_ADDRESSES)}
                          >
                            {" "}
                            <img
                              src="./images/icon/14.png"
                              className="sizeimg2"
                              alt="404"
                            />{" "}
                            &nbsp;
                            Addresses {isMobileView ? "" : "List"}
                          </a>
                        </li>
                        <li
                          className={activeTab === TAB_ORDERS ? "current" : ""}
                        >
                          <a
                            href="javascript:void(0)"
                            className="size23"
                            onClick={() => setActiveTab(TAB_ORDERS)}
                          >
                            <img
                              src="./images/icon/13.png"
                              className="sizeimg3"
                              alt="404"
                            />{" "}
                            &nbsp;
                            Order {isMobileView ? "" : "List"}
                          </a>
                        </li>
                        <li
                          className={
                            activeTab === TAB_EDIT_PROFILE ? "current" : ""
                          }
                        >
                          <a
                            href="javascript:void(0)"
                            onClick={() => setActiveTab(TAB_EDIT_PROFILE)}
                          >
                            medicine
                          </a>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="tab-product-main-tab">
                    <div className="row mt-5">
                      {tabContent[activeTab]}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          <div
            className="modal fade"
            id="exampleModal1400000"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                <div className="modal-header mod-line d-none"></div>
                <div className="modal-body">
                  <div className="row gy-3 mt-2">
                    <h4
                      style={{
                        color: "purple",
                        cursor: "pointer",
                        textAlign: "center",
                        fontSize: "21px",
                        fontWeight: "800",
                      }}
                    >
                      Address Warning
                    </h4>
                    <p
                      className="ccedit-p "
                      style={{ textAlign: "center", fontSize: "12px" }}
                    >
                      Do You Really Want to Delete this Record ?
                    </p>
                  </div>
                </div>
                <div
                  className="modal-footer mod-line m-auto"
                  style={{ border: "none" }}
                >
                  <button
                    type="button"
                    className="btn closebtn "
                    style={{
                      paddingRight: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "purple",
                    }}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn closebtn profile-edit-btn justhoverwh"
                    data-bs-dismiss="modal"
                    onClick={deleteAddressHandler}
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "5px",
              marginBottom: "10px",
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
              <source src="/videos/romantic-video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;