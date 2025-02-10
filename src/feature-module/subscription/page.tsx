import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { Spinner, Tab } from 'react-bootstrap';
import CommonCard from '../../core/components/commonCard';
import { createPayment, getEmployeePlan, getSubscriptionList } from '../../services/subscriptions.service';
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
export default function Subscription() {
    const [subscriptionList, setSubscriptionList] = useState<any[]>([]);
    const [plansList, setplanList] = useState<any[]>([]);
    const location = useLocation();
    const [authToken, setAuthToken] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("Starter");
    const [loading, setLoading] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState("-1");
    const handlePlanChange = (plan:any) => {
      let array = []
      array.push(plan) 
      setSubscriptionList(array)
      setSelectedPlan(plan.name)
    };

    const onPayment = async(item:any) => {
      let partners:any = []
      if(item.partnersDetails.length>0){
        item.partnersDetails.forEach((data:any)=> {
          partners.push(data._id)
        })
      }

      let payload = { 
      subcriptionId: item._id,
      amount: item.price,
      name: item.name,
      description: item.description,
      partners: partners,
      subscriptionId: item._id,
      packageId: item.packageId
    };
      try {
        setLoading(true)
        const result = await createPayment(payload);
          if (result.status == 200) {
              let client_secret = result?.data?.data?.client_secret
              let publice_key = "egy_pk_test_VqfQMNR7BLSrbC6RZZYtKKWSWeBSlOJY"
              let url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publice_key}&clientSecret=${client_secret}`;
              window.location.href = url
              setLoading(false)
          }
         } catch (error) {
        if (error instanceof AxiosError) {
            setLoading(false)
            toast.error(error.response?.data?.responseMessage)
        }
      }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (token) {
            setAuthToken(token);
            console.log("Received Token:", token);
            localStorage.setItem("token", token);
        }
        else {
            console.warn("Token not found in URL");
        }

        getSubscriptions();
        getSelectedPlan()
    }, [location]);

    const getSubscriptions = async () => {
        try {
            const result = await getSubscriptionList();
            console.log("API Response:", result?.data?.data); // Debugging
            if(Array.isArray(result?.data?.data) && result?.data?.data?.length> 0){
              let array = []
              array.push(result?.data?.data[0])
              setSelectedPlan(result?.data?.data[0].name)
              setSubscriptionList(array)
              setplanList(result?.data?.data)
            }
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    const getSelectedPlan = async () => {
      try {
        let result = await getEmployeePlan();
        if (result?.data?.data[0]?.subscriptionDetails) {
          setSelectedPlanId(result?.data?.data[0]?.subscriptionDetails?._id)
        } 
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    console.log("Subscription List:", subscriptionList); // Debugging

    return (
      <div className="container py-4">
        <div className="row justify-content-center flex-column align-items-center">
          <ButtonGroup aria-label="Plan Selector" className="plan-selector">
            {plansList &&
              plansList.map((plan: any) => (
                <Button
                  variant={selectedPlan === plan.name ? "dark" : "outline-dark"}
                  // type='button'
                  className={`plan-button ${
                    selectedPlan === plan.name ? "active-plan" : ""
                  }`}
                  onClick={() => handlePlanChange(plan)}
                >
                  {plan.name}
                </Button>
              ))}
          </ButtonGroup>
          {subscriptionList &&
            subscriptionList.length > 0 &&
            subscriptionList.map((item: any, index: number) => (
              <div className="planDetail col-md-6 col-lg-4" key={index}>
                <div className="card shadow-sm rounded-4 border-0">
                  <div className="card-body p-3">
                    <div className="d-flex gap-3 align-items-center mb-3">
                      {/* <h5 className="text-primary">{item?.description}</h5> */}
                      <div className="">
                        <img
                          src="/assets/img/paperPlane.png"
                          alt="paperPlane"
                        />
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        {/* <h5>Starter</h5> */}
                        <h6 className="text-muted">
                          <strong>${item?.price}</strong>
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
                      <li>
                        <span>
                          <img
                            src="/assets/img/phone_iphone.svg"
                            alt="phone_iphone"
                          />
                        </span>{" "}
                        46 wellness apps,
                      </li>
                      <li>
                        <span>
                          <img src="/assets/img/exercise.svg" alt="exercise" />
                        </span>{" "}
                        Live stream workouts,
                      </li>
                      <li>
                        <span>
                          <img
                            src="/assets/img/frame_person.svg"
                            alt="frame_person"
                          />
                        </span>{" "}
                        8x/month virtual personal training,
                      </li>
                    </ul>
                    <div className="content-center">
                      {item._id === selectedPlanId && (
                        <div className="active-plan-label">
                          <span className="check-icon">✔</span> Active plan
                        </div>
                      )}
                      {item._id !== selectedPlanId && (
                        <button
                          type="button"
                          className="custom-btn"
                          onClick={() => {
                            onPayment(item);
                          }}
                        >
                          Go with this plan <span className="arrow">→</span>
                        </button>
                      )}
                    </div>
                    <div className="app-wrapper">
                      <p className="get">Apps</p>
                      <ul>
                        <li>
                          <img src="/assets/img/fabulous.png" alt="location" />
                          <h5>Fabulous</h5>
                        </li>
                        <li>
                          <img src="/assets/img/fabulous.png" alt="location" />
                          <h5>Fabulous</h5>
                        </li>
                        <li>
                          <img src="/assets/img/fabulous.png" alt="location" />
                          <h5>Fabulous</h5>
                        </li>
                        <li>
                          <img src="/assets/img/fabulous.png" alt="location" />
                          <h5>Fabulous</h5>
                        </li>
                      </ul>
                    </div>
                    {loading && (
                      <span className="p-3">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {
            subscriptionList &&  subscriptionList.length == 0 && plansList && plansList.length == 0 &&  
            (
              <div className="centered-message">
                No subscription has been assigned to this company. Please contact support for assistance.
              </div>
            )
            }
        </div>
      </div>
    );
}
