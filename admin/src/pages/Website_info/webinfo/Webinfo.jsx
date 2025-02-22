import "bootstrap/dist/css/bootstrap.min.css";
import Webinfoform from "./Webinfoform";

const Webinfo = () => {
  return (
    <div style={{ width: "100%" }}>
      <div className="dashboardcontent px-2">
        <div className="container-fluid px-2 design1">
          <div className="row bg-white">
            <div
              className="col-lg-12 d-flex justify-content-between align-items-center py-2"
              style={{
                background: "#bcdae9",
                color: "#00693E",
              }}
            >
              <p className="m-0 customfont">Website Info</p>
              <div className="addnew d-block">
                {/* Uncomment if Close button is required */}
                {/* <button className="btn text-white closebtn">
                  <NavLink
                    to="/categorylist/0"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    x Close
                  </NavLink>
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <Webinfoform />
      </div>
    </div>
  );
};

export default Webinfo;