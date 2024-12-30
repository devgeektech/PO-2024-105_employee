import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./style.scss";
import EditCircleIcon from '../../../../icons/EditCircleIcon'
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useSelector } from 'react-redux';
import { LANG } from '../../../../constants/language';
import { toast } from 'react-toastify';
import PhoneIcon from '../../../../icons/PhoneIcon';
import UserIcon from '../../../../icons/UserIcon';
import { updateUserProfile } from '../../../../services/user.service';
import CalendarIcon from '../../../../icons/CalendarIcon';


export default function AccountSetting({ userDetail }: any) {
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [loading, setLoading] = useState(false);
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const user = useSelector((state: any) => state.user);

  const profileInitialValues: any = {
    firstName: user?.userDetail?.firstName || '',
    lastName: user?.userDetail?.lastName || '',
    phone: user?.userDetail?.phone || '',
    dob: user?.userDetail?.dob ? new Date(user?.userDetail?.dob).toISOString().split("T")[0] : "",
  }

  const profileSchema: any = Yup.object().shape({
    firstName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
    lastName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
    phone: Yup.string(),
    dob: Yup.string(),
  });

  useEffect(() => {
  }, []);

  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        if (file) values.image = file
        const formData = new FormData();

        for (const key in values) {
           if (typeof values[key] === 'object' && values[key] instanceof File) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }
        const result = await updateUserProfile(formData);
        if (result.data) {
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


  return (
    <div className="accountSettingTab">
      {/* <h3 className="mb-3">{LANG.EDIT_ACCOUNT_DETAILS}</h3> */}
      <div className="uploadImageWrapper mb-3">
        <div className="uploadImg">
          <div className="d-flex align-items-center flex-column profileImageChange">
            <img
              src={
                user?.userDetail?.image && !file
                  ? fileUrl + user?.userDetail?.image
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
           
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <div className="group-img iconLeft  position-relative">
                    <label>
                      <UserIcon />
                    </label>
                    <input
                      type="text"
                      placeholder="First name"
                      {...formik.getFieldProps("firstName")}
                      className={clsx("commonInput form-control", {
                        "border border-danger":
                          formik.touched.firstName && formik.errors.firstName,
                      })}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <div className="group-img iconLeft  position-relative">
                    <label>
                      <UserIcon />
                    </label>
                    <input
                      type="text"
                      placeholder="Last name"
                      {...formik.getFieldProps("lastName")}
                      className={clsx("commonInput form-control", {
                        "border border-danger":
                          formik.touched.lastName && formik.errors.lastName,
                      })}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <div className="group-img iconLeft  position-relative">
                    <label>
                      <PhoneIcon />
                    </label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      {...formik.getFieldProps("phone")}
                      className={clsx("commonInput form-control", {
                        "border border-danger":
                          formik.touched.phone && formik.errors.phone,
                      })}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <div className="group-img iconLeft  position-relative">
                    <label>
                      <CalendarIcon />
                    </label>
                    <input
                      type="date"
                      placeholder="Date of birth"
                      max={new Date().toISOString().split("T")[0]} // Set max to today's date
                      {...formik.getFieldProps("dob")}
                      className={clsx("commonInput form-control", {
                        "border border-danger":
                          formik.touched.dob && formik.errors.dob,
                      })}
                    />
                  </div>
                </Form.Group>
              </div>
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
