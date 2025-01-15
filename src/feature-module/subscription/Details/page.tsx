import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPayment, getEmployeePlan, getSubscriptionList } from '../../../services/subscriptions.service';
import { all_routes } from '../../router/all_routes';

export default function SubscriptionDetails() {
    const [subscriptionList, setSubscriptionList] = useState<any[]>([]);
    const location = useLocation();
    const [authToken, setAuthToken] = useState("");
    const navigate = useNavigate();
    const route = all_routes;
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
        getSelectedPlan();
    }, [location]);

    const getSelectedPlan = async () => {
      try {
        let result = await  getEmployeePlan();
        if(result?.data?.data[0]?.subscriptionDetails){
          let array = []
          array.push(result?.data?.data[0]?.subscriptionDetails)
          setSubscriptionList(array)
        }
        else {
          navigate(`${route.subscription}`)
        }
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
    }
    }

    return (
        <div className="container py-4">
          <div className="row justify-content-center">
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
                    
                    <button type='button' className="btn btn-dark w-100 mt-4" onClick={()=>navigate(`${route.subscription}`)}>Upgrade subscription</button>
                    <button type='button' className="btn btn-outline-danger w-100 mt-3">
                      Cancel subscription
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
