import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Images for admin
import adminImg from "../images/avatar.png";
import Settings from "../images/settings.svg";
import Logout from "../images/logout.svg";

// Images for navigation
import Home from "../images/home.svg";
import Report from "../images/report.svg";
import Usd from "../images/usd-dark.svg";
import Cap from "../images/graduation-dark.svg";
import Bookmark from "../images/bookmark-dark.svg";

const Sidebar = (props) => {
  const active = props.active;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <div className="col-lg-2 col-sm-12 col-md-3  sideBar">
        <div className=" adminInfoDiv">
          <h4 className="projectTitle">MANAGE COURSES</h4>
          <img id="adminImg" src={adminImg} alt="profilePicture" />
          <span>Joe Doe</span>
          <p>Admin</p>
        </div>
        <div className="">
          <ul className="nav flex-column">
            <nav>
              <li className="nav-item">
                <div
                  className={
                    "navItemContainer " +
                    (active === "home" ? "active-page" : "")
                  }
                >
                  <img className="navBarIcon" src={Home} alt="profilePicture" />
                  <NavLink to="/dashboard">Home</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="navItemContainer">
                  <img
                    className="navBarIcon"
                    src={Bookmark}
                    alt="profilePicture"
                  />
                  <NavLink to="/dashboard">Course</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={
                    "navItemContainer " +
                    (active === "students" ? "active-page" : "")
                  }
                >
                  <img className="navBarIcon" src={Cap} alt="profilePicture" />
                  <NavLink to="/students">Students</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="navItemContainer">
                  <img className="navBarIcon" src={Usd} alt="profilePicture" />
                  <NavLink to="/dashboard">Payment</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="navItemContainer">
                  <img
                    className="navBarIcon"
                    src={Report}
                    alt="profilePicture"
                  />
                  <NavLink to="/dashboard">Report</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="navItemContainer">
                  <img
                    className="navBarIcon"
                    src={Settings}
                    alt="profilePicture"
                  />
                  <NavLink to="/dashboard">Settings</NavLink>
                </div>
              </li>
            </nav>
          </ul>
        </div>
        <div>
          <div className="logOut">
            <a onClick={handleLogout}> Logout </a>
            <img className="navBarIcon logOut pl-2" src={Logout} alt="logOut" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
