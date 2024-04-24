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
} from '@coreui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { alertConstants } from '../../../constants/auxiliary.constants';

const CreateUserAccount = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [alert, setAlert] = useState();
    const [updtUser, setUpdtUser] = useState();
    useEffect(() => {
        const fetch = async () => {
            try {
                if (id) {
                    const _user = await axiosPrivate.get(`userAccount/userAccount/this/${id}`);
                    const { results } = _user.data;
                    if (results) {
                        setUpdtUser(results);
                    } else {
                        setAlert({
                            type: alertConstants.DANGER,
                            message: "Failed while retriving user data"
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
        fetch();
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [documentsData, setDocumentsData] = useState([
        {
            file: "",
            fileType: "",
            documentName: ""
        }
    ]);

    const handleFormDataOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleDocumentsDataOnChange = (index, field, value, e) => {
        setDocumentsData(prev => {
            const updatedDocuments = [...prev];
            updatedDocuments[index] = {
                ...updatedDocuments[index],
                [field]: e.target.files ? e.target.files[0] : value
            }
            e.target.files ? updatedDocuments[index].fileType = e.target.files[0].type : ''
            e.target.files ? updatedDocuments[index].fileName = e.target.files[0].name : ''
            return updatedDocuments;
        })
    }
    console.log('files', documentsData)
    const addDocumentsData = () => {
        setDocumentsData((prev) => [
            ...prev,
            {
                file: "",
                fileType: "",
                documentName: "",
                fileName: ""
            }
        ])
    }

    useEffect(() => {
        if (updtUser) {
            setFormData({
                name: updtUser.name,
                email: updtUser.email,
                phoneNumber: updtUser.phoneNumber,
                password: "",
            });
            setDocumentsData(() => {
                const updatedDocuments = [];
                updtUser.documents.forEach((element, index) => {
                    updatedDocuments[index] = {
                        fileType: element.fileType,
                        documentName: element.documentName,
                        fileName: element.fileName
                    }
                });
                return updatedDocuments;
            });
        }
    }, [updtUser]);

    const uploadFile = async (_id) => {
        const formData = new FormData();
        let p_data = [];
        documentsData.forEach(elem => {
            formData.append(`files`, elem.file);
            if (elem.file) {
                p_data.push({ fileName: elem.file.name, documentName: elem.documentName})
            }
        })
        formData.append('_documents', JSON.stringify(p_data));
        formData.append('id', _id);
        try {
            const response = await axiosPrivate.put('/userAccount/userAccount/upload', formData, {
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
        if (confirmPassword !== payload.password) {
            setAlert({
                type: alertConstants.WARNING,
                message: "Password and confirm password are not same."
            });
            return;
        }

        try {
            if (!id) {
                const response = await axiosPrivate.post('/userAccount/userAccount', JSON.stringify(payload));
                if (response.data?.results) {
                    uploadFile(response.data.results._id)
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'User Account created successfully...'
                    });
                } else {
                    setAlert({
                        type: alertConstants.DANGER,
                        message: "Something unexpected happend. Cannot create user account."
                    })
                }
            } else {
                const response = await axiosPrivate.put(`/userAccount/userAccount/update/${id}`, JSON.stringify(payload));
                uploadFile(id);
                if (response.data?.results) {
                    setAlert({
                        type: alertConstants.SUCCESS,
                        message: 'User Account updated successfully...'
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
                                        placeholder="Full Name"
                                        label="Full Name"
                                        name="name"
                                        id="name"
                                        onChange={handleFormDataOnChange}
                                        value={formData.name}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Email"
                                        label="Email"
                                        name="email"
                                        id="email"
                                        onChange={handleFormDataOnChange}
                                        value={formData.email}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Phone"
                                        label="Phone"
                                        name="phoneNumber"
                                        id="Phone"
                                        onChange={handleFormDataOnChange}
                                        value={formData.phoneNumber}
                                        required
                                    />
                                </div>
                            </div>

                            <hr />

                            <p className="mb-1"><b>Add Documents</b></p>
                            {documentsData.map((document, index) => (
                                <div key={index} className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Documetn Name"
                                            label="Documetn Name"
                                            name="documentName"
                                            id={`documentName-${index}`}
                                            onChange={(e) => handleDocumentsDataOnChange(index, 'documentName', e.target.value, e)}
                                            value={document.documentName}
                                            required
                                        />
                                    </div>
                                    <div className="flex-fill">
                                        <CFormInput
                                            placeholder="Document"
                                            label="Document"
                                            name="file"
                                            id={`file-${index}`}
                                            type="file"
                                            onChange={(e) => handleDocumentsDataOnChange(index, 'file', e.target.value, e)}
                                            required={document.fileName ? false : true}
                                            disabled={document.fileName ? true : false}
                                        />
                                    </div>
                                    <div className="">
                                        <CFormInput
                                            placeholder="File Type"
                                            label="File Type"
                                            name="fileType"
                                            id={`fileType-${index}`}
                                            onChange={(e) => handleDocumentsDataOnChange(index, 'fileType', e.target.value, e)}
                                            value={document.fileType}
                                            required
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="mb-4">
                                <CButton size="sm" color="primary" onClick={addDocumentsData}>+ Add More</CButton>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Password"
                                        label="Password"
                                        name="password"
                                        id="pasword"
                                        onChange={handleFormDataOnChange}
                                        value={formData.password}
                                        required
                                        type="password"
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Confirm Password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        type="password"
                                    />
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

export default CreateUserAccount;