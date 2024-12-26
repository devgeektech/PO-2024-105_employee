import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LANG } from '../../../constants/language';

const Notification = () => {
  const allNotification = useSelector((state: any) => state.notification?.notifications) || [];
  
  // State for showing limited or all notifications
  const [notifications, setNotifications] = useState(allNotification.slice(0, 5));
  const [showAll, setShowAll] = useState(false);

  // Handler for showing all notifications
  const handleSeeMore = () => {
    setNotifications(allNotification);
    setShowAll(true);
  };

  return (
    <Card style={{ maxWidth: 400, width: 400, padding: 0, overflowY: 'scroll', maxHeight: 400,scrollbarWidth: 'thin'}}>
      <Card.Header as="h5" style={{ textTransform: "capitalize" }}>
        {LANG.NOTIFICATIONS}
      </Card.Header>
      <ListGroup variant="flush">
        {notifications?.length ? (
          notifications.map((notif: any, index: number) => (
            <ListGroupItem key={index} className="d-flex align-items-start">
              <div className="me-3" style={{ fontSize: '24px' }}>
                {notif.icon}
              </div>
              <div>
                <h6 className="mb-0">{notif.title}</h6>
                <small className="text-muted">{notif.daysAgo}</small>
                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                  {notif.message}
                </p>
              </div>
            </ListGroupItem>
          ))
        ) : (
          <h5 className="my-4 text-center mx-2">{LANG.NO_DATA}</h5>
        )}
        {!showAll && allNotification.length > 5 && (
          <button className="btn seeMore" onClick={handleSeeMore}>
            See More...
          </button>
        )}
      </ListGroup>
    </Card>
  );
};

export default Notification;
