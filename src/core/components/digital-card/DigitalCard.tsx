import React from 'react'
import ShareICirclecon from '../../../icons/ShareICirclecon';
import CopyTextIcon from '../../../icons/CopyTextIcon'
import { useSelector } from 'react-redux'
import { LANG } from '../../../constants/language'
import { copyTxtToClip, getAge } from '../../../utils';
import moment from 'moment';

const DigitalCard = () => {
    const fileUrl= process.env.REACT_APP_FILE_URL;
    const user= useSelector((state:any)=>state.user?.userDetail);
    return (
        <div className="digitalCard">
            <div className="d-flex align-items-center justify-content-between mb-32px">
                <h3 className="mb-0">{LANG.DIGITAL_CARD}</h3>
                <button type="button" className="shareBtn">
                    {/* <ShareICirclecon /> */}
                </button>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <img className='rounded-circle' src={user?.avatar ? fileUrl+user?.avatar :"/assets/img/default-avatar.png"} height={100} width={100} alt="friendOne" />
                <h4>{user?.firstName} {user?.lastName}</h4>
                <div className="id_copy">
                    <span className="empId">{String(user?._id).slice(0,10)}</span>
                    <span className="copyText cursor-pointer" onClick={()=>copyTxtToClip(user?._id)}>
                        <CopyTextIcon />
                    </span>
                </div>
                <div className="cardInfo w-100">
                    <ul className="m-0">
                        <li className="d-flex justify-content-between">
                            <label className="text-uppercase">{LANG.AGE}</label>
                            <label>{getAge(user?.dob)||1} {LANG.YEARS}</label>
                        </li>
                        <li className="d-flex justify-content-between">
                            <label className="text-uppercase">
                                {LANG.SEASON}
                            </label>
                            <label>2024 / 2025</label>
                        </li>
                        <li className="d-flex justify-content-between">
                            <label className="text-uppercase">
                                {LANG.MEMBERSHIP_EXPIRE}
                            </label>
                            <label>-</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DigitalCard