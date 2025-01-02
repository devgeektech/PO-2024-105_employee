import React, { useEffect, useState } from 'react';
import "./style.scss";
import SingleSlideSlider from '../../../core/components/singleSlideSlider';
import TimerIcon from '../../../icons/TimerIcon';
import BusinessIcon from '../../../icons/BusinessIcon';
import CalendarIcon from '../../../icons/CalendarIcon';
import GroupUsersIcon from '../../../icons/GroupUsersIcon';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '../../../icons/EditIcon';
import EditGreyIcon from '../../../icons/EditGreyIcon';
import { all_routes } from '../../router/all_routes';
import { getClassDetails } from '../../../services/subscriptions.service';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function DetailClass() {
  const route = all_routes;
  const locationId = localStorage.getItem('locationId') || '';
  const location = useLocation();
  const { id } = useParams() || '';
  const [classDetails, setClassDetails] = useState<any>({});
  const [startTimeFormat, setStartTimeFormat] = useState<string>('');
  const [endTimeFormat, setEndTimeFormat] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {    
    getClasseDetails(id);
  }, []);

  const getClasseDetails = async (id: any) => {
    try {
      const result = await getClassDetails(id);
      setClassDetails(result?.data?.data || {});

      // Get AM or PM
      const amOrPmMorning = moment(result?.data?.data?.startTime, 'HH:mm').format('A');
      const amOrPmEvening = moment(result?.data?.data?.endTime, 'HH:mm').format('A');
      setStartTimeFormat(amOrPmMorning)
      setEndTimeFormat(amOrPmEvening)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='classDetail'>
      <div className='container'>
        <div className='sliderWrap mt-3'>
          <div className='singleSlideSlider'>
            <SingleSlideSlider />
          </div>
        </div>
        <div className='classTop mt-4 d-flex justify-content-between align-items-start'>
          <div className='classLeftSide'>
            <span><BusinessIcon />{classDetails?.partnerDetails?.businessName}</span>
            <h2 className='my-3'>{classDetails?.className}</h2>
            <ul>
              <li><CalendarIcon />{classDetails?.classType}</li>
              <li><GroupUsersIcon />{classDetails?.participants || 0}</li>
            </ul>
          </div>
          <div className='classRightSide'>
            <Link to={`/classes/edit/${classDetails._id}`}><EditGreyIcon />Edit class</Link>
          </div>
        </div>
        <div className="aboutContent">
          <h3>About {classDetails?.className}</h3>
          <p className="mb-0">{classDetails?.description}</p>
        </div>
        <div className="timingContent">
          <h3>Class timings</h3>
          <ul>
            {classDetails?.days && classDetails?.days.map((day: string) => (
              <li>
                <TimerIcon /><span>{day}</span> | <span>{classDetails?.startTime} {startTimeFormat} - {classDetails?.endTime} {endTimeFormat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
