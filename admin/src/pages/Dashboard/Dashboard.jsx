import React from "react";
import img1 from "../../assets/Ellipse 27.png";
import img2 from "../../assets/Ellipse 28.png";
import img3 from "../../assets/Ellipse 29.png";
import Breadcupdash from "../../components/Breadcupdash";
import { useContactlistQuery } from "../../store/api/webinfoapi";

const Dashboard = () => {
  const { data, isLoading, isError } = useContactlistQuery();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>; // Or any loading spinner component
  }

  // Handle error state
  if (isError || !data) {
    return <div>Error loading data. Please try again later.</div>;
  }

  // Provide default values to prevent errors
  const { user = 0, category = 0, order = 0, latestUsers = [], latestOrders = [] } = data;

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Breadcupdash name={"Dashboard"} />
      <div className="container-fluid py-4" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <div className="row">
          <div className="col-lg-4 mb-2 col-md-6 col-12 dbox">
            <div className="row bg-white py-3 d-flex align-items-center rounded">
              <div className="col-3">
                <img src={img1} alt="Total Customers" />
              </div>
              <div className="col-9">
                <p className="dbold">{user}</p>
                <p className="pbold">Total Customers</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2 col-md-6 col-12 dbox">
            <div className="row bg-white py-3 d-flex align-items-center rounded">
              <div className="col-3">
                <img src={img2} width="63px" alt="Total Categories" />
              </div>
              <div className="col-9">
                <p className="dbold">{category}</p>
                <p className="pbold">Total Categories</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2 col-md-6 col-12 dbox">
            <div className="row bg-white py-3 d-flex align-items-center rounded">
              <div className="col-3">
                <img src={img3} width="63px" alt="Total Orders" />
              </div>
              <div className="col-9">
                <p className="dbold">{order}</p>
                <p className="pbold">Total Orders</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 mx-1">
          <div className="col-lg-6 col-12 dbox rounded my-lg-0 my-2 bg-white specialshow">
            <div className="row">
              <div className="col-12 dtext py-2">10 Latest Customers</div>
              <div className="col-12 px-2">
                <div className="underline"></div>
              </div>
            </div>
            <div className="headtb special">
              <div className="sno" style={{ position: 'relative', left: '8px' }}>Full Name</div>
              <div className="companylogo">Mobile</div>
              <div className="amount">Email</div>
            </div>
            {latestUsers.map((item, index) => (
              <div className="headtb" key={index}>
                <div className="sno px-3">{`${item.first_name} ${item.last_name}`}</div>
                <div className="">{item.mobile}</div>
                <div className="amount">{item.email}</div>
              </div>
            ))}
          </div>
          <div className="col-lg-6 col-12 dbox">
            <div className="row rounded bg-white">
              <div className="col-12 d-flex justify-content-between">
                <div className="dtext py-2">10 Latest Orders</div>
              </div>
              <div className="col-12 px-2">
                <div className="underline"></div>
              </div>
              <div className="headtb special">
                <div className="sno" style={{ position: 'relative', left: '20px' }}>Order ID</div>
                <div className="companylogo" style={{ position: 'relative', left: '50px' }}>Order Status</div>
                <div className="amount">Amount</div>
              </div>
              {latestOrders.map((item, index) => (
                <div className="headtb" key={index}>
                  <div className="sno px-3">{item.orderid}</div>
                  <div className="companylogo">{item.order_status}</div>
                  <div className="amount">₹{item.grand_total_amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;