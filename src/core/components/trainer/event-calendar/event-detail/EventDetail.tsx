import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setEventModalStatus } from '../../../../data/redux/shared/sharedSlice';
import { Card, Badge, Row, Col, Image } from 'react-bootstrap';
import ImageWithBasePath from '../../../../data/img/ImageWithBasePath';
import { LANG } from '../../../../../constants/language';
import VisibilityBox from '../../../VisibilityBox';
import { EVENTS_DURATION_OBJ } from '../../../../../constants';
import "./style.scss";
const EventDetail = () => {
    const fileUrl = process.env.REACT_APP_FILE_URL;
    const dispatch: any = useDispatch();
    const sharedActions: any = useSelector((state: any) => state.shared);
    const [eventDetail, setEventDetail] = useState<any>();
    const closeModal = () => {
        dispatch(setEventModalStatus(false))
    }

    useEffect(() => {
        console.log(sharedActions?.formDetails)
        setEventDetail(sharedActions?.formDetails);
    }, [sharedActions.eventModal])
    return (
        <Modal className='eventModal' backdrop="static" show={sharedActions.eventModal} onHide={closeModal} animation={true}>
            <Modal.Header closeButton className='p-0 border-0'>
                <Modal.Title>{LANG.EVENT}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <Card className="p-0 border-0">
                    {/* <ImageWithBasePath className='rounded' src="assets/img/soccer-football.png" alt="Event Image" /> */}

                    <Badge bg="warning" className="mt-3">
                    <i className="bi bi-calendar-date"></i> {moment(eventDetail?.date).format("DD MMM YYYY")} {eventDetail?.time} AM
                    </Badge>

                    <Card.Body className='p-0'>
                        <Card.Title className='text-capitalize'>{eventDetail?.eventType}</Card.Title>
                        <div>
                            <span className='titleDescription h6'>{LANG.EVENT_DESCRIPTION}</span>
                           { eventDetail?.description && <p className='Description'>{eventDetail?.description}</p> }
                        </div>
                        <div>
                            <span className='h6 me-2'>{LANG.EVENT_DURATION}:</span>
                            <span className='h6'>{EVENTS_DURATION_OBJ[eventDetail?.eventDuration]}</span>
                        </div>
                        <div>
                            <span className='h6 me-2'>{LANG.TIME_DURATION}:</span>
                            <span className='h6'>{eventDetail?.timeDuration}</span>
                        </div>
                        <ul className="pt-3 sportWrap">
                            <li className="text-center">
                                <small className="text-muted">Trainer</small>
                                <Image src={eventDetail?.createdBy?.avatar ? fileUrl + eventDetail?.createdBy?.avatar : "/assets/img/default-avatar.png"} roundedCircle fluid style={{ width: '50px', height: '50px' }} />
                                <p>{eventDetail?.createdBy?.firstName} {eventDetail?.createdBy?.lastName}</p>
                            </li>
                            <li className="text-center">
                                <small className="text-muted">Ground</small>
                                <Image src={"/assets/img/field-ground.png"} roundedCircle fluid style={{ width: '50px', height: '50px' }} />
                                <p>{eventDetail?.room?.roomName}</p>
                            </li>
                            <li className="text-center">
                                <small className="text-muted">{LANG.LOCATION}</small>
                                <Image src={"/assets/img/field-location.png"} roundedCircle fluid style={{ width: '50px', height: '50px' }} />
                                 <p>{eventDetail?.location||"-"}</p>
                            </li>
                        </ul>
                        <VisibilityBox show={eventDetail?.participantType == 'individual'}>
                            <h5>{LANG.PARTICIPANTS}</h5>
                            <ul className="sportWrap">
                                {eventDetail?.participants.map((participant: any, idx: number) => (
                                  <li className="text-center"  key={idx}>
                                        <Image src={participant?.user?.avatar ? fileUrl + participant?.user?.avatar : "/assets/img/default-avatar.png"} roundedCircle fluid style={{ width: '50px', height: '50px' }} />
                                        <p className="small">{participant?.user?.firstName} {participant?.user?.lastName}</p>
                                    </li>
                                ))}
                            </ul>
                        </VisibilityBox>
                        <VisibilityBox show={eventDetail?.participantType == 'teams'}>
                            <h5>{LANG.TEAM} A</h5>
                            <ul className="sportWrap">
                                {eventDetail?.teamA.map((participant: any, idx: number) => (
                                    <li className="text-center" key={idx}>
                                        <Image src={participant?.user?.avatar ? fileUrl + participant?.user?.avatar : "/assets/img/default-avatar.png"} roundedCircle fluid style={{ width: '50px', height: '50px' }} />
                                        <p className="small">{participant?.user?.firstName} {participant?.user?.lastName}</p>
                                    </li>
                                ))}
                            </ul>

                            <h5>{LANG.TEAM} B</h5>
                            <ul className="sportWrap">
                                {eventDetail?.teamB.map((participant: any, idx: number) => (
                                    <li className="text-center" key={idx}>
                                        <Image src={participant?.user?.avatar ? fileUrl + participant?.user?.avatar : "/assets/img/default-avatar.png"} roundedCircle fluid style={{ width: '50px', height: '50px' }} />
                                        <p className="small">{participant?.user?.firstName} {participant?.user?.lastName}</p>
                                    </li>
                                ))}
                            </ul>
                        </VisibilityBox>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    )
}

export default EventDetail