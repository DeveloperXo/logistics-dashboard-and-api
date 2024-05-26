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
    CAlert,
} from '@coreui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { alertConstants } from '../../../constants/auxiliary.constants';

const CreateWebPrice = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [alert, setAlert] = useState();
    const [updtWebPrice, setUpdtrice] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const _user = await axiosPrivate.get(`common/web-price/this/${id}`);
            const { results } = _user.data;
            if (results) {
                setUpdtrice(results);
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: "Failed while retriving web price data"
                });
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
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
        } else {
            for (let i = 1; i < 23; i++) {
                if (i <= 8) insert_items({ pre: 'n', index: i });
                else if (i > 8 && i <= 12) insert_items({ pre: 'w', index: i - 8 });
                else if (i > 12 && i <= 18) insert_items({ pre: 's', index: i - 12 });
                else if (i > 18) insert_items({ pre: 'e', index: i - 18 })
            }
        }
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        type: ""
    });
    const [priceChart, setPriceChart] = useState([]);

    const handleFormDataOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: e.target.files ? e.target.files[0] : value
        }));
    }

    const handlePriceChartOnChange = (index, field, value) => {
        setPriceChart(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: field === 'price' ? Number(value) : value
            }
            return updatedDocuments;
        })
    }

    // Just for TESTING...
    const handlePriceChartOnMouse = (index, field, value) => {
        let i = Math.floor(Math.random() * (900-100));
        setPriceChart(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: field === 'price' ? Number(i) : i
            }
            return updatedDocuments;
        })
    }

    const insert_items = (opt) => {
        for (let i = 1; i < 23; i++) {
            if (i <= 8) {
                setPriceChart((prev) => [
                    ...prev,
                    {
                        index: i,
                        from: `[${opt.pre}${opt.index}]`,
                        to: `[n${i}]`,
                        price: ''
                    }

                ])
            } else if (i > 8 && i <= 12) {
                setPriceChart((prev) => [
                    ...prev,
                    {
                        index: i,
                        from: `[${opt.pre}${opt.index}]`,
                        to: `[w${i - 8}]`,
                        price: ''
                    }

                ])
            }
            else if (i > 12 && i <= 18) {
                setPriceChart((prev) => [
                    ...prev,
                    {
                        index: i,
                        from: `[${opt.pre}${opt.index}]`,
                        to: `[s${i - 12}]`,
                        price: ''
                    }

                ])
            }
            else if (i > 18) {
                setPriceChart((prev) => [
                    ...prev,
                    {
                        index: i,
                        from: `[${opt.pre}${opt.index}]`,
                        to: `[e${i - 18}]`,
                        price: ''
                    }

                ])
            }
        }
    }

    useEffect(() => {
        if (updtWebPrice) {
            setFormData({
                name: updtWebPrice.name
            });
            setPriceChart(() => {
                const updatedDocuments = [];
                updtWebPrice.priceChart.forEach((element, index) => {
                    updatedDocuments[index] = {
                        index: element.index,
                        from: element.from,
                        to: element.to,
                        price: element.price
                    }
                });
                return updatedDocuments;
            });
        }
    }, [updtWebPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            priceChart: priceChart
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
            setIsLoading(true);
            if (!id) {
                const response = await axiosPrivate.post('/common/web-price', JSON.stringify(payload));
                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'WebPrice created successfully...'
                    });
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Something unexpected happend. Cannot create web price."
                    })
                }
            } else {
                const response = await axiosPrivate.put(`/common/web-price/update/${id}`, JSON.stringify(payload));
                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'WebPrice updated successfully...'
                    });
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Something unexpected happend. Cannot update web price."
                    })
                }
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
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
                                        placeholder="Price Name"
                                        label="Price Name"
                                        name="name"
                                        id="name"
                                        onChange={handleFormDataOnChange}
                                        value={formData.name}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormSelect
                                        aria-label="Per page"
                                        label="Type"
                                        name="type"
                                        id="type"
                                        onChange={handleFormDataOnChange}
                                        options={[
                                            'Select type',
                                            { label: 'PTL', value: 'ptl' },
                                            { label: 'FTL', value: 'ftl' },
                                        ]}
                                        required
                                    />
                                </div>
                            </div>

                            <hr />

                            <div  className="z-square-form-grid">
                            {priceChart.map((webPrice, index) => (
                                <div className="flex-fill" key={index}>
                                    <CFormInput
                                        className='grid-form-input'
                                        placeholder={`${webPrice.from}${webPrice.to}`}
                                        name={`price`}
                                        id={`price${webPrice.from}${webPrice.to}`}
                                        onChange={(e) => handlePriceChartOnChange(index, `price`, e.target.value)}
                                        onMouseOut={(e) => handlePriceChartOnMouse(index, `price`, e.target.value)}
                                        value={webPrice.price}
                                        type='number'
                                    />
                                </div>
                            ))}
                            </div>
                        </CCardBody>
                        <CCardFooter>
                            <div className="d-flex justify-content-between">
                                <CButton color="light" onClick={() => navigate('/price/web')}>Cancel</CButton>
                                <CButton type="submit" disabled={isLoading} color="primary">{isLoading ? 'Processing...' : !id ? 'Create' : 'Update'}</CButton>
                            </div>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default CreateWebPrice;