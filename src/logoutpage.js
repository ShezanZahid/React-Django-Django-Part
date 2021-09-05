import React, { useState, useEffect } from 'react';
import { axiosInstance } from './axiosinstance';
import { useHistory } from 'react-router-dom';

export default function Logout() {
    const history = useHistory();

    const onLogout = () => {
        axiosInstance.post('api/user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        history.push('/login');
    }
    return ( <div> <button onClick={onLogout}> Logout </button> </div>);
}