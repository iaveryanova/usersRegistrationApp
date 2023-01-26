import React, {useContext, useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Users } from '../pages/users';
import { AuthPage } from '../pages/auth-page/auth-page';
import {UserContext} from "../App";
import {Navigate}  from "react-router-dom";


const AppRoutes = () => {
    const context = useContext(UserContext);
    const [token, setToken] = useState(context?.token)
    return (
        context?.token ?
            <Routes>
                <Route path="users" element={<Users/>}/>

                <Route
                    path="*"
                    element={<Navigate to="users" replace/>}
                />
            </Routes>
            :
            <Routes>
                <Route path="/" element={<AuthPage/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
    )
}

export default AppRoutes


