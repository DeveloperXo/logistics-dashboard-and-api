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

const CreatePtlBooking = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [alert, setAlert] = useState();
    const [updtPtlBooking, setUpdtPrlBooking] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [shipperNamesOpt, setShipperNamesOpt] = useState([]);
    const [pickupLocationsOpt, setPickupLocationsOpt] = useState([]);
    const [invoiceAmount, setInvoiceAmout] = useState(0);

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
        }
        setShipperNamesOpt([
            { value: '', label: 'Select Shipper Name' },
        ]);
        setPickupLocationsOpt([
            { value: '', label: 'Select Pickup Location' },
        ]);
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
        dimensionUnit: "",
        cftType: "cftSurface",
        cftTotalWeight: "",
        ferightMode: "",
        ferightAmount: "",
        shipperGstIn: "",
        consigneeGstIn: "",
        receiverName: "",
        receiverPhoneNumber: "",
        receiverAddress: "",
        isNational: true,
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
        otherChargeName: "",
        otherChargeAmount: "",
    });
    console.log(formData)
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
            attachment: ""
        }
    ]);

    console.log(shipperInvoices)

    const handleShipperInvoiceOnChange = (index, field, value, e) => {
        setShipperInvoices(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: e.target.files ? e.target.files[0] : e.target.type === 'number' ? Number(value) : value
            }
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
                attachment: ""
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
            setFormData({
                name: updtPtlBooking.name
            });
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
        }
    }, [updtPtlBooking]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            dimensions: dimensions
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
                const response = await axiosPrivate.post('/common/ptl-booking', JSON.stringify(payload));
                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'PtlBooking created successfully...'
                    });
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Something unexpected happend. Cannot create web price."
                    })
                }
            } else {
                const response = await axiosPrivate.put(`/common/ptl-booking/update/${id}`, JSON.stringify(payload));
                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'PtlBooking updated successfully...'
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


    const handleInpSearch = () => {
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
                                        name="shipperName"
                                        value={formData.shipperName}
                                        options={shipperNamesOpt}
                                        onChangeSearch={handleInpSearch}
                                        onChange={handleFormDataOnChange}
                                        required
                                    />
                                </div>

                                <div className="flex-fill">
                                    <CFormSelect
                                        placeholder="Select Pickup Location"
                                        label="Pickup Location"
                                        name="description"
                                        id="description"
                                        options={pickupLocationsOpt}
                                        onChange={handleFormDataOnChange}
                                        value={formData.pickupLocation}
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
                                        type="number"
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
                                        type="number"
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
                                        value={formData.cftType == 'cftSurface' ? formData.cftType : 'cftSurface'}
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
                                        value={formData.cftType == 'cftAir' ? formData.cftType : 'cftAir'}
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
                                            name="attachment"
                                            id={`${index}-attachment`}
                                            onChange={(e) => handleShipperInvoiceOnChange(index, 'attachment', e.target.value, e)}
                                            type="file"
                                            required
                                        />
                                    </div>
                                    {<CButton size="sm" disabled={index === 0} onClick={() => removeShipperInvoice(index)} className="mt-4" color="warning"><CIcon icon={cilX} /></CButton>}
                                </div>
                            ))}

                            <div className="d-md-flex justify-content-between">
                                <p>Total Invoice Amount : {invoiceAmount}</p>
                                <CButton size="sm" color="primary" onClick={addShipperInvoice}>+ Add</CButton>
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