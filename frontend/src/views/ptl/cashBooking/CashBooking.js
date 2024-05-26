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

const cashBookings = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cashBooking, setcashBookings] = useState([]);
    const pagination_pages = [];
    const items = [];
    let query;
    const { page, limit } = useParams();

    if (page && limit) {
        query = { page: page, limit: limit }
    }
    const getcashBooking = async () => {
        try {
            setIsLoading(true);
            let response;
            if (query) {
                response = await axiosPrivate.get(`/common/cash-booking/paginate/${query.page}/${query.limit}`);
            } else {
                response = await axiosPrivate.get('/common/cash-booking/paginate/1/10');
            }
            const _cashBooking = response.data?.results;
            setcashBookings(_cashBooking)
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
        getcashBooking();
    }, [page, limit])

    const handleDeletecashBooking = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/common/cash-booking/delete/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'cashBooking deleted successfully.'
                    })
                    getcashBooking();
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
        navigate(`/ptl/cash-bookings/1/${e.target.value}`);
    }

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' }
        },
        {
            key: 'docket_no',
            label: 'Docket No',
            _props: { scope: 'col' }
        },
        {
            key: 'booking_date',
            label: 'Booking Date',
            _props: { scope: 'col' }
        },
        {
            key: 'shipper_name',
            label: 'Shipper',
            _props: { scope: 'col' }
        },
        {
            key: 'qty',
            label: 'Qty',
            _props: { scope: 'col' }
        },
        {
            key: 'mode_of_transport',
            label: 'Mode Of Transport',
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
        if (cashBooking && cashBooking.results) {
            map_array = cashBooking.results;
            for (let i = 1; i <= cashBooking.totalPages; i++) { pagination_pages.push(i) }
            console.log(cashBooking.totalPages)
        } else {
            map_array = cashBooking ? cashBooking : [];
        }
        map_array && map_array.map((elem, key) => {
            items.push({
                id: key,
                docket_no: elem.docketNumber,
                booking_date: elem.bookingDate,
                shipper_name: elem.shipperName.substring(0, 5) + '...',
                qty: elem.qty,
                mode_of_transport: elem.modeOfTransport,
                status: elem.status,
                action: <div><CButton className="my-0 py-0" onClick={() => navigate(`/ptl/cash-bookings/update/${elem._id}`)}><CIcon title="Edit" icon={cilPencil}></CIcon></CButton><CButton className="my-0 py-0" onClick={() => handleDeletecashBooking(elem._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
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
                        <div><strong>Manage</strong> <small>Ptl Bookings</small></div>
                        <CButton color="primary" size="sm" onClick={() => navigate('/ptl/cash-bookings/create')}>Add new Cash Booking</CButton>
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
                                        placeholder="Search"
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
                            <CPaginationItem disabled={cashBooking?.totalResults ? !cashBooking?.hasPrevPage : true} onClick={() => navigate(`/ptl/cash-bookings/${cashBooking?.prevPage}/${cashBooking?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/ptl/cash-bookings/${item}/${cashBooking?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={cashBooking?.totalResults ? !cashBooking?.hasNextPage : true} onClick={() => navigate(`/ptl/cash-bookings/${cashBooking?.nextPage}/${cashBooking?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default cashBookings;