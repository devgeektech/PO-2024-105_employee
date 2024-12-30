import React, { useEffect, useState } from 'react'
import clsx from "clsx";
import SendSquareIcon from '../../../../icons/SendSquareIcon';
import IcosahedronIcon from '../../../../icons/IcosahedronIcon';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from 'react-bootstrap';
import { LANG } from '../../../../constants/language';
import { updateUserById } from '../../../../services/user.service';
import { toast } from 'react-toastify';
import VisibilityBox from '../../VisibilityBox';
import moment from 'moment';
import { checkMemberInDB } from '../../../../services/auth.service';
import ErrorText from '../../error-text';

const subscriptionSchema = Yup.object().shape({
    subscription: Yup.string().required("Subscription is required")
});

const SubscriptionSetting = ({ userDetail }: any) => {
    const initialValues = {
        subscription: "",
        siblingDetails:[
            {
                email: "",
                name: "",
                dob: ""
            }
        ]
    }
    const formik = useFormik({
        initialValues,
        validationSchema: subscriptionSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await updateUserById(values)
                toast.success(LANG.SUBSCRIPTION_UPDATED_SUCCESSFULLY)
            } catch (error) {
                console.log(error)
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue('subscription', userDetail?.subscription);
        if(userDetail?.subscription === 'family'){
            const details= userDetail?.siblingDetails?.map((d:any)=>{
               d.dob= moment(d.dob).format('YYYY-MM-DD');
               return d;
            })
            formik.setFieldValue('siblingDetails', details);
        }
    }, [userDetail]);

    const [error, setError]= useState<any>([]);
  
    const searchMember= (index:number, searchText:any)=>{
        try {
          setTimeout(async ()=>{
             const errorData= [...error];
             const result:any= await checkMemberInDB(searchText);
             if(result?.status == 400){
                formik.setFieldValue(`siblingDetails[${index}].email`,"");
                formik.setFieldValue(`siblingDetails[${index}].name`,"");
                formik.setFieldValue(`siblingDetails[${index}].dob`,"");
                formik.setFieldValue('discount',10);
                errorData[index]= true;
             }
             if(result?.status == 200 && result?.data?.data){
               formik.setFieldValue(`siblingDetails[${index}].email`,result?.data?.data?.email);
               formik.setFieldValue(`siblingDetails[${index}].name`,result?.data?.data?.firstName + " " + result?.data?.data?.lastName);
               formik.setFieldValue(`siblingDetails[${index}].dob`,moment(result?.data?.data?.dob).format("YYYY-MM-DD"));
               formik.setFieldValue('discount',10);
               errorData[index]= false;
             }else{
              formik.setFieldValue(`siblingDetails[${index}].email`,"");
               formik.setFieldValue(`siblingDetails[${index}].name`,"");
               formik.setFieldValue(`siblingDetails[${index}].dob`,"");
               formik.setFieldValue('discount',10);
               errorData[index]= true;
             }
             setError(errorData);
          },300)
        } catch (error) {
          console.log(error)
        }
    }
  
    const hasError= ()=>{
      if(formik?.values?.subscription == 'family'){
        return formik?.values?.siblingDetails?.some((s:any)=>!s?.email)|| error.includes(true);
      }else{
        return false;
      }
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={clsx("mb-3 text-start card", formik?.values?.subscription == "individual" && "border border-primary")}
                    onClick={() => formik.setFieldValue("subscription", "individual")} >
                    <div className="planBox">
                        <div className="icon_price d-flex justify-content-between align-items-center">
                            <span><SendSquareIcon /></span>
                            <h2 className="planPrice">€329</h2>
                        </div>
                        <div className="planBlockContent">
                            <h4 className='text-capitalize'>{LANG.INDIVIDUAL_YOUTH_MEMBERSHIP}</h4>
                            <p className="mb-0">Aut sunt quaerat sunt aspernatur consequuntur.</p>
                        </div>
                        <div className="backgroundColor"></div>
                    </div>
                </div>
                <div className={clsx("mb-3 text-start card", formik?.values?.subscription == "family" && "border border-primary")} onClick={() => formik.setFieldValue("subscription", "family")}>
                    <div className="planBox">
                        <div className="icon_price d-flex justify-content-between align-items-center">
                            <span><SendSquareIcon /></span>
                            <h2 className="planPrice">€329 <span className="text-decoration-line-through">€280</span></h2>
                        </div>
                        <div className="planBlockContent">
                            <h4 className='text-capitalize'>{LANG.FAMILY_PLAN}</h4>
                            <p className="mb-0">Tempora amet rem saepe et quos numquam est veritatis.</p>
                        </div>
                        <div className="backgroundColor"></div>
                    </div>
                </div>
                <div className={clsx("mb-3 text-start card", formik?.values?.subscription == "special" && "border border-primary")} onClick={() => formik.setFieldValue("subscription", "special")}>
                    <div className="planBox">
                        <div className="icon_price d-flex justify-content-between align-items-center">
                            <span><IcosahedronIcon /></span>
                            <h2 className="planPrice">€169 <span className="text-decoration-line-through">€189</span></h2>
                        </div>
                        <div className="planBlockContent">
                            <h4 className='text-capitalize'>{LANG.SPECIAL_PLAN}</h4>
                            <p className="mb-0">Sed beatae non et at.</p>
                        </div>
                        <div className="backgroundColor"></div>
                    </div>
                </div>

                <VisibilityBox show={formik?.values?.subscription == 'family'}>
                    <div className="mb-3 text-start">
                        <label className="mb-2">{LANG.SIBLING_DETAILS}</label>
                    </div>
                    {
                        formik.values?.siblingDetails?.map((sibling: any, index: number) =>
                            <React.Fragment key={index}>
                                <div className="mb-2 text-start">
                                    <div className="d-flex gap-2 mb-2">
                                        <div className="form-group col-md-6" >
                                            <input
                                                type="text"
                                                placeholder={LANG.MEMBER_EMAIL}
                                                defaultValue={sibling?.email}
                                                autoComplete="off"
                                                maxLength={100}
                                                onChange={(event) => {
                                                    searchMember(index, event.target.value);
                                                }}
                                                className={clsx(
                                                    "commonInput form-control",
                                                    { "border border-danger": false },
                                                )}
                                            />
                                            <ErrorText show={error[index]} message={LANG.INVALID_MEMBER_ID} />
                                        </div>
                                        <div className="form-group col-md-6" >
                                            <input
                                                type="text"
                                                readOnly={true}
                                                placeholder={LANG.NAME}
                                                autoComplete="off"
                                                {...formik.getFieldProps(`siblingDetails[${index}].name`)}
                                                className={clsx(
                                                    "commonInput form-control",
                                                    { "border border-danger": false },
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <div className="form-group col-md-6" >
                                            <input
                                                type="date"
                                                placeholder={LANG.BIRTHDAY}
                                                readOnly={true}
                                                {...formik.getFieldProps(`siblingDetails[${index}].dob`)}
                                                className={clsx(
                                                    "commonInput form-control",
                                                    { "border border-danger": false },
                                                )}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <VisibilityBox show={index > 0}>
                                                <button type="button" onClick={() => {
                                                    formik.values?.siblingDetails.splice(index, 1)
                                                    formik.setFieldValue('siblingDetails', formik.values?.siblingDetails)
                                                }
                                                } className="btn p-2 mt-3 text-sm btn-danger" style={{ fontSize: 12 }}>Delete</button>
                                            </VisibilityBox>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                    <Form.Group className="mb-3 flex-start d-flex">
                        <Button type="button" className="addRelationBtn" onClick={() => formik.setFieldValue('siblingDetails',
                            [...formik.values.siblingDetails, { email: "", name: "", dob: "" }])}><span>+</span></Button>
                    </Form.Group>
                </VisibilityBox>
                <Button type='submit' disabled={hasError()} className='updateBtn mt-4'>{LANG.UPDATE}</Button>
            </form>
        </div>
    )
}

export default SubscriptionSetting;