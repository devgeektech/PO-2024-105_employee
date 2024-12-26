import React from 'react'
import { Table } from 'react-bootstrap'
import CrossRedCircleIcon from '../../../icons/CrossRedCircleIcon';
import TickBlueCircleIcon from '../../../icons/TickBlueCircleIcon';
import TickBlueIcon from '../../../icons/TickBlueIcon';
import ShareICirclecon from '../../../icons/ShareICirclecon';
import CopyTextIcon from '../../../icons/CopyTextIcon';
import CommonButton from '../button/page';
import ImageWithBasePath from '../../data/img/ImageWithBasePath';

export default function DashboardTabContent() {
  return (
    <div className="dashboardTabContent">
      <div className="tableWrapper alerttable">
        <div className="title_Counter d-flex justify-content-between mb-3">
          <h4>Alert</h4>
          <div className="pendingCounter">
            Pending<span>8+</span>
          </div>
        </div>
        <div className='table-responsive'>
        <Table className="">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Ground name</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Start time</th>
              <th>Participants</th>
              <th>Trainer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Training</td>
              <td>Albert ground</td>
              <td>2 hours</td>
              <td>Club</td>
              <td>Aug 17, 2024 : 10 AM</td>
              <td>Teams</td>
              <td>Ronnie Nader</td>
              <td>
                <button className="crossBtn">
                  <CrossRedCircleIcon />
                </button>
                <button className="tickBtn">
                  <TickBlueCircleIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
      <div className="tableWrapper eventstable">
        <div className="title_Counter d-flex justify-content-between mb-3">
          <h4>Events</h4>
          <div className="pendingCounter">
            Pending<span>8+</span>
          </div>
        </div>
        <div className='table-responsive'>
        <Table className="table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Ground name</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Start time</th>
              <th>Participants</th>
              <th>Trainer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Training</td>
              <td>Albert ground</td>
              <td>2 hours</td>
              <td>Club</td>
              <td>Aug 17, 2024 : 10 AM</td>
              <td>Teams</td>
              <td>Ronnie Nader</td>
              <td>
                <button className="crossBtn">
                  <CrossRedCircleIcon />
                </button>
                <button className="tickBtn">
                  <TickBlueCircleIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
      <div className="">
        <div className="row">
          <div className="col-lg-9">
            <div className="commonGrid">
              <h4 className="mb-32px">Friends</h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="friendBlock">
                    <div className="friendImage">
                      <ImageWithBasePath src={"assets/img/friendOne.png"} alt="friendOne" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <h5 className="w-100 text-center overflow-hidden text-nowrap">
                        Paulette Hermiston
                      </h5>
                      <label className="d-flex align-items-center justify-content-center">
                        <span>Joined :</span>
                        <strong> Sep 12, 2024</strong>
                      </label>
                      <label className="d-flex align-items-center justify-content-center">
                        <span>Contact :</span>
                        <strong> 829-787-4874</strong>
                      </label>
                      <button className="friendBtn w-100">
                        <TickBlueIcon />
                        Friend
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="friendBlock">
                    <div className="friendImage">
                      <ImageWithBasePath src={'assets/img/friendTwo.png'} alt="friendOne" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <h5 className="w-100 text-center overflow-hidden text-nowrap">
                        Paulette Hermiston
                      </h5>
                      <label className="d-flex align-items-center justify-content-center">
                        <span>Joined :</span>
                        <strong> Sep 12, 2024</strong>
                      </label>
                      <label className="d-flex align-items-center justify-content-center">
                        <span>Contact :</span>
                        <strong> 829-787-4874</strong>
                      </label>
                      <button className="friendBtn w-100">
                        <TickBlueIcon />
                        Friend
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="friendBlock">
                    <div className="friendImage">
                      <ImageWithBasePath src={'assets/img/friendThree.png'} alt="friendOne" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <h5 className="w-100 text-center overflow-hidden text-nowrap">
                        Paulette Hermiston
                      </h5>
                      <label className="d-flex align-items-center justify-content-center">
                        <span>Joined :</span>
                        <strong> Sep 12, 2024</strong>
                      </label>
                      <label className="d-flex align-items-center justify-content-center">
                        <span>Contact :</span>
                        <strong> 829-787-4874</strong>
                      </label>
                      <button className="friendBtn w-100">
                        <TickBlueIcon />
                        Friend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="commonGrid">
              <h4 className="mb-32px">My team</h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="teamBlock">
                    <div className="teamImage">
                      <ImageWithBasePath
                        src={'assets/img/teamImage.png'}
                        className="w-100"
                        alt="teamImage"
                      />
                    </div>
                    <h5 className="text-start">Team A</h5>
                    <CommonButton
                      label='View Team'
                      type="button"
                      className="teamViewBtn w-100"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="teamBlock">
                    <div className="teamImage">
                      <ImageWithBasePath
                        src={'assets/img/teamImage.png'}
                        className="w-100"
                        alt="teamImage"
                      />
                    </div>
                    <h5 className="text-start">Team A</h5>
                    <CommonButton
                      label='View Team'
                      type="button"
                      className="teamViewBtn w-100"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="teamBlock">
                    <div className="teamImage">
                      <ImageWithBasePath
                        src={'assets/img/teamImage.png'}
                        className="w-100"
                        alt="teamImage"
                      />
                    </div>
                    <h5 className="text-start">Team A</h5>
                    <CommonButton
                      label='View Team'
                      type="button"
                      className="teamViewBtn w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="rightSidebar">
              <div className="friendsRequest">
                <div className="title_Counter d-flex justify-content-between mb-3 align-items-center">
                  <h4 className="mb-0">Friend request</h4>
                  <div className="pendingCounter">
                    Pending<span>04</span>
                  </div>
                </div>
                <div className="pendingRequest">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="pendingFriendImg  d-flex align-items-center flex-wrap">
                      <ImageWithBasePath
                        src={'assets/img/friendOne.png'}
                        width={40}
                        height={40}
                        alt="friendOne"
                      />
                      <h6>Sonja Ullrich</h6>
                    </div>
                    <div className="bothBtn">
                      <button className="crossBtn">
                        <CrossRedCircleIcon />
                      </button>
                      <button className="tickBtn">
                        <TickBlueCircleIcon />
                      </button>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </div>
              <div className="digitalCard">
                <div className="d-flex align-items-center justify-content-between mb-32px">
                  <h3 className="mb-0">Digital card</h3>
                  <button type="button" className="shareBtn">
                    <ShareICirclecon />
                  </button>
                </div>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <ImageWithBasePath src={'assets/img/friendOne.png'} alt="friendOne" />
                  <h4>Betty Abbott</h4>
                  <div className="id_copy">
                    <span className="empId">1301201123</span>
                    <span className="copyText">
                      <CopyTextIcon />
                    </span>
                  </div>
                  <div className="cardInfo w-100">
                    <ul className="m-0">
                      <li className="d-flex justify-content-between">
                        <label className="text-uppercase">Age</label>
                        <label>24 Years</label>
                      </li>
                      <li className="d-flex justify-content-between">
                        <label className="text-uppercase">
                          Session
                        </label>
                        <label>2023 / 2024</label>
                      </li>
                      <li className="d-flex justify-content-between">
                        <label className="text-uppercase">
                          Membership Expire
                        </label>
                        <label>Sep 11, 2025</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <h2 className="text-center">Calendar Pending </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
