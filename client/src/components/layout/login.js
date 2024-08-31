import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Fragment>
        <div className="container-fluid loginViewCont">
          <div className="row">
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="image-col">
                <div className="dashboradBox">
                  <Link to="/">
                    <button className="dsbBtn">
                      Go to our manager dashboard
                    </button>
                  </Link>
                  <p className="turfOwn m-1">
                    <Link to="/">Already own a Turf?</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="form-col">
                <div className="logoDiv">
                  <img
                    className="logoImg"
                    src="assets/images/home/login/logoTurf.png"
                    alt="logo"
                  />
                </div>
                <div className="regFormDiv">
                  <div className="">
                    <h6>Welcome to Turfwala</h6>
                  </div>
                  <div className="para-turf">
                    <p>Create your account</p>
                  </div>

                  <div id="myDIV1">
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <div
                          className="form-check radio-div"
                          id="pills-login-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-login"
                          type="button"
                          role="tab"
                          aria-controls="pills-login"
                          aria-selected="false"
                        >
                          <input
                            type="radio"
                            className="form-check-input login"
                            id="radio2"
                            name="optradio"
                            value="option2"
                          />
                          <label className="form-check-label" for="radio2">
                            Login
                          </label>
                        </div>
                      </li>
                      <li className="nav-item" role="presentation">
                        <div
                          className="form-check radio-div active ms-4"
                          id="pills-register-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-register"
                          type="button"
                          role="tab"
                          aria-controls="pills-register"
                          aria-selected="false"
                        >
                          <input
                            type="radio"
                            className="form-check-input register"
                            id="radio1"
                            name="optradio"
                            value="option1"
                            checked
                          />
                          <label className="form-check-label" for="radio1">
                            Register
                          </label>
                        </div>
                      </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="pills-login-tab"
                        tabindex="0"
                      >
                        <form action="" className="mt-4">
                          <div className="mb-3">
                            <input
                              type="email"
                              className="emailInp form-control"
                              id="email"
                              placeholder="Enter E-mail Address"
                            />
                          </div>

                          <div>
                            <input
                              type="password"
                              className="textInp form-control"
                              id="password"
                              placeholder="Enter Password"
                            />
                          </div>
                          <div className="fp-div">
                            <a href="">Forget Password?</a>
                          </div>

                          <a href="index.html">
                            <button className="regBtn" type="button">
                              Login Now
                            </button>
                          </a>

                          <div className="loginBorderDiv mt-4">
                            <hr className="loginBorder" />
                            Or using OTP
                            <hr className="loginBorder1" />
                          </div>

                          <ul
                            className="nav nav-pills d-flex justify-content-center my-3"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="otpBtn"
                                id="pills-otp-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-otp"
                                type="button"
                                role="tab"
                                aria-controls="pills-otp"
                                aria-selected="false"
                                onclick="myFunction()"
                              >
                                Request OTP
                              </button>
                            </li>
                          </ul>
                        </form>
                      </div>

                      <div
                        className="tab-pane fade show active"
                        id="pills-register"
                        role="tabpanel"
                        aria-labelledby="pills-register-tab"
                        tabindex="0"
                      >
                        <form action="" className="mt-4">
                          <div className="mb-3">
                            <input
                              type="text"
                              className="textInp form-control"
                              id="name"
                              placeholder="Enter Name"
                            />
                          </div>

                          <div className="mb-3">
                            <input
                              type="email"
                              className="emailInp form-control"
                              id="email"
                              placeholder="Enter E-mail Address"
                            />
                          </div>

                          <div className="mb-3">
                            <input
                              type="text"
                              className="textInp form-control"
                              id="mobileno"
                              placeholder="Enter Mobile Number"
                            />
                          </div>

                          <div className="mb-4">
                            <input
                              type="password"
                              className="textInp form-control"
                              id="password"
                              placeholder="Enter Password"
                            />
                          </div>

                          <a href="index.html">
                            <button className="regBtn" type="button">
                              Register Now
                            </button>
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-otp"
                      role="tabpanel"
                      aria-labelledby="pills-otp-tab"
                      tabindex="0"
                    >
                      <div
                        className="OtptextSect mt-4 d-flex justify-content-center
                                     align-items-center text-center flex-column"
                      >
                        <h5>Verification Code</h5>
                        <p>
                          Please enter the verification code send to your E-mail
                          address
                        </p>
                      </div>

                      <form action="" className="mt-4">
                        <div className="mb-3 display-flex">
                          <input
                            type="email"
                            className="emailInp form-control"
                            id="email"
                            placeholder="Enter E-mail Address"
                          />
                          <a href="#" className="email-otp">
                            send
                          </a>
                        </div>

                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <input
                            type="text"
                            className="OtpInp"
                            id="Otp"
                            maxlength="1"
                          />
                          <input
                            type="text"
                            className="OtpInp"
                            id="Otp"
                            maxlength="1"
                          />
                          <input
                            type="text"
                            className="OtpInp"
                            id="Otp"
                            maxlength="1"
                          />
                          <input
                            type="text"
                            className="OtpInp"
                            id="Otp"
                            maxlength="1"
                          />
                        </div>

                        <div className="OtpBtnSection mt-4">
                          <a href="">
                            <button className="resendBtn" type="button">
                              Resend OTP
                            </button>
                          </a>

                          <a href="index.html">
                            <button className="submitBtn ms-2" type="submit">
                              Submit
                            </button>
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Login;
