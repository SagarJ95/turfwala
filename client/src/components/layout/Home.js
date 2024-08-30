import React from "react";

const Home = () => {
    return (

        <header className="header" id="mo-Header">
            <div className="container">
                <div className="row">
                    <div className="header-item item-left">
                        <a className="navbar-brand" href="#">
                            <img src="../assets/images/home/tw-logo.png" className="img-fluid logo"></img>
                        </a>
                    </div>

                    <div className="header-item item-center">
                        <div className="menu-overlay"></div>
                        <nav className="menu">
                            <div className="mobile-menu-head">
                                <div className="go-back"><i className="fa fa-angle-left"></i></div>
                                <div className="current-menu-title"></div>
                                <div className="mobile-menu-close">&times;</div>
                            </div>
                            <ul className="menu-main">
                                <li>
                                    <a href="#" className="button">List your turf</a>
                                </li>
                                <li>
                                    <a href="login.html" className="mob-register">Login/Register</a>
                                    <a href="login.html" className="d-none d-lg-block d-md-block">
                                        <img src="../assets/images/home/user.svg" className="img-fluid user-icon" alt="image"></img>
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


    )
}

export default Home