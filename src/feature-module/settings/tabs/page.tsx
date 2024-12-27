import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import "./style.scss";
import DashboardIcon from "../../../icons/DashboardIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import TeamBlackIcons from "../../../icons/TeamBlackIcons";
import ProfileBlackIcon from "../../../icons/ProfileBlackIcon";
import ProfileTabContent from "../../../core/components/profile-setting/page";
import { getUserProfile } from "../../../services/user.service";
import { LANG } from "../../../constants/language";
import { useNavigate, useSearchParams } from "react-router-dom";
import TaskIcon from "../../../icons/TaskIcon";
import TrainerDashboardTabContent from "../../../core/components/trainer/dashboardTabContent/page";
import queryString from "query-string";
export default function TrainerTab() {
  const [userDetail, setUserDetail] = useState<any>();
  const [params] = useSearchParams();
  const [activeKey, setActiveKey] = useState<string>(
    params.get("tab") || "dashboard"
  );
  const navigate = useNavigate();
  const { tabKey = "accountSetting" }: any = queryString.parse(location.search);
  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (params.get("tab")) {
      setActiveKey(params.get("tab") || "dashboard");
    }
  }, [params.get("tab")]);

  const getUserDetails = async () => {
    try {
      const result = await getUserProfile();
      setUserDetail(result?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToTab = (tab: string) => {
    navigate(
      `/trainer/trainer-dashboard?tab=${tab}${tab === "profile" ? `&tabKey=${tabKey}` : ""}`
    );
    setActiveKey(tab);
  };
  return (
    <div>
      <Tab.Container
        id="left-tabs-example"
        activeKey={activeKey}
        defaultActiveKey="dashboard"
      >
        <Nav variant="pills" className="tabWrapper">
          <Nav.Item onClick={() => navigateToTab("dashboard")}>
            <Nav.Link eventKey="dashboard">
              <DashboardIcon />
              <h5 className="mb-0">{LANG.DASHBAORD}</h5>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => navigateToTab("profile")}>
            <Nav.Link eventKey="profile">
              <ProfileBlackIcon />
              <h5 className="mb-0">{LANG.PROFILE}</h5>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="dashboard">
            <TrainerDashboardTabContent />
          </Tab.Pane>
          <Tab.Pane eventKey="profile">
            <ProfileTabContent userDetail={userDetail} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
