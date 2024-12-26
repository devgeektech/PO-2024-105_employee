import React, { useEffect, useState } from 'react'
import { all_routes } from '../router/all_routes'
import { useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import { LANG } from '../../constants/language';
import { getStorageItem, setStorageItem } from '../../services/storage.service';

const SelectRoles = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [roles, setRoles] = useState<string[]>(['trainer']);
  useEffect(() => {
    const storageRole: any = JSON.parse(getStorageItem('roles')) || ['member'];
    setRoles(storageRole);
  }, []);

  const navigateToRole= (role:any)=>{
    if(role=='trainer'){
      setStorageItem('role', 'trainer');
      // navigate(routes.trainerDashboard);
    }
    else if(role=='sponsor'){
      setStorageItem('role', 'sponsor');
      // navigate(routes.sponsorDashboard);
    }else{
      setStorageItem('role', 'member');
      navigate(routes.userDashboard+'?tab=profile&tabKey=accountSetting');
    }
  }
  return (
    <div className='main-wrapper authendication-pages'>
      <div className="content blur-ellipses">
        <div className="container vph-100">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto d-flex align-items-center">
              <div className="forgot-password w-100">
                <header className="text-center forgot-head-ti-tle">
                  <ImageWithBasePath src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                </header>
                <div className="shadow-card">
                  <h2>{LANG.SELECT_THE_ROLE_TO_CONTINUE}</h2>
                  <div>
                    {
                      roles.map((role, index) => (
                        <div key={index} className="border p-2 rounded mb-3 d-flex justify-content-between">
                          <span className="text-capitalize">
                            {role}
                          </span>
                          <span className='cursor-pointer' onClick={()=>navigateToRole(role)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                          </span>
                        </div>
                      ))
                    }
                  </div>
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

export default SelectRoles;