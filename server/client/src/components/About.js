
import React, { useEffect, useState } from "react";
import aboutpic from "../images/aboutpic.png";
import pic from '../images/dp2.png'

import { useNavigate } from "react-router-dom";

const About = () => {
  const history = useNavigate();
   const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      // console.log(err);
      history("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container em-profile mt-5">
        <form method="GET">
          <div className="row">
            <div className="col-md-4 mt-4 mb-3">
              <img
                src={
                  userData.name === "Shreya jaiswal" ? aboutpic : pic
                }
                id="avatar"
                className="rounded mx-auto d-block"
                alt="profilepic"
              />
            </div>

            <div className="col-md-6">
              <div className="profile-head mt-3">
                <h5>{userData.name}</h5>
                <p style={{ color: "#6d7ae0" }}>{userData.work}</p>
                <p className="profile-rate mt-3 mb-5">
                  USER DETAILS 
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="edit-btn mt-3"
                name="AddSome"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">

            {/* right side */}
            <div className=" col-md-8 pl-5 ">
            {/* <div className="col-md-8 pl-5 mt-5 "> */}
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row ">
                    <div className="col-md-6 ">
                      <p>User ID</p>
                    </div>
                    <div className="col-md-6 ">
                      <p>012365455</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 ">
                      <p>Name</p>
                    </div>
                    <div className="col-md-6 ">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 ">
                      <p>Email</p>
                    </div>
                    <div className="col-md-6 ">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 ">
                      <p>Phone</p>
                    </div>
                    <div className="col-md-6 ">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 ">
                      <p>Profession</p>
                    </div>
                    <div className="col-md-6 ">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;