import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import CommonCard from '../../core/components/commonCard';
import { createPayment, getSubscriptionList } from '../../services/subscriptions.service';
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
  
    const handlePlanChange = (plan:any) => {
      let array = []
      array.push(plan) 
      setSubscriptionList(array)
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
        const result = await createPayment(payload);
          if (result.status == 200) {
              let client_secret = result?.data?.data?.client_secret
              let publice_key = "egy_pk_test_VqfQMNR7BLSrbC6RZZYtKKWSWeBSlOJY"
              let url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publice_key}&clientSecret=${client_secret}`;
              window.location.href = url
          }
         } catch (error) {
        if (error instanceof AxiosError) {
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

    console.log("Subscription List:", subscriptionList); // Debugging

    return (
        <div className="container py-4">
          <div className="row justify-content-center">
          <ButtonGroup aria-label="Plan Selector" className="plan-selector">
          {plansList && plansList.map((plan:any)=>(<Button 
            variant={selectedPlan === plan.name ? "dark" : "outline-dark"}
            // type='button'
            className={`plan-button ${
              selectedPlan === plan.name ? "active-plan" : ""
            }`}
            onClick={() => handlePlanChange(plan)}
          >
            {plan.name}
          </Button>))}
          </ButtonGroup>
            {subscriptionList && subscriptionList.length > 0 && subscriptionList.map((item:any, index:number) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card shadow-sm rounded-4 border-0">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-primary">{item?.description}</h5>
                      <h6 className="text-muted">{item?.price}</h6>
                    </div>
                    <p className="fw-bold mb-4">Get access to</p>
                    <ul className="list-unstyled">
                      13,500+ gyms & studios,
                    </ul>
                    <ul>
                      46 wellness apps,
                    </ul>
                    <ul>
                      Live stream workouts,
                    </ul>
                    <ul>
                      8x/month virtual personal training,
                    </ul>
                    <button type="button" className="custom-btn" onClick={()=>{
                      onPayment(item)
                    }}>
                      Go with this plan <span className="arrow">→</span>
                    </button>
                    {/* <button type='button' className="btn btn-dark w-100 mt-4">Upgrade subscription</button> */}
                    {/* <button type='button' className="btn btn-outline-danger w-100 mt-3">
                      Cancel subscription
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
