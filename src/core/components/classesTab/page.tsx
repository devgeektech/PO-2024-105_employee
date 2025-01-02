import React, { useEffect, useState } from "react";
import "./style.scss";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import FileIcon from "../../../icons/FileIcon";
import AngleWhiteTopIcon from "../../../icons/AngleWhiteTopIcon";
import CrossWhiteBlackIcon from "../../../icons/CrossWhiteBlackIcon";
import { Link } from "react-router-dom";
import CrossIcon from "../../../icons/CrossIcon";
import TimerIcon from "../../../icons/TimerIcon";
import GroupUsersIcon from "../../../icons/GroupUsersIcon";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addClass, editClass } from "../../../services/subscriptions.service";
import { getServicelist } from "../../../services/services.service";
import Select from 'react-select';
import moment from "moment";
import { MIME_TYPE_MAP } from "../../../constants/utlis";
import { useSelector } from "react-redux";

export default function ClassesTab(params:any) {
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const [count, setCount] = useState(0);
  const [afterOccurencesCount, setAfterOccurencesCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const user = useSelector((state: any) => state.user);
  const [servicelist, setServicelist] = useState<any[]>([]);
  const [endTimeFormat, setEndTimeFormat] = useState<string>('');
  const [startTimeFormat, setStartTimeFormat] = useState<string>('');
  const classInitialValues: any = {
    classStatus: (params?.classData?.classStatus == true),
    serviceId: params?.classData?.serviceId || "",
    className: params?.classData?.className || "",
    description: params?.classData?.description || "",
    classStartDate: params?.classData?.classStartDate || "",
    classStartTime: params?.classData?.classStartTime || "",
    classEndTime: params?.classData?.classEndTime || "",
    classRepeatType: params?.classData?.classRepeatType || null,
    classRepeatCount: params?.classData?.classRepeatCount || 0,
    classSelection: params?.classData?.classSelection || "",
    classWeekdays: params?.classData?.classWeekdays || [],
    classEndType: params?.classData?.classEndType || "",
    classEndDate: params?.classData?.classEndDate || "",
    classEndOccurence: params?.classData?.classEndOccurence || 0,
    maxBooking: params?.classData?.maxBooking || 1,
    images: params?.classData?.images || [],
  };

  const classSchema: any = Yup.object().shape({
    classStatus: Yup.string().optional(),
    classRepeatType: Yup.string().required("Field is required"),
    // classEndType: Yup.string().required("Field is required")
    // serviceId: Yup.string().optional(),
    // className: Yup.string().optional(),
    // description: Yup.string().optional(),
    // classStartDate: Yup.string().optional(),
    // classStartTime: Yup.string().optional(),
    // classEndTime: Yup.string().optional(),
    // classRepeatType: Yup.string().optional(),
    // classSelection: Yup.string().optional(),
    // classWeekdays: Yup.array().optional(),
    // classEndType: Yup.string().optional(),
    // classEndDate: Yup.string().optional(),
    // classEndOccurence: Yup.number().optional(),
    // maxBooking: Yup.number().optional(),
    // images: Yup.array().optional(),
  });

  const daysOfWeek = [
    { id: "everyday", name: "Everyday" },
    { id: "monday", name: "Monday" },
    { id: "tuesday", name: "Tuesday" },
    { id: "wednesday", name: "Wednesday" },
    { id: "thursday", name: "Thursday" },
    { id: "friday", name: "Friday" },
    { id: "saturday", name: "Saturday" },
    { id: "sunday", name: "Sunday" },
  ];

  const slotOptions = ["day", "week", "month", "year"];

  useEffect(()=> {
    getServices();
  }, [])

  useEffect(() => {
    if(params?.classData?._id){
      // if(params?.classData?.images && params?.classData?.images?.length > 0){
      //   setPreviews([...params?.classData?.images]);
      //   setImages([...params?.classData?.images]);
      // }

      if (params?.classData?.images && params?.classData?.images?.length > 0) {
        let previewImgArr:any = [];
        for (let item of params?.classData?.images) {
          const extension = item.split('.').pop().toLowerCase();
          let mimeType = MIME_TYPE_MAP[extension] || 'application/octet-stream';
  
          previewImgArr.push({
            preview: item,
            type: mimeType,
          })
        }
        setPreviews([...previewImgArr]);
        setImages([...params?.classData?.images]);
      }

      if(params?.classData?.serviceId){
        let item:any = servicelist.find(item => item._id==params?.classData?.serviceId)
        console.log("item:::", item);
        if(item._id){
            formik.setFieldValue("serviceId", item._id)
        }
      }

      if(params?.classData?.classRepeatCount){
        let number = parseInt(params?.classData?.classRepeatCount)
        if(!isNaN(number)){
          setCount(number)        
        }
      }

      if (params?.classData?.selection) {
        const weekDays = params?.classData?.selection;
        if (weekDays.includes("everyday")) {
          setSelectedDays(["everyday"]);
        } else {
          setSelectedDays(weekDays);
        }
      }

      if (params?.classData?.classEnd?.NoOfOccurence && params?.classData?.classEnd?.type == "after" ){
        setAfterOccurencesCount(params?.classData?.classEnd?.NoOfOccurence)
      }

      // Get AM or PM
      const amOrPmMorning = moment(params?.classData?.classTime?.start, 'HH:mm').format('A');
      const amOrPmEvening = moment(params?.classData?.classTime?.end, 'HH:mm').format('A');
      setStartTimeFormat(amOrPmMorning)
      setEndTimeFormat(amOrPmEvening)
    }
  }, [params]);

  function increment(type = "repeat") {
    if (type == "end") {
      setAfterOccurencesCount(function (prevCount) {
        return (prevCount += 1);
      });
    } else {
      setCount(function (prevCount) {
        return (prevCount += 1);
      });
    }
  }

  function decrement(type = "repeat") {
    if (type == "end") {
        setAfterOccurencesCount(function (prevCount) {
            if (prevCount > 0) {
                return (prevCount -= 1);
            } else {
                return (prevCount = 0);
            }
            });
        }   
    else {
    setCount(function (prevCount) {
        if (prevCount > 0) {
            return (prevCount -= 1);
        } 
        else {
            return (prevCount = 0);
        }
        });
    }   
  }

  const handleDayCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const updatedDays = checked
      ? [...selectedDays, value]
      : selectedDays.filter((day) => day !== value);

    if (value === "everyday" && checked) {
      setSelectedDays(["everyday"]);
    } else if (value === "everyday" && !checked) {
      setSelectedDays([]);
    } else {
      const filteredDays = updatedDays.filter((day) => day !== "everyday");
      setSelectedDays(filteredDays);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const selectedPreviews = selectedFiles.map((file) =>
    ({
      preview: URL.createObjectURL(file),
      type: file.type, // Save the MIME type
    }));

    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev:any) => [...prev, ...selectedPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleServiceChange = (event: any) => {
  //   let item:any = servicelist.find(item => item.name==event.target.value)
 
  //   if(item._id){
  //     console.log("item._id it is working fine ", item._id);
  //     formik.setFieldValue("serviceId", item._id)
  //   }
  // };

  const handleServiceChange = (selectedOption: any) => {
    if (selectedOption?.value) {
      console.log("Selected service ID:", selectedOption.value);
      formik.setFieldValue("serviceId", selectedOption.value);
    }
  };

  function isLiveUrl(filename:any) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
        if (imageExtensions.includes(extension)) {
            return true;
        } else {
            return false
        }
    }

  const formik:any = useFormik({
    initialValues: classInitialValues,
    validationSchema: classSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      values.partnerLocation = user?.userDetail?._id;
      let classRepeat: any = {
        repeatCount: count,
      }
      let classEnd: any = {
      }
      let classTime: any = {
      }

      if(values.classRepeatType == "repeat"){
        classRepeat.type = "repeat";
      }
      if(values.classRepeatType == "doesNotRepeat"){
        classRepeat.type = "doesNotRepeat";
      }
      if (values.classWeekdays) {
        classRepeat.selection = values.classWeekdays;
        if (
          values.classWeekdays == "week" &&
          selectedDays &&
          selectedDays.length > 0
        ) {
          classRepeat.weekDays = selectedDays;
        }
      }
      
      if(values.classEndType){
        classEnd.type = values.classEndType
        if(values.classEndType == "on"){
          if(values.classEndDate){
            classEnd.date = values.classEndDate
          }
        }
        if(values.classEndType == "after"){
            classEnd.NoOfOccurence = afterOccurencesCount;
        }
      }

      if(values.classStartTime) {
        classTime.start = values.classStartTime
      }
      if(values.classEndTime){
        classTime.end = values.classStartTime
      }
      if(values.classStartDate){
        classTime.date = values.classStartDate
      }
      values.classRepeat = classRepeat;
      values.classEnd = classEnd;
      values.classTime = classTime;
      if(images && images.length > 0) values.images = images;
      const formData = new FormData();
      for (const key in values) {
        if (Array.isArray(values[key])) {
          console.log(values[key],">>> If  >>>")
          values[key].forEach((item:any, index:any) => {
            if (typeof item === 'object' && item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            } else {
              formData.append(`${key}[${index}]`, item);
            }
          });
        } 
        else if (typeof values[key] === 'object' && values[key] instanceof File) {
          console.log(values[key],">>> Else If >>>")
          formData.append(key, values[key]);
        } 
        else {
          if(typeof values[key] === 'object'){
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
      }
      setLoading(true);
      try {
        if (params?.classData?._id) 
        {
          const result = await editClass(params?.classData?._id, formData)
          if (result.data) {
            console.log(result.data);
            toast.success("Classes Updated successfully");
          }
        } 
        else 
        {
          const result = await addClass(formData);
          if (result.data) {
            console.log(result.data);
            toast.success("Classes Added successfully");
          }
        }
      } catch (error) {
        console.log(error, loading);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const getServices = async () => {
    try {
      const result = await getServicelist();
      let array = result?.data?.data;
      if(Array.isArray(array) && array.length>0){
        array = array.map((item)=>{
          return {...item, value:item._id, label:item.name }
        })
        setServicelist(array)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="classesTabWrap">
        <div className="bgFormColor p-4 mb-3">
          <label>Class information</label>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="statusCheck d-flex justify-content-between align-items-center w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Class status</span>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    {...formik.getFieldProps("classStatus")}
                    checked={formik.values.classStatus == true}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              {/* <Form.Select
                className="commonInput form-control"
                {...formik.getFieldProps("serviceId")}
                value={formik.values.serviceId}
                onChange={servicelist.find(option => option._id === formik.values.serviceId) || null}
                onBlur={formik.handleBlur}
              >
                <option value="">Select service</option>
                {servicelist.map((service: any) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </Form.Select> */}
              <Select
                name="service"
                className="commonInput"
                options={servicelist}
                value={
                  servicelist.find(
                    (option) => option.value === formik.values.serviceId
                  ) || null
                }
                onChange={handleServiceChange}
                placeholder="Select a service"
              />
            </div>
            {/* {formik.touched.serviceId && formik?.errors.serviceId && (
                <div className="error-message">{formik?.errors.serviceId}</div>
            )} */}
            <div className="col-md-4 mb-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <div className="group-img iconLeft  position-relative textareaWrap">
                  <Form.Control
                    className="commonInput"
                    type="text"
                    placeholder="Class name"
                    {...formik.getFieldProps("className")}
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-sm-12">
              <div className="group-img iconLeft  position-relative textareaWrap">
                <label>
                  <FileIcon />
                </label>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Tell us something about your class"
                    className="addressTextarea"
                    {...formik.getFieldProps("description")}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="bgFormColor p-4 mb-3">
          <label>Class start date</label>
          <div className="row">
            <div className="col-md-6">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <div className="group-img iconLeft  position-relative textareaWrap">
                  <Form.Control
                    className="commonInput"
                    type="date"
                    placeholder="Class name"
                    {...formik.getFieldProps("classStartDate")}
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="wrap mt-3">
            <label>Class timings</label>
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div className="group-img iconLeft  position-relative textareaWrap">
                    <Form.Control
                      className="commonInput"
                      type="time"
                      placeholder="Class name"
                      {...formik.getFieldProps("classStartTime")}
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div className="group-img iconLeft  position-relative textareaWrap">
                    <Form.Control
                      className="commonInput"
                      type="time"
                      placeholder="Class name"
                      {...formik.getFieldProps("classEndTime")}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="wrap mt-3">
            <label>Class repeat</label>
            <div className="row align-items-end">
              <div className="col-xl-4">
                <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <label className="mb-0 d-flex align-items-center">
                      <input
                        type="radio"
                        {...formik.getFieldProps("classRepeatType")}
                        checked={
                          formik.values.classRepeatType === "doesNotRepeat"
                        }
                        onChange={(e) => {
                          formik.setFieldValue(
                            "classRepeatType",
                            "doesNotRepeat"
                          );
                          formik.setFieldValue("classWeekdays", "");
                          setCount(0);
                          setSelectedDays([]);
                        }}
                      />
                      <span className="radioText">Does not repeat</span>
                      <span className="bgBlue"></span>
                    </label>
                  </div>
                </div>
                <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <label className="mb-0 d-flex align-items-center">
                      <input
                        type="radio"
                        {...formik.getFieldProps("classRepeatType")}
                        checked={formik.values.classRepeatType === "repeat"}
                        onChange={(e) => {
                          formik.setFieldValue("classRepeatType", "repeat");
                        }}
                      />
                      <span className="radioText">Repeat every</span>
                      <span className="bgBlue"></span>
                      <div className="addOption">
                        <input value={count} />
                        <div className="btnsWrap">
                          <button
                            type="button"
                            onClick={() => increment("repeat")}
                          >
                            <AngleWhiteTopIcon />
                          </button>
                          <button
                            type="button"
                            className="rotate"
                            onClick={() => decrement("repeat")}
                          >
                            <AngleWhiteTopIcon />
                          </button>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {/* {formik.touched.classRepeatType &&
                  formik.errors.classRepeatType && (
                    <div className="invalid-feedback">
                      {formik.errors.classRepeatType}
                    </div>
                  )} */}
              </div>
              <div className="col-xl-8">
                {formik.values.classRepeatType != "doesNotRepeat" && (
                  <ul className="daysRadioBox">
                    {slotOptions.map((option) => (
                      <li key={option}>
                        <label>
                          <input
                            type="radio"
                            name="classWeekdays"
                            value={option}
                            onChange={formik.handleChange}
                            checked={formik.values.classWeekdays === option}
                          />
                          <span className="day">{option}</span>
                          <span className="bg"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                {formik?.values?.classWeekdays == "week" && (
                  <ul className="daysCheckbox">
                    {daysOfWeek.map((day) => (
                      <li key={day.id}>
                        <label>
                          <input
                            type="checkbox"
                            value={day.id}
                            checked={selectedDays.includes(day.id)}
                            onChange={handleDayCheckboxChange}
                          />
                          <span className="day">{day.name}</span>
                          <span className="bg"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="wrap mt-3">
            <label>Class ends</label>
            <div className="row">
              <div className="col-xl-4">
                <div className="classEnd">
                  <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <label className="mb-0 d-flex align-items-center">
                        <input
                          type="radio"
                          name="classEndType"
                          onChange={(e) => {
                            formik.setFieldValue("classEndType", "never");
                            formik.setFieldValue("classEndDate", "");
                            setAfterOccurencesCount(0);
                          }}
                          checked={formik.values.classEndType === "never"}
                        />
                        <span className="radioText">Never</span>
                        <span className="bgBlue"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="classEnd">
                  <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <label className="mb-0 d-flex align-items-center">
                        <input
                          type="radio"
                          name="classEndType"
                          onChange={(e) => {
                            formik.setFieldValue("classEndType", "on");
                          }}
                          checked={formik.values.classEndType === "on"}
                        />
                        <span className="radioText">On</span>
                        <span className="bgBlue"></span>
                      </label>
                      <div className="dateShow">
                        <Form.Control
                          className="commonInput"
                          type="date"
                          placeholder="Class name"
                          {...formik.getFieldProps("classEndDate")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="classEnd">
                  <div className="statusCheck d-flex justify-content-between align-items-center w-100 position-relative mb-2">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <label className="mb-0 d-flex align-items-center">
                        <input
                          type="radio"
                          name="classEndType"
                          onChange={(e) => {
                            formik.setFieldValue("classEndType", "after");
                          }}
                          checked={formik.values.classEndType === "after"}
                        />
                        <span className="radioText">After</span>
                        <span className="bgBlue"></span>
                        <div className="addOccurenceOption">
                          <input value={afterOccurencesCount + " occurences"} />
                          <div className="btnsWrap">
                            <button
                              type="button"
                              onClick={() => increment("end")}
                            >
                              <AngleWhiteTopIcon />
                            </button>
                            <button
                              type="button"
                              className="rotate"
                              onClick={() => decrement("end")}
                            >
                              <AngleWhiteTopIcon />
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="addedTime my-3">
              <li>
                <button type="button">
                  <CrossIcon />
                </button>
                <TimerIcon />
                <label>
                  <label>
                    {selectedDays?.join(", ")} |{" "}
                    {params?.classData?.classTime?.start} {startTimeFormat} -{" "}
                    {params?.classData?.classTime?.end} {endTimeFormat}
                  </label>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="bgFormColor p-4 mb-3">
          <label>Class capacity</label>
          <div className="row">
            <div className="col-md-6">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <div className="group-img iconLeft rightLeft  position-relative textareaWrap">
                  <label>
                    <GroupUsersIcon />
                  </label>
                  <Form.Control
                    className="commonInput"
                    type="text"
                    {...formik.getFieldProps("maxBooking")}
                  />
                  <span className="person">| person</span>
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
        <div className="bgFormColor p-4 mb-3">
          <label>Class images</label>
          <div className="uploadWrapper">
            <ul className="outerBlock">
              <li>
                <ul className="showImages">
                  {previews.map(({ preview, type }:any, index:any) => (
                    <li className="position-relative" key={index}>
                      <button
                        type="button"
                        className="crossBtn removeGymFile"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CrossWhiteBlackIcon />
                      </button>
                      <div className="image">
                        {type.startsWith("video") ? (
                          <video
                            src={
                              isLiveUrl(preview) ? fileUrl + preview : preview
                            }
                            controls
                            className="w-100"
                          />
                        ) : (
                          <img
                            src={
                              isLiveUrl(preview) ? fileUrl + preview : preview
                            }
                            alt={`Preview ${index}`}
                            className="w-100"
                          />
                        )}
                      </div>
                    </li>
                  ))}
                  <li className="uploadBlock">
                    <div className="upload text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                      />
                      <img
                        src={"/assets/img/uploadIcon.png"}
                        alt="uploadIcon"
                      />
                      <p>Drop or upload images</p>
                      <button>Browse image</button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex flex-column align-items-start">
          <button type="submit" className="saveBtn">
            Save class
          </button>
          <Link className="policyLink" to={"#"}>
            Read about our visitors class cancellation policy
          </Link>
        </div>
      </div>
    </Form>
  );
}
