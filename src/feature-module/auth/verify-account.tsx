import React, { useEffect, useState } from 'react'
import { all_routes } from '../router/all_routes'
import { Link, useSearchParams} from 'react-router-dom';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { LANG } from '../../constants/language';
import { requestVerifyAccount } from '../../services/auth.service';
import { AxiosError } from 'axios';

const VerifyAccountPage = () => {
  const routes = all_routes;
  const [message, setMessage]= useState("");
  const [params]= useSearchParams();

  useEffect(()=>{
     verifyAccount();
  },[params.get('token')]);


  const verifyAccount= async()=>{
    try {
      const token = params.get("token");
      if(!token){
        return setMessage(LANG.INVALID_LINK);
      }
      const result= await requestVerifyAccount(token);

      if(result.status=== 200){
          setMessage(LANG.ACCOUNT_VERIFIED_SUCCESSFULLY);
      }else if(result.status=== 404){
          setMessage(LANG.USER_NOT_FOUND);
      }else if(result.status=== 400){ 
          setMessage(LANG.LINK_EXPIRED);
      }
    } catch (error) {
      if(error instanceof AxiosError){
        setMessage(LANG.INVALID_LINK);
      }
    }
  }
  
  return (
    <div className='main-wrapper authendication-pages'>
      <div className="content blur-ellipses">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto vph-100 d-flex align-items-center">
              <div className="forgot-password w-100">
                <header className="text-center forgot-head-title">
                    <ImageWithBasePath src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                </header>
                <div className="shadow-card">
                  <h2>{LANG.ACCOUNT_VERIFICATION}</h2>
                  <p>{message}</p>
                </div>
                <div className="bottom-text text-center">
                  <p><Link to={routes.login}>{LANG.SIGN_IN}!</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccountPage;