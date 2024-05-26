import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CButton,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg';
import { useNavigate } from 'react-router-dom';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem>
          <CButton onClick={() => navigate('/logout')} className="m-0 p-0">
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
