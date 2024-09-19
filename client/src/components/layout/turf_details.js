import React, { Fragment, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";

const TrufDetails = () => {
  const location = useLocation();
  const { state } = location;
  const truf_id = state.turf;
  const [trufInformation, SetTrufInfo] = useState([]);

  const trufInfo = async () => {
    const PassID = {
      id: truf_id,
    };
    console.log("passOD", PassID);
    const getReposne = await axios.post(
      "http://localhost:4000/api/getTurfInfo",
      PassID,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (getReposne.status === 200) {
      SetTrufInfo(getReposne.data.result);
    } else {
      toastr.error("Error");
    }
  };

  useEffect(() => {
    trufInfo();
  }, []);
  console.log("trufInformation>>", trufInformation);
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

        <section className="turf-details-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <ul>
                  <li>
                    <a href="index.html" className="active-text">
                      Home
                    </a>
                  </li>
                  <li className="p5">/</li>
                  <li>Listing</li>
                  <li className="p5">/</li>
                  <li>{trufInformation.turf_name}</li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <h4>
                  {trufInformation.turf_name} <span>Open</span>
                </h4>
                <ul className="address">
                  <li>
                    <img src="assets/images/turf-details/Location.svg" />
                    {trufInformation.address} , {trufInformation.city},{" "}
                    {trufInformation.pincode}
                  </li>
                  <li>
                    <Link to={`tel:+91 ${trufInformation.contact_no_1}}`}>
                      <img src="assets/images/turf-details/Call.svg" /> +91
                      {trufInformation.contact_no_1}
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:spartaarena@mail.com">
                      <img src="../assets/images/turf-details/Message.svg" />{" "}
                      spartaarena@mail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-5 text-end">
                <div className="outer">
                  <a href="#" className="vp">
                    View Pricing Chart
                  </a>
                  <a href="booking.html" className="bn-btn">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-images-sec">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="owl-slider">
                  <OwlCarousel margin={3} className="owl-theme" autoplay={true}>
                    {trufInformation.media &&
                    trufInformation.media.length > 0 ? (
                      trufInformation.media.map((item, index) => {
                        <div className="item">
                          <img src={item.media_path} alt="image" />
                        </div>;
                      })
                    ) : (
                      <div className="item">
                        <img
                          src="assets/images/turf-details/gallery-02.png"
                          alt="image"
                        />
                      </div>
                    )}
                  </OwlCarousel>
                </div>
              </div>
              <a href="#" className="mp">
                <img src="assets/images/turf-details/gallery.svg" /> More Photos
              </a>
            </div>
          </div>
        </section>

        <section className="details-list">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="accordion" id="list-view-accord">
                  {/* <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Overview
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#list-view-accord"
                    >
                      <div className="accordion-body">
                        Sparta Arena is a renowned sports facility situated in
                        Sacramento, CA. With a commitment to providing
                        high-quality services, we offer a range of amenities and
                        equipment to support athletes in their training.
                      </div>
                    </div>
                  </div> */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Sports Played
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#list-view-accord"
                    >
                      <div className="accordion-body">
                        <ul className="diff-sports">
                          {trufInformation.sports &&
                          trufInformation.sports.length > 0 ? (
                            trufInformation.sports.map((item, index) => (
                              <li>
                                <img src={item.front_icon} /> {item.sport_name}{" "}
                              </li>
                            ))
                          ) : (
                            <li>
                              <img src="assets/images/turf-details/sports-played/shuttle-cock.svg" />{" "}
                              Badminton{" "}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Amenities
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#list-view-accord"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          {trufInformation.amenities &&
                          trufInformation.amenities.length > 0 ? (
                            trufInformation.amenities.map((item, index) => (
                              <div className="col-lg-3 col-6">
                                <img src={item.amenity_icon} />{" "}
                                {item.amenity_name}
                              </div>
                            ))
                          ) : (
                            <div className="col-lg-3 col-6">
                              <img src="assets/images/turf-details/amenities/clothes-hanger.svg" />{" "}
                              Changing Room
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Location
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#list-view-accord"
                    >
                      <div className="accordion-body">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.858579486931!2d76.90474507360625!3d8.513108996853862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bd896e46e0e7%3A0x5b18d73edc5af440!2sSparta%20Arena!5e0!3m2!1sen!2sin!4v1715741157008!5m2!1sen!2sin"
                          width="100%"
                          height="450"
                          // style="border:0;"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="venue-location">
                          <div className="row">
                            <div className="col-lg-2 col-3">
                              <img src="assets/images/turf-details/map-pin.svg" />
                            </div>
                            <div className="col-lg-9 offset-lg-1 col-9">
                              <h5>{trufInformation.turf_name}</h5>
                              <p>{trufInformation.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        Reviews{" "}
                        <span>
                          <a
                            href="#reviewmodal"
                            data-bs-toggle="modal"
                            data-bs-target="#reviewmodal"
                          >
                            Write a review
                          </a>
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#list-view-accord"
                    >
                      <div className="accordion-body">
                        <div className="review-sec">
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="bg">
                                <h5>4.8</h5>
                                <p>out of 5.0</p>
                                <ul>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-9">
                              <h4>Recommended by 97% of Players</h4>
                              <div className="row">
                                <div className="col-lg-4">
                                  <h6>Quality of service</h6>
                                  <ul>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>5.0</li>
                                  </ul>
                                </div>
                                <div className="col-lg-4">
                                  <h6>Quality of service</h6>
                                  <ul>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>5.0</li>
                                  </ul>
                                </div>
                                <div className="col-lg-4">
                                  <h6>Quality of service</h6>
                                  <ul>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>5.0</li>
                                  </ul>
                                </div>
                                <div className="col-lg-4">
                                  <h6>Quality of service</h6>
                                  <ul>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>5.0</li>
                                  </ul>
                                </div>
                                <div className="col-lg-4">
                                  <h6>Quality of service</h6>
                                  <ul>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>
                                      <img src="assets/images/turf-details/rating-border.svg" />
                                    </li>
                                    <li>5.0</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="review-content">
                            <div className="row">
                              <div className="col-lg-1">
                                <img src="assets/images/turf-details/avatar-01.png" />
                              </div>
                              <div className="col-lg-11">
                                <h4>Amanda Booked on 06/04/2023</h4>
                                <ul>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>5.0</li>
                                </ul>
                                <h6>
                                  <img src="assets/images/turf-details/check.svg" />
                                  Yes, I would book again.
                                </h6>
                                <p className="text-black">
                                  <b>Absolutely perfect</b>
                                </p>
                                <p>
                                  If you are looking for a perfect place for
                                  friendly matches with your friends or a
                                  competitive match, It is the best place.
                                </p>
                                <div className="gallery-images">
                                  <img src="assets/images/turf-details/reviews/gallery-01.jpg" />
                                  <img src="assets/images/turf-details/reviews/gallery-02.jpg" />
                                  <img src="assets/images/turf-details/reviews/gallery-03.jpg" />
                                  <img src="assets/images/turf-details/reviews/gallery-04.jpg" />
                                  <img src="assets/images/turf-details/reviews/gallery-05.jpg" />
                                </div>
                                <p>Sent on 11/03/2024</p>
                              </div>
                            </div>
                          </div>

                          <div className="review-content">
                            <div className="row">
                              <div className="col-lg-1">
                                <img src="assets/images/turf-details/avatar-01.png" />
                              </div>
                              <div className="col-lg-11">
                                <h4>Amanda Booked on 06/04/2023</h4>
                                <ul>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>
                                    <img src="assets/images/turf-details/star.svg" />
                                  </li>
                                  <li>5.0</li>
                                </ul>
                                <h6>
                                  <img src="assets/images/turf-details/check.svg" />
                                  Yes, I would book again.
                                </h6>
                                <p className="text-black">
                                  <b>Absolutely perfect</b>
                                </p>
                                <p>
                                  If you are looking for a perfect place for
                                  friendly matches with your friends or a
                                  competitive match, It is the best place.
                                </p>
                                <div className="gallery-text">
                                  <p>
                                    Experience badminton excellence at Badminton
                                    Academy. Top-notch facilities, well-
                                    maintained courts, and a friendly
                                    atmosphere. Highly recommended for an
                                    exceptional playing experience
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <a href="#" className="lm-btn">
                            Load More{" "}
                            <img src="assets/images/turf-details/down-arr.svg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                {/* <div className="check-availibility-div">
                  <h4>Check Availability</h4>
                  <div className="outer-padding">
                    <h5>
                      {trufInformation.turf_name}{" "}
                      <span>(Available for booking)</span>
                    </h5>
                    <div className="gallery-text">
                      <a href="#" className="price-chart">
                        View Pricing Chart
                      </a>
                      <p>Click above to view pricing</p>
                    </div>
                    <a href="#" className="ca-btn">
                      Check Availability
                    </a>
                  </div>
                </div> */}

                <div className="row">
                  <div className="col-lg-6">
                    <div className="size">
                      <h4>Size of Turf</h4>
                      <h5>
                        {trufInformation.turf_size
                          ? trufInformation.turf_size
                          : 0}{" "}
                        sq feet
                      </h5>
                    </div>
                  </div>
                  <div className="col-lg-6 pl-0">
                    <div className="play-capacity">
                      <h4>Player capacity</h4>
                      <ul>
                        {trufInformation.players &&
                        trufInformation.players.length > 0 ? (
                          trufInformation.players.map((player, index) => {
                            <li>{player}</li>;
                          })
                        ) : (
                          <li>da</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="time">
                      <h4>Timings</h4>
                      <div className="outer-div">
                        <div className="row">
                          <div className="col-lg-6 col-6">
                            <ul>
                              <li>Monday</li>
                              <li>Tuesday</li>
                              <li>Wednesday</li>
                              <li>Thursday</li>
                              <li>Friday</li>
                              <li>Saturday</li>
                              <li>Sunday</li>
                            </ul>
                          </div>
                          <div className="col-lg-6 col-6 text-end">
                            <ul>
                              <li>7:00 am- 11:00 pm</li>
                              <li>7:00 am- 11:00 pm</li>
                              <li>7:00 am- 11:00 pm</li>
                              <li>7:00 am- 11:00 pm</li>
                              <li>7:00 am- 11:00 pm</li>
                              <li>7:00 am- 11:00 pm</li>
                              <li>7:00 am- 11:00 pm</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="similar-turf-div">
                  <h4>Nearby Turfs</h4>
                  <div className="outer-padding">
                    {trufInformation.similarTurf &&
                    trufInformation.similarTurf.length > 0 ? (
                      trufInformation.similarTurf.map((similarTurf, index) => {
                        return (
                          <div className="row">
                            <div className="col-lg-4 col-4 pr-0">
                              <img
                                src="assets/images/turf-details/listing-by-owner-02.jpg"
                                className="img-fluid"
                              />
                            </div>
                            <div className="col-lg-8 col-8 bod-pad">
                              <h5>{similarTurf.turf_name}</h5>
                              <ul>
                                <li>
                                  <img src="assets/images/turf-details/Location.svg" />{" "}
                                  {similarTurf.city}, {similarTurf.pincode}
                                </li>
                                <li>
                                  <img src="assets/images/turf-details/Calendar.svg" />{" "}
                                  Sports Played{" "}
                                  <span>{similarTurf.sports_played}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="row">
                        <div className="col-lg-4 col-4 pr-0">
                          <img
                            src="assets/images/turf-details/listing-by-owner-02.jpg"
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-lg-8 col-8 bod-pad">
                          <h5>Manchester Academy</h5>
                          <ul>
                            <li>
                              <img src="assets/images/turf-details/Location.svg" />{" "}
                              Waghbil, Thane
                            </li>
                            <li>
                              <img src="assets/images/turf-details/Calendar.svg" />{" "}
                              Sports Played{" "}
                              <span>Basketball, Baseball, Tennis, Volly</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="social-share">
                  <h4>Share</h4>
                  <div className="outer-padding">
                    <ul>
                      <li>
                        <a href="#">
                          <img src="assets/images/turf-details/fb.png" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="assets/images/turf-details/insta.png" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
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

export default TrufDetails;
