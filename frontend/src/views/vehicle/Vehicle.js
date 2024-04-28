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
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { alertConstants } from '../../constants/auxiliary.constants';

const Vehicle = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const pagination_pages = [];
    const items = [];
    let query;
    const { page, limit } = useParams();

    if (page && limit) {
        query = { page: page, limit: limit }
    }
    const getVehicles = async () => {
        try {
            setIsLoading(true);
            let response;
            if (query) {
                response = await axiosPrivate.get(`/common/vehicle/paginate/${query.page}/${query.limit}`);
            } else {
                response = await axiosPrivate.get('/common/vehicle/');
            }
            const _vehicles = response.data?.results;
            setVehicles(_vehicles)
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
        getVehicles();
    }, [page, limit])

    const handleDeleteVehicle = async (id) => {
        try {
            if (confirm('Are you sure, you want to perform this action?')) {
                const response = await axiosPrivate.delete(`/common/vehicle/delete/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data?.status === "Success") {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'Vehicle deleted successfully.'
                    })
                    getVehicles();
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
        navigate(`/vehicle/1/${e.target.value}`);
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
            key: 'description',
            label: 'Description',
            _props: { scope: 'col' }
        },
        {
            key: 'baseCharge',
            label: 'Base Charge',
            _props: { scope: 'col' }
        },
        {
            key: 'image',
            label: 'Image',
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
        if (vehicles && vehicles.results) {
            map_array = vehicles.results;
            for (let i = 1; i <= vehicles.totalPages; i++) { pagination_pages.push(i) }
            console.log(vehicles.totalPages)
        } else {
            map_array = vehicles ? vehicles : [];
        }
        map_array && map_array.map((vehicle, key) => {
            items.push({
                id: key,
                name: vehicle.vehicleName,
                description: vehicle.description,
                baseCharge: vehicle.baseCharge,
                image: <img crossOrigin="anonymous" width={40} height={40} src={`${process.env.REACT_APP_API_PUBLIC}assets/vehicles/${vehicle.image}`} alt={vehicle.vehicleName}/>,
                created_at: vehicle.createdAt ? vehicle.createdAt.slice(0, 10) : '',
                action: <div><CButton className="my-0 py-0" onClick={() => navigate(`/vehicle/update/${vehicle._id}`)}><CIcon title="Edit" icon={cilPencil}></CIcon></CButton><CButton className="my-0 py-0" onClick={() => handleDeleteVehicle(vehicle._id)}><CIcon title="Delete" icon={cilX}></CIcon></CButton></div>
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
                        <div><strong>Manage</strong> <small>Vehicles</small></div>
                        <CButton color="primary" size="sm" onClick={() => navigate('/vehicle/create')}>Add new vehicle</CButton>
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
                            <CPaginationItem disabled={vehicles?.totalResults ? !vehicles?.hasPrevPage : true} onClick={() => navigate(`/vehicle/${vehicles?.prevPage}/${vehicles?.limit}`)}>Previous</CPaginationItem>
                            {pagination_pages && pagination_pages.map((item) => (
                                <CPaginationItem onClick={() => navigate(`/vehicle/${item}/${vehicles?.limit}`)}>{item}</CPaginationItem>
                            ))}
                            <CPaginationItem disabled={vehicles?.totalResults ? !vehicles?.hasNextPage : true} onClick={() => navigate(`/vehicle/${vehicles?.nextPage}/${vehicles?.limit}`)}>Next</CPaginationItem>
                        </CPagination>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Vehicle;