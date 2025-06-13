import React, { useEffect } from 'react'
import { all_routes } from '../router/all_routes'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { LANG } from '../../constants/language';
import { setStorageItem } from '../../services/storage.service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { loginByToken } from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import http from '../../services/http.service';
import { setLogin, setUserDetail } from '../../core/data/redux/user/userSlice';

const ValidationRedirect = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [params]= useSearchParams();

  const dispatch= useDispatch();
  useEffect(() => {
    if(params.get('auth_token')){
      getUserByToken(params.get('auth_token'))
    }
  }, [params.get('auth_token')]);

  const navigateToRole= ()=>{
      setStorageItem('role', 'member');
      navigate(routes.userDashboard+'?tab=dashboard');
  }

  const getUserByToken= async (token:any)=>{
     try {
      const result= await loginByToken({token});
      if(result.status == 200){
        // toast.success(LANG.LOGIN_SUCCESSFULLY);
        localStorage.setItem('token', result.data?.data?.token);
        localStorage.setItem('id', result.data?.data?._id);
        localStorage.setItem('roles', JSON.stringify(result.data?.data?.role));
        dispatch(setLogin(true));
        dispatch(setUserDetail(result.data?.data));
        http.defaults.headers['Authorization'] = result.data?.data?.token;
        if(result.data?.data?.role?.length){
            navigateToRole();
        }
      }
     } catch (error) {
      if(error instanceof AxiosError){
        toast.error(error.response?.data?.responseMessage)
      }
     }
  }
  return (
    <div className='main-wrapper authendication-pages'>
      <div className="content blur-ellipses">
        <div className="container vph-100">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto d-flex align-items-center">
              <div className="forgot-password w-100">
                <header className="text-center forgot-head-title">
                  <ImageWithBasePath src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                </header>
                <div className="shadow-card">
                  <div className='d-flex justify-content-center'>
                    <ImageWithBasePath width={200} src='./assets/img/loading.gif' />
                  </div>
                  <h2 className='text-center'>{LANG.LOADING}...</h2>
                </div>
              </div>
            </div>
            <div className="my-3 text-center">
              <span className="cursor-pointer" onClick={() => navigate(routes.login)}>
                <i className="feather-arrow-left-circle ms-2" /> {LANG.BACK}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValidationRedirect;