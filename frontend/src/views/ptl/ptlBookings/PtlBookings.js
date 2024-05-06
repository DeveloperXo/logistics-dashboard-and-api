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

const PtlBookings = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [ptlBooking, setPtlBookings] = useState([]);
    const pagination_pages = [];
    const items = [];
    let query;
    const { page, limit } = useParams();

    if (page && limit) {
        query = { page: page, limit: limit }
    }
    const getPtlBooking = async () => {
        try {
            setIsLoading(true);
            let response;
            if (query) {
                response = await axiosPrivate.get(`/common/web-price/paginate/${query.page}/${query.limit}`);
            } else {
                response = await axiosPrivate.get('/common/web-price/paginate/1/10');
            }
            const _ptlBooking = response.data?.results;
            setPtlBookings(_ptlBooking)
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
        getPtlBooking();
    }, [page, limit])

    const handleDeletePtlBooking = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/common/web-price/delete/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'PtlBooking deleted successfully.'
                    })
                    getPtlBooking();
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
        navigate(`/crmQuery/1/${e.target.value}`);
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
            key: 'customer_name',
            label: 'Customer Name',
            _props: { scope: 'col' }
        },
        {
            key: 'origin_state',
            label: 'Origin State',
            _props: { scope: 'col' }
        },
        {
            key: 'destination_state',
            label: 'Destination State',
            _props: { scope: 'col' }
        },
        {
            key: 'qty',
            label: 'Qty',
            _props: { scope: 'col' }
        },
        {
            key: 'bmc_charged_weight',
            label: 'BMC Charged Wt',
            _props: { scope: 'col' }
        },
        {
            key: 'threepl_chargable_weight',
            label: '3PL Chargable Wt',
            _props: { scope: 'col' }
        },
        {
            key: 'mode_of_transport',
            label: 'Mode Of Transport',
            _props: { scope: 'col' }
        },
        {
            key: 'mode_of_payment',
            label: 'Mode Of Payment',
            _props: { scope: 'col' }
        },
        {
            key: 'status',
            label: 'Status',
            _props: { scope: 'col' }
        },
        {
            key: 'sent_date',
            label: 'Sent Date',
            _props: { scope: 'col' }
        },
        {
            key: 'last_remarks',
            label: 'Last Remarks',
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
        if (ptlBooking && ptlBooking.results) {
            map_array = ptlBooking.results;
            for (let i = 1; i <= ptlBooking.totalPages; i++) { pagination_pages.push(i) }
            console.log(ptlBooking.totalPages)
        } else {
            map_array = ptlBooking ? ptlBooking : [];
        }
        map_array && map_array.map((elem, key) => {
            items.push({
                id: key,
                docket_no: elem.docketNo,
                booking_date: elem.bookingDate,
                customer_name: elem.customerName,
                origin_state: elem.originState,
                destination_state: elem.destinationState,
                qty: elem.quantity,
                bmc_charged_weight: elem.bmcChargedWeight,
                threepl_chargable_weight: elem.threeplChargableWeight,
                mode_of_transport: elem.modeOfTransport,
                mode_of_payment: elem.modeOfPayment,
                status: elem.status,
                sent_date: elem.sentDate,
                last_remarks: elem.lastRemarks,
                action: <div><CButton className="my-0 py-0" onClick={() => navigate(`/ptl/bookings/update/${elem._id}`)}><CIcon title="Edit" icon={cilPencil}></CIcon></CButton><CButton className="my-0 py-0" onClick={() => handleDeletePtlBooking(elem._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
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
                        <CButton color="primary" size="sm" onClick={() => navigate('/ptl/bookings/create')}>Add new Ptl Booking</CButton>
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
                                    <CTable className='z-table-large' columns={columns} items={items}></CTable> :
                                    <p className="text-center">No items to display...</p>
                        }
                    </CCardBody>
                    <CCardFooter>
                        <CPagination align="end" aria-label="Page navigation example">
                            <CPaginationItem disabled={ptlBooking?.totalResults ? !ptlBooking?.hasPrevPage : true} onClick={() => navigate(`/price/web/${ptlBooking?.prevPage}/${ptlBooking?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/price/web/${item}/${ptlBooking?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={ptlBooking?.totalResults ? !ptlBooking?.hasNextPage : true} onClick={() => navigate(`/price/web/${ptlBooking?.nextPage}/${ptlBooking?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PtlBookings;