import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import CommonCard from '../../core/components/commonCard';
import { getSubscriptionList } from '../../services/subscriptions.service';

export default function Subscription() {
    const [subscriptionList, setSubscriptionList] = useState<any[]>([]);

    useEffect(() => {
        getSubscriptions();
    }, []);

    const getSubscriptions = async () => {
        try {
            const result = await getSubscriptionList();
            console.log("API Response:", result?.data?.data); // Debugging
            setSubscriptionList(result?.data?.data || []);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    console.log("Subscription List:", subscriptionList); // Debugging

    return (
        <div className="classesWrapper">
            <div className="container">
                <div className="search_btn d-flex justify-content-between align-items-center">
                    <div className="title_search d-flex align-items-center gap-2">
                        <h2>Subscription List</h2>
                    </div>
                    <Link to={'/classes/create'} className="classBtn">
                        Subscription Management
                    </Link>
                </div>

                <div className="tab_FilterWrapper">
                    <div className="container-fluid">
                        <div className="row">
                            {subscriptionList.length > 0 ? (
                                subscriptionList.map((item, index) => (
                                    <div
                                        className="col-md-4 col-sm-6 col-lg-3 mb-4"
                                        key={index}
                                    >
                                        <CommonCard
                                            name={item?.name || 'N/A'}
                                            description={item?.description || 'N/A'}
                                            price={item?.price || 0}
                                            partnersDetails={item?.partnersDetails || []}
                                            subscriptionId={item?._id}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No subscriptions found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
