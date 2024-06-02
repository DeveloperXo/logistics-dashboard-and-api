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
import { cilPencil } from "@coreui/icons";
import CIcon from '@coreui/icons-react';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { alertConstants } from '../../constants/auxiliary.constants';
import useAuth from '../../hooks/useAuth';

const WalletTransaction = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [alert, setAlert] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [walletTransactions, setWalletTransactions] = useState([]);
    const items = [];
    const { id } = useParams();
    
    const getWalletTransactions = async () => {
        try {
            setIsLoading(true);
            if (auth.role !== 'admin') {
                const response = await axiosPrivate.get(`/common/wallet-transaction/this-auth-user`);
                const _walletTransactions = response.data?.results;
                setWalletTransactions(_walletTransactions)
            } else {
                const response = await axiosPrivate.get(`/common/wallet-transaction/this-user/${id}`);
                const _walletTransactions = response.data?.results;
                setWalletTransactions(_walletTransactions)
            }
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
        getWalletTransactions();
    }, [])

    const handlePaginationChange = (e) => {
        navigate(`/walletTransaction/1/${e.target.value}`);
    }

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' }
        },
        {
            key: 'amount',
            label: 'Amount',
            _props: { scope: 'col' }
        },
        {
            key: 'balance',
            label: 'Balance',
            _props: { scope: 'col' }
        },
        {
            key: 'docketNo',
            label: 'Docket No',
            _props: { scope: 'col' }
        },
        {
            key: 'amountType',
            label: 'Type',
            _props: { scope: 'col' }
        },
        {
            key: 'comment',
            label: 'Comment',
            _props: { scope: 'col' }
        },
        {
            key: 'date',
            label: 'Date',
            _props: { scope: 'col' }
        },
        {
            key: 'action',
            label: 'Action',
            _props: { scope: 'col' }
        }
    ];
    if (isLoading == false) {
        walletTransactions && walletTransactions.reverse().map((e, key) => {
            items.push({
                id: key,
                amount: e.amount,
                balance: e.balance,
                docketNo: e.docketNo ? e.docketNo : '-',
                amountType: e.amountType,
                comment: e.comment,
                date: e.createdAt ? e.createdAt.slice(0, 10) : '',
                action: <div>
                        {/* <CButton className="my-0 py-0" onClick={() => navigate(`/walletTransaction-transactions/${e._id}`)}>
                            <CIcon title="View" icon={cilPencil}></CIcon>
                        </CButton> */}
                        -
                    </div>
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
                        <div><strong>Manage</strong> <small>Wallet Transactions</small></div>
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
                </CCard>
            </CCol>
        </CRow>
    )
}

export default WalletTransaction;