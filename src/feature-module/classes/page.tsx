import React, { useEffect, useState } from 'react'
import "./style.scss";
import SearchIcon from '../../icons/SearchIcon';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Nav, Pagination, Tab } from 'react-bootstrap';
import FilterIcon from '../../icons/FilterIcon';
import ClassesCard from '../../core/components/classesCard';
import { getClasslist } from '../../services/classes.service';
import { CommonPagination } from '../../core/components/common/CommnPagination';
import { all_routes } from '../router/all_routes';


export default function Classes() {
    const route = all_routes;
    const locationId = localStorage.getItem('locationId') || '';
    const [servicelist, setClasslist] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterOption, setFilterOption] = useState<string>('newToOld');
    const [currentPage, setCurrentPage] = useState<number>(1);  // Track current page
    const [totalItems, setTotalItems] = useState<number>(0);  // Track total number of items
    const itemsPerPage = 8; // Number of items per page
    const navigate = useNavigate();

    const tabs = [
        { eventKey: "all", label: "All", filterCondition: () => true },
        { eventKey: "active", label: "Active", filterCondition: (item: any) => item.status === "active" },
        { eventKey: "inactive", label: "In-active", filterCondition: (item: any) => item.status === "inactive" },
    ];

    useEffect(() => {
        getClasses(filterOption, currentPage);
    }, [filterOption]);

    const getClasses = async (filterOption: string, page: number,) => {
        let skip = (page - 1) * itemsPerPage;
        console.log("currentPage >>> ", page, "  >>> itemsPerPage ", itemsPerPage, ' --- skip ', skip);

        try {
            const payload = {
                locationId: locationId,
                sortOrder: filterOption,
                skip,
                limit: itemsPerPage,
            };
            const result = await getClasslist(payload);
            setClasslist(result?.data?.data || []);
            setTotalItems(result?.data?.totalRecord || 0)
        } catch (error) {
            console.error(error);
        }
    };

    // Update filter option state
    const handleFilterChange = (filter: string) => {
        setFilterOption(filter);
        setCurrentPage(1);  // Reset to page 1 when filter changes

        getClasses(filter, currentPage);
    };

    // Filter servicelist based on searchTerm
    const filteredServices = servicelist.filter((service) =>
        service?.className?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginated data for the current page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        getClasses(filterOption, page)
    };

    const classDetails = (id: any) => {
        navigate('/classes/detail', { state: { id } });
    };
    

    return (
        <div className='classesWrapper'>
            <div className='container'>
                <div className='search_btn d-flex justify-content-between align-items-center'>
                    <div className='title_search d-flex align-items-center gap-2'>
                        <h2>Classes</h2>
                        <div className='search_wrap position-relative'>
                            <label><SearchIcon /></label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Search class ... '
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <Link to={'/classes/create'} className='classBtn'><span>+</span>Create new class</Link>
                </div>

                <div className='tab_FilterWrapper'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                        <div className='tab_top_filter d-flex justify-content-between align-items-center mb-4'>
                            <Nav variant="pills" className="tabBtns">
                                <div className='tabBtnInner d-flex gap-2 align-items-center'>
                                    {tabs.map((tab) => (
                                        <Nav.Item key={tab.eventKey}>
                                            <Nav.Link eventKey={tab.eventKey}>{tab.label}</Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </div>
                            </Nav>

                            <div className='filterDropdown'>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <FilterIcon />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <button
                                            className={filterOption === 'newToOld' ? 'active' : ''}
                                            onClick={() => handleFilterChange('newToOld')}
                                        >
                                            Date, new to old
                                        </button>
                                        <button
                                            className={filterOption === 'oldToNew' ? 'active' : ''}
                                            onClick={() => handleFilterChange('oldToNew')}
                                        >
                                            Date, old to new
                                        </button>
                                        <button
                                            className={filterOption === 'aToZ' ? 'active' : ''}
                                            onClick={() => handleFilterChange('aToZ')}
                                        >
                                            Alphabetically, A-Z
                                        </button>
                                        <button
                                            className={filterOption === 'zToA' ? 'active' : ''}
                                            onClick={() => handleFilterChange('zToA')}
                                        >
                                            Alphabetically, Z-A
                                        </button>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <Tab.Content>
                            {tabs.map((tab) => (
                                <Tab.Pane eventKey={tab.eventKey} key={tab.eventKey}>
                                    <div className='container-fluid'>
                                        <div className='row'>
                                            {filteredServices &&
                                                filteredServices.filter(tab.filterCondition).map((item, index) => {
                                                    return <div className='col-md-4 col-sm-6 col-lg-3 mb-4' key={index} >
                                                        {/* <Link onClick={() => classDetails(item._id)} to="#"> */}
                                                        <Link  to={`/classes/detail/${item._id}`}>
                                                            <ClassesCard
                                                                className={item.className}
                                                                image={item.images[0]}
                                                                status={item.status}
                                                                classType={item.classType}
                                                                participants={item.participants}
                                                                showImg ={false}
                                                                classId= {item._id}
                                                            />
                                                        </Link>
                                                    </div>
                                                })}
                                        </div>
                                    </div>
                                </Tab.Pane>
                            ))}
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
