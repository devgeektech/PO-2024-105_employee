import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import Eyeopen from '../../../icons/Eyeopen';
import { LANG } from '../../../constants/language';
import moment from 'moment';
import "./style.scss";
import MemberShipIconBlock from '../../../icons/MemberShipIconBlock';
import TotalMembersIcon from '../../../icons/TotalMembersIcon';
import GroupUsersIcon from '../../../icons/GroupUsersIcon';
import GroupFriendsIcon from '../../../icons/GroupFriendsIcon';
import { getMyFriends } from '../../../services/friends.service';
import { getAllTeamMembers } from '../../../services/teams.service';
const ProfileCard = (props: any) => {
    const fileUrl = process.env.REACT_APP_FILE_URL;
    const user = props?.user;
    const role = localStorage.getItem('role');
    const [friends, setFriends] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);

    const getFriends = async () => {
      try {
        const [friendData, memberData] = await Promise.all([
          getMyFriends({id:user?._id}),
          getAllTeamMembers({id:user?._id}),
        ]);
        setFriends(friendData?.data?.data);
        setMembers(memberData?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getFriends();
    }, [props]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='friendModal'
        >
            <Modal.Header closeButton className=' border-0 pb-0'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Eyeopen /> <span className='fs-6'>{LANG.VIEW_ONLY}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body className='p-0'>
                        <ul className="mb-3 d-flex gap-3 friendUsers">
                            <li>
                                <img
                                    src={user?.avatar ? fileUrl + user?.avatar : "/assets/img/default-avatar.png"}
                                    alt="Profile"
                                    width="120px"
                                    className='rounded-circle profileImg'
                                    height="120px"
                                />
                            </li>
                            <li>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <div className='d-flex gap-3 align-items-center'>
                                            <h5 className="mb-0 text-capitalize">{user?.firstName || 'NA'} {user?.lastName}</h5>
                                             { role != 'trainer' && role != 'member' && (<Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                label="Private"
                                            />)}
                                            </div>
                                        <div className="d-flex align-items-center">
                                            <Badge pill className="me-2 text-capitalize">
                                                {user?.visibility}
                                            </Badge>

                                        </div>
                                        <p className="mb-0">
                                            {user?.description || "-"}
                                        </p>
                                    </div>
                                </div>
                                <ul className='friendInfo'>
                                    <li>{LANG.MEMBER_ID}: {user?._id}</li>
                                    <li>{LANG.SEASON}: 2023 / 2024</li>
                                    <li>{LANG.JOINED}: {moment(user?.dob).format("DD MMM YYYY")}</li>
                                    <li>Assigned Trainer: Clark Kemmer</li>
                                    <li>{LANG.CONTACT}: {user?.phone}</li>
                                    <li> Email: {user?.email}</li>
                                </ul>
                            </li>
                            <li>
                                <button className='blueButton'>{LANG.FRIEND}</button>
                            </li>
                        </ul>

                        {/* <Row className="mb-2">
                            <Col xs={6}>
                                <strong>{LANG.MEMBER_ID}:</strong> {user?._id}
                            </Col>
                            <Col xs={6}>
                                <strong>{LANG.SEASON}:</strong> 2023 / 2024
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={6}>
                                <strong>{LANG.JOINED}:</strong> {moment(user?.dob).format("DD MMM YYYY")}
                            </Col>
                            <Col xs={6}>
                                <strong>Assigned Trainer:</strong> Clark Kemmer
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col xs={6}>
                                <strong>{LANG.CONTACT}:</strong> {user?.phone}
                            </Col>
                            <Col xs={6}>
                                <strong>Email:</strong> {user?.email}
                            </Col>
                        </Row> */}

                        {/* <Row className="text-center mt-3 gap-1">
                            <Col className='border rounded p-3'>
                                <h6 className="text-muted">4M 8D</h6>
                                <p className="small mb-0">Membership expires</p>
                            </Col>
                            <Col className='border rounded p-3'>
                                <h6 className="text-muted">30</h6>
                                <p className="small mb-0">Total team members</p>
                            </Col>
                            <Col className='border rounded p-3'>
                                <h6 className="text-muted">24</h6>
                                <p className="small mb-0">Friends</p>
                            </Col>
                        </Row> */}
                    </Card.Body>
                </Card>
                <Card className='mt-3'>
                    <Card.Body className='p-0'>
                        <div className='row'>
                            <div className='col-lg-4 pe-2'>
                                <div className='blockFriend'>
                                    <div className=''>
                                        <h2>4M 8D</h2>
                                        <p className='mb-0'>Membership expires</p>
                                    </div>
                                    <div className=''>
                                        <MemberShipIconBlock />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 ps-2 pe-2'>
                                <div className='blockFriend'>
                                    <div className=''>
                                        <h2>{members?.length}</h2>
                                        <p className='mb-0'>Total team member</p>
                                    </div>
                                    <div className=''>
                                        <TotalMembersIcon />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 ps-2'>
                                <div className='blockFriend'>
                                    <div className=''>
                                        <h2>{friends?.length}</h2>
                                        <p className='mb-0'>Friends</p>
                                    </div>
                                    <div className=''>
                                        <GroupFriendsIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    )
}

export default ProfileCard;
