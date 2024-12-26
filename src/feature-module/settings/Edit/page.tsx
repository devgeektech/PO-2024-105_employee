import React from 'react';
import "./style.scss";
import ProfileTabContent from '../../../core/components/profile-setting/page';
import { Link } from 'react-router-dom';

export default function EditSetting() {
    function navigateToTab(arg0: string) {
        throw new Error('Function not implemented.');
    }

  return (
    <div className='settingEdit'>
        
        <div className='container'>
                 <ul className='breadcrumbWrapper'>
                    <li><Link to={'#'}>Setting</Link></li>/
                    <li><span>Edit setting</span></li>
                  </ul>
            <ProfileTabContent />
        </div>
    </div>
  )
}
