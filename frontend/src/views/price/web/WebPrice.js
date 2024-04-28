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

const WebPrice = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [webPrice, setWebPrices] = useState([]);
    const pagination_pages = [];
    const items = [];
    let query;
    const { page, limit } = useParams();

    if (page && limit) {
        query = { page: page, limit: limit }
    }
    const getWebPrice = async () => {
        try {
            setIsLoading(true);
            let response;
            if (query) {
                response = await axiosPrivate.get(`/common/web-price/paginate/${query.page}/${query.limit}`);
            } else {
                response = await axiosPrivate.get('/common/web-price/paginate/1/10');
            }
            const _webPrice = response.data?.results;
            setWebPrices(_webPrice)
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
        getWebPrice();
    }, [page, limit])

    const handleDeleteWebPrice = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/common/web-price/delete/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'WebPrice deleted successfully.'
                    })
                    getWebPrice();
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
        navigate(`/crmQuery/1/${e.target.value}`);
    }

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' }
        },
        {
            key: 'type',
            label: 'Type',
            _props: { scope: 'col' }
        },
        {
            key: 'name',
            label: 'Name',
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
    if (isLoading == false) {
        let map_array = [];
        if (webPrice && webPrice.results) {
            map_array = webPrice.results;
            for (let i = 1; i <= webPrice.totalPages; i++) { pagination_pages.push(i) }
            console.log(webPrice.totalPages)
        } else {
            map_array = webPrice ? webPrice : [];
        }
        map_array && map_array.map((webPrice, key) => {
            items.push({
                id: key,
                type: webPrice.type ? webPrice.type : '',
                name: webPrice.name,
                created_at: webPrice.createdAt ? webPrice.createdAt.slice(0, 10) : '',
                status: webPrice.status,
                action: <div><CButton className="my-0 py-0" onClick={() => navigate(`/price/web/update/${webPrice._id}`)}><CIcon title="Delete" icon={cilPencil}></CIcon></CButton><CButton className="my-0 py-0" onClick={() => handleDeleteWebPrice(webPrice._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
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
                        <div><strong>Manage</strong> <small>WebPrices</small></div>
                        <CButton color="primary" size="sm" onClick={() => navigate('/price/web/create')}>Add new Web Price</CButton>
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
                            <CPaginationItem disabled={webPrice?.totalResults ? !webPrice?.hasPrevPage : true} onClick={() => navigate(`/price/web/${webPrice?.prevPage}/${webPrice?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/price/web/${item}/${webPrice?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={webPrice?.totalResults ? !webPrice?.hasNextPage : true} onClick={() => navigate(`/price/web/${webPrice?.nextPage}/${webPrice?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default WebPrice;