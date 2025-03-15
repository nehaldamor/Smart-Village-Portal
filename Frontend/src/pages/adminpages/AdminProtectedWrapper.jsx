import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminProtectedWrapper = async ({
    children
}) => {
    const token = await localStorage.getItem('token')
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/admin-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/admins/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setIsLoading(false)
            }
        })
            .catch(err => {
                
                localStorage.removeItem('token')
                navigate('/admin-login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default AdminProtectedWrapper
