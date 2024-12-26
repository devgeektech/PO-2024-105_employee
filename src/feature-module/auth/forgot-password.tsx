import React, { useState } from 'react'
import { all_routes } from '../router/all_routes'
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { LANG } from '../../constants/language';
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { forgotPassword } from '../../services/auth.service';
import { toast } from 'react-toastify';
import ErrorText from '../../core/components/error-text';
import { AxiosError } from 'axios';
import EmailIcon from '../../icons/EmailIcon';
import BackIcon from '../../icons/BackIcon';
import WarningIcon from '../../icons/WarningIcon';

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(LANG.EMAIL_IS_REQUIRED),
})

const ForgotPassword = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [error, setError] = useState<any>(null);

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const { data: { result } } = await forgotPassword(values.email);
        console.log(result);
        toast.success('Password reset link sent successfully!');
        setError(null);

        navigate('/auth/confirm-email', { state: { email:values.email } });
      } catch (error) {
        setSubmitting(false);
        setStatus('The login detail is incorrect');
        toast.error(LANG.ENTER_REGISTERED_EMAIL);
        setError('Please look the entered email is correct.');
      }
    },
  });

  return (
    <div className="main-wrapper authendication-pages">
      {/* Page Content */}
      <div className="content">
        <div className="container wrapper no-padding">
          <div className="row no-margin vph-100">

            <div className="col-12 col-sm-12  col-lg-4 no-padding">
              <div className="dull-pg">
                <div className="row no-margin vph-100 d-flex align-items-top justify-content-center">
                  <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                    <header className="text-center position-relative">
                      <Link className='backBtn' to={"/login"}><BackIcon /></Link>
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>
                    <div className="shadow-card">
                      <h2 className="text-center">Forgot password </h2>
                      <p className="text-center">Please enter the email which is registered with your account</p>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          {/* Login Form */}
                          <form onSubmit={formik.handleSubmit} >
                            <div className="form-group">
                              <div className="group-img iconLeft email position-relative">
                                <label><EmailIcon /></label>
                                <input
                                  className={error ? "borderWarning" : "form-control commonInput"}
                                  type="text"
                                  placeholder="Email"
                                  {...formik.getFieldProps('email')}
                                />
                              </div>

                              {error && (
                                <p
                                  className="warningMessage"
                                >
                                  <WarningIcon></WarningIcon> {error}
                                </p>
                              )}

                            </div>

                            <button type="submit" className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block">
                              Continue
                            </button>
                          </form>
                          {/* /Login Form */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-lg-8 no-padding">
              <div className="banner-bg login">
                <div className="row no-margin h-100">
                  <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                    <div className="h-100 d-flex justify-content-center align-items-center">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default ForgotPassword