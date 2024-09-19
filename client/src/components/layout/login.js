import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import "react-toastify/dist/ReactToastify.css";
import "toastr/build/toastr.min.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  //Register Form
  const [formData, setformData] = useState({
    Regname: "",
    Regemail: "",
    Regmobileno: "",
    Regpassword: "",
  });

  const { Regname, Regemail, Regmobileno, Regpassword } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  //submit user registration
  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const getRegisterData = {
      name: formData.Regname,
      email: formData.Regemail,
      mobile_number: formData.Regmobileno,
      password: formData.Regpassword,
    };

    try {
      const getReposne = await axios.post(
        "http://localhost:4000/api/register",
        getRegisterData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (getReposne.status == 200) {
        toastr.clear();
        toastr.success("User register suceessfully");
        //local stoeage
        localStorage.setItem("access_token", getReposne.data.access_token);
        setTimeout(() => Navigate("/"), 3000);
      }
    } catch (err) {
      toastr.clear();
      toastr.error(err.response.data.error);
    }
  };

  //loginPage Form
  const [logFormData, SetLogFormData] = useState({
    Logemail: "",
    Logpassword: "",
  });

  const { Logemail, Logpassword } = logFormData;

  const LogOnChange = (e) =>
    SetLogFormData({ ...logFormData, [e.target.name]: e.target.value });

  //login user
  const LogOnSubmit = async (e) => {
    e.preventDefault();

    const bodyData = {
      email: logFormData.Logemail,
      password: logFormData.Logpassword,
    };

    try {
      const loginInfo = await axios.post(
        "http://localhost:4000/api/login",
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (loginInfo.status == 200) {
        toastr.clear();
        toastr.success("User login suceessfully");
        localStorage.setItem("access_token", loginInfo.data.access_token);
        setTimeout(() => Navigate("/"), 3000);
      }
    } catch (e) {
      toastr.error(e.response.data.error);
    }
  };
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
                        <form className="mt-4" onSubmit={(e) => LogOnSubmit(e)}>
                          <div className="mb-3">
                            <input
                              type="email"
                              className="emailInp form-control"
                              id="Logemail"
                              name="Logemail"
                              value={Logemail}
                              onChange={(e) => LogOnChange(e)}
                              placeholder="Enter E-mail Address"
                            />
                          </div>

                          <div>
                            <input
                              type="password"
                              className="textInp form-control"
                              id="Logpassword"
                              name="Logpassword"
                              value={Logpassword}
                              onChange={(e) => LogOnChange(e)}
                              placeholder="Enter Password"
                            />
                          </div>
                          <div className="fp-div">
                            <a href="">Forget Password?</a>
                          </div>

                          <input
                            type="submit"
                            className="regBtn"
                            value="Login Now"
                          />

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
                                onClick="myFunction()"
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
                        <form className="mt-4" onSubmit={(e) => onsubmit(e)}>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="textInp form-control"
                              name="Regname"
                              value={Regname}
                              onChange={(e) => onChange(e)}
                              placeholder="Enter Name"
                            />
                          </div>

                          <div className="mb-3">
                            <input
                              type="email"
                              className="emailInp form-control"
                              id="Regemail"
                              name="Regemail"
                              value={Regemail}
                              onChange={(e) => onChange(e)}
                              placeholder="Enter E-mail Address"
                            />
                          </div>

                          <div className="mb-3">
                            <input
                              type="text"
                              className="textInp form-control"
                              id="Regmobileno"
                              name="Regmobileno"
                              value={Regmobileno}
                              onChange={(e) => onChange(e)}
                              placeholder="Enter Mobile Number"
                            />
                          </div>

                          <div className="mb-4">
                            <input
                              type="password"
                              className="textInp form-control"
                              id="Regpassword"
                              name="Regpassword"
                              value={Regpassword}
                              onChange={(e) => onChange(e)}
                              placeholder="Enter Password"
                            />
                          </div>

                          <input
                            className="regBtn"
                            type="submit"
                            value="Register Now"
                          />
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
