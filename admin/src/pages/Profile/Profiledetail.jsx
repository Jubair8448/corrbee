import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loadercomp from '../../components/Loadercomp';
import Select from 'react-select';

const countryOptions = [
    { value: "USA", label: "United States" },
    { value: "CAN", label: "Canada" },
    { value: "IND", label: "India" },
    { value: "GBR", label: "United Kingdom" },
    { value: "AUS", label: "Australia" },
    { value: "DEU", label: "Germany" },
    { value: "FRA", label: "France" },
    { value: "CHN", label: "China" },
    { value: "JPN", label: "Japan" },
    { value: "BRA", label: "Brazil" },
    { value: "ZAF", label: "South Africa" },
    { value: "RUS", label: "Russia" },
    { value: "MEX", label: "Mexico" },
    { value: "ITA", label: "Italy" },
];

const Profiledetail = () => {
    const [srtloader, setsrtloader] = useState(false);
    const [Data, setData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setsrtloader(true);
            try {
                const url = `${process.env.REACT_APP_API_URL}api/profile`;
                const response = await axios.get(url);
                setData(response.data);

                // Auto-select user's country if available
                const country = countryOptions.find(c => c.value === response.data?.country);
                setSelectedCountry(country || null);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setsrtloader(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <div className="dashboardcontent">
                <div className="container-fluid px-2 desgin1">
                    <div className="row bg-white">
                        <div className="col-lg-12 d-flex justify-content-between py-2" style={{ background: 'hsla(210, 85%, 32%, 0.2)', color: '#0C5398' }}>
                            <p className="m-0 customfont">Personal Detail</p>
                            <div className="addnew d-block mb-2">
                                <button className="btn text-white closebtn">
                                    <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>× Close</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {srtloader ? (
                    <div className="container-fluid bg-white d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <Loadercomp size={100} />
                    </div>
                ) : (
                    <div className="container-fluid px-2 pb-4 pt-3 bg-white">
                        <div className="row bg-white pb-4 round" style={{ border: '1px solid #E0E0E0', margin: "10px 0px", borderRadius: '3px' }}>
                            {[
                                { label: "Full Name", value: Data?.first_name || "-" },
                                { label: "Email", value: Data?.email || "-" },
                                { label: "Date of Birth", value: Data?.dob || "-" },
                                { label: "Mobile No.", value: Data?.mobile_no || "-" },
                                { label: "Address", value: Data?.address || "-" },
                                { label: "State", value: Data?.state || "-" },
                                { label: "City", value: "Gurugram" },
                                { label: "Pincode", value: Data?.pincode || "-" },
                            ].map((item, index) => (
                                <div className="col-6 px-4 pt-4" key={index}>
                                    <div className="row">
                                        <div className="col-3">
                                            <label className="form-label">{item.label}</label>
                                        </div>
                                        <div className="col-9">
                                            <p className="customcolor">{item.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Country Dropdown */}
                            <div className="col-6 px-4 pt-4">
                                <div className="row">
                                    <div className="col-3">
                                        <label className="form-label">Country</label>
                                    </div>
                                    <div className="col-9">
                                        <Select
                                            options={countryOptions}
                                            value={selectedCountry}
                                            onChange={setSelectedCountry}
                                            placeholder="Select a country"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 py-5 px-4 d-flex justify-content-end" style={{ gap: '4px' }}>
                                <NavLink to="/Addprofile">
                                    <button className="btn3">Edit Profile</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profiledetail;
