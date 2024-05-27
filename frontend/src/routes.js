import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));

// test
const Admin = React.lazy(() => import('./views/test/Admin'));
const Customers = React.lazy(() => import('./views/manageUsers/customers/Customers'));
const CreateCustomer = React.lazy(() => import('./views/manageUsers/customers/CreateCustomer'));

const BusinessAssociates = React.lazy(() => import('./views/manageUsers/customers/BusinessAssociate'));

const UserAccount = React.lazy(() => import('./views/manageUsers/userAccount/UserAccount'));
const CreateUserAccount = React.lazy(() => import('./views/manageUsers/userAccount/CreateUserAccount'));
const Vendor = React.lazy(() => import('./views/manageUsers/userAccount/Vendor'));
const Upload = React.lazy(() => import('./views/manageUsers/userAccount/Upload'));

const Vehicle = React.lazy(() => import('./views/vehicle/Vehicle'));
const CreateVehicle = React.lazy(() => import('./views/vehicle/CreateVehicle'));

const CrmQueries = React.lazy(() => import('./views/crm/queries/Queries'));

const WebPrice = React.lazy(() => import('./views/price/web/WebPrice'));
const CreateWebPrice = React.lazy(() => import('./views/price/web/CreateWebPrice'));

const PtlBookings = React.lazy(() => import('./views/ptl/ptlBookings/PtlBookings'));
const CreatePtlBooking = React.lazy(() => import('./views/ptl/ptlBookings/CreatePtlBooking'));
const CashBookings = React.lazy(() => import('./views/ptl/cashBooking/CashBooking'));
const CreateCashBooking = React.lazy(() => import('./views/ptl/cashBooking/CreateCashBooking'));

const Wallet = React.lazy(() => import('./views/wallet/Wallet'));
const WalletTransaction = React.lazy(() => import('./views/walletTransactions/WalletTransaction'));

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/theme', name: 'Theme', element: Colors, exact: true, allowedRoles: ['admin']},
  { path: '/theme/colors', name: 'Colors', element: Colors, allowedRoles: ['admin']},
  { path: '/theme/typography', name: 'Typography', element: Typography, allowedRoles: ['admin']},
  { path: '/base', name: 'Base', element: Cards, exact: true, allowedRoles: ['admin']},
  { path: '/base/accordion', name: 'Accordion', element: Accordion, allowedRoles: ['admin']},
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs, allowedRoles: ['admin']},
  { path: '/base/cards', name: 'Cards', element: Cards, allowedRoles: ['admin']},
  { path: '/base/carousels', name: 'Carousel', element: Carousels, allowedRoles: ['admin']},
  { path: '/base/collapses', name: 'Collapse', element: Collapses, allowedRoles: ['admin']},
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups, allowedRoles: ['admin']},
  { path: '/base/navs', name: 'Navs', element: Navs, allowedRoles: ['admin']},
  { path: '/base/paginations', name: 'Paginations', element: Paginations, allowedRoles: ['admin']},
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders, allowedRoles: ['admin']},
  { path: '/base/popovers', name: 'Popovers', element: Popovers, allowedRoles: ['admin']},
  { path: '/base/progress', name: 'Progress', element: Progress, allowedRoles: ['admin']},
  { path: '/base/spinners', name: 'Spinners', element: Spinners, allowedRoles: ['admin']},
  { path: '/base/tables', name: 'Tables', element: Tables, allowedRoles: ['admin']},
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips, allowedRoles: ['admin']},
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true, allowedRoles: ['admin']},
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons, allowedRoles: ['admin']},
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns, allowedRoles: ['admin']},
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups, allowedRoles: ['admin']},
  { path: '/charts', name: 'Charts', element: Charts, allowedRoles: ['admin']},
  { path: '/forms', name: 'Forms', element: FormControl, exact: true, allowedRoles: ['admin']},
  { path: '/forms/form-control', name: 'Form Control', element: FormControl, allowedRoles: ['admin']},
  { path: '/forms/select', name: 'Select', element: Select, allowedRoles: ['admin']},
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios, allowedRoles: ['admin']},
  { path: '/forms/range', name: 'Range', element: Range, allowedRoles: ['admin']},
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup, allowedRoles: ['admin']},
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels, allowedRoles: ['admin']},
  { path: '/forms/layout', name: 'Layout', element: Layout, allowedRoles: ['admin']},
  { path: '/forms/validation', name: 'Validation', element: Validation, allowedRoles: ['admin']},
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons, allowedRoles: ['admin']},
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons, allowedRoles: ['admin']},
  { path: '/icons/flags', name: 'Flags', element: Flags, allowedRoles: ['admin']},
  { path: '/icons/brands', name: 'Brands', element: Brands, allowedRoles: ['admin']},
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true, allowedRoles: ['admin']},
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts, allowedRoles: ['admin']},
  { path: '/notifications/badges', name: 'Badges', element: Badges, allowedRoles: ['admin']},
  { path: '/notifications/modals', name: 'Modals', element: Modals, allowedRoles: ['admin']},
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts, allowedRoles: ['admin']},
  { path: '/widgets', name: 'Widgets', element: Widgets, allowedRoles: ['admin']},

  { path: '*', name: '404', element: Page404, allowedRoles: ['admin']},

  { path: '/admin', name: 'test', element: Admin, allowedRoles: ['admin']},
  { path: '/manage-users/customers', name: 'Manage Customers', element: Customers, allowedRoles: ['admin']},
  { path: '/manage-users/customers/:page/:limit', name: 'Manage Customers', element: Customers, allowedRoles: ['admin']},
  { path: '/manage-users/customers/create', name: 'Create Customer', element: CreateCustomer, allowedRoles: ['admin']},
  { path: '/manage-users/customers/update/:id', name: 'Update Customer', element: CreateCustomer, allowedRoles: ['admin']},
  
  { path: '/manage-users/business-associates', name: 'Business Associates', element: BusinessAssociates, allowedRoles: ['admin']},
  
  { path: '/manage-users/user-accounts', name: 'User Accounts', element: UserAccount, allowedRoles: ['admin']},
  { path: '/manage-users/user-accounts/:page/:limit', name: 'User Accounts', element: UserAccount, allowedRoles: ['admin']},
  { path: '/manage-users/user-accounts/create', name: 'Create User Account', element: CreateUserAccount, allowedRoles: ['admin']},
  { path: '/manage-users/user-accounts/update/:id', name: 'Create User Account', element: CreateUserAccount, allowedRoles: ['admin']},
  { path: '/manage-users/vendor', name: 'Vendor', element: Vendor, allowedRoles: ['admin']},
  
  { path: '/upload', name: 'Create User Account', element: Upload, allowedRoles: ['admin']},

  { path: '/vehicle', name: 'Vehicles', element: Vehicle, allowedRoles: ['admin']},
  { path: '/vehicle/:page/:limit', name: 'Vehicles', element: Vehicle, allowedRoles: ['admin']},
  { path: '/vehicle/create', name: 'Vehicles', element: CreateVehicle, allowedRoles: ['admin']},
  { path: '/vehicle/update/:id', name: 'Vehicles', element: CreateVehicle, allowedRoles: ['admin']},

  { path: '/crm/queries', name: 'Queries', element: CrmQueries, allowedRoles: ['admin']},
  { path: '/crm/queries/:page/:limit', name: 'Queries', element: CrmQueries, allowedRoles: ['admin']},

  { path: '/price/web', name: 'Web Price', element: WebPrice, allowedRoles: ['admin']},
  { path: '/price/web/:page/:limit', name: 'Web Price', element: WebPrice, allowedRoles: ['admin']},
  { path: '/price/web/create', name: 'Create Web Price', element: CreateWebPrice, allowedRoles: ['admin']},
  { path: '/price/web/update/:id', name: 'Create Web Price', element: CreateWebPrice, allowedRoles: ['admin']},

  { path: '/ptl/bookings', name: 'Ptl Booking', element: PtlBookings, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/ptl/bookings/:page/:limit', name: 'Ptl Booking', element: PtlBookings, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/ptl/bookings/create', name: 'Create Ptl Booking', element: CreatePtlBooking, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/ptl/bookings/update/:id', name: 'Update Ptl Booking', element: CreatePtlBooking, allowedRoles: ['admin', 'customer', 'businessAssociate']},

  { path: '/ptl/cash-bookings', name: 'Ptl Cash Booking', element: CashBookings, allowedRoles: ['admin']},
  { path: '/ptl/cash-bookings/:page/:limit', name: 'Ptl Cash Booking', element: CashBookings, allowedRoles: ['admin']},
  { path: '/ptl/cash-bookings/create', name: 'Create Cash Booking', element: CreateCashBooking, allowedRoles: ['admin']},
  { path: '/ptl/cash-bookings/update/:id', name: 'Update Cash Booking', element: CreateCashBooking, allowedRoles: ['admin']},

  { path: '/wallet', name: 'Wallet', element: Wallet, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/wallet/:page:/limit', name: 'Wallet', element: Wallet, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/wallet-transactions/:id', name: 'Wallet Teansactions', element: WalletTransaction, allowedRoles: ['admin', 'customer', 'businessAssociate']},
  { path: '/wallet-transactions/:id/:page:/limit', name: 'Wallet Teansactions', element: WalletTransaction, allowedRoles: ['admin', 'customer', 'businessAssociate']},

]

export default routes
