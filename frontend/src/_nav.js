// navigation.js
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilTruck,
  cilPeople,
  cilDollar,
  cilPuzzle
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const getNavigationItems = (role) => {
  const adminNavs = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Test',
      to: '/admin',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Manage Users',
      to: '/manage-users',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Customer',
          to: '/manage-users/customers'
        },
        {
          component: CNavItem,
          name: 'Business Associates',
          to: '/manage-users/business-associates'
        },
        {
          component: CNavItem,
          name: 'User Accounts',
          to: '/manage-users/user-accounts'
        },
        {
          component: CNavItem,
          name: 'Vendor',
          to: '/manage-users/vendor'
        }
      ]
    },
    {
      component: CNavItem,
      name: 'Vehicle',
      to: '/vehicle',
      icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'CRM',
      to: '/crm',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Query',
          to: '/crm/queries'
        }
      ]
    },
    {
      component: CNavGroup,
      name: 'Price',
      to: '/price',
      icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Web Price',
          to: '/price/web'
        }
      ]
    },
    {
      component: CNavTitle,
      name: 'PTL',
    },
    {
      component: CNavGroup,
      name: 'PTL',
      to: '/ptl',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'PTL Bookings',
          to: '/ptl/bookings',
        },
        {
          component: CNavItem,
          name: 'Cash Bookings',
          to: '/ptl/cash-bookings',
        },
      ],
    },
  ]

  const userNavs = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'PTL',
    },
    {
      component: CNavGroup,
      name: 'PTL',
      to: '/ptl',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'PTL Bookings',
          to: '/ptl/bookings',
        }
      ],
    },
  ]

  return role === 'admin' ? adminNavs : userNavs
}

export default getNavigationItems