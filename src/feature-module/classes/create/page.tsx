import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import ClassesTab from "../../../core/components/classesTab/page";
import GymSportsIcon from "../../../icons/GymSportsIcon";
import './style.scss';
import { getClassById } from "../../../services/partner.service";
export default function CreateClass() {
  const { id } = useParams();
  const [classData, setClassData] = useState<any>({});

  useEffect(() => {
    if(id){
      getClassDataOnEdit(id)
    }
  }, []);

  const getClassDataOnEdit = async (id:any)=> {
    try {
      const result = await getClassById({id});
      if (result?.data?.data) {
        let obj = result?.data?.data;
        if (obj.classRepeat.type === "repeat") {
          obj.classRepeatType = "repeat";
        }
        if (obj.classRepeat.type === "doesNotRepeat") {
          obj.classRepeatType = "doesNotRepeat";
        }
        if (obj.classRepeat.selection && obj.classRepeat.selection) {
          obj.classWeekdays = obj.classRepeat.selection;
        }
        if (obj.classRepeat && obj.classRepeat.weekDays && obj.classRepeat.weekDays.length > 0) {
          obj.selection = obj.classRepeat.weekDays;
        }
        obj.classEndType = obj.classEnd.type;
        if (obj.classEnd.type == "on") {
          obj.classEndDate = obj.classEnd.date;
        }
        if (obj.classEnd.type == "after") {
          obj.classEndType = obj.classEnd.type;
        }
        obj.classStartTime = obj?.classTime?.start
        obj.classEndTime = obj?.classTime?.end
        obj.classStartDate = obj?.classTime?.date
        setClassData(result?.data?.data);
      }
    }
    catch (error) {
     
    }
  }

  return (
    <div className="createClass">
      <div className="container">
        <ul className="breadcrumbWrapper">
          <li>
            <Link to={"#"}>Cardio</Link>
          </li> /
          <li>
            <span>Edit class</span>
          </li>
        </ul>
        <h3>Create class</h3>
        <div className="tabs_Wrap">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col md={4} lg={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="mb-3">
                    <Nav.Link eventKey="first"><GymSportsIcon/>Class settings</Nav.Link>
                  </Nav.Item>
                  
                </Nav>
              </Col>
              <Col md={8} lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <ClassesTab id={id} classData={classData}/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}
