import React, { useState } from "react";
import { Button, Dropdown, Form, Modal, Table } from "react-bootstrap";
import LockIcon from "../../icons/LockIcon";
import "./style.scss";
import SearchIcon from "../../icons/SearchIcon";
import BusinessIcon from "../../icons/BusinessIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import InfoIcon from "../../icons/InfoIcon";
import FilterIcon from "../../icons/FilterIcon";

export default function CheckIn() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="CheckIn">
        <div className="container">
          <h3>Check-in</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="bookingBlock">
                <h2>Enter booking unique code</h2>
                <form>
                  <div className="form-group ">
                    <div className="my-5 group-img iconLeft  position-relative textareaWrap">
                      <label>
                        <LockIcon />
                      </label>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Input unique code"
                          className="commonInput"
                        />
                      </Form.Group>
                    </div>
                    <Button className="contniueBtn w-100">Continue</Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="bgFormColor p-4 my-4">
            <div className="searchTitleWrap d-flex justify-content-between align-items-start">
              <label>Today check-in’s</label>
              <div className="searchWrap d-flex gap-2 align-items-center">
                <form>
                  <button>
                    <SearchIcon />
                  </button>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search check-in ..."
                  />
                </form>
                <div className="filterDropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <FilterIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <button className="active">Date, new to old</button>
                      <button>Date, old to new</button>
                      <button>Alphabetically, A-Z</button>
                      <button>Alphabetically, Z-A</button>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table className="tableWrapper">
                <thead>
                  <tr>
                    <th>Class name</th>
                    <th>Booking date time</th>
                    <th>Visitor Name</th>
                    <th>Check-in time</th>
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
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Check-in</span>
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
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-danger">Cancelled</span>
                        <button onClick={handleShow} className="cancelbtn">
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
                    <td>Aug 17, 2024 : 10.05 AM</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="text-success">Check-in</span>
                        <button onClick={handleShow} className="cancelbtn">
                          Details
                        </button>
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
            <img
              className="w-100"
              src={"/assets/img/modalImage.jpg"}
              alt="modalImage"
            />
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
                  <li className="d-flex justify-content-between">
                    <label>Full name :</label>
                    <h4>Betty Abbott</h4>
                  </li>
                  <li className="d-flex justify-content-between">
                    <label>Email id :</label>
                    <h4>betty.abbott@yahoo.com</h4>
                  </li>
                  <li className="d-flex justify-content-between">
                    <label>Contact :</label>
                    <h4>6655443377</h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="w-100 direction-column justify-content-center">
          <Button onClick={handleShow} className="w-100">
            Check-in
          </Button>
          <p className="d-flex align-items-center gap-1">
            <InfoIcon />
            Note: You can cancel the class before 1 hours of the booking time.
          </p>
          <div className="dangerCancel d-flex align-items-center border-danger border">
            <label className="mb-0 p-2">This booking has been cancelled.</label>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
