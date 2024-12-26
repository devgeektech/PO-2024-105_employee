import React from "react";
import TickBlueIcon from "../../../icons/TickBlueIcon";
import { LANG } from "../../../constants/language";
import moment from "moment";
import CrossRedCircleIcon from "../../../icons/CrossRedCircleIcon";

interface Props{
  user:any,
  accept():void,
  decline(): void
}
export default function FriendsAcceptBlock({user,accept, decline}:Props) {
  const fileUrl= process.env.REACT_APP_FILE_URL;
  return (
    <div className="friendBlock">
      <div className="friendImage">
        <img src={user?.avatar ? fileUrl+user?.avatar :"/assets/img/default-avatar.png"} alt="friendTwo" />
      </div>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h5 className="w-100 text-center overflow-hidden text-nowrap">
          {user?.firstName || 'NA'} {user?.lastName}
        </h5>
        <label className="d-flex align-items-center justify-content-center">
          <span>{LANG.JOINED} :</span>
          <strong> {moment(user?.joinedAt).format("DD MMM YYYY")}</strong>
        </label>
        <label className="d-flex align-items-center justify-content-center">
          <span>{LANG.CONTACT} :</span>
          <strong> {user?.phone||'NA'}</strong>
        </label>
       <div className="d-flex gap-1">
        <button className="btn btn-primary w-100" style={{fontSize:12}} onClick={accept}>
          {LANG.ACCEPT}
        </button>
        <button className="btn btn-danger border w-100" style={{fontSize:12}}   onClick={decline}>
          {LANG.DECLINE}
        </button>
       </div>
      </div>
    </div>
  );
}
