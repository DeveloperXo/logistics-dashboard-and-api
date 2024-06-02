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
    CTable,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import { cilPlus, cilDollar } from "@coreui/icons";
import CIcon from '@coreui/icons-react';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { alertConstants } from '../../constants/auxiliary.constants';
import useAuth from '../../hooks/useAuth';

const Wallet = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [wallet, setWallet] = useState();
    const [receipt, setReceipt] = useState("");
    const [rechargeModalVisible, setRechargeModalVisible] = useState(false);
    const pagination_pages = [];
    const items = [];
    let query;
    const { page, limit } = useParams();

    const [walletFormData, setWalletFormData] = useState({
        customerId: "",
        amount: "",
        docketNumber: "-",
        amountType: "credit",
        comment: "",
        // receipt: ""
    })

    if (page && limit) {
        query = { page: page, limit: limit }
    }
    const getWallets = async () => {
        try {
            setIsLoading(true);
            let response;
            if (auth.role !== 'admin') {
                response = await axiosPrivate.get(`/common/wallet/this-user-wallet-with-user`);
            } else {
                if (query) {
                    response = await axiosPrivate.get(`/common/wallet/paginate-with-user/${query.page}/${query.limit}`);
                } else {
                    response = await axiosPrivate.get('/common/wallet/paginate-with-user/1/10');
                }
            }
            const _wallets = response.data?.results;
            auth.role === 'admin' ? setWallets(_wallets) : setWallet(_wallets);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
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
        getWallets();
    }, [page, limit])


    const handlePaginationChange = (e) => {
        navigate(`/wallet/1/${e.target.value}`);
    }

    const handleAddMoneyToggler = (_id) => {
        setWalletFormData({
            customerId: _id,
            amount: "",
            docketNumber: "-",
            amountType: "credit",
            comment: "",
            // receipt: ""
        });
        setRechargeModalVisible(true);
    }

    const handleWalletFormOnChange = (e) => {
        const { name, value, type } = e.target;
        setWalletFormData(prev => ({
            ...prev,
            [name]: type == "number" ? Number(value) : e.target.files ? e.target.files[0] : value
        }))
    }

    const uploadFile = async (_id) => {
        const formData = new FormData();
        formData.append(`receipt`, receipt);
        formData.append('id', _id);
        try {
            await axiosPrivate.put('/common/wallet-transaction/upload-receipt', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

        } catch (err) {
            setAlert({
                type: alertConstants.DANGER,
                message: 'Failed while uploading receipt.'
            })
        }
    }

    const handleWalletFormSubmit = async (e) => {
        e.preventDefault();
        for (const key in walletFormData) {
            if (walletFormData[key] === '' || walletFormData[key] === null) {
                setAlert({
                    type: alertConstants.WARNING,
                    message: `${key} is required.`
                });
                return;
            } else if (receipt == "") {
                setAlert({
                    type: alertConstants.WARNING,
                    message: `Receipt is required.`
                });
                return;
            }
        }
        try {
            setIsLoading(true);
            const response = await axiosPrivate.post('/common/wallet-transaction', JSON.stringify(walletFormData));
            uploadFile(response.data.results._id)
            setAlert({
                type: alertConstants.SUCCESS,
                message: 'Amount added successfully'
            })
            setIsLoading(false);
            setRechargeModalVisible(false);
        } catch (err) {
            setIsLoading(false);
            setAlert({
                type: alertConstants.DANGER,
                message: err?.response?.data?.message ? err.response.data.message : 'Something went wrong.'
            })
        }
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
            key: 'email',
            label: 'Email',
            _props: { scope: 'col' }
        },
        {
            key: 'phone',
            label: 'Phone',
            _props: { scope: 'col' }
        },
        {
            key: 'balance',
            label: 'Balance',
            _props: { scope: 'col' }
        },
        {
            key: 'lastRechargeDate',
            label: 'Last Recharge Date',
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
        if (wallets && wallets.results) {
            map_array = wallets.results;
            for (let i = 1; i <= wallets.totalPages; i++) { pagination_pages.push(i) }
        } else {
            map_array = wallets ? wallets : [];
        }
        map_array && map_array.map((wallet, key) => {
            items.push({
                id: key,
                name: wallet.user.customerInformation.name,
                email: wallet.user.accountInformation.email,
                phone: wallet.user.customerInformation.phone,
                balance: wallet._doc.balance,
                lastRechargeDate: wallet._doc.lastRechargeDate ? wallet._doc.lastRechargeDate.split('T')[0] : '-',
                action: <div>
                    <CButton className="my-0 py-0" onClick={() => navigate(`/wallet-transactions/${wallet.user._id}`)}>
                        <CIcon title="View" icon={cilPlus}></CIcon>
                    </CButton>
                    <CButton className="my-0 py-0" onClick={() => handleAddMoneyToggler(wallet.user._id)}>
                        <CIcon title="Add money" icon={cilDollar}></CIcon>
                    </CButton>
                </div>
            })
        });

        wallet && items.push({
            id: 0,
            name: wallet.user.customerInformation.name,
            email: wallet.user.accountInformation.email,
            phone: wallet.user.customerInformation.phone,
            balance: wallet.wallet.balance,
            lastRechargeDate: wallet.wallet.lastRechargeDate ? wallet.wallet.lastRechargeDate.split('T')[0] : '-',
            action: <div>
                <CButton className="my-0 py-0" onClick={() => navigate(`/t-wallet-transactions`)}>
                    <CIcon title="View" icon={cilPlus}></CIcon>
                </CButton>
                {/* <CButton className="my-0 py-0" onClick={() => handleAddMoneyToggler(wallet.user._id)}>
                    <CIcon title="Add money" icon={cilDollar}></CIcon>
                </CButton> */}
            </div>
        })
    }
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    {alert &&
                        <CAlert color={alert.type} dismissible={true}>
                            {alert.message}
                        </CAlert>
                    }
                    <CCard className="mb-4">
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <div><strong>{ wallet ? 'Your' : 'Manage' }</strong> <small>{ wallet ? 'Wallet': 'Wallets' }</small></div>
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
                                <CPaginationItem disabled={wallets?.totalResults ? !wallets?.hasPrevPage : true} onClick={() => navigate(`/wallet/${wallets?.prevPage}/${wallets?.limit}`)}>Previous</CPaginationItem>
                                {pagination_pages && pagination_pages.map((item) => (
                                    <CPaginationItem onClick={() => navigate(`/wallet/${item}/${wallets?.limit}`)}>{item}</CPaginationItem>
                                ))}
                                <CPaginationItem disabled={wallets?.totalResults ? !wallets?.hasNextPage : true} onClick={() => navigate(`/wallet/${wallets?.nextPage}/${wallets?.limit}`)}>Next</CPaginationItem>
                            </CPagination>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
            <CModal
                visible={rechargeModalVisible}
                onClose={() => setRechargeModalVisible(false)}
                aria-labelledby="LiveDemoExampleLabel">
                <CForm>
                    <CModalHeader>
                        <CModalTitle id="LiveDemoExampleLabel">Recharge Wallet</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormInput
                            className="mb-3"
                            label="Amount"
                            type="number"
                            id="modal-amount"
                            placeholder="Amount"
                            name="amount"
                            value={walletFormData.amount}
                            onChange={handleWalletFormOnChange}
                            required
                        />
                        <CFormInput
                            className="mb-3"
                            label="Comment"
                            type="text"
                            id="modal-comment"
                            placeholder="Comment"
                            name="comment"
                            value={walletFormData.comment}
                            onChange={handleWalletFormOnChange}
                            required
                        />
                        <CFormInput
                            className="mb-3"
                            label="Image of payment receipt"
                            type="file"
                            id="modal-comment"
                            placeholder="Image of payment receipt"
                            name="receipt"
                            onChange={(e) => setReceipt(e.target.files[0])}
                            required
                        />
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setRechargeModalVisible(false)}>
                            Close
                        </CButton>
                        <CButton type="submit" color="primary" onClick={handleWalletFormSubmit}>Confirm</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    )
}

export default Wallet;