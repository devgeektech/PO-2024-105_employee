import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./style.scss";
import EditCircleIcon from '../../../../icons/EditCircleIcon'
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { updateSponsorById, updateUserAvatarById, updateUserById } from '../../../../services/user.service';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../../../data/redux/user/userSlice';
import moment from "moment";
import VisibilityBox from '../../VisibilityBox';
import { LANG } from '../../../../constants/language';
import { toast } from 'react-toastify';
import { alphaOnly, getAge, getFormData, numOnly } from '../../../../utils';
import { NATIONALITIES } from '../../../../constants/nationalities';
import { GENDERS } from '../../../../constants';
import ErrorText from '../../error-text';

const profileSchema:any = Yup.object().shape({
  firstName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // lastName: Yup.string().required("Last name is required"),
  // street: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // houseNumber: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // zipCode: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // city: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // dob: Yup.date().required("Birth Date is required"),
  // birthPlaceCity: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // birthPlaceCountry: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // nationality: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // gender: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  // bankName: Yup.string().required("Bank name is required"),
  // iban: Yup.string().required("IBAN is required"),
  // bic: Yup.string().required("BIC is required"),
  // accountHolder: Yup.string().required("Account Holder is required"),
  description: Yup.string().optional(),

  // companyLogo: Yup.mixed(),
  // companyName: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // websiteUrl: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // companyDescription: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // companyEmail: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // companyPhone: Yup.string().required(LANG.FIELD_IS_REQUIRED),
  // offerings:Yup.array().optional(),

});
export default function SponsorAccountSetting({ userDetail }: any) {
  const [file, setFile] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [companyUrl, setCompanyUrl] = useState<any>();
  const [loading, setLoading] = useState(false);
  const fileUrl = process.env.REACT_APP_FILE_URL;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      ...userDetail,
      dob: moment(userDetail?.dob).format("YYYY-MM-DD")
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const payload={
          ...values, role: JSON.stringify(values.role)
        }
        const formData= getFormData(payload);
        const result = await updateSponsorById(formData);
        if (result.data) {
          dispatch(setUserDetail(result?.data?.data));
          toast.success(LANG.PROFILE_UPDATED_SUCCESSFULLY);
        }
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({ ...userDetail, dob: moment(userDetail?.dob).format("YYYY-MM-DD") });
  }, [userDetail?._id]);

  const handleChangeProfileImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setImageUrl(url);
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    await updateUserAvatarById(formData);
  };

  const handleChangeCompanyImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setCompanyUrl(url);
    formik.setFieldValue('companyLogo', selectedFile)
  };

  return (
    <div className='accountSettingTab'>
      <h3 className='mb-3'>{LANG.EDIT_ACCOUNT_DETAILS}s</h3>
      <div className='uploadImageWrapper mb-3'>
        <div className='uploadImg'>
          <div className='d-flex align-items-center flex-column'>
            <img src={userDetail?.avatar ? fileUrl + userDetail?.avatar : (imageUrl ? imageUrl : '/assets/img/default-avatar.png')} width={120} height={120} style={{ borderRadius: 60 }} alt="userCircle" />
          </div>
          <button className='uploaddBtn' type='button'><Form.Control accept='.png,.jpg,.jpeg' onChange={handleChangeProfileImage} type="file" /><EditCircleIcon /></button>
        </div>
      </div>
      <div className='personalIformation bgFormColor p-4 formEditWrap mb-3'>
        <label>{LANG.PERSONAL_INFORMATION}</label>
        <Form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.COMPANY_NAME}
                  {...formik.getFieldProps("firstName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.firstName && formik.errors.firstName },
                  )}
                />
              </Form.Group>
            </div>

            {/* <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.LAST_NAME}
                  readOnly={true}
                  {...formik.getFieldProps("lastName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.lastName && formik.errors.lastName },
                  )}
                />
              </Form.Group>
            </div> */}
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='email' placeholder='Email'  {...formik.getFieldProps("email")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.email && formik.errors.email },
                  )}
                />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text'
                  placeholder={LANG.PHONE}
                  {...formik.getFieldProps("phone")}
                  onKeyPress={numOnly}
                  maxLength={11}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.phone && formik.errors.phone },
                  )} />
              </Form.Group>
            </div>
            {/* <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="date" placeholder={LANG.BIRTHDAY}
                  readOnly={true}
                  {...formik.getFieldProps("dob")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.dob && formik.errors.dob },
                  )}
                />
              </Form.Group>
            </div> */}
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control 
            as="textarea" 
            rows={3} 
            defaultValue='' 
            {...formik.getFieldProps("description")}
            name="description"
          /> 
          </Form.Group>


          {/* <label>{LANG.ADDRESS}</label>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2} placeholder={LANG.STREET}
              {...formik.getFieldProps("street")}
              className={clsx(
                "addressTextarea",
                { "border border-danger": formik.touched.street && formik.errors.street },
              )} />
          </Form.Group>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text"
                  placeholder={LANG.HOUSE_NO}  {...formik.getFieldProps("houseNumber")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.houseNumber && formik.errors.houseNumber },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.ZIP_CODE} {...formik.getFieldProps("zipCode")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.zipCode && formik.errors.zipCode },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.CITY} {...formik.getFieldProps("city")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.city && formik.errors.city },
                  )} />
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.BIRTHPLACE_CITY}
                  {...formik.getFieldProps("birthPlaceCity")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.birthPlaceCity && formik.errors.birthPlaceCity },
                  )}
                />
              </Form.Group>
            </div>


            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text'  {...formik.getFieldProps("birthPlaceCountry")}
                  placeholder={LANG.BIRTHPLACE_COUNTRY}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.birthPlaceCountry && formik.errors.birthPlaceCountry },
                  )}
                />
              </Form.Group>
            </div>

            <div className="col-md-4 form-group">
              <div className="group-img">
                <select
                  {...formik.getFieldProps("nationality")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.nationality && formik.errors.nationality },
                  )}>
                  <option value={""}>{LANG.SELECT} {LANG.NATIONALITY}</option>
                  {NATIONALITIES.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className="col-md-4 form-group">
              <div className="group-img">
                <select {...formik.getFieldProps("gender")}
                  className={clsx(
                    "commonInput form-control p-3",
                    { "border border-danger": formik.touched.gender && formik.errors.gender },
                  )}>
                  <option value={""}>{LANG.PLEASE_CHOOSE}</option>
                  {GENDERS.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.PHONE}
                  {...formik.getFieldProps("phone")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.phone && formik.errors.phone },
                  )} />
              </Form.Group>
            </div>
          </div>

          <label>{LANG.BANK_DETAIL}</label>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text"
                  placeholder={LANG.BANK_NAME}  {...formik.getFieldProps("bankName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.bankName && formik.errors.bankName },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.IBAN_BANK_ACCOUNT} {...formik.getFieldProps("iban")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.iban && formik.errors.iban },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.BIC_BANK_CODE} {...formik.getFieldProps("bic")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.bic && formik.errors.bic },
                  )} />
              </Form.Group>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <input type="text" placeholder={LANG.ACCOUNT_HOLDER}
                  {...formik.getFieldProps("accountHolder")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.accountHolder && formik.errors.accountHolder },
                  )}
                />
              </Form.Group>
            </div>
          </div>

          <label>{LANG.COMPANY_DETAILS}</label>

          <div className='uploadImageWrapper mb-3'>
        <div className='uploadImg'>
          <div className='d-flex align-items-center flex-column'>
            <img src={userDetail?.companyLogo ? fileUrl + userDetail?.companyLogo : (companyUrl ? companyUrl : '/assets/img/default-avatar.png')} width={120} height={120} style={{ borderRadius: 60 }} alt="companyCircle" />
          </div>
          <button className='uploaddBtn' type='button'><Form.Control accept='.png,.jpg,.jpeg' onChange={handleChangeCompanyImage} type="file" /><EditCircleIcon /></button>
        </div>
      </div>
          <div className='row'>
            <div className='col-md-6'>
              <Form.Group className="mb-3">
                <input type="text"
                  placeholder={LANG.COMPANY_NAME}  {...formik.getFieldProps("companyName")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.companyName && formik.errors.companyName },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-6'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.WEBSITE_URL} {...formik.getFieldProps("websiteUrl")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.websiteUrl && formik.errors.websiteUrl },
                  )} />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder={LANG.DESCRIPTION}
            {...formik.getFieldProps("companyDescription")}
            name="companyDescription"
          /> 
          </Form.Group>

          <div className='row'>
            <div className='col-md-6'>
              <Form.Group className="mb-3">
                <input type="email"
                  placeholder={LANG.COMPANY_EMAIL}  {...formik.getFieldProps("companyEmail")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.companyEmail && formik.errors.companyEmail },
                  )} />
              </Form.Group>
            </div>
            <div className='col-md-6'>
              <Form.Group className="mb-3">
                <input type='text' placeholder={LANG.COMPANY_PHONE} {...formik.getFieldProps("companyPhone")}
                  className={clsx(
                    "commonInput form-control",
                    { "border border-danger": formik.touched.companyPhone && formik.errors.companyPhone },
                  )} />
              </Form.Group>
            </div>
          </div> */}

          <Button type='submit' className='updateBtn mt-4'>{LANG.UPDATE}</Button>
        </Form>
      </div>
    </div>
  )
}
