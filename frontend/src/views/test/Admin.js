import { CContainer, CSpinner } from '@coreui/react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Admin = () => {

    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/admin/admin', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        } 
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (
        <CContainer>
            {JSON.stringify(users)}
        </CContainer>
    );
}

export default Admin;