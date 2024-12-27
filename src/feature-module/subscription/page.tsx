import React, { useEffect, useState } from 'react'
import "./style.scss";
import { Link } from 'react-router-dom';
import {  Tab } from 'react-bootstrap';
import ClassesCard from '../../core/components/classesCard';
import { getSubscriptionList } from '../../services/subscriptions.service';
import { all_routes } from '../router/all_routes';


export default function Subscription() {
    const route = all_routes;
    const [subscriptionList, setSubscriptionList] = useState<any[]>([]);

    useEffect(() => {
        getSubscriptions();
    }, []);

    const getSubscriptions = async () => {
        try {
            const result = await getSubscriptionList();
            setSubscriptionList(result?.data?.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='classesWrapper'>
            <div className='container'>
                <div className='search_btn d-flex justify-content-between align-items-center'>
                    <div className='title_search d-flex align-items-center gap-2'>
                        <h2>Subscription List</h2>
                    </div>
                    <Link to={'/classes/create'} className='classBtn'>Subscription Management</Link>
                </div>

                <div className='tab_FilterWrapper'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="all">

                        <Tab.Content>
                            <Tab.Pane>
                                <div className="container-fluid">
                                    <div className="row">
                                        {subscriptionList.length > 0 ? (
                                            subscriptionList.map((item, index) => (
                                                <div
                                                    className="col-md-4 col-sm-6 col-lg-3 mb-4"
                                                    key={index}
                                                >
                                                    <Link to={`/classes/detail/${item?._id}`}>
                                                        <ClassesCard
                                                            description={item?.description || 'No description available'}
                                                            status={item?.status || 'N/A'}
                                                            price={item?.classType || 0}
                                                            subscriptionId={item?._id}
                                                        />
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No subscriptions found.</p>
                                        )}
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
