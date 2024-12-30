import React from 'react'
import { Link } from 'react-router-dom'
import ArrowWhiteRightIcon from '../../../icons/ArrowWhiteRightIcon'
import "./style.scss";

export default function CommonCard({ name, description, price, partnersDetails, subscriptionId }: any) {

    return (
        <div className='classesBlock'>
            <div className='gameContent'>
                {/* <div className='name_btn d-flex justify-content-between align-items-start mb-2'> */}
                <div className='name_btn mb-2'>

                    <Link to={'#'} className='title'>{name}</Link>
                    <Link to={'#'} className='title'>{description}</Link>
                    <Link to={'#'} className='title'>{status}</Link>
                    <Link to={'#'} className='title'>{price}</Link>
                    <Link to={`/classes/detail/${subscriptionId}`} className='gameBtn'><ArrowWhiteRightIcon /></Link>
                </div>
            </div>
        </div>
    )
}
