import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Outlet, useNavigate } from 'react-router-dom';
import Req from 'utils/Req';

const AuthEntry = () => {
    const navigate = useNavigate()
    React.useEffect(() => {
        checkAuthorization()
    }, [])
    const checkAuthorization = () => {
        Req('get', { url: '/users/authAdmin' }).catch(() => {
            NotificationManager.error('Please login to your account', '', 3000)
            navigate('/login')
        })
    }
    return <Outlet />
};

export default AuthEntry;