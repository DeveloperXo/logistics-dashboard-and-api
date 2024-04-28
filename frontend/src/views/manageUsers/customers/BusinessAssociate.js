import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CRow,
    CTable,
    CAlert,
    CSpinner,
    CPagination,
    CPaginationItem
} from '@coreui/react';
import { cilPencil, cilX } from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import { getBAs } from "../../../actions/manageUsers.action";
import { alertConstants } from "../../../constants/auxiliary.constants";
import { useNavigate, useParams } from "react-router-dom";

const BusinessAssociates = () => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const { users, message, isLoading } = useSelector(state => state.mangeCustomers);
    const [alert, setAlert] = useState();
    const navigate = useNavigate();

    const { page, limit } = useParams();

    useEffect(() => {
        if (page && limit) {
            dispatch(getBAs(axiosPrivate, { page: page, limit: limit }));
        } else {
            dispatch(getBAs(axiosPrivate));
        }
    }, [dispatch, page, limit]);
    
    const items = [];
    useEffect(() => {
        if (message) {
            setAlert({
                type: alertConstants.DANGER,
                message: message
            })
        }
    }, [isLoading, users, message]);

    const handleDeleteUser = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/customer/customer/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'User deleted successfully.'
                    })
                    dispatch(getBAs(axiosPrivate));
                }
            }

        } catch (err) {
            if (err.response?.data?.message) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: err.response.data.message
                })
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Something went wrong.'
                })
            }
        }

    }

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' }
        },
        {
            key: 'name',
            label: 'Name',
            _props: { scope: 'col' }
        },
        {
            key: 'email',
            label: 'Email',
            _props: { scope: 'col' }
        },
        {
            key: 'phone',
            label: 'Phone',
            _props: { scope: 'col' }
        },
        {
            key: 'created_at',
            label: 'Created At',
            _props: { scope: 'col' }
        },
        {
            key: 'status',
            label: 'Status',
            _props: { scope: 'col' }
        },
        {
            key: 'action',
            label: 'Action',
            _props: { scope: 'col' }
        }
    ];

    const pagination_pages = [];
    if (isLoading == false) {
        let map_array = [];
        if (users && users.results) {
            map_array = users.results;
            for (let i = 1; i <= users.totalPages; i++){ pagination_pages.push(i) }
            console.log(users.totalPages)
        } else {
            users ? map_array = users : [];
        }
        map_array.map((user, key) => {
            items.push({
                id: key,
                name: user.customerInformation.name,
                email: user.accountInformation.email,
                phone: user.customerInformation.phone,
                created_at: user.createdAt ? user.createdAt.slice(0, 10) : '',
                status: user.status,
                action: <div><CButton className="my-0 py-0" onClick={() => navigate(`/manage-users/customers/update/${user._id}`)}><CIcon title="Edit" icon={cilPencil}></CIcon></CButton><CButton className="my-0 py-0" onClick={() => handleDeleteUser(user._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
            })
        })
    }
    const handlePaginationChange = (e) => {
        navigate(`/manage-users/customers/1/${e.target.value}`);
    }
    return (
        <CRow>
            <CCol xs={12}>
                {alert &&
                    <CAlert color={alert.type} dismissible={true}>
                        {alert.message}
                    </CAlert>
                }
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <div><strong>Manage</strong> <small>Business Associates</small></div>
                        <CButton color="primary" size="sm" onClick={() => navigate('/manage-users/customers/create')}>Add new customer</CButton>
                    </CCardHeader>
                    <CCardBody>
                        <div className="search-container d-flex justify-content-between">
                            <CRow className="pagination-select">
                                <CForm>
                                    <CFormSelect
                                        id="per_page"
                                        aria-label="Per page"
                                        size="sm"
                                        onChange={handlePaginationChange}
                                        options={[
                                            { label: '10', value: '10' },
                                            { label: '25', value: '25' },
                                            { label: '50', value: '50' },
                                            { label: '100', value: '100' },
                                            { label: '250', value: '250' },
                                            { label: '500', value: '500' }
                                        ]}
                                    />
                                </CForm>
                            </CRow>
                            <CRow className="pagination-select">
                                <CForm>
                                    <CFormInput
                                        type="email"
                                        placeholder="Search customers"
                                    />
                                </CForm>
                            </CRow>
                        </div>
                        <hr />
                        {
                            isLoading == true ?
                                <div className="d-flex justify-content-center">
                                    <CSpinner color="info" />
                                </div> :
                                items && items.length !== 0 ?
                                    <CTable columns={columns} items={items}></CTable> :
                                    <p className="text-center">No items to display...</p>
                        }
                    </CCardBody>
                    <CCardFooter>
                        <CPagination align="end" aria-label="Page navigation example">
                            <CPaginationItem disabled={users?.totalResults ? !users?.hasPrevPage : true} onClick={() => navigate(`/manage-users/customers/${users?.prevPage}/${users?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/manage-users/customers/${item}/${users?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={users?.totalResults ? !users?.hasNextPage : true} onClick={() => navigate(`/manage-users/customers/${users?.nextPage}/${users?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default BusinessAssociates;