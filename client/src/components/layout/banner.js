import React from "react";

const banner = () => {
    return (
        <><section id="banner-image">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="banner-cont">
                            <h4>Find turf for sale and for rent near you</h4>
                            <h2>Find Your Perfect Turf</h2>
                            <div className="search-box">

                                <div className="col-lg-4">
                                    <ul>
                                        <li className="loc-li">
                                            <img src="../assets/images/home/location.svg" />
                                            <input type="text" placeholder="Location" className="bann-loc" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-4">
                                    <ul>
                                        <li className="date-li">
                                            <img src="../assets/images/home/date.svg" />
                                            <div className="input-group date" id="datepicker">
                                                <input type="text" className="form-control" id="date" placeholder="Date" />
                                                <span className="input-group-append">
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-4">
                                    <a href="#" className="search-btn">
                                        <img src="../assets/images/home/search.svg" /> Search Turf
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

        </>



    )
}

export default banner;