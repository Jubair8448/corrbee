import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-main">
                <div className="footer-box">
                  <div className="footer-title mobile-title">
                    <h5>about</h5>
                  </div>
                  <div className="footer-contant">
                    <div className="footer-logo">
                      <NavLink to="/Home">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/jubair.png`}
                          className="maxwidthlogo"
                          alt="logo"
                        />
                      </NavLink>
                    </div>
                    <ul className="paymant">
                      <li>
                        <a
                          href="https://arman-hosiery.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-industry fa-2x"
                            style={{ color: 'purple' }}
                          >
                            {' '}
                            ARMAN HOSIERY
                          </i>
                        </a>
                        <div
                          style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            position: 'relative',
                            height: '24px',
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-block',
                              position: 'absolute',
                              animation: 'scrollText 10s linear infinite',
                            }}
                          >
                            This product is made by{' '}
                            <a
                              href="https://arman-hosiery.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'purple' }}
                            >
                              ARMAN HOSIERY
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-box">
                  <div className="footer-title">
                    <h5>INFORMATION</h5>
                  </div>
                  <div className="footer-contant">
                    <ul>
                      <li>
                        <NavLink to="/about">About Us</NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact">Contact Us</NavLink>
                      </li>
                      <li>
                        <NavLink to="/privacypolicy">Privacy Policy</NavLink>
                      </li>
                      <li>
                        <NavLink to="/termsconditions">Terms & Conditions</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-box">
                  <div className="footer-title">
                    <h5>contact us</h5>
                  </div>
                  <div className="footer-contant">
                    <ul className="contact-list">
                      <li
                        onClick={() =>
                          window.open(
                            'https://www.google.com/maps/search/?api=1&query=Gali+D1,Trans+DELHI+Signature+City+Ghaziabad-Agraula+Uttar+Pradesh+201103',
                            '_blank'
                          )
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fa fa-map-marker" style={{ color: 'purple' }} /> Gali D1, Trans DELHI Signature
                        City Ghaziabad-Agraula, <br />
                        Uttar Pradesh - <span>201103</span>
                      </li>
                      <li>
                        <i className="fa fa-phone" style={{ color: 'purple' }}></i> Call us:
                        <span>
                          <a href="tel:9311561840">9311561840</a>,{' '}
                          <a href="tel:9643860819">9643860819</a>
                        </span>
                      </li>
                      <li
                        onClick={() =>
                          (window.location.href = 'mailto:internationalcorrbee@gmail.com')
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fa fa-envelope-o" style={{ color: 'purple' }} /> Email us:{' '}
                        <span>internationalcorrbee@gmail.com</span>
                      </li>
                      <li>
                        <i className="fa fa-fax" style={{ color: 'purple' }}></i>fax <span>123456</span>
                      </li>
                      <li>
                        <div style={{ gap: 6, position: 'relative', alignItems: 'center' }}>
                          <span style={{ color: '#000000', fontSize: '18px' }}> Follow us: </span>
                          <br />
                          <br />
                          <div style={{ display: 'flex', gap: 10 }}>
                            <a
                              href="https://wa.me/9311561840"
                              style={{
                                position: 'relative',
                                background: 'silver',
                                border: 'solid black',
                                borderRadius: '50%',
                                color: 'red',
                                padding: '7px 10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textDecoration: 'none',
                              }}
                            >
                              <i
                                style={{ position: 'relative', color: 'purple' }}
                                className="fa-brands fa-whatsapp"
                              />
                            </a>
                            <a
                              href="https://www.google.com/maps/search/?api=1&query=ARMAN HOSIERY CORRBEE"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                position: 'relative',
                                background: 'silver',
                                border: 'black solid',
                                borderRadius: '50%',
                                color: 'white',
                                padding: '7px 10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <i
                                style={{ position: 'relative', color: 'purple' }}
                                className="fa fa-map-marker"
                              />
                            </a>
                            <a
                              href="https://arman-hosiery.b12sites.com"
                              style={{
                                position: 'relative',
                                background: 'silver',
                                border: 'black solid',
                                borderRadius: '50%',
                                color: '"white"',
                                padding: '7px 8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <i
                                style={{ position: 'relative', color: 'purple' }}
                                className="fa-brands fa-linkedin"
                              />
                            </a>
                            <a
                              href="https://youtube.com/@corrbeeinternational?si=Ep1lYMgoigAn3-YD"
                              style={{
                                position: 'relative',
                                background: 'silver',
                                border: 'black solid',
                                borderRadius: '50%',
                                color: '"purple"',
                                padding: '7px 7px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <i
                                style={{ position: 'relative', color: 'purple' }}
                                className="fa-brands fa-youtube"
                              />
                            </a>
                            <a
                              href="https://www.instagram.com/corrbee_international/"
                              style={{
                                position: 'relative',
                                background: 'silver',
                                border: 'black solid',
                                borderRadius: '50%',
                                color: '"white"',
                                padding: '7px 8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <i
                                style={{ position: 'relative', color: 'purple' }}
                                className="fa-brands fa-instagram"
                              />
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-box">
                  <div className="footer-title">
                    <h5>MORDEL VIDEOS</h5>
                  </div>
                  <div className="footer-contant">
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <iframe
                        src="https://www.youtube.com/embed/tCfQdOGOsgY"
                        title="Embedded Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                        }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* Add the following CSS */
