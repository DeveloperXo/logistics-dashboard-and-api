import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CForm,
    CFormInput,
    CRow,
    CAlert,
    CSpinner,
    CFormSelect,
    CPagination,
    CPaginationItem,
    CTable
} from '@coreui/react';
import { cilPencil, cilX } from "@coreui/icons";
import CIcon from '@coreui/icons-react';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { alertConstants } from '../../../constants/auxiliary.constants';

const CrmQueries = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [crmQueries, setCrmQueriess] = useState([]);
    const pagination_pages = [];
    const items = [];
    let query;
    const { page, limit } = useParams();

    if (page && limit) {
        query = { page: page, limit: limit }
    }
    const getCrmQueries = async () => {
        try {
            setIsLoading(true);
            let response;
            if (query) {
                response = await axiosPrivate.get(`/common/crm-query/paginate/${query.page}/${query.limit}`);
            } else {
                response = await axiosPrivate.get('/common/crm-query/paginate/1/10');
            }
            const _crmQueries = response.data?.results;
            setCrmQueriess(_crmQueries)
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err)
            if (err.response?.data?.message) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: err.response.data.message
                })
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Something went wrong'
                })
            }
        }
    }

    useEffect(() => {
        getCrmQueries();
    }, [page, limit])

    const handleDeleteCrmQueries = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/common/crm-query/delete/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'CrmQueries deleted successfully.'
                    })
                    getCrmQueries();
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

    const handlePaginationChange = (e) => {
        console.log(page, limit)
        navigate(`/crm/queries/1/${e.target.value}`);
    }

    const columns = [
        {
            key: 'id',
            label: '#',
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
            key: 'message',
            label: 'Message',
            _props: { scope: 'col' }
        },
        {
            key: 'created_at',
            label: 'Created At',
            _props: { scope: 'col' }
        },
        {
            key: 'action',
            label: 'Action',
            _props: { scope: 'col' }
        }
    ];
    if (isLoading == false) {
        let map_array = [];
        if (crmQueries && crmQueries.results) {
            map_array = crmQueries.results;
            for (let i = 1; i <= crmQueries.totalPages; i++) { pagination_pages.push(i) }
            console.log(crmQueries.totalPages)
        } else {
            map_array = crmQueries ? crmQueries : [];
        }
        map_array && map_array.map((crmQuery, key) => {
            items.push({
                id: key,
                email: crmQuery.email,
                phone: crmQuery.phone,
                message: crmQuery.message,
                created_at: crmQuery.createdAt ? crmQuery.createdAt.slice(0, 10) : '',
                action: <div><CButton className="my-0 py-0" onClick={() => handleDeleteCrmQueries(crmQuery._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
            })
        })
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
                        <div><strong>Manage</strong> <small>Crm Queries</small></div>
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
                            <CPaginationItem disabled={crmQueries?.totalResults ? !crmQueries?.hasPrevPage : true} onClick={() => navigate(`/crm/queries/${crmQueries?.prevPage}/${crmQueries?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/crm/queries/${item}/${crmQueries?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={crmQueries?.totalResults ? !crmQueries?.hasNextPage : true} onClick={() => navigate(`/crm/queries/${crmQueries?.nextPage}/${crmQueries?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CrmQueries;