import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./style.scss";
import EditCircleIcon from '../../../../icons/EditCircleIcon'
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useSelector } from 'react-redux';
import moment from "moment";
import { LANG } from '../../../../constants/language';
import { toast } from 'react-toastify';
import BusinessIcon from '../../../../icons/BusinessIcon';
import FileIcon from '../../../../icons/FileIcon';
import LocationIcon from '../../../../icons/LocationIcon';
import CrossIcon from '../../../../icons/CrossIcon';
import TimerIcon from '../../../../icons/TimerIcon';
import SearchIcon from '../../../../icons/SearchIcon';
import CrossWhiteBlackIcon from '../../../../icons/CrossWhiteBlackIcon';
import { getServicelist } from '../../../../services/services.service';
import { Autocomplete } from "@react-google-maps/api";
import { editPartner } from '../../../../services/partner.service';
import { MIME_TYPE_MAP } from '../../../../constants/utlis';


export default function AccountSetting({ userDetail }: any) {
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const user = useSelector((state: any) => state.user);
  const [servicelist, setServicelist] = useState<any[]>([]);
  const [services, setServices] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [city, setCity] = useState<any>("");
  const [zipCode, setZipCode] = useState<any>("");
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
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<any[]>([]);
  const [startTimeFormat, setStartTimeFormat] = useState<string>('');
  const [endTimeFormat, setEndTimeFormat] = useState<string>('');

  const profileInitialValues: any = {
    businessName: user?.userDetail?.partnerDetails?.businessName || '',
    description: user?.userDetail?.partnerDetails?.description || '',
    address: user?.userDetail?.address || '',
    zipCode: user?.userDetail?.zipCode || '',
    city: user?.userDetail?.city || '',
    weekDays: user?.userDetail?.weekDays || [],
    startTime: user?.userDetail?.startTime || '',
    endTime: user?.userDetail?.endTime || '',
    services: user?.userDetail?.endTime?.services || [],
    images: user?.userDetail?.images || []
  }

  const profileSchema: any = Yup.object().shape({
    businessName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
    description: Yup.string(),
    address: Yup.string(),
    zipCode: Yup.string(),
    city: Yup.string(),
    weekDays: Yup.array().optional(),
    startTime: Yup.string(),
    endTime: Yup.string(),
    services: Yup.array().optional(),
    images: Yup.array().optional()
  });

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    if (user?.userDetail?.images && user?.userDetail?.images?.length > 0) {
      let previewImgArr = [];
      for (let item of user?.userDetail?.images) {
        const extension = item.split('.').pop().toLowerCase();
        let mimeType = MIME_TYPE_MAP[extension] || 'application/octet-stream';

        previewImgArr.push({
          preview: item,
          type: mimeType,
        })
      }
      setPreviews([...previewImgArr]);
      setImages([...user?.userDetail?.images]);
    }

    if (user?.userDetail?.services && user?.userDetail?.services?.length > 0) {
      let serviceIdArr = [];
      for (let service of user?.userDetail?.services) {
        serviceIdArr.push(service._id)
      }
      setServices(serviceIdArr)
      formik.setFieldValue("services", serviceIdArr);
    }

    if (user?.userDetail?.weekDays && user?.userDetail?.weekDays?.length > 0) {
      setSelectedDays(user?.userDetail?.weekDays)
      formik.setFieldValue("selectedDays", user?.userDetail?.weekDays);
    }

    // Get AM or PM
    const amOrPmMorning = moment(user?.userDetail?.startTime, 'HH:mm').format('A');
    const amOrPmEvening = moment(user?.userDetail?.endTime, 'HH:mm').format('A');
    setStartTimeFormat(amOrPmMorning)
    setEndTimeFormat(amOrPmEvening)

  }, [user]);

  const getServices = async () => {
    try {
      const result = await getServicelist();
      setServicelist(result?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    setAddress(place.formatted_address)
    if (place.address_components) {
      place.address_components.forEach((component: any) => {
        const types = component.types;
        if (types.includes("postal_code")) {
          setZipCode(component.long_name);
          formik.setFieldValue("zipCode", component.long_name);
        }
        if (types.includes("locality")) {
          formik.setFieldValue("city", component.long_name);
          setCity(component.long_name);
        }
      });
    }
  };

  const handleLoad = (autoCompleteInstance: any) => {
    setAutocomplete(autoCompleteInstance);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedServices = checked
      ? [...(formik.values.services || []), value]
      : (formik.values.services || []).filter((id: string) => id !== value);

    formik.setFieldValue("services", updatedServices);
    setServices(updatedServices);
  };

  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        values.locationId = user?.userDetail?._id;
        values.weekDays = selectedDays
        if (file) values.image = file
        if (images && images.length > 0) values.images = images;
        const formData = new FormData();
        let services = [];
        for (const key in values) {

          if (Array.isArray(values[key])) {
            values[key].forEach((item: any, index: any) => {
              if (typeof item === 'object' && item instanceof File) {
                formData.append(`${key}[${index}]`, item);
              } else {
                formData.append(`${key}[${index}]`, item);
              }
            });
          } else if (typeof values[key] === 'object' && values[key] instanceof File) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }
        const result = await editPartner(formData);
        if (result.data) {
          console.log(result.data);
          toast.success("Profile updated successfully");
        }
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleChangeProfileImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setImageUrl(url);
  };

  const filteredServices = searchTerm
    ? servicelist.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : servicelist;

  const handleDayCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setPreviews((prev) => [...prev, ...selectedPreviews]);
  };

  const handleRemoveImage = (index: number) => {    
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const changeAddress = (e: any) => {
    setAddress(e.target.value)
  }

  const changeCity = (e: any) => {
    setCity(e.target.value)
  }

  const changeZipcode = (e: any) => {
    setZipCode(e.target.value);
  }

  function isLiveUrl(filename: any) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.mp4', '.gif'];

    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();

    if (imageExtensions.includes(extension)) {
      return true;
    } else {
      return false
    }
  }

  return (
    <div className="accountSettingTab">
      <h3 className="mb-3">{LANG.EDIT_ACCOUNT_DETAILS}</h3>
      <div className="uploadImageWrapper mb-3">
        <div className="uploadImg">
          <div className="d-flex align-items-center flex-column profileImageChange">
            <img
              src={
                user?.userDetail?.partnerDetails?.image && !file
                  ? fileUrl + user?.userDetail?.partnerDetails?.image
                  : imageUrl
                    ? imageUrl
                    : "/assets/img/default-avatar.png"
              }
              width={120}
              height={120}
              style={{ borderRadius: 60 }}
              alt="userCircle"
            />
          </div>
          <button className="uploaddBtn" type="button">
            <Form.Control onChange={handleChangeProfileImage} type="file" />
            <EditCircleIcon />
          </button>
        </div>
      </div>
      <div className="personalIformation   formEditWrap mb-3">
        <Form onSubmit={formik.handleSubmit}>
          <div className="bgFormColor p-4 mb-3">
            <label>Business information</label>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <div className="group-img iconLeft  position-relative">
                    <label>
                      <BusinessIcon />
                    </label>
                    <input
                      type="text"
                      placeholder="Business name"
                      {...formik.getFieldProps("businessName")}
                      className={clsx("commonInput form-control", {
                        "border border-danger":
                          formik.touched.businessName && formik.errors.businessName,
                      })}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="group-img iconLeft  position-relative textareaWrap">
                <label>
                  <FileIcon />
                </label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue=""
                  {...formik.getFieldProps("description")}
                  name="description"
                  placeholder="Tell us something about your business"
                />
              </div>
            </Form.Group>
          </div>

          <div className="bgFormColor p-4 mb-3">
            <label>Address</label>
            <div className="group-img iconLeft  position-relative textareaWrap">
              <label>
                <LocationIcon />
              </label>
              <Form.Group className="mb-3">
                <Autocomplete
                  onLoad={handleLoad}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    name="search"
                    className="commonInput form-control"
                    placeholder="Search for a place"
                    value={address}
                    onChange={(e) => changeAddress(e)}
                  />
                </Autocomplete>
              </Form.Group>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <input
                    type="text"
                    placeholder={LANG.ZIP_CODE}
                    {...formik.getFieldProps("zipCode")}
                    className={clsx("commonInput form-control", {
                      "border border-danger":
                        formik.touched.zipCode && formik.errors.zipCode,
                    })}
                    onChange={(v) => changeZipcode}
                    value={zipCode}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <input
                    type="text"
                    placeholder="City"
                    {...formik.getFieldProps("city")}
                    className={clsx("commonInput form-control", {
                      "border border-danger":
                        formik.touched.houseNumber && formik.errors.houseNumber,
                    })}
                    value={city}
                    onChange={(e) => changeCity(e)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="bgFormColor p-4 mb-3">
            <label>Working hours</label>
            <ul className="addedTime mb-3">
              <li>
                <button>
                  <CrossIcon />
                </button>
                <TimerIcon />
                <label>{selectedDays?.join(', ')}| {user?.userDetail?.startTime} {startTimeFormat} - {user?.userDetail?.endTime} {endTimeFormat}</label>
              </li>
            </ul>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-xs-3 mb-3 mb-sm-3 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0">
                  <input
                    type="time"
                    placeholder="Open at"
                    {...formik.getFieldProps("startTime")}
                    className={clsx("commonInput form-control", {
                      "border border-danger":
                        formik.touched.startTime && formik.errors.startTime,
                    })}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-xs-3 mb-3 mb-sm-3 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0">
                  <input
                    type="time"
                    placeholder="Close at"
                    {...formik.getFieldProps("endTime")}
                    className={clsx("commonInput form-control", {
                      "border border-danger":
                        formik.touched.endTime && formik.errors.endTime,
                    })}
                  />
                </Form.Group>
              </div>
            </div>

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
          </div>

          <div className="bgFormColor p-4 mb-3">
            <label>Services</label>
            <div className="row">
              <div className="col-md-12">
                <div className="group-img iconLeft  position-relative textareaWrap">
                  <label>
                    <SearchIcon />
                  </label>
                  <Form.Group className="mb-xs-3 mb-3 mb-sm-3 mb-md-0 mb-lg-0 mb-xl-0 mb-xxl-0">
                    <input
                      type="text"
                      placeholder="Search service"
                      className="commonInput form-control"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <ul className="daysCheckbox servicesWrap">
              {filteredServices?.map((item: any, index: number) => (
                <li key={index} className='align-items-center'>
                  <label>
                    <input
                      type="checkbox"
                      name="service"
                      value={item._id}
                      checked={formik.values.services.includes(item._id)}
                      onChange={handleCheckboxChange}
                    />
                    <span className="day">{item.name}</span>
                    <span className="bg"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="bgFormColor p-4 mb-3">
            <label>Gym images</label>
            <div className="uploadWrapper">
              <ul className="outerBlock">
                <li>
                  <ul className="showImages">
                    {previews.map(({ preview, type }, index) => (
                      <li className="position-relative" key={index}>
                        <button
                        type = "button"
                          className="crossBtn removeGymFile"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CrossWhiteBlackIcon />
                        </button>

                        <div className="image">
                          {type.startsWith('video') ? (
                            <video src={isLiveUrl(preview)
                              ? fileUrl + preview
                              : preview} controls className="w-100" />
                          ) : (
                            <img src={isLiveUrl(preview)
                              ? fileUrl + preview
                              : preview} alt={`Preview ${index}`} className="w-100" />
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
          <div className="updateWrap">
            <Button type="submit" className="updateBtn mt-4">
              Update profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
