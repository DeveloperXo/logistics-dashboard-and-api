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

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  { path: '*', name: '404', element: Page404 },

  { path: '/admin', name: 'test', element: Admin },
  { path: '/manage-users/customers', name: 'Manage Customers', element: Customers },
  { path: '/manage-users/customers/:page/:limit', name: 'Manage Customers', element: Customers },
  { path: '/manage-users/customers/create', name: 'Create Customer', element: CreateCustomer },
  { path: '/manage-users/customers/update/:id', name: 'Update Customer', element: CreateCustomer },
  
  { path: '/manage-users/business-associates', name: 'Business Associates', element: BusinessAssociates },
  
  { path: '/manage-users/user-accounts', name: 'User Accounts', element: UserAccount },
  { path: '/manage-users/user-accounts/:page/:limit', name: 'User Accounts', element: UserAccount },
  { path: '/manage-users/user-accounts/create', name: 'Create User Account', element: CreateUserAccount },
  { path: '/manage-users/user-accounts/update/:id', name: 'Create User Account', element: CreateUserAccount },
  { path: '/manage-users/vendor', name: 'Vendor', element: Vendor },
  
  { path: '/upload', name: 'Create User Account', element: Upload },

  { path: '/vehicle', name: 'Vehicles', element: Vehicle },
  { path: '/vehicle/:page/:limit', name: 'Vehicles', element: Vehicle },
  { path: '/vehicle/create', name: 'Vehicles', element: CreateVehicle },
  { path: '/vehicle/update/:id', name: 'Vehicles', element: CreateVehicle },

  { path: '/crm/queries', name: 'Queries', element: CrmQueries },
  { path: '/crm/queries/:page/:limit', name: 'Queries', element: CrmQueries },

  { path: '/price/web', name: 'Web Price', element: WebPrice },
  { path: '/price/web/:page/:limit', name: 'Web Price', element: WebPrice },
  { path: '/price/web/create', name: 'Create Web Price', element: CreateWebPrice },
  { path: '/price/web/update/:id', name: 'Create Web Price', element: CreateWebPrice },

]

export default routes
