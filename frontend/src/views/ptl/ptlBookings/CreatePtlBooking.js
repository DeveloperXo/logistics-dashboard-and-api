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
import SearchSelect from '../../../components/SearchSelect';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import useAuth from '../../../hooks/useAuth';

const CreatePtlBooking = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [alert, setAlert] = useState();
    const [updtPtlBooking, setUpdtPrlBooking] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [shipperNamesOpt, setShipperNamesOpt] = useState([]);
    const [pickupLocationsOpt, setPickupLocationsOpt] = useState([]);
    const [invoiceAmount, setInvoiceAmout] = useState(0);
    const [searchShipperEmail, setSearchShipperEmail] = useState([]);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const _user = await axiosPrivate.get(`common/ptl-booking/this/${id}`);
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

    const searchEmail = async (email) => {
        try {
            setIsLoading(true);
            if (email.length < 2) return;
            const shipper_name = await axiosPrivate.get(`/customer/customer/search-emails/${email}`);
            const { results } = shipper_name.data;
            if (results) {
                setSearchShipperEmail(results);
            } else {
                setAlert({
                    type: alertConstants.DANGER,
                    message: "Something went wrong."
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
        if (auth.role === 'admin') {
            setShipperNamesOpt([
                { value: '', label: 'Select Shipper Name' },
            ]);
            setPickupLocationsOpt([
                { value: '', label: 'Select Pickup Location' },
            ]);
        } else {
            console.log(auth)
            setShipperNamesOpt([
                { value: auth.user._id, label: auth.user.customerInformation.name },
            ]);
            setPickupLocationsOpt([
                { value: '', label: 'Select Pickup Location' },
            ]);
        }
    }, [])

    const [formData, setFormData] = useState({
        shipperName: "",
        senderName: "",
        pickupLocation: "",
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
        isReverseShipment: false,
        clientReferenceId: "",
        qty: "",
        dimensionUnit: "centimeter",
        cftType: "cftSurface",
        cftTotalWeight: 0,
        ferightMode: "",
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
        isReattemptOrRedeliveryCharges: false,
        isFirstFloorAndAboveDeliveryCharges: false,
        isOdaLocationCharges: false,
        isHandlingCharges: false,
        isAppointmentDeliveryCharges: false,
        isSundayAndNationalDeliveryCharges: false,
        isOtherAmountCharges: false,
        otherChargeName: "n/a",
        otherChargeAmount: 0,
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
            handleShipperNameOnChange({ target: { value: updtPtlBooking.shipperName }});
        }
    }, [updtPtlBooking]);

    const uploadFile = async (_id) => {
        const formData = new FormData();
        let documents = [];
        shipperInvoices.forEach(elem => {
            formData.append(`files`, elem.file);
            if (typeof(elem.file) === 'object') {
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
            const response = await axiosPrivate.put('/common/ptl-booking/upload-attachment', formData, {
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
                const response = await axiosPrivate.post('/common/ptl-booking', JSON.stringify(payload));
                uploadFile(response.data.results._id)
                setAlert({
                    type: alertConstants.SUCCESS,
                    message: 'PtlBooking created successfully...'
                });
            } else {
                await axiosPrivate.put(`/common/ptl-booking/update/${id}`, JSON.stringify(payload));
                if (shipperInvoices.length > 0 ) { uploadFile(id); }
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


    useEffect(() => {
        if (auth.role === 'admin')
            setShipperNamesOpt(() => {
                let a = [];
                searchShipperEmail.forEach(elem => {
                    a.push({ label: elem.accountInformation.email, value: elem._id })
                });
                return a;
            });
    }, [searchShipperEmail]);

    const handleShipperNameOnChange = async (e) => {
        handleFormDataOnChange(e);
        try {
            const getPickupLocations = await axiosPrivate.get(`/customer/customer/get-selected/?_filter=${JSON.stringify({ "_id": e.target.value })}&_options={"select":"addresses.pickupLocation"}`);
            setPickupLocationsOpt(() => {
                let a = ['Select Pickup Location'];
                getPickupLocations.data?.results?.forEach(elem => {
                    a.push({ label: elem.addresses.pickupLocation, value: elem.addresses.pickupLocation })
                })
                return a;
            })
        } catch (err) {
            setAlert({
                type: alertConstants.WARNING,
                message: 'Failed while fetching pickup locations.'
            })
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
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <SearchSelect
                                        id="shipper-name"
                                        label="Shipper Name"
                                        placeholder="Select Shipper Name"
                                        searchPlaceholder="Search by email"
                                        name="shipperName"
                                        value={formData.shipperName}
                                        options={shipperNamesOpt}
                                        onChangeSearch={(e) => auth.role === 'admin' && searchEmail(e.target.value)}
                                        onChange={handleShipperNameOnChange}
                                        required
                                    />
                                </div>

                                <div className="flex-fill">
                                    <CFormSelect
                                        placeholder="Select Pickup Location"
                                        label="Pickup Location"
                                        name="pickupLocation"
                                        id="pickupLocation"
                                        options={pickupLocationsOpt}
                                        onChange={handleFormDataOnChange}
                                        value={formData.pickupLocation}
                                        required
                                    />
                                </div>

                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Sender Name"
                                        label="Sender Name"
                                        name="senderName"
                                        id="senderName"
                                        onChange={handleFormDataOnChange}
                                        value={formData.senderName}
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
                                <div className="flex-fill">
                                    <CFormCheck
                                        label="Reverse Shipment"
                                        name="isReverseShipment"
                                        id="isReverseShipment"
                                        onChange={handleFormDataOnChange}
                                        checked={formData.isReverseShipment}
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
                                    <CFormSelect
                                        label="Feright Mode"
                                        name="ferightMode"
                                        id="ferightMode"
                                        onChange={handleFormDataOnChange}
                                        value={formData.ferightMode}
                                        options={[
                                            'Select Feright Mode',
                                            { label: 'To-Pay', value: 'toPay' },
                                            { label: 'TBB', value: 'tbb' },
                                            { label: 'FOC', value: 'foc' },
                                            { label: 'COD', value: 'cod' }
                                        ]}
                                        required
                                    />
                                </div>
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

export default CreatePtlBooking;



// $(document).on("keyup", ".dqty,.dlength,.dheight,.dwidth,.cftsurface,.cftair", function () {
//     var cftQty = 0;
//     var actualQty = $('.qty').val();

//     $('.dqty').each(function () {
//         if (this.value) {
//             cftQty = parseFloat(cftQty) + parseFloat(this.value);
//         }
//     })

//     if (cftQty > actualQty) {
//         $(this).parents('.newrow').find('.dqty').val('');
//         return true;
//     }

//     $(".remainBox").html('');
//     if (cftQty != actualQty) {
//         var remainBox = actualQty - cftQty;
//         $(".remainBox").html('Note: ' + remainBox + ' QTY remain for dimension');
//     }

//     cftCalculation();
//     get_total_cft_weight();
// });

// $(document).on("change", "#dimensions_type", function () {
//     cftCalculation();
//     get_total_cft_weight();
// });

// $(document).on("click", ".addmore", function () {
//     var cft_number = parseInt($("#cft_number").val()) + 1;
//     cftDimensionWeight(cft_number);
//     $("#cft_number").val(cft_number);
// });

// function cftDimensionWeight(cft_number) {
//     $(".dimensionsData").append(
//         '<div class="newrow appendnewrow">' +
//         '<div class="col-md-2"><div class="input">' +
//         '<input step=any name="dqty[]" id="qty' + cft_number + '" type="number" class="dqty form-control" placeholder="Qty">' +
//         '</div></div>' +
//         '<div class="col-md-2"><div class="input">' +
//         '<input step=any name="dlength[]" id="length' + cft_number + '" type="number" class="dlength form-control" placeholder="Length">' +
//         '</div></div>' +
//         '<div class="col-md-2"><div class="input">' +
//         '<input step=any name="dheight[]" id="height' + cft_number + '" type="number" class="dheight form-control" placeholder="Height">' +
//         '</div></div>' +
//         '<div class="col-md-2"><div class="input">' +
//         '<input step=any name="dwidth[]" id="width' + cft_number + '" type="number" class="dwidth form-control" placeholder="Width">' +
//         '</div></div>' +
//         '<div class="col-md-3"><div class="input">' +
//         '<input name="dcft[]" id="cft' + cft_number + '" type="number" disabled class="dcft form-control" placeholder="CFT Weight">' +
//         '<input name="hcft[]" type="hidden"  id="hcft' + cft_number + '" class="hcft form-control" placeholder="CFT Weight">' +
//         '</div></div>' +
//         '<div class="col-md-1"><a class="deleteCftRow"><i class="fa fa-times-circle"></i></a></div></div>');
// }

// $("body").on("click", ".deleteCftRow", function (e) {
//     $(this).parents('.newrow').html('');
//     get_total_cft_weight();
// });

// function surfacechange() {
//     cftCalculation();
//     get_total_cft_weight();
// }

// function get_total_cft_weight() {
//     var cft_total_weight = 0;
//     $('.hcft').each(function () {
//         cft_total_weight = parseFloat(cft_total_weight) + parseFloat(this.value);
//     })
//     $('#cft_total_weight').val(Math.round(cft_total_weight));
// }

// function cftCalculation() {
//     var numItems = $('.newrow').length;
//     var type = $('#dimensions_type').val();
//     var i;
//     for (i = 0; i < numItems; i++) {
//         var qty = $('#qty' + i).val();
//         var length = $('#length' + i).val();
//         var height = $('#height' + i).val();
//         var width = $('#width' + i).val();
//         var surface = $("input:radio[name=surface]:checked").val();
//         if (type === 'Inch') {
//             if (surface == 'air') {
//                 var lbh = length * height * width / cftAirInchValue;
//                 var getcft = lbh * qty;
//                 $('#cft' + i).val(getcft.toFixed(2));
//                 $('#hcft' + i).val(getcft.toFixed(2));
//             }
//             else {
//                 var lbh = length * height * width / cftSurfaceInchValue;
//                 var getcft = lbh * partnercft * qty;
//                 $('#cft' + i).val(getcft.toFixed(2));
//                 $('#hcft' + i).val(getcft.toFixed(2));
//             }
//         }
//         else {
//             if (surface == 'air') {
//                 var lbh = length * height * width / partnerair;
//                 var getcft = lbh * qty;
//                 $('#cft' + i).val(getcft.toFixed(2));
//                 $('#hcft' + i).val(getcft.toFixed(2));
//             }
//             else {
//                 if (partnercftType === 'newCft') {
//                     var lbh = length * height * width / partnercftVal;
//                     var getcft = lbh * qty;
//                 } else {
//                     var lbh = length * height * width / oldCftValue;
//                     var getcft = lbh * partnercft * qty;
//                 }
//                 $('#cft' + i).val(getcft.toFixed(2));
//                 $('#hcft' + i).val(getcft.toFixed(2));
//             }
//         }
//     }
// }