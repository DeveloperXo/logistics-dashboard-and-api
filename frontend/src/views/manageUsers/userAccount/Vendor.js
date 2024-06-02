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
import CIcon from '@coreui/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { alertConstants, EnumStatusOfCustomer } from '../../../constants/auxiliary.constants';

const Vendor = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState();
    let query;
    const { page, limit } = useParams();

    const items = [];
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
    if (page && limit) {
        query = { page: page, limit: limit };
    }

    const getUsers = async () => {
        try {
            setIsLoading(true);
            let response;
            if (query) {
                response = await axiosPrivate.get(`/userAccount/userAccount/filter/vendor/${query?.page}/${query?.limit}`);
            } else {
                response = await axiosPrivate.get(`/userAccount/userAccount/filter/vendor/`);
            }
            setIsLoading(false);
            const _users = response.data?.results;
            setUsers(_users);
        } catch (err) {
            setIsLoading(false);
            console.log(err)
            if (err.response?.data?.message) {
                setAlert({ type: alertConstants.DANGER, message: err.response.data.message });
            }
            else {
                setAlert({ type: alertConstants.DANGER, message: 'Something went wrong.' });
            }
        }
    }
    useEffect(() => {
        getUsers();
    }, [page, limit]);

    const handleDeleteUser = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/userAccount/userAccount/delete/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'User deleted successfully.'
                    })
                    getUsers();
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: 'Action failed...'
                    })
                }
            }

        } catch (err) {
            console.log(err)
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

    const submitUpdateStatusForm = async (id, value) => {
        try {
            await axiosPrivate.put(`/userAccount/userAccount/this/update-status/${id}`, { status: value });
            setAlert({
                type: alertConstants.SUCCESS,
                message: `Status set to ${value.toUpperCase()}.`
            })
            getUsers();
        } catch (err) {
            setAlert({
                type: alertConstants.DANGER,
                message: 'Failed while updating status.'
            });
        }
    }

    if (isLoading == false) {
        let map_array = [];
        if (users && users.results) {
            map_array = users.results;
            for (let i = 1; i <= users.totalPages; i++) { pagination_pages.push(i) }
            console.log(users.totalPages)
        } else {
            map_array = users ? users : [];
        }
        map_array && map_array.map((user, key) => {
            items.push({
                id: key,
                name: user.name,
                email: user.email,
                created_at: user.createdAt ? user.createdAt.slice(0, 10) : '',
                status: <div>
                    <CForm>
                        <CFormSelect
                            options={Object.keys(EnumStatusOfCustomer).map(e => {
                                return {
                                    label: e,
                                    value: EnumStatusOfCustomer[e]
                                }
                            })}
                            value={user.status}
                            size="sm"
                            onChange={(e) => submitUpdateStatusForm(user._id, e.target.value)}
                        ></CFormSelect>
                    </CForm>
                </div>,
                action: <div><CButton className="my-0 py-0" onClick={() => navigate(`/manage-users/user-accounts/update/${user._id}`)}><CIcon title="Edit" icon={cilPencil}></CIcon></CButton><CButton className="my-0 py-0" onClick={() => handleDeleteUser(user._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
            })
        })
    }


    const handlePaginationChange = (e) => {
        navigate(`/manage-users/user-accounts/1/${e.target.value}`);
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
                        <div><strong>Manage</strong> <small>Customers</small></div>
                        <CButton color="primary" size="sm" onClick={() => navigate('/manage-users/user-accounts/create')}>Add new user account</CButton>
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
                                        placeholder="Search User Accounts"
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
                            <CPaginationItem disabled={users?.totalResults ? !users?.hasPrevPage : true} onClick={() => navigate(`/manage-users/user-accounts/${users?.prevPage}/${users?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/manage-users/user-accounts/${item}/${users?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={users?.totalResults ? !users?.hasNextPage : true} onClick={() => navigate(`/manage-users/user-accounts/${users?.nextPage}/${users?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default Vendor;