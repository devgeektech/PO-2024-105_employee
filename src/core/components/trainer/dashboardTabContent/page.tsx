import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CrossRedCircleIcon from "../../../../icons/CrossRedCircleIcon";
import TickBlueCircleIcon from "../../../../icons/TickBlueCircleIcon";
import {
  acceptEvent,
  getAllEventInvitations,
  rejectEvent,
} from "../../../../services/event.service";
import { checkEventAccpeted } from "../../../../utils";
import { toast } from "react-toastify";
import { LANG } from "../../../../constants/language";
import { AxiosError } from "axios";
import moment from "moment";
import VThreeDots from "../../../../icons/VThreeDots";
import VisibilityBox from "../../VisibilityBox";
import ProfileCard from "../../profile-card/page";
import { getAllTeamMembers, getAllTeams } from "../../../../services/teams.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import DigitalCard from "../../digital-card/DigitalCard";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "primereact/calendar";
import CalendarIcon from "../../../../icons/CalendarIcon";
import PlusIcon from "../../../../icons/PlusIcon";
import TeamBlackIcons from "../../../../icons/TeamBlackIcons";
import EventCalendar from "../../common/EventCalendar";

export default function TrainerDashboardTabContent() {
  const userId = localStorage.getItem("id");
  const [requestEventLists, setRequestEventLists] = useState<any[]>([]);
  const [eventLists, setEventLists] = useState<any[]>([]);
  const myTeams = useSelector((state: any) => state?.team?.teams);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
  const id = String(localStorage.getItem("id"));
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  const router = useNavigate();

  useEffect(() => {
    // getAllData();
  }, []);

  useEffect(() => {
    setVisible(false);
    if (params.get("tab")) {
      setTimeout(() => {
        setVisible(true);
      }, 200);
    }
  }, [params.get("tab")]);

  const getAllData = async () => {
    try {
      const [eventDetail, myTeams, myTeamMembers] = await Promise.all([
        getAllEventInvitations({}),
        getAllTeams({ limit: 100, page: 1 }),
        getAllTeamMembers({})
      ]);
      if (eventDetail?.status == 200 && eventDetail.data?.data?.length) {
        const requested = eventDetail.data?.data?.filter((event: any) =>
          checkEventAccpeted(event, userId)
        );
        const accepted = eventDetail.data?.data?.filter(
          (event: any) => !checkEventAccpeted(event, userId)
        );
        setEventLists(accepted);
        setRequestEventLists(requested);
      }
     

      if(myTeamMembers.status == 200) {
        setTeamMembers(myTeamMembers.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptEventRequest = async (event: any) => {
    try {
      const result = await acceptEvent(event?._id, userId);
      if (result?.status == 200) {
        toast.success(LANG.EVENT_REQUEST_ACCEPTED_SUCCESSFULLY);
        getAllData();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.responseMessage);
      }
    }
  };

  const rejectEventRequest = async (event: any) => {
    try {
      const result = await rejectEvent(event?._id, userId);
      if (result?.status == 200) {
        toast.success(LANG.EVENT_REQUEST_REJECTED_SUCCESSFULLY);
        getAllData();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.responseMessage);
      }
    }
  };

  const openTeam = (team: any) => {
    router(`/trainer/trainer-dashboard?tab=team&teamId=${team?._id}`);
  };

  return (
    <div className="dashboardTabContent">
      <div className="tableWrapper alerttable mt-3">
        <div className="title_Counter d-flex justify-content-between mb-3">
          <h4 className="text-capitalize">{LANG.EVENT_REQUEST}</h4>
          {/* <div className="pendingCounter">
                  Pending<span>8+</span>
                </div> */}
        </div>
        {/* <div className="table-responsive">
          <Table className="">
            <thead>
              <tr>
                <th>{LANG.EVENT_TYPE}</th>
                <th>{LANG.GROUND_NAME}</th>
                <th>{LANG.DURATION}</th>
                <th>{LANG.LOCATION}</th>
                <th>{LANG.DATE}</th>
                <th>{LANG.PARTICIPANTS}</th>
                <th>{LANG.TRAINER}</th>
                <th>{LANG.ACTION}</th>
              </tr>
            </thead>
            <tbody>
              {requestEventLists?.length ? (
                <>
                  {requestEventLists?.map((event: any, index: number) => (
                    <tr key={index}>
                      <td className="text-capitalize">{event?.eventType}</td>
                      <td>{event?.room?.roomName}</td>
                      <td>{event?.eventDuration}</td>
                      <td>{event?.location}</td>
                      <td>
                        {moment(event?.date).format("DD MMM YYYY")}{" "}
                        {event?.time} AM
                      </td>
                      <td className="text-capitalize">
                        {event?.participantType}
                      </td>
                      <td>
                        {event?.createdBy?.firstName}{" "}
                        {event?.createdBy?.lastName}
                      </td>
                      <td>
                        <button
                          className="crossBtn"
                          onClick={() => rejectEventRequest(event)}
                        >
                          <CrossRedCircleIcon />
                        </button>
                        <button
                          className="tickBtn"
                          onClick={() => acceptEventRequest(event)}
                        >
                          <TickBlueCircleIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={8}>
                    <p className="text-center w-100 p-3 mb-0">
                      {LANG.EVENT_NOT_FOUNDS}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div> */}
      </div>
      <div className="tableWrapper eventstable">
        <div className="title_Counter d-flex justify-content-between mb-3">
          <h4 className="text-capitalize">{LANG.EVENTS}</h4>
          {/* <div className="pendingCounter">
                  Pending<span>8+</span>
                </div> */}
        </div>
        {/* <div className="table-responsive">
          <Table className="">
            <thead>
              <tr>
                <th>{LANG.EVENT_TYPE}</th>
                <th>{LANG.GROUND_NAME}</th>
                <th>{LANG.DURATION}</th>
                <th>{LANG.LOCATION}</th>
                <th>{LANG.DATE}</th>
                <th>{LANG.PARTICIPANTS}</th>
                <th>{LANG.TRAINER}</th>
                <th>{LANG.ACTION}</th>
              </tr>
            </thead>
            <tbody>
              {eventLists?.length ? (
                <>
                  {eventLists?.map((event: any, index: number) => (
                    <tr key={index}>
                      <td className="text-capitalize">{event?.eventType}</td>
                      <td>{event?.room?.roomName}</td>
                      <td>{event?.eventDuration}</td>
                      <td>{event?.location}</td>
                      <td>
                        {moment(event?.date).format("DD MMM YYYY")}{" "}
                        {event?.time} AM
                      </td>
                      <td className="text-capitalize">
                        {event?.participantType}
                      </td>
                      <td>
                        {event?.createdBy?.firstName}{" "}
                        {event?.createdBy?.lastName}
                      </td>

                      <td>
                        <span
                          className={
                            event?.approved
                              ? "event_approved"
                              : "event_under_review"
                          }
                        >
                          {event?.approved ? LANG.APPROVED : LANG.UNDER_REVIEW}
                        </span>
                        <button className="">
                          <VThreeDots />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={8}>
                    <p className="text-center w-100 p-3 mb-0">
                      {LANG.EVENT_NOT_FOUNDS}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div> */}
      </div>
      <div className="">
        <div className="row">
          <div className="col-lg-3">
            <div className="rightSidebar">
              {/* <div className="friendsRequest">
                <div className="title_Counter d-flex justify-content-between mb-3 align-items-center">
                  <h4 className="mb-0">Friend request</h4>
                  <div className="pendingCounter">
                    Pending<span>04</span>
                  </div>
                </div>
                <div className="pendingRequest">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="pendingFriendImg d-flex align-items-center flex-wrap">
                      <ImageWithBasePath
                        src={'assets/img/friendOne.png'}
                        width={40}
                        height={40}
                        alt="friendOne"
                      />
                      <h6>Sonja Ullrich</h6>
                    </div>
                    <div className="bothBtn">
                      <button className="crossBtn">
                        <CrossRedCircleIcon />
                      </button>
                      <button className="tickBtn">
                        <TickBlueCircleIcon />
                      </button>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </div> */}
              <div className="my-3">
            <div className="card col-md-12 col-sm-12">
              <div className="mb-3">
                <span className="bg-blue-200 p-2">
                  <TeamBlackIcons />
                </span>{" "}
                {/* {teamMembers?.length||""} {LANG.TOTAL_TEAM_MEMBER} */}
              </div>
              <button
                className="btn btn-primary blueButton  w-100"
                onClick={() => {
                  router("/trainer/trainer-dashboard?tab=team&create=true")
                }}
              >
                <PlusIcon />
                {LANG.CREATE_NEW_TEAM}
              </button>
            </div>
          </div>
              <div className="card mb-2">
              <div className="mb-3">
                <span className="bg-blue-200 p-2">
                  <CalendarIcon />
                </span>
                {eventLists?.length ? eventLists?.length : ""} {LANG.EVENTS}
              </div>
              <button
                className="btn blueButton  w-100"
                onClick={() => {
                  router("/trainer/trainer-dashboard?tab=events&create=true")
                }}
              >
                <PlusIcon />
                {LANG.CREATE_NEW_EVENT}
              </button>
            </div>
              {role != "trainer" && <DigitalCard />}
              <div className="p-2 rounded bg-light mb-3">
                <VisibilityBox show={visible}>
                  <EventCalendar events={eventLists} />
                </VisibilityBox>
                <div className="d-flex gap-3 mt-3 mb-2">
                  <div className="cal-event-card rounded p-2">
                    <span></span>
                    {LANG.EVENT}
                  </div>
                  <div className="cal-training-card rounded p-2">
                    <span></span>
                    {LANG.TRAINING}
                  </div>
                  <div className="cal-practice-card rounded p-2">
                    <span></span>
                    {LANG.PRACTICE}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileCard show={show} user={user} onHide={() => setShow(false)} />
    </div>
  );
}
