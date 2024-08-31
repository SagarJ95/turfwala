import React, { Fragment } from "react";

const userBooking = () => {
  return (
    <>
      <Fragment>
        <header className="header" id="mo-Header">
          <div className="container">
            <div className="row">
              <div className="header-item item-left">
                <a className="navbar-brand" href="index.html">
                  <img
                    src="assets/images/home/tw-logo.png"
                    className="img-fluid logo"
                  />
                </a>
              </div>

              <div className="header-item item-center">
                <div className="menu-overlay"></div>
                <nav className="menu">
                  <div className="mobile-menu-head">
                    <div className="go-back">
                      <i className="fa fa-angle-left"></i>
                    </div>
                    <div className="current-menu-title"></div>
                    <div className="mobile-menu-close">&times;</div>
                  </div>
                  <ul className="menu-main">
                    <li>
                      <a href="#" className="button">
                        List your turf
                      </a>
                    </li>
                    <li>
                      <a href="login.html" className="mob-register">
                        Login/Register
                      </a>
                      <a
                        href="login.html"
                        className="d-none d-lg-block d-md-block"
                      >
                        <img
                          src="assets/images/home/user.svg"
                          className="img-fluid user-icon"
                          alt="image"
                        />
                      </a>
                      <div className="login-dd">
                        <div className="dropdown">
                          <div onClick="login_dd()" className="dropbtn">
                            <i className="fa-solid fa-angle-down"></i>
                          </div>
                          <div id="logindd" className="dropdown-content">
                            <a href="#">My Bookings</a>
                            <a href="#">Profile</a>
                            <a href="#">Logout</a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="header-item item-right">
                <div className="mobile-menu-trigger">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="booking-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h4>Booking</h4>
                <ul>
                  <li>
                    <a href="index.html" className="active-text">
                      Home
                    </a>
                  </li>
                  <li className="p5">/</li>
                  <li>Booking Turf</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="prof-page">
          <div className="container">
            <div className="outer">
              <div className="row">
                <div className="col-lg-12">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="my-bookings-tab-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#my-bookings-tab"
                        type="button"
                        role="tab"
                        aria-controls="my-bookings-tab"
                        aria-selected="true"
                      >
                        My Bookings
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="my-profile-tab-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#my-profile-tab"
                        type="button"
                        role="tab"
                        aria-controls="my-profile-tab"
                        aria-selected="false"
                      >
                        Profile
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="my-bookings-tab"
                      role="tabpanel"
                      aria-labelledby="my-bookings-tab-tab"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <h5>My Bookings</h5>
                          <p>Manage and track all your court bookings.</p>
                        </div>
                        <div className="col-lg-6">
                          <div className="filter-option">
                            <h6>Sort By:</h6>
                            <select
                              name="cat"
                              id="original"
                              className="postform"
                            >
                              <option>Select</option>
                              <option className="level-0" value="">
                                Upcoming
                              </option>
                              <option className="level-0" value="">
                                Completed
                              </option>
                              <option className="level-0" value="">
                                On Going
                              </option>
                              <option className="level-0" value="">
                                Cancelled
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="table-light">
                              <tr>
                                <th>Sr No.</th>
                                <th>Court Name</th>
                                <th>Date & Time</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="sr-no">1</div>
                                </td>
                                <td>
                                  <div className="time-date">
                                    <p>Sparta Arena</p>
                                  </div>
                                </td>
                                <td>
                                  <div className="time-date">
                                    Mon, Jul 11
                                    <br />
                                    06:00 PM - 08:00 PM
                                  </div>
                                </td>
                                <td className="vm">₹ 150000</td>
                                <td className="vm">
                                  <span className="status">Confirm</span>
                                </td>
                                <td className="vm">
                                  <div className="dropdown">
                                    <div
                                      onClick="book_action()"
                                      className="dropbtn"
                                    >
                                      <i className="fa-solid fa-ellipsis"></i>
                                    </div>
                                    <div
                                      id="editbooking"
                                      className="dropdown-content"
                                    >
                                      <a href="#">Cancel Booking</a>
                                      <a href="#">Delete</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  <p>Sparta Arena</p>
                                </td>
                                <td>
                                  Mon, Jul 11
                                  <br />
                                  06:00 PM - 08:00 PM
                                </td>
                                <td className="vm">₹ 150000</td>
                                <td className="vm">
                                  <span className="status">Confirm</span>
                                </td>
                                <td className="vm">
                                  <div className="dropdown">
                                    <div
                                      onClick="book_action()"
                                      className="dropbtn"
                                    >
                                      <i className="fa-solid fa-ellipsis"></i>
                                    </div>
                                    <div
                                      id="editbooking"
                                      className="dropdown-content"
                                    >
                                      <a href="#">Cancel Booking</a>
                                      <a href="#">Delete</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="my-profile-tab"
                      role="tabpanel"
                      aria-labelledby="my-profile-tab-tab"
                    >
                      <div className="row">
                        <h5>Personal Information:</h5>
                        <div className="col-lg-4 mb-3">
                          <label>Name</label>
                          <input type="text" className="textInp form-control" />
                        </div>
                        <div className="col-lg-4 mb-3">
                          <label>Email</label>
                          <input type="text" className="textInp form-control" />
                        </div>
                        <div className="col-lg-4">
                          <label>Phone Number</label>
                          <input type="text" className="textInp form-control" />
                        </div>
                      </div>

                      <div className="row">
                        <h5>Change Password:</h5>
                        <div className="col-lg-4 mb-3">
                          <label>Old Password</label>
                          <input type="text" className="textInp form-control" />
                        </div>
                        <div className="col-lg-4 mb-3">
                          <label>New Password</label>
                          <input type="text" className="textInp form-control" />
                        </div>
                        <div className="col-lg-4">
                          <label>Confirm Password</label>
                          <input type="text" className="textInp form-control" />
                        </div>
                      </div>

                      <a href="#">
                        <button className="savebtn" type="button">
                          Save Changes
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h4>Join Turfwala</h4>
                  <p>Receive discounts, Coupons & more!</p>
                </div>
                <div className="col-lg-6">
                  <div className="outer">
                    <input
                      type="text"
                      name="email"
                      id=""
                      placeholder="Your email address"
                    />
                    <a href="#" className="sp-btn">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="row">
                  <div className="col-lg-3">
                    <img
                      src="assets/images/logo.png"
                      className="footer-logo img-fluid"
                      alt="image"
                    />
                  </div>
                  <div className="col-lg-6 offset-lg-2 links">
                    <div className="row">
                      <div className="col-lg-4 col-6">
                        <h5>Quick Link</h5>
                        <ul>
                          <li>
                            <a href="#">Book Online</a>
                          </li>
                          <li>
                            <a href="#">Cancel Policy</a>
                          </li>
                          <li>
                            <a href="#">Add a Turf</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-6">
                        <h5>Company</h5>
                        <ul>
                          <li>
                            <a href="#">About Us</a>
                          </li>
                          <li>
                            <a href="#">Careers</a>
                          </li>
                          <li>
                            <a href="#">Contact us</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-12">
                        <h5>Support</h5>
                        <ul>
                          <li>
                            <a href="#">Terms of service</a>
                          </li>
                          <li>
                            <a href="#">Legal</a>
                          </li>
                          <li>
                            <a href="#">Privacy Policy</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="copyright-sec">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h6>© 2024 Turfwala.com. All rights reserved.</h6>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <a href="#">
                        <img src="assets/images/home/facebook.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/images/home/twitter.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/images/home/insta.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/images/home/youtube.png" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </footer>
      </Fragment>
    </>
  );
};

export default userBooking;
