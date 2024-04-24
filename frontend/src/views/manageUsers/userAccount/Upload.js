import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
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

const Upload = () => {
    const [alert, setAlert] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState({
        documentName: "",
        file: "",
        contentType: ""
    })
    let uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', data.file)
        formData.append('id', '662782a4fead3ae4a55327e7');
        formData.append('document')
        const response = await axiosPrivate.put('/userAccount/userAccount/upload', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        console.log(response);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: e.target.files ? e.target.files[0] : value
        }));
        e.target.files ? setData((prev) => ({
            ...prev,
            contentType: e.target.files[0].type
        })) : ''
    }

    console.log('data', data)

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadFile();
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
                            <p className="mb-1"><b>Add Documents</b></p>
                            <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Documetn Name"
                                        label="Documetn Name"
                                        name="documentName"
                                        id="documentName"
                                        onChange={handleChange}
                                        value={data.documentName}
                                        required
                                    />
                                </div>
                                <div className="flex-fill">
                                    <CFormInput
                                        placeholder="Document"
                                        label="Document"
                                        name="file"
                                        id="file"
                                        type="file"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <CFormInput
                                        placeholder="File Type"
                                        label="File Type"
                                        name="contentType"
                                        id="contentType"
                                        onChange={handleChange}
                                        value={data.contentType}
                                        required
                                    />
                                </div>
                            </div>
                        </CCardBody>
                        <CCardFooter>
                            <div className="d-flex justify-content-between">
                                <CButton color="light" onClick={() => navigate('/manage-users/user-accounts')}>Cancel</CButton>
                                <CButton type="submit" color="primary">Upload</CButton>
                            </div>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CForm>
    );
}

export default Upload;