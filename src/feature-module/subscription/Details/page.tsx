import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createPayment,
  deleteSubscription,
  getEmployeePlan,
  getSubscriptionList,
} from "../../../services/subscriptions.service";
import { all_routes } from "../../router/all_routes";
import { ConfirmDeleteModal } from "./delete-modal/page";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function SubscriptionDetails() {
  const [subscriptionList, setSubscriptionList] = useState<any[]>([]);
  const location = useLocation();
  const [authToken, setAuthToken] = useState("");
  const [modatStatus, setModalStatus] = useState(false);
  const navigate = useNavigate();
  const route = all_routes;
  const handleClose = () => {
    setModalStatus(false);
  };
  const handleSubmit = async () => {
    try {
      const result = await deleteSubscription();
      if (result.status == 200) {
        navigate(`${route.subscription}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.responseMessage);
      }
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      setAuthToken(token);
      console.log("Received Token:", token);
      localStorage.setItem("token", token);
    } else {
      console.warn("Token not found in URL");
    }
    getSelectedPlan();
  }, [location]);

  const getSelectedPlan = async () => {
    try {
      let result = await getEmployeePlan();
      if (result?.data?.data[0]?.subscriptionDetails) {
        let array = [];
        array.push(result?.data?.data[0]?.subscriptionDetails);
        console.log(array,">>> array :::")
        setSubscriptionList(array);
      } else {
        navigate(`${route.subscription}`);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        {subscriptionList &&
          subscriptionList.length > 0 &&
          subscriptionList.map((item: any, index: number) => (
            <div className="planDetail col-md-6 col-lg-4" key={index}>
              <div className="card shadow-sm rounded-4 border-0">
                <div className="card-body p-3">
                  <div className="d-flex gap-3 align-items-center mb-3">
                    {/* <h5 className="text-primary">{item?.description}</h5> */}
                    <div className="">
                      <img src="/assets/img/paperPlane.png" alt="paperPlane" />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                    <h5>{item?.packageInfo?.name ? item.packageInfo.name.charAt(0).toUpperCase() + item.packageInfo.name.slice(1) : ""}</h5>
                      <h6 className="text-muted">
                        <strong>EGP {item?.price}</strong>
                        <span>/ Per month</span>
                      </h6>
                    </div>
                  </div>
                  <p className="get">Get access to</p>
                  <ul className="list-unstyled">
                    <li>
                      <span>
                        <img src="/assets/img/location.svg" alt="location" />
                      </span>{" "}
                      13,500+ gyms & studios,
                    </li>
                  </ul>
                  <div className="content-center">
                    <div className="active-plan-label">
                      <span className="check-icon">✔</span> Active plan
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark w-100 mt-4"
                    onClick={() => navigate(`${route.subscription}`)}
                  >
                    Upgrade Plan
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 mt-3"
                    onClick={() => setModalStatus(true)}
                  >
                    Cancel plan
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ConfirmDeleteModal
        show={modatStatus}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
