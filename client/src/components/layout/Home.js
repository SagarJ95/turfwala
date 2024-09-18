import React, { Fragment, useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import toastr from "toastr";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  const componentCount = async () => {
    try {
      const getHomeData = await axios.get(
        "http://localhost:4000/api/get_near_by_turf"
      );

      if (getHomeData.status === 200) {
        console.log("getHomeData.data.result>>", getHomeData.data.result);
        setData(getHomeData.data.result);
      }
    } catch (e) {
      const errorMessage =
        e.response != undefined ? toastr.error(e.response.data.error) : "";
    }
  };

  // Use useEffect to call the API only once when the component mounts
  useEffect(() => {
    componentCount();
  }, []);

  console.log("data12>", data);

  return (
    <>
      <Fragment>
        <header className="header" id="mo-Header">
          <div className="container">
            <div className="row">
              <div className="header-item item-left">
                <a className="navbar-brand" href="#">
                  <img
                    src="../assets/images/home/tw-logo.png"
                    className="img-fluid logo"
                  ></img>
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
                          src="../assets/images/home/user.svg"
                          className="img-fluid user-icon"
                          alt="image"
                        ></img>
                      </a>
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

        {/* Banner */}
        <section id="banner-image">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="banner-cont">
                  {/* <h4>Find turf for sale and for rent near you</h4> */}
                  <h2>Find Your Perfect Turf</h2>
                  <div className="search-box">
                    <div className="col-lg-4">
                      <ul>
                        <li className="loc-li">
                          <img src="../assets/images/home/location.svg" />
                          <input
                            type="text"
                            placeholder="Location"
                            className="bann-loc"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <ul>
                        <li className="date-li">
                          <img src="../assets/images/home/date.svg" />
                          <div className="input-group date" id="datepicker">
                            <input
                              type="text"
                              className="form-control"
                              id="date"
                              placeholder="Date"
                            />
                            <span className="input-group-append"></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <a href="#" className="search-btn">
                        <img src="../assets/images/home/search.svg" /> Search
                        Turf
                      </a>
                    </div>
                  </div>

                  <h5>Or Browse by Sports</h5>
                  <div className="other-sports">
                    <ul>
                      <li>
                        <div className="checkboxes__item">
                          <label className="checkbox style-h">
                            <input type="checkbox" />
                            <div className="checkbox__body">
                              <img src="../assets/images/home/cricket-bat.svg" />
                              <span>Cricket</span>
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="checkboxes__item">
                          <label className="checkbox style-h">
                            <input type="checkbox" />

                            <div className="checkbox__body">
                              <img src="../assets/images/home/soccer-ball.svg" />
                              <span>Football</span>
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="checkboxes__item">
                          <label className="checkbox style-h">
                            <input type="checkbox" />

                            <div className="checkbox__body">
                              <img src="../assets/images/home/volleyball.svg" />
                              <span>Volleyball</span>
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="checkboxes__item">
                          <label className="checkbox style-h">
                            <input type="checkbox" />
                            <div className="checkbox__body">
                              <img src="../assets/images/home/badminton.svg" />
                              <span>Badminton</span>
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="checkboxes__item">
                          <label className="checkbox style-h">
                            <input type="checkbox" />
                            <div className="checkbox__body">
                              <img src="../assets/images/home/tennis-ball.svg" />
                              <span>Tennis</span>
                            </div>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Near by turf */}
        <section className="nearby-turf">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12 text-start">
                <h3>Explore Nearby Turfs</h3>
              </div>
              <div className="col-lg-4 col-12 text-end">
                <a href="turf-listing.html" className="show-all">
                  Show All Turfs{" "}
                  <img
                    src="assets/images/home/arrow.svg"
                    className="img-fluid arr-img"
                    alt="image"
                  />
                </a>
              </div>
            </div>

            <div className="outer">
              <div className="row">
                {data && data.length > 0 ? (
                  <>
                    {data.map((item) => {
                      return (
                        <div className="col-lg-3">
                          <Link to={`/turf_details/${item.turf_no}`}>
                            <div className="card">
                              <div className="turf-caro-div">
                                <div
                                  id="turf-carousel-indicators"
                                  className="carousel slide carousel-fade"
                                  data-bs-ride="carousel"
                                >
                                  <div className="carousel-indicators">
                                    <button
                                      type="button"
                                      data-bs-target="#turf-carousel-indicators"
                                      data-bs-slide-to="0"
                                      className="active"
                                      aria-current="true"
                                      aria-label="Slide 1"
                                    ></button>
                                    <button
                                      type="button"
                                      data-bs-target="#turf-carousel-indicators"
                                      data-bs-slide-to="1"
                                      aria-label="Slide 2"
                                    ></button>
                                    <button
                                      type="button"
                                      data-bs-target="#turf-carousel-indicators"
                                      data-bs-slide-to="2"
                                      aria-label="Slide 3"
                                    ></button>
                                  </div>
                                  <div className="carousel-inner">
                                    {data.media && data.media.length > 0 ? (
                                      data.media.map((media, index) => (
                                        <div
                                          className={`carousel-item ${
                                            index === 0 ? "active" : ""
                                          }`}
                                        >
                                          <img
                                            src={media.media_path}
                                            className="d-block w-100"
                                            alt={media.media_name}
                                          />
                                        </div>
                                      ))
                                    ) : (
                                      <div className="carousel-item active">
                                        <img
                                          src="https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf-1000x1000.jpg"
                                          className="d-block w-100"
                                          alt=""
                                        />
                                      </div>
                                    )}
                                    ;
                                  </div>
                                </div>
                              </div>

                              <div className="main-details">
                                <div className="turf-details-upper">
                                  <div className="col-lg-8">
                                    <h5>{item.turf_name}</h5>
                                    <h6>{item.city}</h6>
                                  </div>
                                  <div className="col-lg-4 text-end">
                                    <img src="assets/images/home/turfs/rating.svg" />{" "}
                                    <span>
                                      {item.ratingcount} ({item.averagerating})
                                    </span>
                                  </div>
                                </div>
                                <hr />
                                <div className="turf-details-lower">
                                  <div className="col-lg-5 col-6 col-6">
                                    <ul>
                                      {item.sports && item.sports.length > 0 ? (
                                        item.sports.map((sport, index) => (
                                          <li key={index}>
                                            <img src={sport.front_icon} />
                                          </li>
                                        ))
                                      ) : (
                                        <li>
                                          <img src="assets/images/home/turfs/bat.svg" />
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                  <div className="col-lg-7 col-6 text-end">
                                    <ul></ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="why-us-sec">
          <div className="container">
            <h3>Why Choose Us?</h3>
            <div className="row">
              <div className="col-lg-3">
                <img src="assets/images/home/device.svg" alt="image" />
                <h5>Special Financing Offers</h5>
                <p>
                  Our stress-free finance department that can find financial
                  solutions to save you money.
                </p>
              </div>
              <div className="col-lg-3">
                <img src="assets/images/home/device.svg" alt="image" />
                <h5>Special Financing Offers</h5>
                <p>
                  Our stress-free finance department that can find financial
                  solutions to save you money.
                </p>
              </div>
              <div className="col-lg-3">
                <img src="assets/images/home/device.svg" alt="image" />
                <h5>Special Financing Offers</h5>
                <p>
                  Our stress-free finance department that can find financial
                  solutions to save you money.
                </p>
              </div>
              <div className="col-lg-3">
                <img src="assets/images/home/device.svg" alt="image" />
                <h5>Special Financing Offers</h5>
                <p>
                  Our stress-free finance department that can find financial
                  solutions to save you money.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top  turf list */}
        <section className="top-pick-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 text-start">
                <h3>
                  Top Turf Picks: Discover highly-rated turfs favored by our
                  users.
                </h3>
              </div>
              <div className="col-lg-4 text-end">
                <a href="#" className="show-all">
                  Show All Turfs{" "}
                  <img
                    src="../assets/images/home/arrow.svg"
                    className="img-fluid arr-img"
                    alt="image"
                  />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="owl-slider">
                  {/* <div id="top-picks" className="owl-carousel"> */}
                  <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    autoplay={true}
                    nav
                  >
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <h5 className="popular">Popular</h5>
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <h5 className="featured">Featured</h5>
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <h5 className="featured">Featured</h5>
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="../assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* list of turf  */}
        <section className="latest-pick-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 text-start">
                <h3>
                  Latest Turf Additions: Stay updated with our newest turf
                  listings.
                </h3>
              </div>
              <div className="col-lg-4 text-end">
                <a href="#" className="show-all">
                  Show All Turfs{" "}
                  <img
                    src="assets/images/home/arrow.svg"
                    className="img-fluid arr-img"
                    alt="image"
                  />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="owl-slider">
                  <OwlCarousel className="owl-theme" margin={3} autoplay={true}>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <h5 className="popular">Popular</h5>
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <h5 className="featured">Featured</h5>
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="item">
                      <a href="#">
                        <div className="card">
                          <div className="turf-caro-div">
                            <div
                              id="turf-carousel-indicators"
                              className="carousel slide carousel-fade"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="0"
                                  className=""
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                  className=""
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#turf-carousel-indicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                  className="active"
                                  aria-current="true"
                                ></button>
                              </div>
                              <div className="carousel-inner">
                                <h5 className="featured">Featured</h5>
                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img2.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item">
                                  <img
                                    src="assets/images/home/turfs/img3.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>

                                <div className="carousel-item active">
                                  <img
                                    src="assets/images/home/turfs/img1.png"
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="main-details">
                            <div className="turf-details-upper">
                              <div className="col-lg-8">
                                <h5>Sparta Arena</h5>
                                <h6>Kakkanad, Kochi</h6>
                              </div>
                              <div className="col-lg-4 text-end">
                                <img src="assets/images/home/turfs/rating.svg" />{" "}
                                <span>48 (6.9)</span>
                              </div>
                            </div>
                            <hr />
                            <div className="turf-details-lower">
                              <div className="col-lg-5 col-6">
                                <ul>
                                  <li>
                                    {" "}
                                    <img src="assets/images/home/turfs/bat.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/home/turfs/soccer-ball.svg" />
                                  </li>
                                  <li className="nos">+1</li>
                                </ul>
                              </div>
                              <div className="col-lg-7 col-6 text-end">
                                <ul>
                                  <li>7v7</li>
                                  <li>11v11</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="outer-div">
                  <div className="bg-img">
                    <img
                      src="assets/images/home/cta-img1.png"
                      className="cta-img1"
                    />
                  </div>
                  <h4>Are You Looking For Popular Turfs ?</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    sed sollicitudin lorem.
                  </p>
                  <a href="#">
                    View All <img src="assets/images/home/white-arr.svg" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="outer-div-blue">
                  <div className="bg-img">
                    <img
                      src="assets/images/home/cta-img2.png"
                      className="cta-img2"
                    />
                  </div>
                  <h4>Do You Want to List Your Turf ?</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    sed sollicitudin lorem.
                  </p>
                  <a href="#">
                    List Now <img src="assets/images/home/white-arr.svg" />
                  </a>
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

export default Home;
