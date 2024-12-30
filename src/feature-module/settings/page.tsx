import React, { useEffect, useState } from "react";
import { LANG } from "../../constants/language";
import { Dropdown, Form } from "react-bootstrap";
import EditIcon from "../../icons/EditIcon";
import MembershipIcon from "../../icons/MembershipIcon";
import GroupUsersIcon from "../../icons/GroupUsersIcon";
import DoubleUserIcon from "../../icons/DoubleUserIcon";
import "./style/style.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateUserById } from "../../services/user.service";
import { setUserDetail } from "../../core/data/redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getMyFriends } from "../../services/friends.service";
import TrainerTab from "./tabs/page";
import { getAllTeamMembers } from "../../services/teams.service";
import CalendarIcon from "../../icons/CalendarIcon";
import { getAllMyUpcommingEvents } from "../../services/event.service";
import EmploymentIcon from "../../icons/EmploymentIcon";
import { employmentDuration } from "../../utils";
import EditGreyIcon from "../../icons/EditGreyIcon";
import GlobeIcon from "../../icons/GlobeIcon";
import LocationIcon from "../../icons/LocationIcon";
import LocationGreyIcon from "../../icons/LocationGreyIcon";
import TimerIcon from "../../icons/TimerIcon";
import SingleSlideSlider from "../../core/components/singleSlideSlider";
import MultiColumnSlider from "../../core/components/multiColumSlider";
import CommonCard from "../../core/components/commonCard";
// import Swiper from 'swiper';


const TrainerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const [startTimeFormat, setStartTimeFormat] = useState<string>('');
  const [endTimeFormat, setEndTimeFormat] = useState<string>('');

  useEffect(() => {
    // Get AM or PM
    const amOrPmMorning = moment(user?.userDetail?.startTime, 'HH:mm').format('A');
    const amOrPmEvening = moment(user?.userDetail?.endTime, 'HH:mm').format('A');
    setStartTimeFormat(amOrPmMorning)
    setEndTimeFormat(amOrPmEvening)
  }, []);

  const navigateToProfile = () => {
    // navigate("/trainer/trainer-dashboard?tab=profile&tabKey=accountSetting");
    setTimeout(() => {
      document
        .getElementById("tabs-layout")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  };

  return (
    <div>
      <div className="mainWrapper">
        <div className="banner">
          <img
            src={"/assets/img/bannerTop.jpg"}
            alt="bannerTop"
            className="w-100 h-auto"
          />
        </div>
        <div className="profileContentWrapper">
          <div className="profileContentWrapperInner">
            <div className="container">
              <div className="profileContent">
                <div className="profileImg">
                  <img src={user?.userDetail?.partnerDetails?.image ? fileUrl + user?.userDetail?.partnerDetails?.image : "/assets/img/DefaultProfile.png"} alt="DefaultProfile" className="profileDp" />
                </div>
                <div className="p_content d-flex justify-content-between">
                  <div className="">
                    <h1>{user?.userDetail?.partnerDetails?.businessName}</h1>
                    <p><LocationGreyIcon /><Link to={""} className="underline">{user?.userDetail?.address}</Link></p>
                    <p><GlobeIcon /><Link to={""} className="underline">{user?.userDetail?.partnerDetails?.businessWebsite}</Link></p>
                    <div className="tags">
                      {user?.userDetail?.services && user?.userDetail?.services.length > 0 && user?.userDetail?.services.map((item: any, index: number) => {
                        return (
                          <label key={index} className="tag">{item.name}</label>
                        )
                      })}
                    </div>
                  </div>
                  <div className="EditWrap">
                    <Link to={'/settings'}><EditGreyIcon />Edit setting</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="aboutContent">
            <h3>About</h3>
            <p className="mb-0">{user?.userDetail?.partnerDetails?.description}</p>
          </div>
          <div className="timingContent">
            <h3>Timings</h3>
            <ul>
              {user?.userDetail?.weekDays && user?.userDetail?.weekDays.map((day: string) => (
                <li><TimerIcon /><span>{day}</span>|<span>{user?.userDetail?.startTime} {startTimeFormat} - {user?.userDetail?.endTime} {endTimeFormat}</span></li>
              ))}
            </ul>
          </div>

          <div className="mulitColumnSliderWrapper">
            <h3>Classes</h3>
            <div className="mulitColumnSlider">
              <MultiColumnSlider
              classes={user?.userDetail?.classes}
               />
            </div>
          </div>

          <div className="singleSlideSlider">
            <h3>Glimpse of gym</h3>
            <SingleSlideSlider
            imageList={user?.userDetail?.images}
             />
          </div>


        </div>

        {/* <div className="container">
          <hr className="divider"></hr>
          <div className="tabOuter" id="tabs-layout">
            <TrainerTab />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TrainerDashboard;
