import React, { useEffect, useState } from 'react'
import "./style.scss";
import SearchIcon from '../../icons/SearchIcon';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Nav, Pagination, Tab } from 'react-bootstrap';
import FilterIcon from '../../icons/FilterIcon';
import ClassesCard from '../../core/components/classesCard';
import { getSubscriptionList } from '../../services/subscriptions.service';
import { CommonPagination } from '../../core/components/common/CommnPagination';
import { all_routes } from '../router/all_routes';


export default function Subscription() {
    const route = all_routes;
    const [subscriptionList, setSubscriptionList] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);  // Track total number of items
    const itemsPerPage = 8; // Number of items per page
    const navigate = useNavigate();


    useEffect(() => {
        getSubscriptions();
    }, []);

    const getSubscriptions = async () => {
        try {
            const result = await getSubscriptionList();
            setSubscriptionList(result?.data?.data || []);
            setTotalItems(result?.data?.length || 0)
        } catch (error) {
            console.error(error);
        }
    };

    // Paginated data for the current page
    const handlePageChange = (page: number) => {
        getSubscriptions()
    };

    const classDetails = (id: any) => {
        navigate('/classes/detail', { state: { id } });
    };

    console.log('subscriptionList ========= ', subscriptionList);

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
                            <Tab.Pane >
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {subscriptionList &&
                                            subscriptionList.map((item, index) => {
                                                return <div className='col-md-4 col-sm-6 col-lg-3 mb-4' key={index} >
                                                    {/* <Link onClick={() => classDetails(item._id)} to="#"> */}
                                                    <Link to={`/classes/detail/${item?._id}`}>
                                                        <ClassesCard
                                                            className={item?.description}
                                                            image={false}
                                                            status={item?.status}
                                                            classType={item?.classType}
                                                            participants={item?.participants}
                                                            showImg={false}
                                                            classId={item?._id}
                                                        />
                                                    </Link>
                                                </div>
                                            })}
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>

                        <div className="paginationWrapper">
                            <CommonPagination
                                totalRecords={totalItems}
                                recordsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
