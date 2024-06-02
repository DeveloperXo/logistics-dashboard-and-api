import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormCheck,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert,
    CSpinner,
} from '@coreui/react';
import { alertConstants } from "../../../constants/auxiliary.constants";
import { fetchUserAccs, fetchCustomer } from "../../../actions/manageUsers.action";

const CreateCustomer = () => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const { users, message, isLoading } = useSelector(state => state.mangeCustomers);
    const [alert, setAlert] = useState();
    const { id } = useParams();

    const [updtCustomer, setUpdtCustomer] = useState({});
    const [f_salesPersons, setF_salesPersons] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const userAccs = await fetchUserAccs(axiosPrivate);
            if (userAccs.message) {
                setAlert({
                    type: alertConstants.DANGER,
                    message: userAccs.message
                })
            } else {
                setF_salesPersons(userAccs?.data?.results);
            }

            if (id) {
                const _user = await fetchCustomer(id, axiosPrivate);
                if (_user.message) {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: userAccs.message
                    })
                } else {
                    const results = _user?.data?.results;
                    setUpdtCustomer(_user?.data?.results);
                    console.log(results)
                }
            }
        }
        fetch();
    }, []);


    const [infoData, setInfoData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        phone: "",
        gstNumber: "",
        address: "",
        city: "",
        postalCode: "",
        customerLoadType: "",
        pickupRequestOnLTLPanel: false,
        manageEcomKyc: false,
        addReverseShipmentOnPTL: false,
        username: "",
        email: "",
        salesPerson: "",
        customerType: "",
        pickupPoint: "",
        pickupLocation: "",
        isGstApplied: false,
        isPtlApisAllowed: false,
        fscCharge: "",
        docketCharge: "",
        modeOfTransport: "",
        shipperRisk_percentOnConsignmentValue: "",
        shipperRisk_minimumAmount: "",
        careerRisk_percentOnConsignmentValue: "",
        careerRisk_minimumAmount: "",
        otherCharges_reverseShipmentsCharges: "",
        otherCharges_minimumChargeWeightOnDocket: "",
        otherCharges_reattemptCharges_pricePerKg: "",
        otherCharges_reattemptCharges_minimumAmount: "",
        otherCharges_firstFloorAndAboveDeliveryCharges: "",
        otherCharges_minimumChargableFreight: "",
        otherCharges_appointmentDeliveryCharges_pricePerKg: "",
        otherCharges_appointmentDeliveryCharges_minimumAmount: "",
        otherCharges_sundayAndNationalHolidayPickupCharges: "",
        otherCharges_applyFirstMileCharge_pricePerKg: "",
        otherCharges_applyFirstMileCharge_minimumAmount: "",
        otherCharges_appluFuelLinkageCharge: false,
        otherCharges_enablePtlPickupRequest: false,
        codFee_codPercent: "",
        codFee_codMinimumAmount: "",
        toPayCharges_toPayPercent: "",
        toPayCharges_toPayMinimumAmount: "",
        cftType: "",
        cftSurface: "",
        cftAir: "",
        greenTax: "",
    });

    useEffect(() => {
        if (updtCustomer) {
            setInfoData(prevInfoData => ({
                ...prevInfoData,
                firstName: updtCustomer.customerInformation?.name.split(' ')[0] || "",
                lastName: updtCustomer.customerInformation?.name.split(' ')[1] || "",
                companyName: updtCustomer.customerInformation?.companyName || "",
                phone: updtCustomer.customerInformation?.phone || "",
                gstNumber: updtCustomer.customerInformation?.gstNumber || "",
                address: updtCustomer.customerInformation?.address || "",
                city: updtCustomer.customerInformation?.city || "",
                postalCode: updtCustomer.customerInformation?.postalCode || "",
                customerLoadType: updtCustomer.accountInformation?.customerLoadType || "",
                pickupRequestOnLTLPanel: updtCustomer.accountInformation?.pickupRequestOnLTLPanel || false,
                manageEcomKyc: updtCustomer.accountInformation?.manageEcomKyc || false,
                addReverseShipmentOnPTL: updtCustomer.accountInformation?.addReverseShipmentOnPTL?.toString() || false,
                username: updtCustomer.accountInformation?.username || "",
                email: updtCustomer.accountInformation?.email || "",
                salesPerson: updtCustomer.accountInformation?.salesPerson || "",
                customerType: updtCustomer.accountInformation?.customerType || "",
                pickupPoint: updtCustomer.addresses?.pickupPoint || "",
                pickupLocation: updtCustomer.addresses?.pickupLocation || "",
                isGstApplied: updtCustomer.charges?.isGstApplied?.toString() || false,
                isPtlApisAllowed: updtCustomer.charges?.isPtlApisAllowed?.toString() || false,
                fscCharge: updtCustomer.charges?.fscCharge || "",
                docketCharge: updtCustomer.charges?.docketCharge || "",
                modeOfTransport: updtCustomer.charges?.modeOfTransport || "",
                shipperRisk_percentOnConsignmentValue: updtCustomer.charges?.shipperRisk?.percentOnConsignmentValue || "",
                shipperRisk_minimumAmount: updtCustomer.charges?.shipperRisk?.minimumAmount || "",
                careerRisk_percentOnConsignmentValue: updtCustomer.charges?.careerRisk?.percentOnConsignmentValue || "",
                careerRisk_minimumAmount: updtCustomer.charges?.careerRisk?.minimumAmount || "",
                otherCharges_reverseShipmentsCharges: updtCustomer.charges?.otherCharges?.reverseShipmentsCharges || "",
                otherCharges_minimumChargeWeightOnDocket: updtCustomer.charges?.otherCharges?.minimumChargeWeightOnDocket || "",
                otherCharges_reattemptCharges_pricePerKg: updtCustomer.charges?.otherCharges?.reattemptCharges?.pricePerKg || "",
                otherCharges_reattemptCharges_minimumAmount: updtCustomer.charges?.otherCharges?.reattemptCharges?.minimumAmount || "",
                otherCharges_firstFloorAndAboveDeliveryCharges: updtCustomer.charges?.otherCharges?.firstFloorAndAboveDeliveryCharges || "",
                otherCharges_minimumChargableFreight: updtCustomer.charges?.otherCharges?.minimumChargableFreight || "",
                otherCharges_appointmentDeliveryCharges_pricePerKg: updtCustomer.charges?.otherCharges?.appointmentDeliveryCharges?.pricePerKg || "",
                otherCharges_appointmentDeliveryCharges_minimumAmount: updtCustomer.charges?.otherCharges?.appointmentDeliveryCharges?.minimumAmount || "",
                otherCharges_sundayAndNationalHolidayPickupCharges: updtCustomer.charges?.otherCharges?.sundayAndNationalHolidayPickupCharges || "",
                otherCharges_applyFirstMileCharge_pricePerKg: updtCustomer.charges?.otherCharges?.applyFirstMileCharge?.pricePerKg || "",
                otherCharges_applyFirstMileCharge_minimumAmount: updtCustomer.charges?.otherCharges?.applyFirstMileCharge?.minimumAmount || "",
                otherCharges_appluFuelLinkageCharge: updtCustomer.charges?.otherCharges?.appluFuelLinkageCharge.toString() || "false",
                otherCharges_enablePtlPickupRequest: updtCustomer.charges?.otherCharges?.enablePtlPickupRequest.toString() || "false",
                codFee_codPercent: updtCustomer.charges?.codFee?.codPercent || "",
                codFee_codMinimumAmount: updtCustomer.charges?.codFee?.codMinimumAmount || "",
                toPayCharges_toPayPercent: updtCustomer.charges?.toPayCharges?.toPayPercent || "",
                toPayCharges_toPayMinimumAmount: updtCustomer.charges?.toPayCharges?.toPayMinimumAmount || "",
                cftType: updtCustomer.charges?.cftType,
                cftSurface: updtCustomer.charges?.cftSurface,
                cftAir: updtCustomer.charges?.cftAir,
                greenTax: updtCustomer.charges?.greenTax || ""
            }));

            if (updtCustomer?.charges?.handlingCharges) {
                setHandlingCharges(() => {
                    const updatedDocuments = [];
                    updtCustomer.charges.handlingCharges.forEach((element, index) => {
                        updatedDocuments[index] = {
                            fromKg: element.fromKg,
                            toKg: element.toKg,
                            pricePerKg: element.pricePerKg,
                            minimumAmount: element.minimumAmount
                        }
                    });
                    return updatedDocuments;
                });
            }
            if (updtCustomer?.charges?.odaLocationCharges) {
                setOdaLocationCharges(() => {
                    const updatedDocuments = [];
                    updtCustomer.charges.odaLocationCharges.forEach((element, index) => {
                        updatedDocuments[index] = {
                            fromKg: element.fromKg,
                            toKg: element.toKg,
                            pricePerKg: element.pricePerKg,
                            minimumAmount: element.minimumAmount
                        }
                    });
                    return updatedDocuments;
                });
            }
            if (updtCustomer.billingInformations) {
                setBillingInformations(() => {
                    const updatedDocuments = [];
                    updtCustomer.billingInformations.forEach((element, index) => {
                        updatedDocuments[index] = {
                            title: element.title,
                            companyName: element.companyName,
                            address: element.address,
                            gstNumber: element.gstNumber,
                            branch: element.branch,
                            paymentTerms: element.paymentTerms
                        }
                    });
                    return updatedDocuments;
                });
            }
        }
    }, [updtCustomer]);

    const handleInfoDataOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInfoData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? value : '') : value
        }));
    };


    const [handlingCharges, setHandlingCharges] = useState([
        {
            fromKg: '',
            toKg: '',
            pricePerKg: '',
            minimumAmount: ''
        }
    ]);


    const handleHandlingChargesOnChange = (index, field, value) => {
        setHandlingCharges(prev => {
            const updatedCharges = [...prev];
            updatedCharges[index] = {
                ...updatedCharges[index],
                [field]: value
            };
            return updatedCharges;
        });
    };

    const addHandlingCharge = () => {
        setHandlingCharges((prev) => [
            ...prev,
            {
                fromKg: '',
                toKg: '',
                pricePerKg: '',
                minimumAmount: ''
            }
        ]);
    };

    const [odaLocationCharges, setOdaLocationCharges] = useState([
        {
            fromKg: '',
            toKg: '',
            pricePerKg: '',
            minimumAmount: ''
        }
    ]);

    const addOdaCharge = () => {
        setOdaLocationCharges((prev) => [
            ...prev,
            {
                fromKg: '',
                toKg: '',
                pricePerKg: '',
                minimumAmount: ''
            }
        ]);
    };

    const handleOdaChargesOnChange = (index, field, value) => {
        setOdaLocationCharges(prev => {
            const updatedCharges = [...prev];
            updatedCharges[index] = {
                ...updatedCharges[index],
                [field]: value
            };
            return updatedCharges;
        });
    };

    const [billingInformations, setBillingInformations] = useState([
        {
            title: "",
            companyName: "",
            address: "",
            gstNumber: "",
            branch: "",
            paymentTerms: ""
        }
    ]);

    const handleBillingInformationsOnChange = (index, field, value) => {
        setBillingInformations(prev => {
            const updatedCharges = [...prev];
            updatedCharges[index] = {
                ...updatedCharges[index],
                [field]: value
            };
            return updatedCharges;
        });
    };
    console.log('bik', billingInformations)

    const addBillingInformation = () => {
        setBillingInformations((prev) => [
            ...prev,
            {
                title: "",
                companyName: "",
                address: "",
                gstNumber: "",
                branch: "",
                paymentTerms: ""
            }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const composedData = {
            customerInformation: {
                name: `${infoData.firstName} ${infoData.lastName}`,
                companyName: infoData.companyName,
                phone: infoData.phone,
                gstNumber: infoData.gstNumber,
                address: infoData.address,
                city: infoData.city,
                postalCode: infoData.postalCode
            },
            accountInformation: {
                customerLoadType: infoData.customerLoadType,
                pickupRequestOnLTLPanel: Boolean(infoData.pickupRequestOnLTLPanel),
                manageEcomKyc: Boolean(infoData.manageEcomKyc),
                addReverseShipmentOnPTL: infoData.addReverseShipmentOnPTL,
                username: infoData.username,
                email: infoData.email,
                salesPerson: infoData.salesPerson,
                customerType: infoData.customerType
            },
            addresses: {
                pickupPoint: infoData.pickupPoint,
                pickupLocation: infoData.pickupLocation
            },
            billingInformations: billingInformations,
            charges: {
                isGstApplied: infoData.isGstApplied,
                isPtlApisAllowed: infoData.isPtlApisAllowed,
                shipperRisk: {
                    percentOnConsignmentValue: infoData.shipperRisk_percentOnConsignmentValue,
                    minimumAmount: infoData.shipperRisk_minimumAmount
                },
                careerRisk: {
                    percentOnConsignmentValue: infoData.shipperRisk_percentOnConsignmentValue,
                    minimumAmount: infoData.shipperRisk_minimumAmount
                },
                fscCharge: infoData.fscCharge,
                docketCharge: infoData.docketCharge,
                handlingCharges: handlingCharges,
                modeOfTransport: infoData.modeOfTransport,
                otherCharges: {
                    reverseShipmentsCharges: infoData.otherCharges_reverseShipmentsCharges,
                    minimumChargeWeightOnDocket: infoData.otherCharges_minimumChargeWeightOnDocket,
                    reattemptCharges: {
                        pricePerKg: infoData.otherCharges_reattemptCharges_pricePerKg,
                        minimumAmount: infoData.otherCharges_reattemptCharges_minimumAmount
                    },
                    firstFloorAndAboveDeliveryCharges: infoData.otherCharges_firstFloorAndAboveDeliveryCharges,
                    minimumChargableFreight: infoData.otherCharges_minimumChargableFreight,
                    appointmentDeliveryCharges: {
                        pricePerKg: infoData.otherCharges_appointmentDeliveryCharges_pricePerKg,
                        minimumAmount: infoData.otherCharges_appointmentDeliveryCharges_minimumAmount
                    },
                    sundayAndNationalHolidayPickupCharges: infoData.otherCharges_sundayAndNationalHolidayPickupCharges,
                    applyFirstMileCharge: {
                        pricePerKg: infoData.otherCharges_applyFirstMileCharge_pricePerKg,
                        minimumAmount: infoData.otherCharges_applyFirstMileCharge_minimumAmount
                    },
                    appluFuelLinkageCharge: Boolean(infoData.otherCharges_appluFuelLinkageCharge),
                    enablePtlPickupRequest: Boolean(infoData.otherCharges_enablePtlPickupRequest),
                },
                odaLocationCharges: odaLocationCharges,
                codFee: {
                    codPercent: infoData.codFee_codPercent,
                    codMinimumAmount: infoData.codFee_codMinimumAmount
                },
                toPayCharges: {
                    toPayPercent: infoData.toPayCharges_toPayPercent,
                    toPayMinimumAmount: infoData.toPayCharges_toPayMinimumAmount
                },
                greenTax: infoData.greenTax,
                cftType: infoData.cftType,
                cftSurface: infoData.cftSurface,
                cftAir: infoData.cftAir,
            },
        };

        console.log(composedData)
        console.log('cd.other', composedData.charges.otherCharges)
        console.log('cd.other.sunday', composedData.charges.otherCharges.sundayAndNationalHolidayPickupCharges)

        try {
            if (!id) {
                const response = await axiosPrivate.post('/customer/customer/', JSON.stringify(composedData), {
                    headers: { 'Content-Type': 'application/json' }
                })

                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'Customer created successfully...'
                    });
                }
            } else {
                const response = await axiosPrivate.put(`/customer/customer/this/${id}`, JSON.stringify(composedData), {
                    headers: { 'Content-Type': 'application/json' }
                })

                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.INFO,
                        message: 'Customer updated successfully...'
                    });
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
                <CCol xs={8}>
                    {alert &&
                        <CAlert className="z-alert-fixed rounded-0" color={alert.type} dismissible={true}>
                            {alert.message}
                        </CAlert>
                    }
                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>Accoutn Informations</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="z-form-group mb-3">
                                <p className="mb-2">Customer Type: </p>
                                <div className="input-group">
                                    <CFormCheck
                                        label="PTL"
                                        name="customerLoadType"
                                        id="customerTypePTL"
                                        onChange={handleInfoDataOnChange}
                                        value="ptl"
                                        checked={infoData.customerLoadType === "ptl"}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <CFormCheck
                                        label="FTL"
                                        name="customerLoadType"
                                        id="customerTypeFTL"
                                        checked={infoData.customerLoadType === "ftl"}
                                        value="ftl"
                                        onChange={handleInfoDataOnChange}
                                    />
                                </div>
                            </div>

                            <div className="z-form-group mb-3">
                                <p className="mb-2">Create Pickup Request on LTL Panel </p>
                                <div className="input-group">
                                    <CFormCheck
                                        label="LTL Panel"
                                        name="pickupRequestOnLTLPanel"
                                        id="pickupRequestOnLTLPanel_ltl"
                                        checked={infoData.pickupRequestOnLTLPanel}
                                        value="true"
                                        type="checkbox"
                                        onChange={handleInfoDataOnChange}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <CFormCheck
                                        label="Manage Ecom KYC"
                                        name="manageEcomKyc"
                                        id="pickupRequestOnLTLPanel_manageEcomKyc"
                                        checked={infoData.manageEcomKyc}
                                        value="true"
                                        type="checkbox"
                                        onChange={handleInfoDataOnChange}
                                    />
                                </div>
                            </div>

                            <div className="z-form-group mb-3">
                                <p className="mb-2">Add Reverse Shipment on PTL </p>
                                <div className="input-group">
                                    <CFormCheck
                                        label="Reverse Shipment"
                                        name="addReverseShipmentOnPTL"
                                        id="addReverseShipmentOnPTL"
                                        checked={infoData.addReverseShipmentOnPTL === 'true'}
                                        value={true}
                                        onChange={handleInfoDataOnChange}
                                    />
                                </div>
                            </div>

                            <div className="z-form-group">
                                <CInputGroup className="mb-3">
                                    <CFormInput
                                        className="mx-2"
                                        placeholder="Username"
                                        aria-label="Username"
                                        name="username"
                                        onChange={handleInfoDataOnChange}
                                        value={infoData.username}
                                        id="username"
                                    />
                                    <CFormInput
                                        className="mx-2"
                                        placeholder="Email"
                                        aria-label="Email"
                                        name="email"
                                        onChange={handleInfoDataOnChange}
                                        value={infoData.email}
                                        id="email"
                                    />
                                    {f_salesPersons.length > 0 ? (
                                        <CFormSelect
                                            id="per_page"
                                            aria-label="Sales Person"
                                            size="sm"
                                            className="mx-2"
                                            name="salesPerson"
                                            value={infoData.salesPerson}
                                            onChange={handleInfoDataOnChange}
                                            options={[
                                                'Select sales person',
                                                ...f_salesPersons.map((elem) => (
                                                    { label: elem.name, value: elem._id }
                                                )),
                                            ]}
                                        />
                                    ) : (
                                        <div><CSpinner color="primary"></CSpinner></div>
                                    )}
                                </CInputGroup>
                                <CInputGroup className="mb-3">
                                    <CFormSelect
                                        id="customer_type"
                                        className="mx-2"
                                        aria-label="Select customer type"
                                        size="sm"
                                        name="customerType"
                                        value={infoData.customerType}
                                        onChange={handleInfoDataOnChange}
                                        options={[
                                            'Select customer type',
                                            { label: 'Customer', value: 'customer' },
                                            { label: 'Business Associate', value: 'businessAssociate' }
                                        ]}
                                    />
                                </CInputGroup>
                            </div>

                        </CCardBody>
                    </CCard>

                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>Customer Informations</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="z-form-group mb-3">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div>
                                        <CFormInput
                                            placeholder="Company Name"
                                            label="Company Name"
                                            name="companyName"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.companyName}
                                            id="companyName"
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="First Name"
                                            label="First Name"
                                            name="firstName"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.firstName}
                                            id="firstName"
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="Last Name"
                                            label="Last Name"
                                            name="lastName"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.lastName}
                                            id="lastName"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="z-form-group mb-3">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div>
                                        <CFormInput
                                            placeholder="Phone"
                                            label="Phone"
                                            name="phone"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.phone}
                                            id="phone"
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="GST"
                                            label="GST No. / Id"
                                            name="gstNumber"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.gstNumber}
                                            id="gstNumber"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="z-form-group mb-3">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div>
                                        <CFormInput
                                            placeholder="Postal code"
                                            label="Postal code"
                                            name="postalCode"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.postalCode}
                                            id="postalCode"
                                        />
                                    </div>
                                    <div>
                                        <CFormInput
                                            placeholder="City"
                                            label="City"
                                            name="city"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.city}
                                            id="city"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="z-form-group mb-3">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div className="flex-grow-1">
                                        <CFormInput
                                            placeholder="Address"
                                            label="Address"
                                            name="address"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.address}
                                            id="address"
                                        />
                                    </div>
                                </div>
                            </div>

                        </CCardBody>
                    </CCard>

                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>Billing Informations</small></div>
                        </CCardHeader>
                        <CCardBody>

                            {billingInformations.map((elem, index) => (
                                <div key={`${index}-billingInformations`}>
                                    {index !== 0 ? <hr /> : ''}
                                    <div className="d-flex justify-content-start align-items-center gap-3 mb-2">
                                        <div>
                                            <CFormInput className="mb-3"
                                                label="Title"
                                                placeholder="Title"
                                                name="title"
                                                onChange={(e) => handleBillingInformationsOnChange(index, 'title', e.target.value)}
                                                value={elem.title}
                                            />
                                        </div>
                                        <div>
                                            <CFormInput className="mb-3"
                                                label="Company Name"
                                                placeholder="Company Name"
                                                name="companyName"
                                                onChange={(e) => handleBillingInformationsOnChange(index, 'companyName', e.target.value)}
                                                value={elem.companyName}
                                            />
                                        </div>
                                        <div>
                                            <CFormInput className="mb-3"
                                                label="GST Number"
                                                placeholder="GST Number"
                                                name="gstNumber"
                                                onChange={(e) => handleBillingInformationsOnChange(index, 'gstNumber', e.target.value)}
                                                value={elem.gstNumber}
                                            />
                                        </div>
                                    </div>
                                    <div key={`${index}-billingInformations-2`} className="d-flex justify-content-start align-items-center gap-3 mb-2">
                                        <div className="flex-grow-1">
                                            <CFormInput className="mb-3"
                                                label="Address"
                                                placeholder="Address"
                                                name="address"
                                                onChange={(e) => handleBillingInformationsOnChange(index, 'address', e.target.value)}
                                                value={elem.address}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center gap-3 mb-2">
                                        <div className="flex-grow-1">
                                            <CFormInput className="mb-3"
                                                label="Branch"
                                                placeholder="Branch"
                                                name="branch"
                                                onChange={(e) => handleBillingInformationsOnChange(index, 'branch', e.target.value)}
                                                value={elem.branch}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <CFormInput className="mb-3"
                                                label="Payment Terms"
                                                placeholder="Payment Terms"
                                                name="paymentTerms"
                                                onChange={(e) => handleBillingInformationsOnChange(index, 'paymentTerms', e.target.value)}
                                                value={elem.paymentTerms}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="d-md-flex justify-content-md-end">
                                <CButton size="sm" color="primary" onClick={addBillingInformation}>+ Add More</CButton>
                            </div>

                        </CCardBody>
                    </CCard>

                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>Pickup Point</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="z-form-group mb-3">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div className="flex-grow-1">
                                        <CFormInput
                                            placeholder="Pickup Point"
                                            label="Pickup Point"
                                            name="pickupPoint"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.pickupPoint}
                                            id="pickupPoint"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>

                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>Pickup Location</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="z-form-group mb-3">
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div className="flex-grow-1">
                                        <CFormInput
                                            placeholder="Pickup Location"
                                            label="Pickup Location"
                                            name="pickupLocation"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.pickupLocation}
                                            id="pickupLocation"
                                        />
                                    </div>
                                    {/* <div><CFormInput placeholder="Pin code" label="Pin code" /></div> */}
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs={4}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>PTL Informations</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="z-form-group mb-3">
                                <div className="input-group">
                                    <CFormCheck
                                        label="Apply GST"
                                        name="isGstApplied"
                                        id="isGstApplied"
                                        onChange={handleInfoDataOnChange}
                                        value={true}
                                        checked={infoData.isGstApplied == 'true'}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <CFormCheck
                                        label="Allow PTL APIs"
                                        name="isPtlApisAllowed"
                                        id="isPtlApisAllowed"
                                        onChange={handleInfoDataOnChange}
                                        value={true}
                                        checked={infoData.isPtlApisAllowed == "true"}
                                    />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>

                    <CCard className="mb-4">
                        <CCardHeader>
                            <div><small>Charges</small></div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="z-form-group mb-3">
                                <p className="text-sm">FOV Charge</p>
                                <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                                    <div>
                                        <p>Shipper Risk</p>
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="Percent"
                                            label="% on consignment"
                                            name="shipperRisk_percentOnConsignmentValue"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.shipperRisk_percentOnConsignmentValue}
                                            id="shipperRisk_percentOnConsignmentValue"
                                        />
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="Minimum Amount"
                                            label="Minimum Amount"
                                            name="shipperRisk_minimumAmount"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.shipperRisk_minimumAmount}
                                            id="shipperRisk_minimumAmount"
                                        />
                                    </div>
                                    <div>
                                        <p>Career Risk</p>
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="Percent"
                                            label="% on consignment"
                                            name="careerRisk_percentOnConsignmentValue"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.careerRisk_percentOnConsignmentValue}
                                            id="careerRisk_percentOnConsignmentValue"
                                        />
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="Minimum Amount"
                                            label="Minimum Amount"
                                            name="careerRisk_minimumAmount"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.careerRisk_minimumAmount}
                                            id="careerRisk_minimumAmount"
                                        />
                                    </div>
                                </div>

                                <hr />

                                <p className="text-sm">FSC Charge/Docket Charge</p>
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div>
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="FSC Charge"
                                            label="FSC Charge"
                                            name="fscCharge"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.fscCharge}
                                            id="fscCharge"
                                        />
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="Docket Charge"
                                            label="Docket Charge"
                                            name="docketCharge"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.docketCharge}
                                            id="docketCharge"
                                        />
                                    </div>
                                </div>

                                <hr />

                                <p className="text-sm">CFT Surface</p>
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div>
                                        <CFormCheck
                                            inline
                                            type="radio"
                                            value="oldCft"
                                            checked={infoData.cftType == "oldCft"}
                                            onChange={handleInfoDataOnChange}
                                            label="Old CFT"
                                            name="cftType"
                                        />
                                        <CFormCheck
                                            inline
                                            className="mb-3"
                                            type="radio"
                                            value="newCft"
                                            checked={infoData.cftType == "newCft"}
                                            onChange={handleInfoDataOnChange}
                                            label="New CFT"
                                            name="cftType"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div>
                                        <CFormInput
                                            size="sm"
                                            placeholder="CFT Value"
                                            label="CFT Surface"
                                            value={infoData.cftSurface}
                                            onChange={handleInfoDataOnChange}
                                            name="cftSurface"
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div>
                                        <CFormInput
                                            size="sm"
                                            placeholder="CFT Value"
                                            label="CFT Air"
                                            value={infoData.cftAir}
                                            onChange={handleInfoDataOnChange}
                                            name="cftAir"
                                        />
                                    </div>
                                </div>

                                <hr />

                                <p className="text-sm">Handling Charges</p>
                                {handlingCharges.map((charge, index) => (
                                    <div key={`${index}-handling-charges`} className="d-flex justify-content-start align-items-center gap-3 mb-2">
                                        <div>
                                            <CInputGroup>
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="From Kg"
                                                    name="fromKg"
                                                    onChange={(e) => handleHandlingChargesOnChange(index, 'fromKg', e.target.value)}
                                                    value={charge.fromKg}
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="To Kg"
                                                    name="toKg"
                                                    onChange={(e) => handleHandlingChargesOnChange(index, 'toKg', e.target.value)}
                                                    value={charge.toKg}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-2">
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Rs per Kg"
                                                    name="pricePerKg"
                                                    onChange={(e) => handleHandlingChargesOnChange(index, 'pricePerKg', e.target.value)}
                                                    value={charge.pricePerKg}
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Min Amount"
                                                    name="minimumAmount"
                                                    onChange={(e) => handleHandlingChargesOnChange(index, 'minimumAmount', e.target.value)}
                                                    value={charge.minimumAmount}
                                                />
                                            </CInputGroup>
                                        </div>
                                    </div>
                                ))}
                                <div className="d-md-flex justify-content-md-end">
                                    <CButton size="sm" color="primary" onClick={addHandlingCharge}>+ Add More</CButton>
                                </div>

                                <hr />

                                <p className="text-sm">Mode of Transport</p>
                                <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                                    <div>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            size="sm"
                                            options={[
                                                'Select Transport Type',
                                                { label: 'Surface', value: 'surface' },
                                                { label: 'Train', value: 'train' },
                                                { label: 'Air', value: 'air' },
                                                { label: 'Sea', value: 'sea' }
                                            ]}
                                            name="modeOfTransport"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.modeOfTransport}
                                            id="modeOfTransport"
                                        />
                                    </div>
                                </div>

                                <hr />

                                <p className="text-sm">Other Charges</p>
                                <div className="d-flex justify-content-start align-items-center gap-3 mb-4">
                                    <div>
                                        <div className="mb-2">
                                            <CFormInput
                                                size="sm"
                                                placeholder="Reverse Shipment Charges"
                                                name="otherCharges_reverseShipmentsCharges"
                                                onChange={handleInfoDataOnChange}
                                                value={infoData.otherCharges_reverseShipmentsCharges}
                                                id="otherCharges_reverseShipmentsCharges"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <CFormInput
                                                size="sm"
                                                placeholder="Minimum Charge Weight on a Docket"
                                                name="otherCharges_minimumChargeWeightOnDocket"
                                                onChange={handleInfoDataOnChange}
                                                value={infoData.otherCharges_minimumChargeWeightOnDocket}
                                                id="otherCharges_minimumChargeWeightOnDocket"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <small>Reattempt or Redelivery Charges:</small>
                                            <CInputGroup>
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="RS per kg"
                                                    name="otherCharges_reattemptCharges_pricePerKg"
                                                    onChange={handleInfoDataOnChange}
                                                    value={infoData.otherCharges_reattemptCharges_pricePerKg}
                                                    id="otherCharges_reattemptCharges_pricePerKg"
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Minimum amount"
                                                    name="otherCharges_reattemptCharges_minimumAmount"
                                                    onChange={handleInfoDataOnChange}
                                                    value={infoData.otherCharges_reattemptCharges_minimumAmount}
                                                    id="otherCharges_reattemptCharges_minimumAmount"
                                                />
                                            </CInputGroup>
                                        </div>
                                        <div className="mb-2">
                                            <CFormInput
                                                size="sm"
                                                placeholder="First Floor & Above Delivery Charges"
                                                name="otherCharges_firstFloorAndAboveDeliveryCharges"
                                                onChange={handleInfoDataOnChange}
                                                value={infoData.otherCharges_firstFloorAndAboveDeliveryCharges}
                                                id="otherCharges_firstFloorAndAboveDeliveryCharges"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <CFormInput
                                                size="sm"
                                                placeholder="Minimum Chargeable Freight"
                                                name="otherCharges_minimumChargableFreight"
                                                onChange={handleInfoDataOnChange}
                                                value={infoData.otherCharges_minimumChargableFreight}
                                                id="otherCharges_minimumChargableFreight"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <small>Appointment Delivery Charges:</small>
                                            <CInputGroup>
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="RS per kg"
                                                    name="otherCharges_appointmentDeliveryCharges_pricePerKg"
                                                    onChange={handleInfoDataOnChange}
                                                    value={infoData.otherCharges_appointmentDeliveryCharges_pricePerKg}
                                                    id="otherCharges_appointmentDeliveryCharges_pricePerKg"
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Minimum amount"
                                                    name="otherCharges_appointmentDeliveryCharges_minimumAmount"
                                                    onChange={handleInfoDataOnChange}
                                                    value={infoData.otherCharges_appointmentDeliveryCharges_minimumAmount}
                                                    id="otherCharges_appointmentDeliveryCharges_minimumAmount"
                                                />
                                            </CInputGroup>
                                        </div>
                                        <div className="mb-2">
                                            <CFormInput
                                                size="sm"
                                                placeholder="Sunday & National Holiday Pick-up Charges"
                                                name="otherCharges_sundayAndNationalHolidayPickupCharges"
                                                onChange={handleInfoDataOnChange}
                                                value={infoData.otherCharges_sundayAndNationalHolidayPickupCharges}
                                                id="otherCharges_sundayAndNationalHolidayPickupCharges"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <small>Apply First Mile Charge:</small>
                                            <CInputGroup>
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="RS per kg"
                                                    name="otherCharges_applyFirstMileCharge_pricePerKg"
                                                    onChange={handleInfoDataOnChange}
                                                    value={infoData.otherCharges_applyFirstMileCharge_pricePerKg}
                                                    id="otherCharges_applyFirstMileCharge_pricePerKg"
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Minimum amount"
                                                    name="otherCharges_applyFirstMileCharge_minimumAmount"
                                                    onChange={handleInfoDataOnChange}
                                                    value={infoData.otherCharges_applyFirstMileCharge_minimumAmount}
                                                    id="otherCharges_applyFirstMileCharge_minimumAmount"
                                                />
                                            </CInputGroup>
                                        </div>
                                        <div className="mb-2">
                                            <CFormCheck
                                                label="Apply Fuel linkage Charge"
                                                name="otherCharges_appluFuelLinkageCharge"
                                                id="otherCharges_appluFuelLinkageCharge"
                                                onChange={handleInfoDataOnChange}
                                                value={true}
                                                checked={infoData.otherCharges_appluFuelLinkageCharge == "true"}
                                            />
                                            <br />
                                            <CFormCheck
                                                label="Enable PTL Pickup Request"
                                                name="otherCharges_enablePtlPickupRequest"
                                                id="otherCharges_enablePtlPickupRequest"
                                                onChange={handleInfoDataOnChange}
                                                value={true}
                                                checked={infoData.otherCharges_enablePtlPickupRequest == "true"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <p className="text-sm">ODA Location Charges</p>
                                {odaLocationCharges.map((charge, index) => (
                                    <div className="d-flex justify-content-start align-items-center gap-3 mb-2">
                                        <div key={index}>
                                            <CInputGroup>
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="From Kg"
                                                    name="fromKg"
                                                    onChange={(e) => handleOdaChargesOnChange(index, 'fromKg', e.target.value)}
                                                    value={charge.fromKg}
                                                    id="oda_fromKg"
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="To Kg"
                                                    name="toKg"
                                                    onChange={(e) => handleOdaChargesOnChange(index, 'toKg', e.target.value)}
                                                    value={charge.toKg}
                                                    id="handling_toKg"
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-2">
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Rs per Kg"
                                                    name="pricePerKg"
                                                    onChange={(e) => handleOdaChargesOnChange(index, 'pricePerKg', e.target.value)}
                                                    value={charge.pricePerKg}
                                                    id="handling_pricePerKg"
                                                />
                                                <CFormInput
                                                    size="sm"
                                                    placeholder="Min Amount"
                                                    name="minimumAmount"
                                                    onChange={(e) => handleOdaChargesOnChange(index, 'minimumAmount', e.target.value)}
                                                    value={charge.minimumAmount}
                                                    id="handling_minimumAmount"
                                                />
                                            </CInputGroup>
                                        </div>
                                    </div>
                                ))}
                                <div className="d-md-flex justify-content-md-end">
                                    <CButton size="sm" color="primary" onClick={addOdaCharge}>+ Add More</CButton>
                                </div>

                                <hr />

                                <p className="text-sm">COD Fee</p>
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div>
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="COD Percent"
                                            name="codFee_codPercent"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.codFee_codPercent}
                                            id="codFee_codPercent"
                                        />
                                        <CFormInput
                                            className="mb-2"
                                            size="sm"
                                            placeholder="COD Minmum Amount"
                                            name="codFee_codMinimumAmount"
                                            onChange={handleInfoDataOnChange}
                                            value={infoData.codFee_codMinimumAmount}
                                            id="codFee_codMinimumAmount"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <p className="text-sm">To Pay Charges</p>
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <div>
                                    <CFormInput
                                        className="mb-2"
                                        size="sm"
                                        placeholder="To Pay Percent"
                                        name="toPayCharges_toPayPercent"
                                        onChange={handleInfoDataOnChange}
                                        value={infoData.toPayCharges_toPayPercent}
                                        id="toPayCharges_toPayPercent"
                                    />
                                    <CFormInput
                                        className="mb-2"
                                        size="sm"
                                        placeholder="To Pay Minmum Amount"
                                        name="toPayCharges_toPayMinimumAmount"
                                        onChange={handleInfoDataOnChange}
                                        value={infoData.toPayCharges_toPayMinimumAmount}
                                        id="toPayCharges_toPayMinimumAmount"
                                    />
                                    <br />
                                    <CFormInput
                                        className="mb-2"
                                        size="sm"
                                        placeholder="Green Tax"
                                        name="greenTax"
                                        onChange={handleInfoDataOnChange}
                                        value={infoData.greenTax}
                                        id="greenTax"
                                    />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <div className="d-md-flex justify-content-md-end mb-3">
                <CButton type="submit" color="primary">{!id ? 'Add Customer' : 'Save'}</CButton>
            </div>
        </CForm>
    );
}

export default CreateCustomer;