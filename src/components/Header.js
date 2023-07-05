import React from "react";
import bellIcon from "../images/bell.svg";
import arrowIcon from "../images/caret-circle-down.svg";

const Header = () => {
  return (
    <div className="row notiDiv">
      <img src={arrowIcon} alt="arrowIcon" />
      <img src={bellIcon} alt="bellIcon" />
    </div>
  );
};
export default Header;
