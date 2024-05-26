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
    CFormCheck,
} from '@coreui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { alertConstants } from '../../../constants/auxiliary.constants';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';

const CreateCashBooking = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [alert, setAlert] = useState();
    const [updtPtlBooking, setUpdtPrlBooking] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [invoiceAmount, setInvoiceAmout] = useState(0);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const _user = await axiosPrivate.get(`common/cash-booking/this/${id}`);
            const { results } = _user.data;
            if (results) {
                setUpdtPrlBooking(results);
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: "Failed while retriving data"
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
        }
    }, [])

    const [formData, setFormData] = useState({
        shipperName: "",
        shipperAddress: "",
        shipperCity: "",
        shipperState: "",
        shipperZip: "",
        isShipperRisk: false,
        isCareerRisk: false,
        docketNumber: "",
        threePlDocketNumber: "",
        threePlPartner: "",
        modeOfTransport: "",
        bookingDate: new Date(Date.now()).toISOString().split('T')[0],
        productDescription: "",
        actualWeight: "",
        shipmentHasFragileContent: false,
        clientReferenceId: "",
        qty: "",
        dimensionUnit: "centimeter",
        cftType: "cftSurface",
        cftTotalWeight: 0,
        baseCharges: "",
        processingCharges: "",
        fuelCharges: "",
        fovcharges: "",
        ferightAmount: "",
        shipperGstIn: "",
        consigneeGstIn: "",
        receiverName: "",
        receiverPhoneNumber: "",
        receiverAddress: "",
        receiverLocationType: "national",
        receiverPostalCode: "",
        receiverArea: "",
        receiverDistrict: "",
        receiverState: "",
    });
    const handleFormDataOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type == 'checkbox' ?
                (checked ? true : false)
                : type == 'number' ? Number(value)
                    : value
        }));
    }
    const [dimensions, setDimensions] = useState([
        {
            qty: "",
            length: "",
            height: "",
            width: "",
            cftWeight: ""
        }
    ]);

    const handleDimensionOnChange = (index, field, value) => {
        setDimensions(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: value
            }
            return updatedDocuments;
        })
    }

    const addDimension = () => {
        setDimensions((prev) => [
            ...prev,
            {
                qty: "",
                length: "",
                height: "",
                width: "",
                cftWeight: ""
            }
        ]);
    };

    const removeDimension = (indexToRemove) => {
        setDimensions(prevDimensions => {
            return prevDimensions.filter((_, index) => index !== indexToRemove);
        });
    };

    const [shipperInvoices, setShipperInvoices] = useState([
        {
            eWayBillNo: "",
            invoiceNo: "",
            invoiceAmount: "",
            invoiceDate: formData.bookingDate || new Date(Date.now()).toISOString().split('T')[0],
            file: "",
            fileName: ""
        }
    ]);
    const handleShipperInvoiceOnChange = (index, field, value, e) => {
        setShipperInvoices(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: e.target.files ? e.target.files[0] : e.target.type === 'number' ? Number(value) : value
            }
            e.target.files ? updatedDocuments[index].fileName = e.target.files[0].name : '';
            return updatedDocuments;
        })
    }

    useEffect(() => {
        let i = 0;
        shipperInvoices.forEach(el => {
            i += el.invoiceAmount;
        })
        setInvoiceAmout(i);
    }, [shipperInvoices])


    const addShipperInvoice = () => {
        setShipperInvoices((prev) => [
            ...prev,
            {
                eWayBillNo: "",
                invoiceNo: "",
                invoiceAmount: "",
                invoiceDate: "",
                file: "",
                fileName: ""
            }
        ]);
    };

    const removeShipperInvoice = (indexToRemove) => {
        setShipperInvoices(preSshipperInvoices => {
            return preSshipperInvoices.filter((_, index) => index !== indexToRemove);
        });
    };

    const [otherCharges, setOtherCharges] = useState([
        {
            fee: "",
            amount: ""
        }
    ])
    const handleOtherChargesOnChange = (index, field, value) => {
        setOtherCharges(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: value
            }
            return updatedDocuments;
        })
    }

    const addOtherCharge = () => {
        setOtherCharges((prev) => [
            ...prev,
            {
                fee: "",
                mount: ""
            }
        ]);
    };
    const removeOtherCharge = (indexToRemove) => {
        setOtherCharges(prev => {
            return prev.filter((_, index) => index !== indexToRemove);
        });
    };

    useEffect(() => {
        if (updtPtlBooking) {
            setShipperInvoices(() => {
                const updatedDocuments = [];
                updtPtlBooking.shipperInvoices.forEach((element, index) => {
                    updatedDocuments[index] = {
                        eWayBillNo: element.eWayBillNo,
                        invoiceNo: element.invoiceNo,
                        invoiceAmount: element.invoiceAmount,
                        invoiceDate: element.invoiceDate,
                        file: element.file,
                    }
                });
                return updatedDocuments;
            })
            setDimensions(() => {
                const updatedDocuments = [];
                updtPtlBooking.dimensions.forEach((element, index) => {
                    updatedDocuments[index] = {
                        qty: element.qty,
                        length: element.length,
                        height: element.height,
                        width: element.width,
                        cftWeight: element.cftWeight
                    }
                });
                return updatedDocuments;
            });
            setFormData(() => {
                const newFormData = {
                    ...updtPtlBooking,
                    shipperInvoices: undefined,
                    dimensions: undefined
                };
                const { shipperInvoices, dimensions, ...filteredFormData } = newFormData;
                return filteredFormData;
            });
        }
    }, [updtPtlBooking]);

    const uploadFile = async (_id) => {
        const formData = new FormData();
        let documents = [];
        shipperInvoices.forEach(elem => {
            formData.append(`files`, elem.file);
            if (typeof (elem.file) === 'object') {
                documents.push({
                    eWayBillNo: elem.eWayBillNo,
                    invoiceNo: elem.invoiceNo,
                    invoiceDate: elem.invoiceDate,
                    invoiceAmount: elem.invoiceAmount,
                    file: elem.fileName
                })
            }
        })
        formData.append('documents', JSON.stringify(documents));
        formData.append('id', _id);
        try {
            const response = await axiosPrivate.put('/common/cash-booking/upload-attachment', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data?.results && !id) {
                setAlert({
                    type: alertConstants.SUCCESS,
                    message: 'Files uploaded successfully.'
                });
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
            dimensions: dimensions
        }
        try {
            setIsLoading(true);
            if (!id) {
                const response = await axiosPrivate.post('/common/cash-booking', JSON.stringify(payload));
                uploadFile(response.data.results._id)
                setAlert({
                    type: alertConstants.SUCCESS,
                    message: 'PtlBooking created successfully...'
                });
            } else {
                await axiosPrivate.put(`/common/cash-booking/update/${id}`, JSON.stringify(payload));
                if (shipperInvoices.length > 0) { uploadFile(id); }
                setAlert({
                    type: alertConstants.SUCCESS,
                    message: 'PtlBooking updated successfully...'
                });

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
                            <div><small>Add Information</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-muted"><b><i>Docket Information:</i></b></p>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Docket Number"
                                        label="Docket Number"
                                        name="docketNumber"
                                        id="docketNumber"
                                        onChange={handleFormDataOnChange}
                                        value={formData.docketNumber}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="3PL Docket Number"
                                        label="3PL Docket Number"
                                        name="threePlDocketNumber"
                                        id="threePlDocketNumber"
                                        onChange={handleFormDataOnChange}
                                        value={formData.threePlDocketNumber}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="3PL Partner"
                                        label="3PL Partner"
                                        name="threePlPartner"
                                        id="threePlPartner"
                                        onChange={handleFormDataOnChange}
                                        value={formData.threePlPartner}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormSelect
                                        placeholder="Mode Of Transport"
                                        label="Mode Of Transport"
                                        name="modeOfTransport"
                                        id="modeOfTransport"
                                        onChange={handleFormDataOnChange}
                                        value={formData.modeOfTransport}
                                        options={[
                                            'Select Mode of Transport',
                                            { label: 'Surface', value: 'surface' },
                                            { label: 'Train', value: 'train' },
                                            { label: 'Air', value: 'air' },
                                            { label: 'Sea', value: 'sea' },
                                        ]}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Booking Date"
                                        label="Booking Date"
                                        name="bookingDate"
                                        id="bookingDate"
                                        onChange={handleFormDataOnChange}
                                        value={formData.bookingDate}
                                        type='date'
                                        required
                                    />
                                </div>
                            </div>

                            <hr />

                            <p className="text-muted"><b><i>Client Information:</i></b></p>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Shipper Name"
                                        label="Shipper Name"
                                        name="shipperName"
                                        id="shipperName"
                                        onChange={handleFormDataOnChange}
                                        value={formData.shipperName}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Shipper Address"
                                        label="Shipper Address"
                                        name="shipperAddress"
                                        id="shipperAddress"
                                        onChange={handleFormDataOnChange}
                                        value={formData.shipperAddress}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Shipper City"
                                        label="Shipper City"
                                        name="shipperCity"
                                        id="shipperCity"
                                        onChange={handleFormDataOnChange}
                                        value={formData.shipperCity}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Shipper State"
                                        label="Shipper State"
                                        name="shipperState"
                                        id="shipperState"
                                        onChange={handleFormDataOnChange}
                                        value={formData.shipperState}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Shipper Zip"
                                        label="Shipper Zip"
                                        name="shipperZip"
                                        id="shipperZip"
                                        onChange={handleFormDataOnChange}
                                        value={formData.shipperZip}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormCheck
                                        label="Shipper Risk"
                                        name="isShipperRisk"
                                        id="isShipperRisk"
                                        onChange={handleFormDataOnChange}
                                        checked={formData.isShipperRisk}
                                        value={formData.isShipperRisk ? "on" : "off"}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormCheck
                                        label="Career Risk"
                                        name="isCareerRisk"
                                        id="isCareerRisk"
                                        onChange={handleFormDataOnChange}
                                        checked={formData.isCareerRisk}
                                    />
                                </div>
                            </div>

                            <hr />

                            <p className="text-muted"><b><i>Shipment Details :</i></b></p>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Product Description"
                                        label="Product Description"
                                        name="productDescription"
                                        id="productDescription"
                                        onChange={handleFormDataOnChange}
                                        value={formData.productDescription}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Actual Weight"
                                        label="Actual Weight"
                                        name="actualWeight"
                                        id="actualWeight"
                                        onChange={handleFormDataOnChange}
                                        value={formData.actualWeight}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormCheck
                                        label="Shipment has fragile content"
                                        name="shipmentHasFragileContent"
                                        id="shipmentHasFragileContent"
                                        onChange={handleFormDataOnChange}
                                        checked={formData.shipmentHasFragileContent}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Client Reference Id"
                                        label="Client Reference Id"
                                        name="clientReferenceId"
                                        id="clientReferenceId"
                                        onChange={handleFormDataOnChange}
                                        value={formData.clientReferenceId}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Quantity"
                                        label="Quantity"
                                        name="qty"
                                        id="qty"
                                        onChange={handleFormDataOnChange}
                                        value={formData.qty}
                                        type="number"
                                    />
                                </div>
                            </div>

                            <hr />

                            <p className="text-muted"><b><i>Dimensions :</i></b></p>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div>
                                    <CFormSelect
                                        placeholder="Dimension Unit"
                                        label="Dimension Unit"
                                        name="dimensionUnit"
                                        id="dimensionUnit"
                                        onChange={handleFormDataOnChange}
                                        value={formData.dimensionUnit}
                                        options={[
                                            { label: 'Centimeter', value: 'centimeter' },
                                            { label: 'Inch', value: 'inch' }
                                        ]}
                                    />
                                </div>
                                <div className="mt-4">
                                    <CFormCheck
                                        label="CFT Surface"
                                        name="cftType"
                                        id="cftType"
                                        onChange={handleFormDataOnChange}
                                        type="radio"
                                        value='cftSurface'
                                        checked={formData.cftType == 'cftSurface'}
                                    />
                                </div>
                                <div className="mt-4">
                                    <CFormCheck
                                        label="CFT Air"
                                        name="cftType"
                                        id="cftType"
                                        onChange={handleFormDataOnChange}
                                        type="radio"
                                        value='cftAir'
                                        checked={formData.cftType == 'cftAir'}
                                    />
                                </div>
                            </div>

                            {dimensions.map((elem, index) => (
                                <div key={index} className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div>
                                        <CFormInput
                                            placeholder="Qty"
                                            label="Qty"
                                            name="qty"
                                            id={`prod-qty-${index}`}
                                            onChange={(e) => handleDimensionOnChange(index, 'qty', e.target.value)}
                                            value={elem.qty}
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="Length"
                                            label="Length"
                                            name="length"
                                            id={`prod-length-${index}`}
                                            onChange={(e) => handleDimensionOnChange(index, 'length', e.target.value)}
                                            value={elem.length}
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="Height"
                                            label="Height"
                                            name="height"
                                            id={`prod-height-${index}`}
                                            onChange={(e) => handleDimensionOnChange(index, 'height', e.target.value)}
                                            value={elem.height}
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="Width"
                                            label="Width"
                                            name="width"
                                            id={`prod-width-${index}`}
                                            onChange={(e) => handleDimensionOnChange(index, 'width', e.target.value)}
                                            value={elem.width}
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="CFT Weight"
                                            label="CFT Weight"
                                            name="cftWeight"
                                            id={`prod-cftWeight-${index}`}
                                            onChange={(e) => handleDimensionOnChange(index, 'cftWeight', e.target.value)}
                                            value={elem.cftWeight}
                                        />
                                    </div>
                                    {<CButton size="sm" disabled={index === 0} onClick={() => removeDimension(index)} className="mt-4" color="warning"><CIcon icon={cilX} /></CButton>}
                                </div>
                            ))}
                            <div className="d-md-flex justify-content-md-end">
                                <CButton size="sm" color="primary" onClick={addDimension}>+ Add</CButton>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Feright Amount"
                                        label="Feright Amount"
                                        name="ferightAmount"
                                        id="ferightAmount"
                                        onChange={handleFormDataOnChange}
                                        value={formData.ferightAmount}
                                        type="number"
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Base Charges"
                                        label="Base Charges"
                                        name="baseCharges"
                                        id="baseCharges"
                                        onChange={handleFormDataOnChange}
                                        value={formData.baseCharges}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Processing Charges"
                                        label="Processing Charges"
                                        name="processingCharges"
                                        id="processingCharges"
                                        onChange={handleFormDataOnChange}
                                        value={formData.processingCharges}
                                        type="number"
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Fuel Charges"
                                        label="Fuel Charges"
                                        name="fuelCharges"
                                        id="fuelCharges"
                                        onChange={handleFormDataOnChange}
                                        value={formData.fuelCharges}
                                        type="number"
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="FOV Charges"
                                        label="FOV Charges"
                                        name="fovcharges"
                                        id="fovcharges"
                                        onChange={handleFormDataOnChange}
                                        value={formData.fovcharges}
                                        type="number"
                                    />
                                </div>
                            </div>

                            {otherCharges.map((elem, index) => (
                                <div key={`${index}-otherCharges`} className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div className="flex-fill">
                                        <CFormSelect
                                            label="Feright Mode"
                                            name="fee"
                                            id={`other-charge-fee-${index}`}
                                            onChange={(e) => handleOtherChargesOnChange(index, 'fee', e.target.value)}
                                            value={elem.fee}
                                            options={[
                                                'Select Fee',
                                                { label: 'Handling Charges', value: 'handlingCharges' },
                                                { label: 'Reattempt/Redelivery', value: 'reattempt' },
                                                { label: 'ODA', value: 'oda' },
                                                { label: 'Appointment Delivery Charges', value: 'appointmentDeliveryCharges' },
                                                { label: 'Sunday Holiday Pickup Charges', value: 'sundayHolidayPickupCharges' },
                                                { label: 'POD Charges', value: 'podCharges' },
                                                { label: 'Fuel Hike', value: 'fuelHike' },
                                                { label: 'Demurrage', value: 'demurrage' },
                                                { label: 'other', value: 'other' },
                                            ]}
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Feright Amount"
                                            label="Feright Amount"
                                            name="amount"
                                            id={`other-charge-amount-${index}`}
                                            onChange={(e) => handleOtherChargesOnChange(index, 'amount', e.target.value)}
                                            value={elem.amount}
                                            type="number"
                                        />
                                    </div>
                                    {<CButton size="sm" disabled={index === 0} onClick={() => removeOtherCharge(index)} className="mt-4" color="warning"><CIcon icon={cilX} /></CButton>}
                                </div>
                            ))}
                            <div className="d-md-flex justify-content-md-end">
                                <CButton size="sm" color="primary" onClick={addOtherCharge}>+ Add</CButton>
                            </div>
                            <hr />

                            {shipperInvoices.map((elem, index) => (
                                <div key={`${index}-invoice`} className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="E-way Bill No"
                                            label="E-way Bill No"
                                            name="eWayBillNo"
                                            id={`${index}-eWayBillNo`}
                                            onChange={(e) => handleShipperInvoiceOnChange(index, 'eWayBillNo', e.target.value, e)}
                                            value={elem.eWayBillNo}
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Invoice No"
                                            label="Invoice No"
                                            name="invoiceNo"
                                            id={`${index}-invoiceNo`}
                                            onChange={(e) => handleShipperInvoiceOnChange(index, 'invoiceNo', e.target.value, e)}
                                            value={elem.invoiceNo}
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Invoice Amount"
                                            label="Invoice Amount"
                                            name="invoiceAmount"
                                            id={`${index}-invoiceAmount`}
                                            onChange={(e) => handleShipperInvoiceOnChange(index, 'invoiceAmount', e.target.value, e)}
                                            value={elem.invoiceAmount}
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Invoice Date"
                                            label="Invoice Date"
                                            name="invoiceDate"
                                            id={`${index}-invoiceDate`}
                                            onChange={(e) => handleShipperInvoiceOnChange(index, 'invoiceDate', e.target.value, e)}
                                            value={elem.invoiceDate}
                                            type="date"
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Attachment"
                                            label="Attachment"
                                            name="file"
                                            id={`${index}-attachment`}
                                            onChange={(e) => handleShipperInvoiceOnChange(index, 'file', e.target.value, e)}
                                            type="file"
                                            required={!id}
                                        />
                                    </div>
                                    {<CButton size="sm" disabled={index === 0} onClick={() => removeShipperInvoice(index)} className="mt-4" color="warning"><CIcon icon={cilX} /></CButton>}
                                </div>
                            ))}

                            <div className="d-md-flex justify-content-between">
                                <p>Total Invoice Amount : {invoiceAmount}</p>
                                <CButton size="sm" color="primary" onClick={addShipperInvoice}>+ Add</CButton>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Shipper GSTIN"
                                        label="Shipper GSTIN"
                                        name="shipperGstIn"
                                        id="shipperGstIn"
                                        onChange={handleFormDataOnChange}
                                        value={formData.shipperGstIn}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Consignee GSTIN"
                                        label="Consignee GSTIN"
                                        name="consigneeGstIn"
                                        id="consigneeGstIn"
                                        onChange={handleFormDataOnChange}
                                        value={formData.consigneeGstIn}
                                    />
                                </div>
                            </div>

                            <hr />

                            <p className="text-muted"><b><i>Delivery Location Information:</i></b></p>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Receiver Name"
                                        label="Receiver Name"
                                        name="receiverName"
                                        id="receiverName"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverName}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Phone Number"
                                        label="Phone Number"
                                        name="receiverPhoneNumber"
                                        id="receiverPhoneNumber"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverPhoneNumber}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Address"
                                        label="Address"
                                        name="receiverAddress"
                                        id="receiverAddress"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverAddress}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormCheck
                                        label="National"
                                        name="receiverLocationType"
                                        id="receiverLocationType"
                                        onChange={handleFormDataOnChange}
                                        type="radio"
                                        value="national"
                                        checked={formData.receiverLocationType == "national"}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormCheck
                                        label="International"
                                        name="receiverLocationType"
                                        id="receiverLocationType"
                                        onChange={handleFormDataOnChange}
                                        type="radio"
                                        value="international"
                                        checked={formData.receiverLocationType == "international"}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div>
                                    <CFormInput
                                        placeholder="Postal Code"
                                        label="Postal Code"
                                        name="receiverPostalCode"
                                        id="receiverPostalCode"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverPostalCode}
                                    />
                                </div>
                                <div>
                                    <CFormInput
                                        placeholder="Area"
                                        label="Area"
                                        name="receiverArea"
                                        id="receiverArea"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverArea}
                                    />
                                </div>
                                <div>
                                    <CFormInput
                                        placeholder="District"
                                        label="District"
                                        name="receiverDistrict"
                                        id="receiverDistrict"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverDistrict}
                                    />
                                </div>
                                <div>
                                    <CFormInput
                                        placeholder="State"
                                        label="State"
                                        name="receiverState"
                                        id="receiverState"
                                        onChange={handleFormDataOnChange}
                                        value={formData.receiverState}
                                    />
                                </div>
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

export default CreateCashBooking;