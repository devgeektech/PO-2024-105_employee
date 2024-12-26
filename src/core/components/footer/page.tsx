import React, { useState } from 'react'
import "./style.scss"
import { Link } from 'react-router-dom'
import { INTERFACE_MENU, MAIN_MENU } from '../../../constants/mainMenu'
import ImageWithBasePath from '../../data/img/ImageWithBasePath'
import LinkedinIcon from '../../../icons/LinkedinIcon'
import FacebookIcon from '../../../icons/FacebookIcon'
import TwitterIcon from '../../../icons/TwitterIcon'
import { LANG } from '../../../constants/language'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { subscribeNewsLetter } from '../../../services/user.service'

export default function Footer() {

    const [email, setEmail] = useState("");

    const subscribeEmail = async () => {
        try {
            if (!email) return;
            const result = await subscribeNewsLetter({ email });
            if (result.status == 200) {
                setEmail("");
                toast.success(LANG.SUBSCRIBE_EMAIL_SUCCESSFULLY);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.responseMessage)
            }
        }
    }
    return (
        <div className='footer'>
            {/* <div className='footerInner'>
                <div className='container'>
                    <div className='row my-4'>
                        <div className='col-lg-6 d-flex'>
                            <input placeholder={LANG.ENTER_EMAIL_ADDRESS} value={email}
                                onChange={(ev) => {
                                    setEmail(ev.target.value)
                                }}
                                type="email"
                                className='form-control bg-transparent' />
                            <button className='btn btn-primary mx-3' onClick={subscribeEmail}>{LANG.SUBSCRIBE}</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='logo_links d-flex align-items-center'>
                                <div className='logo_wrapper'>
                                    <Link to={"/"}><ImageWithBasePath src={'assets/img/logo.png'} alt="logo" width={100} height={100} /></Link>
                                </div>
                                <div className=''>
                                    <h4>Quick Links</h4>
                                    <ul className='footerMenu'>
                                        {MAIN_MENU.map((item: INTERFACE_MENU) => <Link key={item.id} to={item.path}>{item.name}</Link>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <ul className='socialMenu d-flex p-0'>
                                <li><Link to={'/'}><LinkedinIcon /></Link></li>
                                <li><Link to={'/'}><FacebookIcon /></Link></li>
                                <li><Link to={'/'}><TwitterIcon /></Link></li>
                            </ul>
                            <ul className='privacyMenu p-0 m-0 d-flex'>
                                <li><Link to={'/'}>Privacy Policy</Link></li>
                                <li><Link to={'/'}>Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='copyright'>
                <p className='mb-0 text-center'>© 2024 fitpond. All rights reserved</p>
            </div>
        </div>
    )
}
