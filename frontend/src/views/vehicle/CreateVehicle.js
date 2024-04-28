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
} from '@coreui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { alertConstants } from '../../constants/auxiliary.constants';

const CreateVehicle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [alert, setAlert] = useState();
    const [updtVehicle, setUpdtUser] = useState();

    const fetch = async () => {
        try {
            if (id) {
                const _user = await axiosPrivate.get(`common/vehicle/this/${id}`);
                const { results } = _user.data;
                if (results) {
                    setUpdtUser(results);
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Failed while retriving vehicle data"
                    });
                }
            }
        } catch (err) {
            if (err?.response?.data?.message) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: err.response.data.message
                })
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Something unexpected happend. Cannot complete the request...'
                })
            }
        }
    }
    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [])

    const [formData, setFormData] = useState({
        vehicleName: "",
        width: "",
        height: "",
        weight: "",
        description: "",
        baseCharge: "",
        additionalServiceCharge: "",
        image: ""
    });
    const [baseFareByKm, setBaseFareByKm] = useState([
        {
            from: "",
            to: "",
            price: ""
        },
    ]);

    const handleFormDataOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: e.target.files ? e.target.files[0] : value
        }));
        console.log(e.target);
    }
    
    console.log('formdata', formData)
    const handleBaseFareByKmOnChange = (index, field, value) => {
        setBaseFareByKm(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]:  value
            }
            return updatedDocuments;
        })
    }
    const addBaseFareByKm = () => {
        setBaseFareByKm((prev) => [
            ...prev,
            {
                from: "",
                to: "",
                price: "",
            }
        ])
    }

    useEffect(() => {
        if (updtVehicle) {
            setFormData({
                vehicleName: updtVehicle.vehicleName,
                width: updtVehicle.width,
                height: updtVehicle.height,
                weight: updtVehicle.weight,
                description: updtVehicle.description,
                baseCharge: updtVehicle.baseCharge,
                additionalServiceCharge: updtVehicle.additionalServiceCharge,
                image: updtVehicle.image,
            });
            setBaseFareByKm(() => {
                const updatedDocuments = [];
                updtVehicle.baseFareByKm.forEach((element, index) => {
                    updatedDocuments[index] = {
                        from: element.from,
                        to: element.to,
                        price: element.price
                    }
                });
                return updatedDocuments;
            });
        }
    }, [updtVehicle]);

    const uploadFile = async (_id) => {
        const _formData = new FormData();
        _formData.append('image', formData.image);
        _formData.append('id', _id);
        try {
            const response = await axiosPrivate.put('/common/vehicle/upload', _formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data?.results) {
                setAlert({
                    type: alertConstants.SUCCESS,
                    message: 'Files uploaded successfully...'
                });
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: "Something unexpected happend. Cannot upload files."
                })
            }

        } catch (err) {
            if (!err.response) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Server Error.'
                })
            } else if (err?.response?.data?.message) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: err.response.data.message
                })
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Something unexpected happend. Cannot complete the request...'
                })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            baseFareByKm: baseFareByKm
        }
        for (const key in payload) {
            if (payload[key] === "" || payload[key] === null) {
                setAlert({
                    type: alertConstants.WARNING,
                    message: `${key} is required`
                });
                return;
            }
        }

        try {
            if (!id) {
                const response = await axiosPrivate.post('/common/vehicle', JSON.stringify(payload));
                if (response.data?.results) {
                    uploadFile(response.data.results._id)
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'Vehicle created successfully...'
                    });
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Something unexpected happend. Cannot create user account."
                    })
                }
            } else {
                const response = await axiosPrivate.put(`/common/vehicle/update/${id}`, JSON.stringify(payload));
                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'Vehicle updated successfully...'
                    });
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Something unexpected happend. Cannot update user account."
                    })
                }
            }
        } catch (err) {
            if (!err.response) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Server Error.'
                })
            } else if (err?.response?.data?.message) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: err.response.data.message
                })
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: 'Something unexpected happend. Cannot complete the request...'
                })
            }
        }
    }
    return (
        <CForm onSubmit={handleSubmit}>
            <CRow>
                <CCol xs={12}>
                    {alert &&
                        <CAlert className="z-alert-fixed rounded-0" color={alert.type} dismissible={true}>
                            {alert.message}
                        </CAlert>
                    }
                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>User Details</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Vehicle Name"
                                        label="Vehicle Name"
                                        name="vehicleName"
                                        id="vehicleName"
                                        onChange={handleFormDataOnChange}
                                        value={formData.vehicleName}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Base Charge"
                                        label="Base Charge"
                                        name="baseCharge"
                                        id="baseCharge"
                                        onChange={handleFormDataOnChange}
                                        value={formData.baseCharge}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Additional Service Charge"
                                        label="Additional Service Charge"
                                        name="additionalServiceCharge"
                                        id="additionalServiceCharge"
                                        onChange={handleFormDataOnChange}
                                        value={formData.additionalServiceCharge}
                                        required
                                    />
                                </div>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Width"
                                        label="Width"
                                        name="width"
                                        id="width"
                                        onChange={handleFormDataOnChange}
                                        value={formData.width}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Height"
                                        label="Height"
                                        name="height"
                                        id="height"
                                        onChange={handleFormDataOnChange}
                                        value={formData.height}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Weight"
                                        label="Weight"
                                        name="weight"
                                        id="weight"
                                        onChange={handleFormDataOnChange}
                                        value={formData.weight}
                                        required
                                    />
                                </div>
                            </div>

                            <hr />

                            <p className="mb-1"><b>Base Fare By Kilometers</b></p>
                            {baseFareByKm.map((vehicle, index) => (
                                <div key={index} className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="From"
                                            label="From"
                                            name="from"
                                            id={`from-${index}`}
                                            onChange={(e) => handleBaseFareByKmOnChange(index, 'from', e.target.value)}
                                            value={vehicle.from}
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="To"
                                            label="To"
                                            name="to"
                                            id={`to-${index}`}
                                            onChange={(e) => handleBaseFareByKmOnChange(index, 'to', e.target.value)}
                                            value={vehicle.to}
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <CFormInput
                                            placeholder="Price"
                                            label="Price"
                                            name="price"
                                            id={`price-${index}`}
                                            onChange={(e) => handleBaseFareByKmOnChange(index, 'price', e.target.value)}
                                            value={vehicle.price}
                                            required
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="mb-4">
                                <CButton size="sm" color="primary" onClick={addBaseFareByKm}>+ Add More</CButton>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Description"
                                        label="Description"
                                        name="description"
                                        id="description"
                                        onChange={handleFormDataOnChange}
                                        value={formData.description}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    { 
                                    formData.image && updtVehicle ? <img style={{objectFit: "cover"}} width={200} height={200} crossOrigin="anonymous" src={`${process.env.REACT_APP_API_PUBLIC}assets/vehicles/${formData.image}`} alt={formData.vehicleName} />
                                        :
                                        <CFormInput
                                        placeholder="Image"
                                        label="Image"
                                        name="image"
                                        id="image"
                                        onChange={handleFormDataOnChange}
                                        type="file"
                                        />
                                    }
                                </div>
                            </div>

                        </CCardBody>
                        <CCardFooter>
                            <div className="d-flex justify-content-between">
                                <CButton color="light" onClick={() => navigate('/manage-users/user-accounts')}>Cancel</CButton>
                                <CButton type="submit" color="primary">{!id ? 'Create' : 'Update'}</CButton>
                            </div>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default CreateVehicle;