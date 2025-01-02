import React, { useState } from "react";
import "./style.scss";
import { Button, Modal, Table } from "react-bootstrap";
import SearchIcon from "../../icons/SearchIcon";
import BusinessIcon from "../../icons/BusinessIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import InfoIcon from "../../icons/InfoIcon";
export default function Booking() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="bookingWrapper">
        <div className="container">
          <h3>Bookings</h3>
          <div className="bgFormColor p-4 my-4">
            <div className="searchWrap">
              <form>
                <button>
                  <SearchIcon />
                </button>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search booking ... "
                />
              </form>
            </div>
            <div className="table-responsive">
                <Table className="tableWrapper">
                <thead>
                    <tr>
                    <th>Class name</th>
                    <th>Booking date time</th>
                    <th>Visitor Name</th>
                    <th>Status / Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <span className="underline">Cardio</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>
                        <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Confirmed</span>
                        <button onClick={handleShow} className="confirmBtn">
                            Details
                        </button>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <span className="underline">Cardio</span>
                    </td>
                    <td>Aug 17, 2024 : 10 AM</td>
                    <td>Betty Abbott</td>
                    <td>
                        <div className="d-flex gap-2 align-items-center">
                        <span className="text-danger">Cancelled</span>
                        <button onClick={handleShow} className="cancelbtn">Details</button>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </Table>
            </div>
          </div>
        </div>
      </div>

      {/* modal start */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="confirmModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalImg">
            <img className="w-100" src={"/assets/img/modalImage.jpg"} alt="modalImage" />
          </div>
          <div className="game_content">
            <label>
              <BusinessIcon /> <span className="underline">ID Yoga - FiDi</span>
            </label>
            <h2>Cardio</h2>
            <label className="dateWrap">
              <CalendarIcon />
              Aug 17, 2024 : 10 AM{" "}
            </label>
            <div className="bgFormColor p-4 my-3">
                <h3>Booking person details</h3>
                <div className="bookDetail">
                    <ul>
                        <li className="d-flex justify-content-between"><label>Full name :</label><h4>Betty Abbott</h4></li>
                        <li className="d-flex justify-content-between"><label>Email id :</label><h4>betty.abbott@yahoo.com</h4></li>
                        <li className="d-flex justify-content-between"><label>Contact :</label><h4>6655443377</h4></li>
                    </ul>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="w-100 direction-column justify-content-center">
          <Button onClick={handleShow} className="w-100">Check-in</Button>
          <p className="d-flex align-items-center gap-1"><InfoIcon/>Note: You can cancel the class before 1 hours of the booking time.</p>
          <div className="dangerCancel d-flex align-items-center border-danger border">
            <label className="mb-0 p-2">This booking has been cancelled.</label>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
