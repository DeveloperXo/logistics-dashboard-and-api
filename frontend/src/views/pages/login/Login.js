import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useAuth from '../../../hooks/useAuth';
import { login, clearErrors } from '../../../actions/user.action';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$|^\+?[0-9]{1,4}?[-.\s]?(\(?[0-9]{1,3}?\)?[-.\s]?)?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/


const Login = () => {
    const dispatch = useDispatch();
    const { auth, setAuth } = useAuth();
    const { isAuthenticated, message, user, loading } = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        auth?.user || auth?.accessToken ? navigate(from, { replace: true }) : '';
        userRef.current.focus();
    }, []);

    useEffect(() => {
        auth?.user ? navigate(from, { replace: true }) : '';
    }, [auth]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        auth?.user ? navigate(from, { replace: true }) : '';
        message ? setErrMsg(message) : '';
        dispatch(clearErrors());
        if (user) {
            const { role } = user.user;
            const accessToken = user?.tokens?.access?.token;
            setAuth({ user: user.user, role: role, accessToken: accessToken });
        }
    }, [dispatch, isAuthenticated, message, user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validEmail || !validPassword) {
            setErrMsg('Invalid credentials');
            return;
        }
        dispatch(login(email, password));
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <div className={errMsg ? "" : "d-none"}>
                                        <CAlert ref={errRef} color="danger" className='mt-2 rounded-0'>
                                            {errMsg}
                                        </CAlert>
                                    </div>
                                    <CForm onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                ref={userRef}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)}
                                                autoComplete="email"
                                                valid={validEmail ? true : false}
                                                invalid={email && emailFocus && !validEmail ? true : false}
                                            />
                                            <div className={emailFocus && email && !validEmail ? "w-100" : "d-none"}>
                                                <CAlert color="secondary" className='mt-2 rounded-0'>
                                                    Enter a valid email. eg, jondoe@example.com
                                                </CAlert>
                                            </div>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                onFocus={() => setPasswordFocus(true)}
                                                onBlur={() => setPasswordFocus(false)}
                                                autoComplete="off"
                                                valid={validPassword ? true : false}
                                                invalid={passwordFocus && !validPassword ? true : false}
                                            />
                                            <div className={passwordFocus && password && !validPassword ? "w-100" : "d-none"}>
                                                <CAlert color="secondary" className='mt-2 rounded-0'>
                                                    Phone number or 8 to 24 characters, Must include uppercase and lowercase letters, a number and a special character.
                                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                                </CAlert>
                                            </div>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                                                    {loading ?
                                                        <><CSpinner as="span" size="sm" aria-hidden="true" /> Loading...</>
                                                        : <>Login</>
                                                    }
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
