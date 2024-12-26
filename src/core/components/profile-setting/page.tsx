import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import AccountSetting from "./account-setting/page";
import "./style.scss";
import ChangePasswordTabContent from "./change-password/page";
import { INTERFACE_TAB_MENU, TAB_MENU } from "../../../constants";
import SvgIcon from "../../../icons/svgIcons";
import SubscriptionSetting from "./subscription-setting/page";
import HelpAndSupportSetting from "./help-and-support/page";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../services/user.service";
import { LANG } from "../../../constants/language";
import SponsorAccountSetting from "./account-setting/sponsor-account";
import queryString from "query-string";
import AccountSettingIcon from "../../../icons/AccountSettingIcon";
import LockIcon from "../../../icons/LockIcon";
import { all_routes } from "../../../feature-module/router/all_routes";

export default function ProfileTabContent({ userDetail }: any) {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<any>('accountSettings');
  let { tabKey = "accountSettings", tab }: any = queryString.parse(location.search);
  const routes = all_routes;

  // useEffect(() => {
  //   setActiveKey(tabKey);
  // }, [activeKey, tabKey])

  useEffect(() => {
    if (!getUserToken()) {
      navigate("/auth/login");
    }
  }, []);

  const navigateToTab = (tabKey: string) => {
    if(tabKey) tab = tabKey;
    setActiveKey(tab);
    
    // let str = ''
    // if(tabKey == 'changePassword')str = routes.settingEdit;
    // if (str != '') navigate(str);

  }

  return (
    <div className="commonGrid" id="profileSection">
      <h4 className="mb-32px">Edit account details</h4>
      <Tab.Container id="left-tabs-example" activeKey={activeKey} defaultActiveKey={activeKey}>
        <Row>
          <Col md={4} lg={3} className="">
            <Nav
              variant="pills"
              className="flex-column proifleSubTab border-right h-100"
              defaultActiveKey="changePassword"
            >
              {/* {TAB_MENU.filter(
                (item) =>
                  !((role == "trainer" || role == "sponsor") && item.eventKey == "subscription")
              ).map((item: INTERFACE_TAB_MENU) => ( */}
              <Nav.Item
              // key={item.id}
              >
                <Nav.Link
                  // onClick={()=>navigateToTab(item.eventKey)} eventKey={item.eventKey}
                  eventKey="accountSettings"
                  onClick={() => navigateToTab("accountSettings")}
                >
                  <AccountSettingIcon />
                  {/* {item.name} */}
                  Setting
                </Nav.Link>{" "}
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="changePassword" onClick={() => navigateToTab("changePassword")}
                >
                  <LockIcon />
                  Change Password
                </Nav.Link>{" "}
              </Nav.Item>
              {/* ))} */}
            </Nav>
          </Col>
          <Col md={8} lg={9}>
            <Tab.Content className="proifleSubTabContent">
              <Tab.Pane eventKey="accountSettings">
                <AccountSetting userDetail={userDetail} />
              </Tab.Pane>
              <Tab.Pane eventKey="changePassword">
                <ChangePasswordTabContent />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
