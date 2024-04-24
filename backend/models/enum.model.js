const EnumRoleOfUser = {
    CUSTOMER: 'customer',
    USER_ACCOUNT: 'user_account',
    ADMIN: 'admin'
}

const EnumStatusOfUser = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended'
}

const EnumLoadTypeOfCustomer = {
    PTL: 'ptl',
    FTL: 'ftl'
}

const EnumTypeOfCustomer = {
    CUSTOMER: 'customer',
    BUSINESS_ASSOCIATE: 'businessAssociate'
}

const EnumPickupRequestOnLTLPanel = {
    LTL_PANEL: 'ltlPanel',
    MANAGE_ECOM_KYC: 'manageEcomKyc'
}

const EnumModesOfTransport = {
    SURFACE: 'surface',
    TRAIN: 'train',
    AIR: 'air',
    SEA: 'sea'
}

const EnumTypeOfToken = {
    RESET_PASSWORD: 'resetPassword',
    REFRESH: 'refresh',
};

const EnumUserAccountFunctionAdditional = {
    DRIVER_MANAGER: 'driverManager',
    SHOTER: 'shoter',
    CS: 'cs',
    PICKUP_BOY: 'pickupBoy',
    ADMIN_DATA_ENTRY: 'adminDataEntry',
    DATA_ENTRY: 'dataEntry',
    WAREHOUSE: 'warehouse',
    ACCOUNT: 'account',
    SALES_MANAGER: 'salesManager',
    SALES: 'sales'
}

module.exports = {
    EnumRoleOfUser,
    EnumStatusOfUser,
    EnumLoadTypeOfCustomer,
    EnumPickupRequestOnLTLPanel,
    EnumTypeOfCustomer,
    EnumModesOfTransport,
    EnumTypeOfToken,
    EnumUserAccountFunctionAdditional
}