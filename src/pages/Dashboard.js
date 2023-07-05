import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Components
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// SVGs
import Bookmark from "../images/bookmark.svg";
import Cap from "../images/graduation-cap.svg";
import Usd from "../images/usd-square.svg";
import User from "../images/Vector.svg";

const Dashboard = () => {
  const cardData = [
    {
      image: Cap,
      title: "Students",
      value: 243,
    },
    {
      image: Bookmark,
      title: "Course",
      value: 13,
    },
    {
      image: Usd,
      title: "Payment",
      value: 556000,
    },
    {
      image: User,
      title: "Users",
      value: 3,
    },
  ];
  return (
    <div className="row mx-0">
      <Sidebar active="home" />

      <div className="col-lg-10 col-md-9 col-sm-12">
        <Header />
        <div className="row  mx-0 dashboardCards">
          {cardData.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
              <div className="card mb-3">
                <div className="card-body">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.title}
                  />
                  <p className="card-title">{item.title}</p>
                  <p className="card-title-bottom">
                    {item.title === "Payment"
                      ? item.value.toLocaleString() + "₺"
                      : item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
